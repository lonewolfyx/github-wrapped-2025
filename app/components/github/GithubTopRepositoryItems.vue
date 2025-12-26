<template>
    <NuxtLink
        :to="repository.url"
        class="bg-neutral-700/50 border border-neutral-700 rounded-sm p-2 space-y-2"
        target="_blank"
    >
        <h3 class="base-text text-sm md:text-base">
            {{ repository.name }}
        </h3>
        <p class="text-muted/50 text-xs md:text-sm line-clamp-1">
            {{ repository.description }}
        </p>
        <div class="flex items-center gap-4">
            <div
                v-if="repository.primaryLanguage"
                class="flex items-center gap-1"
            >
                <div
                    :style="{
                        backgroundColor: repository.primaryLanguage.color,
                    }"
                    class="w-2 h-2 rounded-full"
                />
                <span class="text-sm text-muted-foreground">{{ repository.primaryLanguage.name }}</span>
            </div>
            <div class="flex items-center gap-1">
                <Icon
                    class="text-stone-300"
                    mode="svg"
                    name="solar:star-linear"
                />
                <span class="text-sm text-muted-foreground">{{ repository.stargazerCount }}</span>
            </div>
            <div class="flex items-center gap-1">
                <Icon
                    class="text-stone-300"
                    mode="svg"
                    name="lucide:git-fork"
                />
                <span class="text-sm text-muted-foreground">{{ repository.forkCount }}</span>
            </div>
        </div>
    </NuxtLink>
</template>

<script lang="ts" setup>
import type { IRepository } from '~/types/github'

defineOptions({
    name: 'GithubTopRepositoryItems',
})

const props = defineProps<{
    repository: IRepository
}>()
</script>
