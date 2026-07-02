import {defineConfig} from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://2001kaye.vercel.app', // 실제 배포될 Vercel 도메인
    markdown: {
        shikiConfig: {
            themes: {
                light: 'github-light',
                dark: 'github-dark',
            },
        },
    },
});