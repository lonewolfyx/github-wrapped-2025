<template>
    <SiteCard class="gap-1 h-full">
        <SiteCardHeader>
            <Icon
                mode="svg"
                name="lucide:git-commit-horizontal"
            />
            Contribution Graph
            <!-- 今年的贡献图表，按照每天 -->
        </SiteCardHeader>
        <CardContent>
            <ClientOnly>
                <div class="grid grid-flow-col grid-rows-7 gap-1 p-2 rounded-lg w-full overflow-x-auto">
                    <TooltipProvider
                        v-for="cell in cells"
                        :key="cell.date"
                    >
                        <Tooltip>
                            <TooltipTrigger>
                                <div
                                    :class="getCellClass(getContributionCount(cell.date))"
                                    :title="`${cell.date}: ${getContributionCount(cell.date)} contributions`"
                                    class="w-3 h-3 rounded-sm"
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <span class="font-mono">
                                    {{ getContributionCount(cell.date) }} contributions on
                                    {{ dayjs(cell.date).format('YYYY.MM.DD') }}
                                </span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </ClientOnly>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
import { useGithubData } from '~/components/github/index'
import type { IContributions } from '~/types/github'
import dayjs from 'dayjs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'

defineOptions({
    name: 'GithubContributionGraphBlocks',
})

const { contributions } = useGithubData()

const maxCount = computed(() => {
    if (contributions.length === 0) return 0
    return Math.max(...contributions.map((c: IContributions) => c.contributionCount), 0)
})

const contributionMap = computed(() => {
    const map = new Map<string, number>()
    contributions.forEach((item: IContributions) => {
        map.set(item.date, item.contributionCount)
    })
    return map
})

const cells = computed(() => {
    const result: { date: string, week: number, day: number }[] = []
    const startDate = new Date(`${dayjs().year()}-01-01`)

    for (let i = 0; i < 365; i++) {
        const currentDate = new Date(startDate)
        currentDate.setDate(startDate.getDate() + i)

        // 格式化为 YYYY-MM-DD
        const dateStr = currentDate.toISOString().split('T')[0] as string

        result.push({
            date: dateStr,
            week: Math.floor(i / 7),
            day: currentDate.getDay(), // 0 是周日
        })
    }
    return result
})

const getContributionCount = (date: string): number => {
    return contributionMap.value.get(date) || 0
}

const getCellClass = (count: number): string => {
    const max = maxCount.value
    if (max === 0 || count === 0) return 'bg-stone-500/10'

    // 将 1 到 max 的区间平分为 4 份
    // Level 1: (0, 25%]
    // Level 2: (25%, 50%]
    // Level 3: (50%, 75%]
    // Level 4: (75%, 100%]
    const step = max / 4

    if (count <= step) return 'bg-stone-500/35' // 浅色
    if (count <= step * 2) return 'bg-stone-500/65' // 中浅
    if (count <= step * 3) return 'bg-stone-500/75' // 中深
    return 'bg-black' // 最深
}
</script>
