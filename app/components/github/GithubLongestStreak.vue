<template>
    <SiteCard class="gap-1">
        <!-- 连续提交commit天数 「Longest Streak，days」 -->
        <CardContent class="h-full">
            <div class="flex flex-col justify-between h-full">
                <Icon
                    class=" text-white"
                    mode="svg"
                    name="lucide:git-graph"
                    size="24"
                />
                <div class="flex flex-col gap-1 pb-4">
                    <div class="flex items-end gap-2">
                        <span class="base-text text-3xl">
                            {{ longestCommitStreak }}
                        </span>
                        <span class="text-muted">days</span>
                    </div>
                    <span class="text-sm font-normal text-muted/50">
                        Longest Streak
                    </span>
                </div>
            </div>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
import { useGithubData } from '~/components/github/index'

defineOptions({
    name: 'GithubLongestStreak',
})

const { longestCommitStreak } = useGithubData()
</script>
