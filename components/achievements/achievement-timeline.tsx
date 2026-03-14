"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import type { AchievementGroup } from "@/lib/content";

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

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    Award: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Speaking: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Product: "bg-green-500/10 text-green-400 border-green-500/20",
    "Open Source": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Community: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    Impact: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Founding: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Volunteer: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    Life: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    Career: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  };
  return colors[type] || "bg-primary/10 text-primary border-primary/20";
}

export function AchievementTimeline({ milestones }: { milestones: AchievementGroup[] }) {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

      {milestones.map((milestone) => (
        <div key={milestone.year} className="mb-16 last:mb-0">
          <AnimatedSection>
            <div className="relative flex items-center mb-8">
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />
              <div className="ml-12 md:ml-0 md:w-full md:text-center">
                <span
                  className="inline-block bg-primary text-primary-foreground px-4 py-1.5 rounded-full"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600 }}
                >
                  {milestone.year}
                </span>
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {milestone.items.map((item, itemIndex) => {
              const isEven = itemIndex % 2 === 0;
              return (
                <AnimatedSection key={item.slug} delay={itemIndex * 0.08}>
                  <div className={`relative flex items-start gap-0 md:gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-muted-foreground/30 mt-5 z-10" />

                    <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className={`group rounded-xl border border-border bg-card/30 p-6 hover:border-primary/20 transition-all duration-500`}>
                        <div className={`flex items-center gap-2 mb-3 ${isEven ? "md:justify-end" : ""}`}>
                          <Badge variant="outline" className={`rounded-full ${getTypeColor(item.category)}`} style={{ fontSize: "0.65rem" }}>
                            {item.category}
                          </Badge>
                        </div>
                        <div className={isEven ? "md:text-right" : ""}>
                          <h4 className="mb-1.5 group-hover:text-primary transition-colors" style={{ fontSize: "1rem", lineHeight: 1.4 }}>
                            {item.title}
                          </h4>
                          <p className="text-muted-foreground mb-2" style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
                            {item.description}
                          </p>
                          {item.impact && (
                            <p className="text-primary/80" style={{ fontSize: "0.75rem" }}>
                              {item.impact}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
