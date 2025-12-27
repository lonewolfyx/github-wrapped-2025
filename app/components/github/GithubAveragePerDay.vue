<template>
    <SiteCard class="gap-1">
        <SiteCardHeader>
            <Icon
                mode="svg"
                name="lucide:scale"
            />
            Average Per Day
            <!-- 今年平均日贡献度 -->
        </SiteCardHeader>
        <CardContent class="h-full">
            <div class="flex justify-center items-center h-full">
                <span class="base-text text-3xl">{{ averageContributionsPerDay }}</span>
            </div>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
import { useGithubData } from '~/components/github/index'
import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'

defineOptions({
    name: 'GithubAveragePerDay',
})

dayjs.extend(dayOfYear)

const { total } = useGithubData()
const averageContributionsPerDay = computed(() => {
    const totalDay = dayjs().dayOfYear()

    return Math.round(total.contributions / totalDay)
})
</script>
