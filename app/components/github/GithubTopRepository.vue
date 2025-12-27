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
            <div
                v-if="hotRepository.length"
                class="flex flex-col gap-2"
            >
                <GithubTopRepositoryItems
                    v-for="item in repository.repositories.nodes.slice(0, 3)"
                    :key="item.name"
                    :repository="item"
                />
            </div>
            <template v-else>
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <Icon name="oui:reporter" />
                        </EmptyMedia>
                        <EmptyTitle class="text-muted">
                            No Popular Repositories
                        </EmptyTitle>
                        <EmptyDescription>
                            This account doesn’t have any public repositories with enough activity to be considered popular.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            </template>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
import { useGithubData } from '~/components/github/index'

defineOptions({
    name: 'GithubTopRepository',
})

const { repository } = useGithubData()
const hotRepository = computed(() => repository.repositories.nodes.slice(0, 3))
</script>
