<template>
    <div class="flex justify-between items-center border-b border-neutral-700 px-2 pt-1 pb-4">
        <div class="flex items-center gap-3">
            <img
                alt="Github Logo"
                class="size-10 rounded-full drop-shadow drop-shadow-white"
                src="https://github.com/lonewolfyx.png"
            >
            <div class="flex flex-col gap-2 text-xs">
                <span class="text-xl text-white">OldDriver<span class="text-sm">(lonewolfyx)</span></span>
                <div class="flex justify-start items-center gap-3 text-neutral-400">
                    <div class="flex items-center gap-1">
                        <Icon
                            mode="svg"
                            name="mage:users"
                        />
                        <span>36 followers</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <Icon
                            mode="svg"
                            name="tabler:user-star"
                        />
                        <span>36 following</span>
                    </div>
                </div>
            </div>
        </div>
        <Button
            :class="cn(
                'base-muted rounded-full px-5 text-xs tracking-wide',
            )"
            as-child
        >
            <NuxtLink
                :class="cn('hover:text-neutral-400')"
                target="_blank"
                to="/"
            >
                <Icon
                    mode="svg"
                    name="line-md:github-loop"
                />
                Github Star Me
            </NuxtLink>
        </Button>
    </div>
</template>

<script lang="ts" setup>
import { cn } from '~/lib/utils'

defineOptions({
    name: 'SiteHeader',
})
</script>
