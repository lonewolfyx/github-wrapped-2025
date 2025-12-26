import { ofetch } from 'ofetch'

export const useFetchGithubData = async (user: string, query: string, variables: object) => {
    const config = useRuntimeConfig()

    try {
        const { data } = await ofetch('https://api.github.com/graphql', {
            method: 'post',
            body: JSON.stringify({
                query: `${query}`,
                variables,
            }),
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'SixNineNine',
                'Authorization': `Bearer ${config.githubToken || config.public.githubToken}`,
            },
            timeout: 10000,
        })

        return data.user || data.search || {}
    }
    catch (error) {
        console.error(error)
    }
}
