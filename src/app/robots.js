export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/gallery/'],
            },
            {
                userAgent: 'Yeti',
                allow: '/',
                disallow: ['/gallery/'],
            },
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'CCBot', 'Anthropic-ai', 'Omgilibot', 'Omgili', 'FacebookBot'],
                disallow: ['/'],
            }
        ],
        sitemap: 'https://www.yeinchurch.kr/sitemap.xml',
    }
}
// Trigger build after Git reconnect
// Final build trigger after confirmed Git connection (TS: 15:46)
