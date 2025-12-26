<template>
    <SiteCard class="gap-1">
        <SiteCardHeader>
            <Icon
                mode="svg"
                name="lucide:circle-dot"
            />
            Total Issues
        </SiteCardHeader>
        <CardContent class="p-0">
            <div class="flex items-center justify-center">
                <div class="relative flex items-center justify-center">
                    <svg class="h-28 w-28 transform -rotate-90">
                        <circle
                            class="text-muted-foreground/20"
                            cx="55"
                            cy="55"
                            fill="transparent"
                            r="45"
                            stroke="currentColor"
                            stroke-width="12"
                        />
                        <circle
                            :stroke-dasharray="strokeDasharray"
                            class="text-pink-600"
                            cx="55"
                            cy="55"
                            fill="transparent"
                            r="45"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-width="12"
                        />
                    </svg>
                    <div
                        class="absolute flex flex-col items-center justify-center text-center"
                    >
                        <span class="base-text">
                            {{ used }}
                        </span>
                        <span class="text-xs md:text-sm text-muted-foreground">
                            Total
                        </span>
                    </div>
                </div>
            </div>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
import { getStrokeDasharray } from '.'

defineOptions({
    name: 'GithubTotalIssues',
})

// 关闭的数量
const close = 20
const total = 329
const used = computed(() => total - close)
const strokeDasharray = computed(() => getStrokeDasharray(used.value, total, 45))
</script>
