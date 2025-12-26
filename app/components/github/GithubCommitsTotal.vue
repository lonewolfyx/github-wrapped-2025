<template>
    <SiteCard class="gap-1">
        <SiteCardHeader>
            <Icon
                mode="svg"
                name="lucide:git-graph"
            />
            Total Commits
            <!-- 今年总共提交了多少次commit -->
        </SiteCardHeader>
        <CardContent class="h-full">
            <div class="flex justify-center items-center h-full">
                <span class="base-text text-3xl">{{ total.commits.toLocaleString('en-US') }}</span>
            </div>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
import { useGithubData } from '~/components/github/index'

defineOptions({
    name: 'GithubCommitsTotal',
})

const { total } = useGithubData()
</script>
