import { contributionQuery, createQuery, repositoryQuery, userInfoQuery } from '~/lib/query'
import { getIssuesStatistics } from '~/lib/issues'
import { getPullRequests } from '~/lib/pull.requests'
import { summarizeRepoLanguages } from '~/lib/languages'
import { getLongestCommitStreak } from '~/lib/longest.commit.streak'
import { getLongestNoContributionStreak } from '~/lib/longest.no.contribution.streak'
import { getMonthlyAverageContribution, getMostActiveContributionStats } from '~/lib/month'
import { getWeekendContributionStats, getWeeklyAverageContribution } from '~/lib/weeks'
import { useFetchGithubData } from '~/composables/useFetchGithubData'

interface ContributionDay {
    date: string // YYYY-MM-DD
    contributionCount: number
}

export const getGithubUserData = async (user: string) => {
    const params = {
        login: user,
    }
    const [userinfo, repository, contributions, issues, pullRequest] = await Promise.all([
        await useFetchGithubData(user, createQuery(userInfoQuery), params),
        await useFetchGithubData(user, createQuery(repositoryQuery), params),
        await useFetchGithubData(user, createQuery(contributionQuery), params),
        await getIssuesStatistics(user),
        await getPullRequests(user),
    ])

    const days = contributions.contributionsCollection.contributionCalendar.weeks.flatMap((w: any) => w.contributionDays)
        .sort((a: ContributionDay, b: ContributionDay) =>
            a.date.localeCompare(b.date),
        )

    return {
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
                opened: issues.open,
                closed: issues.closed,
            },
            // 创建的 pr 数
            pullRequests: {
                total: contributions.contributionsCollection.totalPullRequestContributions,
                close: pullRequest.closed,
                merged: pullRequest.merged,
            },
        },
        // issues
        issues: issues.issues,
        repository,
        pullRequests: pullRequest.prs,
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
}
