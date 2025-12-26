import dayjs from 'dayjs'
import type { IIssues, IIssuesNode, IIssuesResult } from '~/types/github'
import { useFetchGithubData } from '~/composables/useFetchGithubData'

/**
 * 获取 issues 统计
 * @param user
 */
export const getIssuesStatistics = async (user: string): Promise<IIssuesResult> => {
    const query = `query($login: String!,$cursor: String,$since: DateTime!){
    user(login: $login) {
        issues(
            first: 100
            after: $cursor
            orderBy: { field: CREATED_AT, direction: DESC }
            filterBy: {
                createdBy: $login
                since: $since
            }
        ) {
            nodes {
                title
                url
                state
                createdAt
                closedAt
                repository {
                nameWithOwner
                }
            }
            
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
}`

    let cursor: string | null = null
    let hasNextPage = true
    const issues: IIssuesNode[] = []
    while (hasNextPage) {
        const res = await useFetchGithubData(user, query, {
            login: user,
            cursor,
            since: `${dayjs().year()}-01-01T00:00:00Z`,
        })

        const page: IIssues = res.issues

        issues.push(...page.nodes)
        hasNextPage = page.pageInfo.hasNextPage
        cursor = page.pageInfo.endCursor
    }

    const issueCount = issues.filter(Boolean).filter(i => dayjs(i.createdAt).year() < dayjs().year())
    const closed = issueCount?.filter(i => i.state === 'CLOSED').length || 0
    const open = issueCount.length - closed

    return {
        issues: issueCount,
        open,
        closed,
    }
}
