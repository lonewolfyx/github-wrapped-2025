<template>
    <SiteCard class="gap-1 h-full">
        <SiteCardHeader>
            <Icon
                mode="svg"
                name="lucide:git-commit-horizontal"
            />
            Contribution Graph
            <!-- 今年的贡献图表，按照每天 -->
        </SiteCardHeader>
        <CardContent>
            <ClientOnly>
                <div class="grid grid-cols-52 gap-1 p-2 rounded-lg w-full">
                    <div
                        v-for="(cell, index) in cells"
                        :key="`${cell.week}-${cell.day}`"
                        :class="getCellClass(getContributionCount(index))"
                        class="w-3 h-3 rounded-sm"
                    />
                </div>
            </ClientOnly>
        </CardContent>
    </SiteCard>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'GithubContributionGraphBlocks',
})

// 2025 年总周数（ISO 8601）
const WEEKS_IN_YEAR = 52
const DAYS_PER_WEEK = 7

// 生成所有格子的坐标：[weekIndex][dayIndex]
// 总共 52 * 7 = 364 个格子
const cells = computed(() => {
    const result: { week: number, day: number }[] = []
    for (let week = 0; week < WEEKS_IN_YEAR; week++) {
        for (let day = 0; day < DAYS_PER_WEEK; day++) {
            result.push({ week, day })
        }
    }
    return result
})

// 根据贡献次数返回颜色类（模拟 GitHub 的 5 级强度）
const getCellClass = (count: number): string => {
    if (count === 0) return 'bg-gray-100'
    if (count < 5) return 'bg-green-200'
    if (count < 10) return 'bg-green-300'
    if (count < 20) return 'bg-green-400'
    return 'bg-green-600'
}

// 示例：模拟一些随机贡献（可替换为真实数据）
const mockContributionMap = new Map<string, number>()
// 初始化一个 2025 年的日期映射（简化版：只用于演示）
// 实际项目中建议用 date-fns 或 dayjs 计算每个格子对应的真实日期
for (let i = 0; i < 364; i++) {
    // 随机生成 0~25 的提交数
    mockContributionMap.set(`${i}`, Math.floor(Math.random() * 26))
}

// 获取某个格子的贡献值（这里用 index 模拟，实际应映射到日期）
const getContributionCount = (index: number): number => {
    return mockContributionMap.get(`${index}`) || 0
}
</script>
