<template>
    <SiteCard class="gap-1">
        <SiteCardHeader>
            <Icon
                mode="svg"
                name="lucide:decimals-arrow-right"
            />
            Contributions by Month
            <!-- 今年的贡献图表，树状图，按照月份 -->
        </SiteCardHeader>
        <CardContent class="flex items-center h-full">
            <ClientOnly>
                <ChartContainer
                    :config="chartConfig"
                    class="h-28"
                >
                    <VisXYContainer :data="monthlyAverageContribution.monthlyStats">
                        <VisStackedBar
                            :bar-width="15"
                            :color="chartConfig.totalContributions.color"
                            :rounded-corners="25"
                            :x="(_: IMonthlyContribution, i:number) => i"
                            :y="(d: IMonthlyContribution) => d.totalContributions"
                        />
                        <VisAxis
                            :domain-line="false"
                            :grid-line="false"
                            :num-ticks="6"
                            :tick-format="(_:any, i:number) => {
                                return monthlyAverageContribution.monthlyStats[i] && monthlyAverageContribution.monthlyStats[i].month
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
import type { ChartConfig } from '~/components/ui/chart'
import {
    ChartContainer,
    ChartCrosshair,
    ChartTooltip,
    ChartTooltipContent,
    componentToString,
} from '~/components/ui/chart'
import { VisAxis, VisStackedBar, VisXYContainer } from '@unovis/vue'
import { useGithubData } from '~/components/github/index'
import type { IMonthlyContribution } from '~/types/github'

defineOptions({
    name: 'GithubContributionGraphMonths',
})
const { monthlyAverageContribution } = useGithubData()

const chartConfig = {
    totalContributions: {
        label: 'Contributions:',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig
</script>
