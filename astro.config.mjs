import {defineConfig} from 'astro/config';

import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://jhan117.github.io', // 임시 URL (추후 변경 가능)
    output: 'server',
    adapter: vercel(),
    integrations: [sitemap()],
    markdown: {
        shikiConfig: {
            themes: {
                light: 'github-light',
                dark: 'github-dark',
            },
        },
    },
});