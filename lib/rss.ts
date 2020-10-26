import { Post } from 'types/post'
import { baseURL } from 'constants/domain'

const generateRssItem = (post: Post): string => `
<item>
  <guid>${baseURL}/posts/${post.slug}</guid>
  <title>${post.title}</title>
  <link>${baseURL}/posts/${post.slug}</link>
  <description>${post.description}</description>
  <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
  </item>
  `

export const generateRss = (posts: Post[]) => `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>y-temp4's Diary</title>
    <link>${baseURL}</link>
    <description>y-temp4's English Diary.</description>
    <language>en</language>
    <lastBuildDate>${new Date(posts[0].createdAt).toUTCString()}</lastBuildDate>
    <atom:link href="${baseURL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(generateRssItem).join('')}
  </channel>
</rss>
`
