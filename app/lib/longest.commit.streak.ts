import type { ContributionDay } from '~/types/github'

/**
 * 获取最长的 commits 连续提交天数
 * @param days
 */
export const getLongestCommitStreak = (days: ContributionDay[]): number => {
    let max = 0
    let current = 0

    for (const day of days) {
        if (day.contributionCount > 0) {
            current++
            max = Math.max(max, current)
        }
        else {
            current = 0
        }
    }

    return max
}
