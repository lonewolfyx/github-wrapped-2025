<template>
    <div class="border border-neutral-700 rounded-2xl p-4">
        <h2 class="text-lg md:text-xl font-semibold mb-4">
            Contribution Graph (2025)
        </h2>
        <div class="flex flex-col gap-2">
            <div class="grid grid-cols-[repeat(53,1fr)] gap-0.5 md:gap-1 min-w-xl md:min-w-0">
                <div
                    v-for="item in Array.from({ length: 53 }, (_, i) => i+1)"
                    :key="`${item}-github`"
                    class="flex flex-col items-center gap-2"
                >
                    <div
                        v-for="(_, i) in Array.from({ length: 7 }, (_, i) => i+1)"
                        :key="`contribuions-${i}`"
                        class="size-2.5 rounded-sm bg-muted-foreground text-muted"
                        title="582 contributions on 2024-01-01"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'GithubContributionGraph',
})
</script>
