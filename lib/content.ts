import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

// --- Types ---

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  draft: boolean;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  type: string;
  desc: string;
  longDesc: string;
  image: string;
  tags: string[];
  year: string;
  status: string;
  order: number;
  link?: string;
}

export interface Achievement {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: string;
  impact: string;
  order: number;
}

export interface AchievementGroup {
  year: string;
  items: Achievement[];
}

// --- Helpers ---

function readMarkdownFiles(dir: string) {
  const fullPath = path.join(contentDirectory, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath).filter((f) => f.endsWith(".md"));
}

// Accepts the new `categories` array or a legacy single `category` string.
function normalizeCategories(data: Record<string, unknown>): string[] {
  const { categories, category } = data;
  if (Array.isArray(categories)) return categories.filter(Boolean) as string[];
  if (typeof category === "string" && category) return [category];
  return [];
}

// --- Blog ---

export function getBlogPosts(): BlogPost[] {
  const files = readMarkdownFiles("blog");

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(contentDirectory, "blog", filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      categories: normalizeCategories(data),
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
      readTime: data.readTime ?? "",
      image: data.image ?? "",
      featured: data.featured ?? false,
      draft: data.draft ?? false,
      content: "",
    };
  });

  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(contentDirectory, "blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title ?? "",
    excerpt: data.excerpt ?? "",
    categories: normalizeCategories(data),
    date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
    readTime: data.readTime ?? "",
    image: data.image ?? "",
    featured: data.featured ?? false,
    draft: data.draft ?? false,
    content: contentHtml,
  };
}

// Posts sharing at least one category with the given post, ranked by number of
// shared categories then recency. Excludes the post itself and drafts.
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const posts = getBlogPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];

  const currentCats = new Set(current.categories);

  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      overlap: p.categories.filter((c) => currentCats.has(c)).length,
    }))
    .filter((x) => x.overlap > 0)
    .sort((a, b) =>
      b.overlap !== a.overlap
        ? b.overlap - a.overlap
        : a.post.date > b.post.date
          ? -1
          : 1
    )
    .slice(0, limit)
    .map((x) => x.post);
}

// --- Projects ---

export function getProjects(): Project[] {
  const files = readMarkdownFiles("projects");

  const projects = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(contentDirectory, "projects", filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title ?? "",
      category: data.category ?? "",
      type: data.type ?? "",
      desc: data.desc ?? "",
      longDesc: data.longDesc ?? "",
      image: data.image ?? "",
      tags: data.tags ?? [],
      year: data.year ?? "",
      status: data.status ?? "",
      order: data.order ?? 99,
      link: data.link ?? undefined,
    };
  });

  return projects.sort((a, b) => a.order - b.order);
}

// --- Achievements ---

export function getAchievements(): Achievement[] {
  const files = readMarkdownFiles("achievements");

  const achievements = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(contentDirectory, "achievements", filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title ?? "",
      description: data.description ?? "",
      category: data.category ?? "",
      year: data.year ?? "",
      impact: data.impact ?? "",
      order: data.order ?? 99,
    };
  });

  return achievements.sort((a, b) => a.order - b.order);
}

export function getAchievementsByYear(): AchievementGroup[] {
  const achievements = getAchievements();
  const grouped: Record<string, Achievement[]> = {};

  for (const a of achievements) {
    if (!grouped[a.year]) grouped[a.year] = [];
    grouped[a.year].push(a);
  }

  return Object.entries(grouped)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => ({ year, items }));
}
