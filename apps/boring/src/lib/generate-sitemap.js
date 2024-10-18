import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://joachimhodana.com';
const routes = ['/'];

const definePriority = (route) => {
    const lowestPriorityRoutes = ['/blog'];

    if (lowestPriorityRoutes.includes(route)) {
        return 0.5;
    }

    if (route === '/') {
        return 1.0;
    } else {
        return 0.8;
    }
};

const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1">
    ${routes
            .map(route => {
                return `
        <url>
            <loc>${BASE_URL}${route}</loc>
            <changefreq>weekly</changefreq>
            <priority>${definePriority(route)}</priority>
        </url>
        `;
            })
            .join('')}
</urlset>`;

    const sitemapPath = path.join('public', 'sitemap.xml');

    fs.writeFileSync(sitemapPath, sitemap.trim());
    console.log('Sitemap generated at:', sitemapPath);
};

generateSitemap();