import {defineConfig} from 'astro/config';

import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://2001kaye.vercel.app', // 실제 배포될 Vercel 도메인
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