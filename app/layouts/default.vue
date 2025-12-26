<template>
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
        <slot />
        <SiteFooter />
    </div>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'
</script>
