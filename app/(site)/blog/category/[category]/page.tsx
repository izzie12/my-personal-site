import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { getBlogPosts } from "@/lib/content";
import { BLOG_CATEGORIES, slugifyCategory, categoryFromSlug } from "@/lib/categories";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ category: slugifyCategory(c) }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const name = categoryFromSlug(category);
  if (!name) return {};
  const title = `${name} — Blog`;
  const description = `Posts on ${name} by Isaac Ntegeka.`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/category/${category}` },
    openGraph: { title, description, url: `/blog/category/${category}` },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const name = categoryFromSlug(category);
  if (!name) notFound();

  const posts = getBlogPosts().filter((p) => p.categories.includes(name));

  return (
    <div className="pt-32 pb-20">
      <section className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors mb-6 inline-block" style={{ fontSize: "0.85rem" }}>
            &larr; All posts
          </Link>
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary" style={{ fontSize: "0.75rem" }}>Category</Badge>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15, fontWeight: 500 }} className="mb-4">
            {name}
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: "1.05rem" }}>
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p style={{ fontSize: "1rem" }}>No posts in this category yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="group rounded-2xl border border-border bg-card/30 hover:border-primary/20 transition-all duration-500 overflow-hidden cursor-pointer h-full flex flex-col">
                  <div className="aspect-video overflow-hidden relative">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      {post.categories.map((cat) => (
                        <Badge key={cat} variant="outline" className="rounded-full border-primary/30 text-primary" style={{ fontSize: "0.65rem" }}>
                          {cat}
                        </Badge>
                      ))}
                      <span className="text-muted-foreground" style={{ fontSize: "0.7rem" }}>{formatDate(post.date)}</span>
                    </div>
                    <h3 className="mb-3 group-hover:text-primary transition-colors" style={{ fontSize: "1.1rem", lineHeight: 1.4 }}>
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground flex-1" style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
