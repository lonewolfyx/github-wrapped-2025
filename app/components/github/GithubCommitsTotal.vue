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
                <span class="base-text text-3xl">999,999,999</span>
            </div>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'GithubCommitsTotal',
})
</script>
