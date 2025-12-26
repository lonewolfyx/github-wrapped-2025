<template>
    <div class="flex justify-between items-center border-b border-neutral-700 px-2 pt-1 pb-4">
        <NuxtLink
            class="flex items-center gap-3"
            target="_blank"
            :to="`https://github.com/${user.login}`"
        >
            <img
                :alt="user.name"
                :src="`https://github.com/${user.login}.png`"
                class="size-10 rounded-full drop-shadow drop-shadow-white"
            >
            <div class="flex flex-col gap-2 text-xs">
                <span class="text-xl text-white">{{ user.name }}<span class="text-sm">({{ user.login }})</span></span>
                <div class="flex justify-start items-center gap-3 text-neutral-400">
                    <div class="flex items-center gap-1">
                        <Icon
                            mode="svg"
                            name="mage:users"
                        />
                        <span>{{ user.followers.totalCount }} followers</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <Icon
                            mode="svg"
                            name="tabler:user-star"
                        />
                        <span>{{ user.following.totalCount }} following</span>
                    </div>
                </div>
            </div>
        </NuxtLink>
        <Button
            :class="cn(
                'base-muted rounded-full px-5 text-xs tracking-wide',
            )"
            as-child
        >
            <NuxtLink
                :class="cn('hover:text-neutral-400')"
                target="_blank"
                to="https://github.com/lonewolfyx/github-wrapped-2025"
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
import { useGithubData } from '~/components/github'

defineOptions({
    name: 'SiteHeader',
})

const { user } = useGithubData()
</script>
