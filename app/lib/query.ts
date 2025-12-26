import dayjs from 'dayjs'

export const userInfoQuery = `login # 用户的登录名，即 @xxxx
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

export const repositoryQuery = `# 个人仓库
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

export const contributionQuery = `contributionsCollection(
            from: "2025-01-01T00:00:00Z"
            to: "2025-12-${dayjs().date()}T23:59:59Z"
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

export const createQuery = (query: string) => `query ($login: String!) {
    user(login: $login) {
        ${query}
    }
}`
