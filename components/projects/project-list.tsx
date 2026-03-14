"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import type { Project } from "@/lib/content";

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

export function ProjectList({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12"
      >
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="bg-card border border-border rounded-full p-1 h-auto">
            <TabsTrigger value="all" className="rounded-full px-5 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" style={{ fontSize: "0.85rem" }}>All</TabsTrigger>
            <TabsTrigger value="founder" className="rounded-full px-5 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" style={{ fontSize: "0.85rem" }}>Founded</TabsTrigger>
            <TabsTrigger value="consulting" className="rounded-full px-5 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" style={{ fontSize: "0.85rem" }}>Consulting</TabsTrigger>
            <TabsTrigger value="volunteer" className="rounded-full px-5 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" style={{ fontSize: "0.85rem" }}>Volunteer</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      <div className="space-y-8">
        {filtered.map((project, i) => (
          <AnimatedSection key={project.slug} delay={i * 0.1}>
            <div className="group rounded-2xl border border-border bg-card/30 hover:border-primary/20 transition-all duration-500 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                <div className="lg:col-span-2 aspect-video lg:aspect-auto overflow-hidden relative">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent lg:hidden" />
                </div>
                <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-primary/10 text-primary border-0 rounded-full" style={{ fontSize: "0.7rem" }}>
                      {project.type}
                    </Badge>
                    <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>{project.year}</span>
                    <Badge variant={project.status === "Open Source" ? "outline" : "secondary"} className="rounded-full" style={{ fontSize: "0.7rem" }}>
                      {project.status}
                    </Badge>
                  </div>
                  <h3 className="mb-3 group-hover:text-primary transition-colors" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-2" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>{project.desc}</p>
                  <p className="text-muted-foreground/70 mb-5" style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>{project.longDesc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full" style={{ fontSize: "0.7rem" }}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="rounded-full gap-2 border-border hover:border-primary/50 hover:text-primary" style={{ fontSize: "0.8rem" }}>
                      <ExternalLink className="w-3.5 h-3.5" /> View Project
                    </Button>
                    {project.status === "Open Source" && (
                      <Button variant="ghost" size="sm" className="rounded-full gap-2 hover:text-primary" style={{ fontSize: "0.8rem" }}>
                        <Github className="w-3.5 h-3.5" /> Source Code
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection className="mt-20">
        <div className="rounded-2xl border border-border bg-card/50 p-8 md:p-12 text-center">
          <h3 className="mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>
            Have a project in mind?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
            Whether it&rsquo;s a startup that needs a CTO, an NGO that needs technical guidance, or an open-source idea
            worth building &mdash; let&rsquo;s talk.
          </p>
          <a href="mailto:hello@izzie.dev">
            <Button className="rounded-full px-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Let&rsquo;s Collaborate <ArrowUpRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </AnimatedSection>
    </>
  );
}
