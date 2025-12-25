<template>
    <Card
        :class="cn(
            'base-muted py-4',
            props.class,
        )"
    >
        <slot />
    </Card>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'
import type { HTMLAttributes } from 'vue'

defineOptions({
    name: 'SiteCard',
})

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>
