import { fetchGithubData } from './graphql'
import dayjs from 'dayjs'
import type { IPullRequestNode, IPullRequestResult } from '~/types/github'

/**
 * 获取用户的 PR
 * @param user
 */
export const getPullRequests = async (user: string): Promise<IPullRequestResult> => {
    const year = dayjs().year()
    const query = `query($searchQuery: String!, $after: String) {
    search(query: $searchQuery, type: ISSUE, first: 100, after: $after) {
        pageInfo {
            hasNextPage
            endCursor
        }
        
        nodes {
            ... on PullRequest {
                title
                url
                state
                createdAt
                repository {
                    nameWithOwner
                }
                merged
                mergedAt
            }
        }
    }
}`

    const allPRs: IPullRequestNode[] = []
    let hasNextPage = true
    let afterCursor: string | null = null

    while (hasNextPage) {
        const data = await fetchGithubData(user, query, {
            searchQuery: `author:${user} type:pr created:${year}-01-01..${year}-12-31`,
            after: afterCursor,
        })

        const { nodes, pageInfo } = data

        allPRs.push(...nodes)
        hasNextPage = pageInfo.hasNextPage
        afterCursor = pageInfo.endCursor
    }

    const closed = allPRs.filter(pr => pr.state === 'CLOSED').length
    const merged = allPRs.filter(pr => pr.state === 'MERGED').length

    return {
        prs: allPRs,
        closed,
        merged,
    }
}
