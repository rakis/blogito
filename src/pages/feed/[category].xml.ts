import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPostsByCategory, getPostMetadata, getPublishedPosts } from '../../utils/posts';
import { CATEGORIES, getCategoryInfo } from '../../content/categories';

export async function getStaticPaths() {
  const allPosts = await getPublishedPosts();
  const foundCategories = new Set<string>();

  Object.keys(CATEGORIES).forEach((c) => foundCategories.add(c.toLowerCase()));
  allPosts.forEach((p) => {
    if (p.data.category) foundCategories.add(p.data.category.toLowerCase());
  });

  return Array.from(foundCategories).map((category) => ({
    params: { category },
    props: { category },
  }));
}

export async function GET(context: APIContext) {
  const category = (context.params.category || '').toLowerCase();
  const categoryInfo = getCategoryInfo(category);
  const posts = await getPostsByCategory(category);
  const site = context.site?.toString() || 'https://blog.victornghe.com';

  return rss({
    title: `${categoryInfo.name} | blogito`,
    description: categoryInfo.description,
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
