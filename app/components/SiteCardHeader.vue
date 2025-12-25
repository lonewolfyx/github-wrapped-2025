<template>
    <CardHeader class="px-2">
        <CardTitle class="text-sm text-white font-mono font-medium flex items-center gap-2">
            <slot />
        </CardTitle>
    </CardHeader>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'SiteCardHeader',
})
</script>
