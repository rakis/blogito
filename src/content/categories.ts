export interface CategoryInfo {
  slug: string;
  name: string;
  description: string;
}

export const CATEGORIES: Record<string, CategoryInfo> = {
  cogito: {
    slug: 'cogito',
    name: 'Cogito',
    description: 'Collection of thoughts, and other things.',
  },
  recipes: {
    slug: 'recipes',
    name: 'Recipes',
    description: 'Personal recipes, recorded for posterity.',
  },
  tech: {
    slug: 'tech',
    name: 'Tech',
    description: 'Slightly technical, slightly editorial.',
  },
};

export function getCategoryInfo(slug: string): CategoryInfo {
  const normalized = slug.toLowerCase();
  return (
    CATEGORIES[normalized] || {
      slug: normalized,
      name: normalized.charAt(0).toUpperCase() + normalized.slice(1),
      description: `Posts categorized under ${normalized}.`,
    }
  );
}
