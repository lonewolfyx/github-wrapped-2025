import type { Plugin } from 'vite'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const ID = 'virtual:user-github-source'
const VIRTUAL_ID = '\0' + ID

export const virtualUserGithubSource = (): Plugin => {
    return {
        name: 'vite-plugin-user-github-source',
        resolveId(id) {
            return id === ID ? VIRTUAL_ID : null
        },
        async load(id) {
            if (id !== VIRTUAL_ID) return

            const data = JSON.parse(await readFile(resolve(process.cwd(), './lonewolfyx.json'), 'utf-8'))
            return `export default ${JSON.stringify(data)}`
        },
    }
}
