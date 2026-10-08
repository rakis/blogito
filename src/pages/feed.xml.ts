import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, getPostMetadata } from '../utils/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  const site = context.site?.toString() || 'https://blog.victornghe.com';

  return rss({
    title: 'blogito',
    description: 'Thoughts and other things by Victor Nghe.',
    site,
    items: posts.map((post) => {
      const meta = getPostMetadata(post);
      return {
        title: post.data.title,
        pubDate: new Date(post.data.date),
        description: post.data.excerpt || '',
        link: meta.url,
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
