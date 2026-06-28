import type { Metadata } from "next";
import { getBlogPosts, getBlogPost, getRelatedPosts } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { RelatedPosts } from "@/components/blog/related-posts";
import { ShareButtons } from "@/components/blog/share-buttons";
import { slugifyCategory } from "@/lib/categories";
import { absoluteUrl } from "@/lib/site";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  const images = post.image ? [{ url: post.image, alt: post.title }] : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: absoluteUrl(url),
      publishedTime: post.date || undefined,
      tags: post.categories,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const related = getRelatedPosts(slug);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="pt-32 pb-20">
      <article className="max-w-3xl mx-auto px-6">
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-primary transition-colors mb-6 inline-block"
            style={{ fontSize: "0.85rem" }}
          >
            &larr; Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {post.categories.map((cat) => (
              <Link key={cat} href={`/blog/category/${slugifyCategory(cat)}`}>
                <Badge variant="outline" className="rounded-full border-primary/30 text-primary hover:bg-primary/10 transition-colors" style={{ fontSize: "0.7rem" }}>
                  {cat}
                </Badge>
              </Link>
            ))}
            <span className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
              {formattedDate}
            </span>
            <span className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
              {post.readTime}
            </span>
          </div>

          <h1
            className="mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.2,
              fontWeight: 500,
            }}
          >
            {post.title}
          </h1>

          <p className="text-muted-foreground mb-8" style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            {post.excerpt}
          </p>
        </div>

        {post.image && (
          <div className="rounded-2xl overflow-hidden border border-border mb-12 aspect-video relative">
            <ImageWithFallback
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-invert prose-primary max-w-none
            [&_p]:text-muted-foreground [&_p]:leading-[1.8] [&_p]:mb-6 [&_p]:text-[0.95rem]
            [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-[1.5rem] [&_h2]:font-medium
            [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[1.2rem]
            [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4
            [&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
            [&_ul]:text-muted-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6
            [&_ol]:text-muted-foreground [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6
            [&_li]:mb-2 [&_li]:text-[0.95rem]
            [&_code]:bg-card [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-primary [&_code]:text-[0.85rem]
            [&_pre]:bg-card [&_pre]:p-6 [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-border [&_pre]:mb-6 [&_pre]:overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 pt-8 border-t border-border">
          <ShareButtons url={absoluteUrl(`/blog/${post.slug}`)} title={post.title} />
        </div>

        <RelatedPosts posts={related} />

        <div className="mt-16 pt-8 border-t border-border text-center">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-primary transition-colors"
            style={{ fontSize: "0.9rem" }}
          >
            &larr; Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}
