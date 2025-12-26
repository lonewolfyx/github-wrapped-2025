import { ofetch } from 'ofetch'

export const fetchGithubData = async (user: string, query: string, variables: object) => {
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
                'Authorization': `Bearer ${process.env.GITHUB_API_TOKEN}`,
            },
            timeout: 10000,
        })

        return data.user || data.search || {}
    }
    catch (error) {
        console.error(error)
    }
}
