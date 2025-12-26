<template>
    <SiteCard class="gap-1">
        <!-- 提交次数最多的一天是几号「Most Commits Day」 -->
        <CardContent class="h-full">
            <div class="flex flex-col justify-between h-full">
                <Icon
                    class=" text-white"
                    mode="svg"
                    name="lucide:git-commit-vertical"
                    size="24"
                />
                <div class="flex flex-col gap-1 pb-4">
                    <div class="flex items-end gap-2">
                        <span class="base-text text-3xl">
                            {{ dayjs(date).date() }}
                        </span>
                        <span class="text-muted">{{ dayjs(date).format('MMM') }}.</span>
                    </div>
                    <span class="text-sm font-normal text-muted/50">
                        Most Commits
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
    name: 'GithubMostCommitsDay',
})

const { mostActiveStats } = useGithubData()
const date = mostActiveStats.mostActiveDay.date
</script>
