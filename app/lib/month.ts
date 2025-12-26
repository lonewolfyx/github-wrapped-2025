import dayjs from 'dayjs'
import type {
    ContributionDay,
    IMonthlyAverageContribution,
    IMonthlyContribution,
    IMostActiveStats,
} from '~/types/github'

/**
 * 获取每月平均贡献
 * @param days
 */
export const getMonthlyAverageContribution = (days: ContributionDay[]): IMonthlyAverageContribution => {
    const monthMap = new Map<string, number>()

    for (const day of days) {
        const month = day.date.slice(0, 7) // YYYY-MM
        monthMap.set(month, (monthMap.get(month) ?? 0) + day.contributionCount)
    }

    const monthlyStats: IMonthlyContribution[] = Array.from(monthMap.entries())
        .map(([month, total]) => ({ month, totalContributions: total }))
        .sort((a, b) => a.month.localeCompare(b.month))

    const total = monthlyStats.reduce((sum, m) => sum + m.totalContributions, 0)
    const averagePerMonth = monthlyStats.length > 0 ? total / monthlyStats.length : 0

    return {
        monthlyStats: [...monthlyStats].map(({ month, totalContributions }) => ({
            month: dayjs(month).format('MMM'), // → 'Mar'
            totalContributions,
        })),
        averagePerMonth,
    }
}

/**
 * 获取最活跃的月份贡献以及某天贡献度最高的情况
 */
export const getMostActiveContributionStats = (days: ContributionDay[]): IMostActiveStats => {
    const monthMap = new Map<string, number>()

    let maxDay = {
        date: '',
        contributions: 0,
    }

    for (const day of days) {
        const month = day.date.slice(0, 7) // YYYY-MM

        // 月度累计
        monthMap.set(
            month,
            (monthMap.get(month) ?? 0) + day.contributionCount,
        )

        // 单日最大
        if (day.contributionCount > maxDay.contributions) {
            maxDay = {
                date: day.date,
                contributions: day.contributionCount,
            }
        }
    }

    const monthlyStats: IMonthlyContribution[] = Array.from(monthMap.entries())
        .map(([month, total]) => ({
            month,
            totalContributions: total,
        }))
    // .sort((a, b) => b.totalContributions - a.totalContributions)

    return {
        mostActiveMonth: monthlyStats.sort((a, b) => b.totalContributions - a.totalContributions)[0] as IMonthlyContribution,
        mostActiveDay: maxDay,
        monthlyStats: [...monthlyStats]
            .sort((a, b) => a.month.localeCompare(b.month))
            .map(({ month, totalContributions }) => ({
                month: dayjs(month).format('MMM'), // → 'Mar'
                totalContributions,
            })),
    }
}
