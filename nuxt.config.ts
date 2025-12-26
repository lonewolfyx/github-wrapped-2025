import tailwindcss from '@tailwindcss/vite'
import { virtualUserGithubSource } from './plugins/vite-plugin-user-github-source'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        // '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/icon',
        '@vueuse/nuxt',
        'shadcn-nuxt',
    ],

    ssr: false,

    devtools: {
        enabled: true,
    },

    css: [
        '~/assets/css/main.css',
    ],

    runtimeConfig: {
        githubToken: process.env.GITHUB_TOKEN || '',
        public: {
            // Public runtime config for client-side access on local environment only
            githubToken: process.env.NODE_ENV === 'development' ? process.env.GITHUB_TOKEN : '',
        },

    },

    future: {
        compatibilityVersion: 4,
    },

    compatibilityDate: '2025-12-22',

    nitro: {
        storage: {
            cache: {
                driver: 'fs',
                base: process.env.VERCEL ? '/tmp/user_data' : './.cache/user_data',
            },
        },
    },

    vite: {
        plugins: [
            tailwindcss(),
            virtualUserGithubSource(),
        ],
    },

    eslint: {
        config: {
            stylistic: {
                indent: 4, // 4, or 'tab'
                quotes: 'single', // or 'double'
            },
        },
    },

    shadcn: {
        prefix: '',
        componentDir: './app/components/ui',
    },
})
