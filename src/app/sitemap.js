export default function sitemap() {
    const baseUrl = 'https://www.yeinchurch.kr'; // 실제 도메인으로 업데이트
    const routes = [
        '',
        '/about',
        '/about/history',
        '/about/pastor',
        '/about/worship',
        '/about/location',
        '/faith',
        '/faith/sermons',
        '/departments',
        '/branches',
        '/gallery',
        '/counseling',
        '/welcome',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
