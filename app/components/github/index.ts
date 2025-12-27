import { createContext } from 'reka-ui'
import type { IGithubGraphData } from '~/types/github'

export { default as GithubContainer } from './GithubContainer.vue'
export { default as GithubAverageCommitsPerWeek } from './GithubAverageCommitsPerWeek.vue'
export { default as GithubContributionsTotal } from './GithubContributionsTotal.vue'
export { default as GithubContributionGraphBlocks } from './GithubContributionGraphBlocks.vue'
export { default as GithubContributionGraphMonths } from './GithubContributionGraphMonths.vue'
export { default as GithubLongestGap } from './GithubLongestGap.vue'
export { default as GithubLongestStreak } from './GithubLongestStreak.vue'
export { default as GithubMostActiveMonth } from './GithubMostActiveMonth.vue'
export { default as GithubMostCommitsDay } from './GithubMostCommitsDay.vue'
export { default as GithubPullRequestsTotal } from './GithubPullRequestsTotal.vue'
export { default as GithubStarsTotal } from './GithubStarsTotal.vue'
export { default as GithubTopLanguages } from './GithubTopLanguages.vue'
export { default as GithubTopRepository } from './GithubTopRepository.vue'
export { default as GithubTotalIssues } from './GithubTotalIssues.vue'
export { default as GithubWeekendActivity } from './GithubWeekendActivity.vue'
export { default as GithubTopRepositoryItems } from './GithubTopRepositoryItems.vue'

export const [useGithubData, providerGithubData] = createContext<IGithubGraphData>('GithubData')

/**
 * 获取进度条的 dasharray
 * @param use 已完成的业务量
 * @param total 总量
 * @param radius 半径
 */
export const getStrokeDasharray = (use: number, total: number, radius: number): string => {
    const path = 2 * Math.PI * radius
    const progress = use / total
    const dash = Number((progress * path).toFixed(2))
    const gap = Number((path - dash).toFixed(2))

    return `${dash}, ${gap}`
}
