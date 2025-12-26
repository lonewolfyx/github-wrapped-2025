<template>
    <SiteBody>
        <div
            class="absolute bottom-0 left-0 right-0 top-0 bg-size-[20px_20px] bg-[radial-gradient(#ffffff33_1px,#121315_1px)]"
        />
        <div class="relative container mx-auto px-3 md:px-4 flex flex-col h-full">
            <div class="flex justify-center items-center text-xs flex-none">
                <span
                    :class="cn(
                        'border border-t-0',
                        'base-muted',
                        'p-2 px-4',
                        'rounded-b-xl',
                    )"
                >Github Wrapped 2025</span>
            </div>
            <GithubContainer>
                <div class="flex h-full flex-col space-y-4 pb-4">
                    <SiteHeader />
                    <div class="flex-1 overflow-hidden">
                        <div class="grid h-full grid-cols-1 md:grid-cols-3 grid-rows-4 gap-4">
                            <div class="grid grid-cols-2 gap-4">
                                <GithubCommitsTotal />
                                <GithubStarsTotal />
                            </div>
                            <GithubAverageCommitsPerWeek />
                            <div class="grid grid-cols-2 gap-4">
                                <GithubTotalIssues />
                                <GithubPullRequestsTotal />
                            </div>
                            <div class="row-span-2">
                                <GithubTopLanguages />
                            </div>
                            <GithubContributionGraphMonths />
                            <div class="row-span-2">
                                <GithubTopRepository />
                            </div>
                            <div class="grid grid-cols-3 gap-4">
                                <GithubLongestStreak />
                                <GithubMostActiveMonth />
                                <GithubMostCommitsDay />
                            </div>
                            <div class="col-span-2">
                                <GithubContributionGraphBlocks />
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <GithubLongestGap />
                                <GithubWeekendActivity />
                            </div>
                        </div>
                    </div>
                </div>
            </GithubContainer>
            <SiteFooter />
        </div>
    </SiteBody>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'

useHead({
    title: 'OldDriver(lonewolfyx) Github Wrapped 2025',
})
</script>
