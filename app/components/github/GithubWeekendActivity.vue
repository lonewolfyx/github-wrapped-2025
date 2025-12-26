<template>
    <SiteCard class="gap-1">
        <SiteCardHeader>
            <Icon
                mode="svg"
                name="bi:calendar2-week"
            />
            Weekend Activity
            <!-- 有多少天是周六日干活的 -->
        </SiteCardHeader>
        <CardContent class="p-0">
            <div class="flex items-center justify-center">
                <div class="relative flex items-center justify-center">
                    <svg class="h-28 w-28 transform -rotate-90">
                        <circle
                            class="text-muted-foreground/20"
                            cx="55"
                            cy="55"
                            fill="transparent"
                            r="45"
                            stroke="currentColor"
                            stroke-width="12"
                        />
                        <circle
                            :stroke-dasharray="strokeDasharray"
                            class="text-green-600"
                            cx="55"
                            cy="55"
                            fill="transparent"
                            r="45"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-width="12"
                        />
                    </svg>
                    <div
                        class="absolute flex flex-col items-center justify-center text-center"
                    >
                        <span class="text-xl text-white font-bold">
                            {{ weekendContributionStats.contributedDays }}
                        </span>
                        <span class="text-xs md:text-sm text-muted-foreground">
                            Days
                        </span>
                    </div>
                </div>
            </div>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { getStrokeDasharray, useGithubData } from '.'

defineOptions({
    name: 'GithubWeekendActivity',
})

const countWeekendsInYear = () => {
    const year = dayjs().year()
    const start = dayjs(`${year}-01-01`)
    const end = dayjs(`${year}-12-31`)

    let saturdays = 0
    let sundays = 0

    let current = start.startOf('day')

    while (current.isBefore(end) || current.isSame(end, 'day')) {
        const dayOfWeek = current.day()
        if (dayOfWeek === 6) {
            saturdays++
        }
        else if (dayOfWeek === 0) {
            sundays++
        }
        current = current.add(1, 'day')
    }

    return {
        saturdays,
        sundays,
        total: saturdays + sundays,
    }
}

const { total: breakDays } = countWeekendsInYear()
const { weekendContributionStats } = useGithubData()

const strokeDasharray = computed(() => getStrokeDasharray(weekendContributionStats.contributedDays, breakDays, 45))
</script>
