"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import type { BlogPost } from "@/lib/content";

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const categories = ["All", "Life", "Tech", "Personal"];

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const featuredPost = posts.find((p) => p.featured);
  const otherPosts = activeCategory === "All"
    ? posts.filter((p) => !p.featured)
    : posts.filter((p) => !p.featured && p.category === activeCategory);

  return (
    <>
      {featuredPost && (
        <AnimatedSection className="mb-16">
          <Link href={`/blog/${featuredPost.slug}`}>
            <div className="group rounded-2xl border border-border overflow-hidden bg-card/30 hover:border-primary/20 transition-all duration-500 cursor-pointer">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto overflow-hidden relative">
                  <ImageWithFallback
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground" style={{ fontSize: "0.7rem" }}>Featured</Badge>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="rounded-full border-primary/30 text-primary" style={{ fontSize: "0.7rem" }}>
                      <Tag className="w-3 h-3 mr-1" /> {featuredPost.category}
                    </Badge>
                    <span className="text-muted-foreground flex items-center gap-1" style={{ fontSize: "0.75rem" }}>
                      <Calendar className="w-3 h-3" /> {formatDate(featuredPost.date)}
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1" style={{ fontSize: "0.75rem" }}>
                      <Clock className="w-3 h-3" /> {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="mb-4 group-hover:text-primary transition-colors" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", lineHeight: 1.3 }}>
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6" style={{ fontSize: "0.95rem", lineHeight: 1.8 }}>
                    {featuredPost.excerpt}
                  </p>
                  <div>
                    <Button variant="outline" className="rounded-full gap-2 border-border hover:border-primary/50 hover:text-primary" style={{ fontSize: "0.85rem" }}>
                      Read More <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </AnimatedSection>
      )}

      <Separator className="mb-12" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex gap-2 mb-12 flex-wrap"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full border transition-all duration-300 ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
            }`}
            style={{ fontSize: "0.85rem" }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherPosts.map((post, i) => (
          <AnimatedSection key={post.slug} delay={i * 0.1}>
            <Link href={`/blog/${post.slug}`}>
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
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline" className="rounded-full border-primary/30 text-primary" style={{ fontSize: "0.65rem" }}>
                      {post.category}
                    </Badge>
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
          </AnimatedSection>
        ))}
      </div>

      {otherPosts.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p style={{ fontSize: "1rem" }}>No posts in this category yet. Check back soon!</p>
        </div>
      )}
    </>
  );
}
