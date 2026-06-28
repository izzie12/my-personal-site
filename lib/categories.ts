// Canonical list of blog categories. Single source of truth for the filter UI.
// Keep in sync with the `categories` select options in public/admin/config.yml.
export const BLOG_CATEGORIES = [
  "Book Reviews",
  "Poetry",
  "Spirituality",
  "Business",
  "Reflections on Life",
  "Africa",
  "Tech",
  "Letters to My Young Siblings",
  "Dear Future Wife",
  "Miscellaneous",
  "Finance",
  "Economics",
  "Christianity",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

// "Reflections on Life" -> "reflections-on-life"
export function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Resolve a URL slug back to its canonical category name, or null if unknown.
export function categoryFromSlug(slug: string): string | null {
  return BLOG_CATEGORIES.find((c) => slugifyCategory(c) === slug) ?? null;
}
