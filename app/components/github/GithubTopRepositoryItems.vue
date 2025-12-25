<template>
    <div class="bg-neutral-700/50 border border-neutral-700 rounded-sm p-2 space-y-2">
        <h3 class="base-text text-sm md:text-base">
            nuxt
        </h3>
        <p class="text-muted/50 text-xs md:text-sm line-clamp-1">
            The Progressive Web Framework.The Progressive Web Framework.The Progressive Web Framework.The
            Progressive Web Framework.The Progressive Web Framework.
        </p>
        <div class="flex items-center gap-4">
            <div class="flex items-center gap-1">
                <div
                    class="w-2 h-2 rounded-full"
                    style="background-color: rgb(49, 120, 198);"
                />
                <span class="text-sm text-muted-foreground">TypeScript</span>
            </div>
            <div class="flex items-center gap-1">
                <Icon
                    name="solar:star-linear"
                    mode="svg"
                    class="text-stone-300"
                />
                <span class="text-sm text-muted-foreground">99999999</span>
            </div>
            <div class="flex items-center gap-1">
                <Icon
                    name="lucide:git-fork"
                    mode="svg"
                    class="text-stone-300"
                />
                <span class="text-sm text-muted-foreground">99999999</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'GithubTopRepositoryItems',
})
</script>
