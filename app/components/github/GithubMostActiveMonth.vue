<template>
    <SiteCard class="gap-1">
        <!-- 哪一个月份提交次数最多，最活跃的月份「Most Active Month」 -->
        <CardContent class="h-full">
            <div class="flex flex-col justify-between h-full">
                <Icon
                    class=" text-white"
                    mode="svg"
                    name="lucide:calendar-days"
                    size="24"
                />
                <div class="flex flex-col gap-1 pb-4">
                    <div class="flex items-end gap-2">
                        <span class="base-text text-3xl">
                            {{ dayjs(mostActiveStats.mostActiveMonth.month).month() + 1 }}
                        </span>
                        <span class="text-muted">Month.</span>
                    </div>
                    <span class="text-sm font-normal text-muted/50">
                        Active Months
                    </span>
                </div>
            </div>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
import { useGithubData } from '~/components/github/index'
import dayjs from 'dayjs'

defineOptions({
    name: 'GithubMostActiveMonth',
})

const { mostActiveStats } = useGithubData()
</script>
