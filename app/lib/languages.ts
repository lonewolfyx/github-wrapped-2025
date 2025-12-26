import type { IRepository, IRepoTopsLanguages } from '~/types/github'

/**
 * 汇总所有仓库的语言用量，并按大小降序返回。
 * @param repos           仓库列表
 */
export const summarizeRepoLanguages = (repos: IRepository[]): IRepoTopsLanguages[] | [] => {
    if (!repos)
        return []

    const langMap = new Map<string, IRepoTopsLanguages>()

    for (const repo of repos) {
        if (!repo.languages?.edges?.length) continue

        // 本仓库中出现过的语言，用来避免同一仓库多次累计 repoCount
        const seenInThisRepo = new Set<string>()

        for (const edge of repo.languages.edges) {
            if (!edge?.node?.name || typeof edge.size !== 'number') continue

            const key = edge.node.name
            const entry = langMap.get(key) ?? {
                name: key,
                color: edge.node.color,
                size: 0,
                repoCount: 0,
                progress: 0,
            }

            entry.size += edge.size

            if (!seenInThisRepo.has(key)) {
                entry.repoCount += 1
                seenInThisRepo.add(key)
            }

            langMap.set(key, entry)
        }
    }

    const totalSize = [...langMap.values()].reduce((s, l) => s + l.size, 0)

    return [...langMap.values()]
        .sort((a, b) => b.size - a.size)
        .map(l => ({
            ...l,
            progress: Number(((l.size / totalSize) * 100).toFixed(2)),
        }))
}
