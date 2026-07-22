import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>dreamnb</title>
    <description>dreamnb 的个人博客</description>
    <link>https://dreamnb.com</link>
    <atom:link href="https://dreamnb.com/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.map(post => `
    <item>
      <title>${post.data.title}</title>
      <description>${post.data.description}</description>
      <link>https://dreamnb.com/blog/${post.slug}</link>
      <guid>https://dreamnb.com/blog/${post.slug}</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}