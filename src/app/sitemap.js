export default function sitemap() {
    const baseUrl = 'https://yeinchurch.org'; // Replace with actual domain
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
