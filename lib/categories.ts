// Canonical list of blog categories. Single source of truth for the filter UI.
// Keep in sync with the `categories` select options in public/admin/config.yml.
export const BLOG_CATEGORIES = [
  "Book Reviews",
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
