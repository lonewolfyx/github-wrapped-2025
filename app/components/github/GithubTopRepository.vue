<template>
    <SiteCard class="gap-1 h-full">
        <SiteCardHeader>
            <Icon
                mode="svg"
                name="lucide:book-marked"
            />
            Top Repository
            <!-- 今年热门的仓库,按照 star、fork 排序 -->
        </SiteCardHeader>
        <CardContent class="p-2">
            <!--            今年热门的仓库,按照 star、fork 排序 -->
            <div class="flex flex-col gap-2">
                <GithubTopRepositoryItems />
                <GithubTopRepositoryItems />
                <GithubTopRepositoryItems />
            </div>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'GithubTopRepository',
})
</script>
