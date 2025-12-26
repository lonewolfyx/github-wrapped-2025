import type { ContributionDay, INoContributionStreak } from '~/types/github'

// 获取最长的空窗期没有贡献
// function getLongestNoContributionStreak(days: ContributionDay[]): number {
//     let max = 0
//     let current = 0
//
//     for (const day of days) {
//         if (day.contributionCount === 0) {
//             current++
//             max = Math.max(max, current)
//         }
//         else {
//             current = 0
//         }
//     }
//
//     return max
// }

export const getLongestNoContributionStreak = (days: ContributionDay[]): INoContributionStreak => {
    let maxDays = 0
    let maxStart = ''
    let maxEnd = ''

    let currentDays = 0
    let currentStart = ''

    for (let i = 0; i < days.length; i++) {
        const day = days[i]
        if (!day) continue

        if (day.contributionCount === 0) {
            if (currentDays === 0) {
                currentStart = day.date
            }
            currentDays++
            continue
        }

        if (currentDays > 0 && currentDays > maxDays) {
            const prevDay = days[i - 1]
            if (prevDay) {
                maxDays = currentDays
                maxStart = currentStart
                maxEnd = prevDay.date
            }
        }

        currentDays = 0
        currentStart = ''
    }

    // streak 在结尾
    const lastDay = days[days.length - 1]
    if (lastDay && currentDays > maxDays) {
        maxDays = currentDays
        maxStart = currentStart
        maxEnd = lastDay.date
    }

    return maxDays > 0
        ? { days: maxDays, startDate: maxStart, endDate: maxEnd }
        : { days: 0, startDate: '', endDate: '' }
}
