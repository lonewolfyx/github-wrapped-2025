<template>
    <SiteCard class="gap-1">
        <SiteCardHeader>
            <Icon
                mode="svg"
                name="solar:star-bold-duotone"
            />
            Total Stars
            <!-- 今年的仓库总共收到了多少 star -->
        </SiteCardHeader>
        <CardContent class="h-full">
            <div class="flex justify-center items-center h-full">
                <span class="base-text text-3xl">{{ total.stars.toLocaleString('en-US') }}</span>
            </div>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
import { useGithubData } from '~/components/github/index'

defineOptions({
    name: 'GithubStarsTotal',
})
const { total } = useGithubData()
</script>
