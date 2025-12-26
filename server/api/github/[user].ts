import { defineEventHandler } from 'h3'
import { getGithubUserData } from '~/lib/github'

export default defineEventHandler(async (event) => {
    const user = getRouterParam(event, 'user')
    const now = Date.now()

    if (!user) {
        throw createError({
            status: 400,
            statusText: 'Missing user parameter',
        })
    }

    const storage = useStorage('cache')
    const cacheKey = `${user}.json`
    // cache two hours
    const MAX_AGE_MS = 2 * 60 * 60 * 1000

    const cached = await storage.getItem<any>(cacheKey)

    if (cached) {
        const isExpired = now - cached.timestamp > MAX_AGE_MS

        if (!isExpired) {
            return {
                source: 'cache',
                data: cached.content,
            }
        }
    }

    const result = await getGithubUserData(user)

    const newData: any = {
        content: result,
        timestamp: now,
    }

    await storage.setItem(cacheKey, newData)

    return {
        source: 'fresh',
        data: result,
    }
})
