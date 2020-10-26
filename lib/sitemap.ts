import { Post } from 'types/post'
import { baseURL } from 'constants/domain'

const generatePostSitemapItem = (post: Post) => `
<url>
  <loc>${baseURL}/posts/${post.slug}</loc>
  <lastmod>${new Date(post.createdAt).toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
</url>
`

const generateCategorySitemapItem = (category: string) => `
<url>
  <loc>${baseURL}/categories/${category}</loc>
  <changefreq>monthly</changefreq>
</url>
`

export const generateSitemap = (posts: Post[], categories: string[]) => `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseURL}</loc>
    <changefreq>monthly</changefreq>
  </url>
  ${posts.map(generatePostSitemapItem).join('')}
  ${categories.map(generateCategorySitemapItem).join('')}
</urlset>
`
