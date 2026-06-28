import Link from "next/link";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import type { BlogPost } from "@/lib/content";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="mb-8" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>
        Related reading
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {post.categories.slice(0, 2).map((cat) => (
                    <Badge key={cat} variant="outline" className="rounded-full border-primary/30 text-primary" style={{ fontSize: "0.6rem" }}>
                      {cat}
                    </Badge>
                  ))}
                </div>
                <h3 className="mb-2 group-hover:text-primary transition-colors" style={{ fontSize: "1rem", lineHeight: 1.4 }}>
                  {post.title}
                </h3>
                <div className="mt-auto pt-3 flex items-center gap-3 text-muted-foreground" style={{ fontSize: "0.7rem" }}>
                  <span>{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
