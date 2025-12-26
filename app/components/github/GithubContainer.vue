<template>
    <div class="flex-1 overflow-hidden">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { providerGithubData } from '~/components/github/index'
import virtualUserGithubSource from 'virtual:user-github-source'

defineOptions({
    name: 'GithubContainer',
})
providerGithubData(virtualUserGithubSource)
console.log(virtualUserGithubSource)
</script>
