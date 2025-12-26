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
                <GithubTopRepositoryItems
                    v-for="item in repository.repositories.nodes.slice(0, 3)"
                    :key="item.name"
                    :repository="item"
                />
            </div>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
import { useGithubData } from '~/components/github/index'

defineOptions({
    name: 'GithubTopRepository',
})

const { repository } = useGithubData()
</script>
