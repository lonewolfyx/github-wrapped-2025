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
        <CardContent>
            <ClientOnly>
                <ChartContainer
                    :config="chartConfig"
                    class="h-28"
                >
                    <VisXYContainer
                        :data="chartData"
                    >
                        <VisStackedBar
                            :bar-width="15"
                            :color="chartConfig.desktop.color"
                            :rounded-corners="25"
                            :x="(d: Data) => d.date"
                            :y="(d: Data) => d.desktop"
                        />
                        <VisAxis
                            :domain-line="false"
                            :grid-line="false"
                            :tick-format="(d: number) => {
                                const date = new Date(d)
                                // return date.toLocaleDateString('en-US', {
                                //     month: 'short',
                                // })
                                return '一月'
                            }"
                            :tick-line="false"
                            :tick-values="chartData.map(d => d.date)"
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

defineOptions({
    name: 'GithubContributionGraphMonths',
})

const chartData = [
    { date: new Date('2024-01-01'), desktop: 186 },
    { date: new Date('2024-02-01'), desktop: 305 },
    { date: new Date('2024-03-01'), desktop: 237 },
    { date: new Date('2024-04-01'), desktop: 73 },
    { date: new Date('2024-05-01'), desktop: 209 },
    { date: new Date('2024-06-01'), desktop: 214 },
    { date: new Date('2024-07-01'), desktop: 186 },
    { date: new Date('2024-08-01'), desktop: 305 },
    { date: new Date('2024-09-01'), desktop: 237 },
    { date: new Date('2024-10-01'), desktop: 73 },
    { date: new Date('2024-11-01'), desktop: 209 },
    { date: new Date('2024-12-01'), desktop: 214 },
]

type Data = typeof chartData[number]

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig
</script>
