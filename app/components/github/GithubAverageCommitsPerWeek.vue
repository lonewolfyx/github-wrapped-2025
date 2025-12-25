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
                        :data="chartData"
                    >
                        <VisStackedBar
                            :bar-width="20"
                            :color="chartConfig.desktop.color"
                            :rounded-corners="25"
                            :x="(d: Data) => d.date"
                            :y="(d: Data) => d.desktop"
                        />
                        <VisAxis
                            :domain-line="false"
                            :grid-line="false"
                            :num-ticks="6"
                            :tick-format="(d: number) => {
                                const date = new Date(d)
                                // return date.toLocaleDateString('en-US', {
                                //     month: 'short',
                                // })
                                return '三月'
                            }"
                            :tick-line="false"
                            :tick-values="chartData.map(d => d.date)"
                            :x="(d: Data) => d.date"
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

defineOptions({
    name: 'GithubAverageCommitsPerWeek',
})

const chartData = [
    { date: new Date('2024-01-01'), desktop: 186 },
    { date: new Date('2024-02-01'), desktop: 305 },
    { date: new Date('2024-03-01'), desktop: 237 },
    { date: new Date('2024-04-01'), desktop: 73 },
    { date: new Date('2024-05-01'), desktop: 209 },
    { date: new Date('2024-06-01'), desktop: 214 },
    { date: new Date('2024-07-01'), desktop: 186 },
]

type Data = typeof chartData[number]

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig
</script>
