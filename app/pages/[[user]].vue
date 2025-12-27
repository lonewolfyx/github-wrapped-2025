<template>
    <Suspense>
        <template #default>
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
        </template>
        <template #fallback>
            <div class="flex-1 overflow-hidden">
                <div class="flex justify-center items-center w-full h-full gap-3">
                    <Icon
                        mode="svg"
                        name="svg-spinners:90-ring-with-bg"
                        size="24"
                    />
                    Loading config.....
                </div>
            </div>
        </template>
    </Suspense>
</template>

<script lang="ts" setup>

</script>
