<template>
    <SiteCard class="gap-1">
        <SiteCardHeader>
            <Icon
                mode="svg"
                name="lucide:decimals-arrow-right"
            />
            Average Commits Per Week
            <!-- 今年每周平均提交次数「Average Commits Per Week」周日,一,二,三,四,五,六 -->
        </SiteCardHeader>
        <CardContent class="flex items-center h-full">
            <ClientOnly>
                <ChartContainer
                    :config="chartConfig"
                    class="h-28"
                >
                    <VisXYContainer
                        :data="weeklyAverageContribution"
                    >
                        <VisStackedBar
                            :bar-width="20"
                            :color="chartConfig.totalContributions.color"
                            :rounded-corners="25"
                            :x="(_: IWeeklyContribution, i:number) => i"
                            :y="(d: IWeeklyContribution) => d.totalContributions"
                        />
                        <VisAxis
                            :domain-line="false"
                            :grid-line="false"
                            :num-ticks="6"
                            :tick-format="(_:any, i:number) => {
                                return weeklyAverageContribution[i] && weeklyAverageContribution[i].day
                            }"
                            :tick-line="false"
                            :x="(_: any, i:number) => i"
                            type="x"
                        />
                        <ChartTooltip />
                        <ChartCrosshair
                            :template="componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })"
                            color="#0000"
                        />
                    </VisXYContainer>
                </ChartContainer>
            </ClientOnly>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
import {
    type ChartConfig,
    ChartContainer,
    ChartCrosshair,
    ChartTooltip,
    ChartTooltipContent,
    componentToString,
} from '~/components/ui/chart'
import { VisAxis, VisStackedBar, VisXYContainer } from '@unovis/vue'
import { useGithubData } from '~/components/github/index'
import type { IWeeklyContribution } from '~/types/github'

defineOptions({
    name: 'GithubAverageCommitsPerWeek',
})

const { weeklyAverageContribution } = useGithubData()

const chartConfig = {
    totalContributions: {
        label: 'Contributions:',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig
</script>
