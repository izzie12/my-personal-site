import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/content";
import { BLOG_CATEGORIES, slugifyCategory } from "@/lib/categories";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts();

  const staticPages = ["/", "/about", "/projects", "/blog", "/achievements"].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const postPages = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.date || undefined,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const categoryPages = BLOG_CATEGORIES.map((cat) => ({
    url: absoluteUrl(`/blog/category/${slugifyCategory(cat)}`),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...postPages, ...categoryPages];
}
