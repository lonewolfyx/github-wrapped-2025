import { getGithubUserData } from '~/lib/github'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

export default defineEventHandler(async (event) => {
    const user = 'lonewolfyx'
    const data = await getGithubUserData(user)
    await writeFile(resolve(process.cwd(), `./${user}.json`), JSON.stringify(data, null, 4))

    return {
        cwd: resolve(process.cwd(), `./${user}.json`),
    }
})
