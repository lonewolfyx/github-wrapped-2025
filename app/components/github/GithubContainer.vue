<template>
    <div v-if="pending">
        loading
    </div>
    <div
        v-else
        class="flex-1 overflow-hidden"
    >
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { providerGithubData } from '~/components/github/index'
import virtualUserGithubSource from 'virtual:user-github-source'
import type { IGithubGraphData } from '~/types/github'

defineOptions({
    name: 'GithubContainer',
})

const route = useRoute()
const user = computed(() => `user-${route.params.user}`)

const { data: provideData, pending, error } = await useAsyncData(
    user,
    async () => {
        if (!user.value || user.value === 'user-') {
            return virtualUserGithubSource
        }

        const response = await $fetch<{
            data: IGithubGraphData
            source: string
        }>(`/api/github/${user.value.replace('user-', '')}`)
        return response.data
    },
    { default: () => virtualUserGithubSource },
)

providerGithubData(provideData.value)
</script>
