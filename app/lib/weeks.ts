import type { ContributionDay, IWeekendContributionStats, IWeeklyContribution } from '~/types/github'

const isWeekEnd = (date: string): boolean => {
    const day = new Date(date).getUTCDay()
    return day === 0 || day === 6 // Sunday = 0, Saturday = 6
}

/**
 * 获取周末的贡献情况
 * @param days
 */
export const getWeekendContributionStats = (days: ContributionDay[]): IWeekendContributionStats => {
    const contributedDates: string[] = []
    const noContributionDates: string[] = []

    for (const day of days) {
        if (!isWeekEnd(day.date)) continue

        if (day.contributionCount > 0) {
            contributedDates.push(day.date)
        }
        else {
            noContributionDates.push(day.date)
        }
    }

    return {
        contributedDays: contributedDates.length,
        noContributionDays: noContributionDates.length,
        contributedDates,
        noContributionDates,
    }
}

/**
 * 获取每周平均贡献
 * @param days
 */
export const getWeeklyAverageContribution = (days: ContributionDay[]): IWeeklyContribution[] => {
    // 星期几映射
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const totals = Array(7).fill(0)
    const counts = Array(7).fill(0)

    for (const day of days) {
        const dateObj = new Date(day.date)
        const weekIndex = dateObj.getUTCDay() // 0 = Sunday
        totals[weekIndex] += day.contributionCount
        counts[weekIndex] += 1
    }

    return weekDays.map((dayName: string, i: number) => ({
        day: dayName,
        totalContributions: totals[i],
        averagePerWeek: counts[i] > 0 ? Math.round(totals[i] / counts[i]) : 0,
    }))
}
