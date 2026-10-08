import { getCollection, type CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'posts'>;

export interface PostMetadata {
  category: string;
  year: string;
  month: string;
  day: string;
  slug: string;
  url: string;
  formattedDate: string;
  readingTime: string;
}

export function parsePostFilename(id: string, date: Date): { year: string; month: string; day: string; slug: string } {
  // Matches e.g. "tech/2020-05-28-farewell-gatsby" or "2020-05-28-farewell-gatsby.md"
  const match = id.match(/(?:^|\/)(\d{4})-(\d{2})-(\d{2})-(.+?)(?:\.md)?$/);
  if (match) {
    return {
      year: match[1],
      month: match[2],
      day: match[3],
      slug: match[4],
    };
  }

  // Fallback to Date object if filename doesn't follow YYYY-MM-DD-slug
  const d = new Date(date);
  const year = String(d.getUTCFullYear());
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const filename = id.split('/').pop() || id;
  const slug = filename.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9_-]/g, '-');

  return { year, month, day, slug };
}

export function calculateReadingTime(content: string = ''): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function formatDateFromParts(year: string, month: string, day: string): string {
  const monthIdx = parseInt(month, 10) - 1;
  const monthName = MONTH_NAMES[monthIdx] || month;
  const dayNum = parseInt(day, 10);
  return `${monthName} ${dayNum}, ${year}`;
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York',
  });
}

export function getPostMetadata(post: PostEntry): PostMetadata {
  const category = (post.data.category || 'general').toLowerCase();
  const { year, month, day, slug } = parsePostFilename(post.id, post.data.date);
  const url = `/${category}/${year}/${month}/${day}/${slug}`;
  const formattedDate = formatDateFromParts(year, month, day);
  const readingTime = calculateReadingTime(post.body || '');

  return {
    category,
    year,
    month,
    day,
    slug,
    url,
    formattedDate,
    readingTime,
  };
}

export async function getPublishedPosts(): Promise<PostEntry[]> {
  const allPosts = await getCollection('posts');
  return allPosts
    .filter((post) => {
      // In production, exclude drafts
      if (!import.meta.env.DEV && post.data.draft) {
        return false;
      }
      return true;
    })
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}

export async function getPostsByCategory(categorySlug: string): Promise<PostEntry[]> {
  const posts = await getPublishedPosts();
  const normalized = categorySlug.toLowerCase();
  return posts.filter((post) => post.data.category.toLowerCase() === normalized);
}

export async function getCategoryPostCounts(): Promise<Record<string, number>> {
  const posts = await getPublishedPosts();
  const counts: Record<string, number> = {};
  for (const post of posts) {
    const cat = post.data.category.toLowerCase();
    counts[cat] = (counts[cat] || 0) + 1;
  }
  return counts;
}
