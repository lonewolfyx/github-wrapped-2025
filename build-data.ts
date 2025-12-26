import { resolve } from 'node:path'
import dotenv from 'dotenv'
import { getIssuesStatistics } from './app/lib/issues'
import { fetchGithubData } from './app/lib/graphql'
import { writeFile } from 'node:fs/promises'
import { summarizeRepoLanguages } from './app/lib/languages'
import { getLongestCommitStreak } from './app/lib/longest.commit.streak'
import { getLongestNoContributionStreak } from './app/lib/longest.no.contribution.streak'
import { getWeekendContributionStats, getWeeklyAverageContribution } from './app/lib/weeks'
import { getMonthlyAverageContribution, getMostActiveContributionStats } from './app/lib/month'
import { getPullRequests } from './app/lib/pull.requests'

dotenv.config({ path: resolve(process.cwd(), './.env') })

const userInfoQuery = `login # 用户的登录名，即 @xxxx
        name # 用户的别名
        bio # 用户的介绍
        url # 用户的url
        avatarUrl # 公共头像的 URL
        pronouns # 用户的个人资料代词
        followers {
            # 用户的粉丝
            totalCount # 总数
        }
        following {
            # 用户正在关注
            totalCount # 总数
        }`

const repositoryQuery = `# 个人仓库
        repositories(
            first: 30
            ownerAffiliations: OWNER
            isFork: false
            orderBy: { field: STARGAZERS, direction: DESC }
        ) {
            nodes {
                name # 仓库名称
                description # 仓库描述
                nameWithOwner # 仓库归属人
                url # 仓库地址
                stargazerCount # star 数量
                forkCount # fork 数量
                forks {
                    totalCount
                }
                pullRequests {
                    # PR 数量，包含关闭、合并、开放
                    totalCount
                }
                issues {
                    # issues 数量
                    totalCount
                }
                createdAt # 仓库创建时间
                primaryLanguage {
                    # 开发语言
                    name # 语言名称
                    color # 语言的颜色
                }
                licenseInfo {
                    # 许可证
                    spdxId # https://spdx.org/licenses指定的短标识符
                    name # https://spdx.org/licenses指定的许可证全名
                    key # 小写的 xpdxId
                }
                languages(
                    first: 10
                    orderBy: { field: SIZE, direction: DESC }
                ) {
                    edges {
                        size # 使用当前语言编写的字节数
                        node {
                            color # 语言颜色
                            name # 编程语言
                        }
                    }
                    totalCount # 语言总数
                }
            }
            totalCount # 仓库总数
        }`

const contributionQuery = `contributionsCollection(
            from: "2025-01-01T00:00:00Z"
            to: "2025-12-31T23:59:59Z"
        ) {
            contributionCalendar { # 贡献日历
                weeks { # 按照周分组
                    contributionDays {
                        date # 日期
                        contributionCount # 当天贡献总数
                        weekday
                    }
                }
                
                totalContributions # 👈 一行就拿到总数
            }
            commitContributionsByRepository {
                contributions {
                    totalCount
                }
                repository {
                    stargazerCount
                }
            }
            totalCommitContributions
            totalIssueContributions # 用户在时间区间内 创建的 Issues 数量
            totalPullRequestContributions # 用户在时间区间内 创建的 PR 数量
        }`

const createQuery = (query: string) => `query ($login: String!) {
    user(login: $login) {
        ${query}
    }
}`

interface ContributionDay {
    date: string // YYYY-MM-DD
    contributionCount: number
}

(async () => {
    const user = 'lonewolfyx'
    const params = {
        login: user,
    }
    const [userinfo, repository, contributions, issues, pullrequest] = await Promise.all([
        await fetchGithubData(user, createQuery(userInfoQuery), params),
        await fetchGithubData(user, createQuery(repositoryQuery), params),
        await fetchGithubData(user, createQuery(contributionQuery), params),
        await getIssuesStatistics(user),
        await getPullRequests(user),
    ])
    // console.log(contributions)

    const days = contributions.contributionsCollection.contributionCalendar.weeks.flatMap((w: any) => w.contributionDays)
        .sort((a: ContributionDay, b: ContributionDay) =>
            a.date.localeCompare(b.date),
        )

    const data = {
        user: userinfo,
        // 统计数据
        total: {
            // 总贡献值
            contributions: contributions.contributionsCollection.contributionCalendar?.totalContributions || 0,
            // 收到的 star 数
            stars: contributions.contributionsCollection.commitContributionsByRepository.reduce(
                (sum: number, item: any) => sum + item.repository.stargazerCount, 0),
            // 创建的 commit 数
            commits: contributions.contributionsCollection.totalCommitContributions,
            // 创建的 issue 数
            issues: {
                total: contributions.contributionsCollection.totalIssueContributions,
                opened: issues.opened,
                closed: issues.closed,
            },
            // 创建的 pr 数
            pullRequests: {
                total: contributions.contributionsCollection.totalPullRequestContributions,
                close: pullrequest.closed,
                merged: pullrequest.merged,
            },
        },
        // issues
        issues: issues.issues,
        repository,
        pullRequests: pullrequest.prs,
        // 热门语言排行
        languages: summarizeRepoLanguages(repository?.repositories?.nodes ?? []),
        // 连续提交天数
        longestCommitStreak: getLongestCommitStreak(days),
        // 最长空窗期没有贡献
        longestNoContributionStreak: getLongestNoContributionStreak(days),
        // 最活跃的月份
        mostActiveStats: getMostActiveContributionStats(days),
        // 每月平均贡献
        monthlyAverageContribution: getMonthlyAverageContribution(days),
        // 周末的贡献情况
        weekendContributionStats: getWeekendContributionStats(days),
        // 每周平均贡献
        weeklyAverageContribution: getWeeklyAverageContribution(days),
        contributions: days,
    }

    await writeFile(resolve(process.cwd(), `./${user}.json`), JSON.stringify(data, null, 4))
})()
