<template>
    <SiteCard class="gap-1 h-full">
        <SiteCardHeader>
            <Icon
                mode="svg"
                name="lucide:terminal"
            />
            Top Languages
            <!-- 今年的开发语言排行图表 -->
        </SiteCardHeader>
        <CardContent class="space-y-4">
            <div class="flex flex-col gap-4">
                <span
                    :class="cn(
                        'font-mono text-2xl text-transparent',
                        'bg-clip-text bg-linear-to-r',
                        'from-green-500 to-green-900',
                    )"
                >Typescript</span>
                <div class="flex items-center gap-1 w-full">
                    <div class="bg-green-500 h-2 w-full basis-[60%] rounded-xs" />
                    <div class="bg-destructive h-2 w-full basis-[25%] rounded-xs" />
                    <div class="bg-violet-500 h-2 w-full basis-[15%] rounded-xs" />
                </div>
                <div class="flex items-center flex-wrap gap-4 mb-1">
                    <div class="flex items-center gap-1.5">
                        <span class="rounded-full size-2 bg-red-500" />
                        <span class="text-sm font-normal text-muted/50">
                            Vue
                        </span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <span class="rounded-full size-2 bg-green-500" />
                        <span class="text-sm font-normal text-muted/50">
                            React
                        </span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <span class="rounded-full size-2 bg-blue-500" />
                        <span class="text-sm font-normal text-muted/50">
                            Rust
                        </span>
                    </div>
                </div>
            </div>
            <div class="border-b border-neutral-700" />
            <div class="space-y-2">
                <div class="flex items-center gap-2">
                    <div
                        class="w-3 h-3 rounded-full"
                        style="background-color: rgb(241, 224, 90);"
                    />
                    <span class="text-sm md:text-base text-muted/50">JavaScript</span>
                    <span class="text-xs md:text-sm ml-auto text-muted">58.0%</span>
                </div>
                <div class="flex items-center gap-2">
                    <div
                        class="w-3 h-3 rounded-full"
                        style="background-color: rgb(241, 224, 90);"
                    />
                    <span class="text-sm md:text-base text-muted/50">JavaScript</span>
                    <span class="text-xs md:text-sm ml-auto text-muted">58.0%</span>
                </div>
                <div class="flex items-center gap-2">
                    <div
                        class="w-3 h-3 rounded-full"
                        style="background-color: rgb(241, 224, 90);"
                    />
                    <span class="text-sm md:text-base text-muted/50">JavaScript</span>
                    <span class="text-xs md:text-sm ml-auto text-muted">58.0%</span>
                </div>
                <div class="flex items-center gap-2">
                    <div
                        class="w-3 h-3 rounded-full"
                        style="background-color: rgb(241, 224, 90);"
                    />
                    <span class="text-sm md:text-base text-muted/50">JavaScript</span>
                    <span class="text-xs md:text-sm ml-auto text-muted">58.0%</span>
                </div>
                <div class="flex items-center gap-2">
                    <div
                        class="w-3 h-3 rounded-full"
                        style="background-color: rgb(241, 224, 90);"
                    />
                    <span class="text-sm md:text-base text-muted/50">JavaScript</span>
                    <span class="text-xs md:text-sm ml-auto text-muted">58.0%</span>
                </div>
                <div class="flex items-center gap-2">
                    <div
                        class="w-3 h-3 rounded-full"
                        style="background-color: rgb(241, 224, 90);"
                    />
                    <span class="text-sm md:text-base text-muted/50">JavaScript</span>
                    <span class="text-xs md:text-sm ml-auto text-muted">58.0%</span>
                </div>
            </div>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'

defineOptions({
    name: 'GithubTopLanguages',
})
</script>
