"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Heart, Coffee, BookOpen, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

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

export default function AboutPage() {
  const values = [
    { icon: <Heart className="w-5 h-5" />, title: "Ship What Matters", desc: "No office politics, no long discovery phases. I take a brief, ask the right questions, and build." },
    { icon: <Code2 className="w-5 h-5" />, title: "Founder Thinking", desc: "I bring founder-level thinking to every client project. I care about whether what I build actually works in the real world." },
    { icon: <Coffee className="w-5 h-5" />, title: "Always Learning", desc: "Every project is a chance to sharpen the craft. I stay close to the tools and the work." },
    { icon: <BookOpen className="w-5 h-5" />, title: "Open Source", desc: "Knowledge shared is knowledge multiplied. I believe in building in the open." },
  ];

  return (
    <div className="pt-32 pb-20">
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary" style={{ fontSize: "0.75rem" }}>About Me</Badge>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15, fontWeight: 500 }} className="mb-6">
              I build things that <span className="text-primary italic">work</span>
            </h1>
            <div className="space-y-4 text-muted-foreground" style={{ fontSize: "1rem", lineHeight: 1.8 }}>
              <p>
                I&rsquo;m Izzie &mdash; a London-based founder and full-stack developer specialising in Next.js, React, and Tailwind CSS.
                My portfolio spans SaaS products, fintech platforms, charity systems, investor portals, and consumer apps &mdash;
                built for clients in the UK and beyond.
              </p>
              <p>
                I don&rsquo;t do office politics, long discovery phases, or six-meeting sprints to align on a button colour.
                I take a brief, ask the right questions, and build. 8+ years of shipping products, leading engineering teams,
                and turning ambitious ideas into reality.
              </p>
              <p>
                Freelancing is deliberate for me. I&rsquo;m building my own products on the side, which means I bring
                founder-level thinking to every client project. I care about whether what I&rsquo;m building actually works
                in the real world. Available for project-based work &mdash; I&rsquo;ll scope it honestly, deliver on time,
                and leave you with something you&rsquo;re proud to put your name on.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 via-transparent to-primary/10 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden border border-border aspect-square">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1634936016780-65f6a77ebdd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdGVjaCUyMGNvbmZlcmVuY2UlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NzI5MjI3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Izzie at a tech conference"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <Separator className="max-w-6xl mx-auto" />

      <section className="max-w-6xl mx-auto px-6 py-24">
        <AnimatedSection>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary" style={{ fontSize: "0.75rem" }}>My Values</Badge>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 500 }}>
              What <span className="text-primary italic">drives</span> me
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <AnimatedSection key={value.title} delay={i * 0.1}>
              <div className="text-center p-6 rounded-2xl border border-border bg-card/30 hover:border-primary/20 transition-all duration-500 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="mb-2" style={{ fontSize: "1.05rem" }}>{value.title}</h3>
                <p className="text-muted-foreground" style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>{value.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <AnimatedSection>
          <div className="rounded-2xl border border-border bg-card/50 p-8 md:p-12">
            <h3 className="mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>
              Quick <span className="text-primary italic">facts</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { emoji: "☕", label: "Favourite fuel", value: "Strong coffee" },
                { emoji: "💻", label: "Main stack", value: "Next.js & Tailwind" },
                { emoji: "📚", label: "Currently reading", value: "Atomic Habits" },
                { emoji: "🎵", label: "Work playlist", value: "Lo-fi beats" },
              ].map((fact) => (
                <div key={fact.label} className="text-center">
                  <div style={{ fontSize: "2rem" }} className="mb-2">{fact.emoji}</div>
                  <div className="text-muted-foreground mb-1" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{fact.label}</div>
                  <div style={{ fontSize: "0.9rem" }}>{fact.value}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
