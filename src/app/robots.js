export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: 'Yeti',
                allow: '/',
            }
        ],
        sitemap: 'https://www.yeinchurch.kr/sitemap.xml',
    }
}
// Trigger build after Git reconnect
