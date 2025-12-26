export interface IRepository {
    name: string
    description: string
    nameWithOwner: string
    url: string
    stargazerCount?: number
    forkCount?: number
    forks?: {
        totalCount?: number
    }
    pullRequests?: {
        totalCount?: number
    }
    issues?: {
        totalCount?: number
    }
    createdAt: string
    primaryLanguage: IPrimaryLanguage
    licenseInfo: ILicenseInfo
    languages: ILanguages
}

export interface IPrimaryLanguage {
    name?: string
    color?: string
}

export interface ILicenseInfo {
    spdxId: string
    name: string
    key: string
}

export interface ILanguageEdge {
    size?: number
    node?: {
        color?: string
        name?: string
    }
}

export interface ILanguages {
    edges?: ILanguageEdge[]
    totalCount?: number
}

export interface ContributionDay {
    date: string // YYYY-MM-DD
    contributionCount: number
}

export interface INoContributionStreak {
    /** 连续没有贡献的总天数 */
    days: number

    /** 起始日期（包含） */
    startDate: string

    /** 结束日期（包含） */
    endDate: string
}

export interface IRepoTopsLanguages {
    name: string
    color?: string
    size: number
    repoCount: number
}

export interface IWeeklyContribution {
    day: string // Sunday, Monday, ...
    totalContributions: number
    averagePerWeek: number
}

export interface IWeekendContributionStats {
    /** 周末有贡献的天数 */
    contributedDays: number
    /** 周末无贡献的天数 */
    noContributionDays: number

    /** 周末有贡献的日期 */
    contributedDates: string[]

    /** 周末无贡献的日期 */
    noContributionDates: string[]
}

export interface IMonthlyContribution {
    month: string // YYYY-MM
    totalContributions: number
}

export interface IMonthlyAverageContribution {
    monthlyStats: IMonthlyContribution[]
    averagePerMonth: number
}

export interface IMostActiveStats {
    /** 最活跃月份 */
    mostActiveMonth: IMonthlyContribution

    /** 贡献最多的一天 */
    mostActiveDay: {
        date: string // YYYY-MM-DD
        contributions: number
    }

    /** 所有月份统计 */
    monthlyStats: IMonthlyContribution[]
}

export interface IUser {
    login: string
    name: string
    bio: string
    url: string
    avatarUrl: string
    pronouns: string
    followers: {
        totalCount: number
    }
    following: {
        totalCount: number
    }
}

export interface ITotal {
    contributions: number
    stars: number
    commits: number
    issues: number
    pullRequests: number
}

export interface IGithubGraphData {
    user: IUser
    total: ITotal
}
