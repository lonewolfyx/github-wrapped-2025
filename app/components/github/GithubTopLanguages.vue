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
        <CardContent class="space-y-4 overflow-auto">
            <div
                v-if="languages.length"
                class="flex flex-col gap-4"
            >
                <span
                    v-if="topLanguage"
                    :class="cn(
                        'font-mono text-2xl text-transparent',
                        'bg-clip-text bg-linear-to-r',
                        'from-green-500 to-green-900',
                    )"
                >{{ topLanguage.name }}</span>
                <div class="flex items-center gap-1 w-full">
                    <div
                        v-for="item in languagesStar"
                        :key="item.name"
                        :style="{
                            backgroundColor: item.color,
                            flexBasis: item.progress,
                        }"
                        class="h-2 w-full rounded-xs"
                    />
                </div>
                <div class="flex items-center flex-wrap gap-4 mb-1">
                    <div
                        v-for="item in languagesStar"
                        :key="`s-${item.name}`"
                        class="flex items-center gap-1.5"
                    >
                        <span
                            :style="{
                                backgroundColor: item.color,
                            }"
                            class="rounded-full size-2 bg-red-500"
                        />
                        <span class="text-sm font-normal text-muted/50">
                            {{ item.name }}
                        </span>
                    </div>
                </div>
            </div>
            <template v-if="languagesList.length">
                <div class="border-b border-neutral-700" />
                <div class="space-y-2">
                    <div
                        v-for="item in languagesList"
                        :key="item.name"
                        class="flex items-center gap-2"
                    >
                        <div
                            :style="{
                                backgroundColor: item.color,
                            }"
                            class="w-3 h-3 rounded-full"
                        />
                        <span class="text-sm md:text-base text-muted/50">{{ item.name }}</span>
                        <span class="text-xs md:text-sm ml-auto text-muted">{{ item.progress }} %</span>
                    </div>
                </div>
            </template>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'
import { useGithubData } from '~/components/github/index'
import type { IRepoTopsLanguages } from '~/types/github'

defineOptions({
    name: 'GithubTopLanguages',
})

const { languages } = useGithubData()
const [, , , ...languagesList] = languages
const languagesStar = languages.slice(0, 3)
const topLanguage = computed<IRepoTopsLanguages | null>(() => {
    return languagesStar[0] ?? null
})
</script>
