"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Code2, Users, Rocket, Heart, Globe, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import type { Project } from "@/lib/content";

const PROJECT_COLORS = ["#e8c872", "#72c8e8", "#e872a8", "#72e8a8", "#a872e8"];

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

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="outline" className="mb-6 border-primary/30 text-primary px-4 py-1.5" style={{ fontSize: "0.8rem" }}>
                <MapPin className="w-3 h-3 mr-1.5" /> London, UK
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1, fontWeight: 500 }}
            >
              Building the{" "}
              <span className="text-primary italic">future</span>,<br />
              one project at a time.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground mb-8 max-w-lg"
              style={{ fontSize: "1.1rem", lineHeight: 1.8 }}
            >
              I&rsquo;m <span className="text-foreground">Izzie</span> &mdash; a founder, fractional CTO, and consultant
              who bridges the gap between East African innovation and the global tech ecosystem.
              Originally from Uganda, now based in London.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/projects">
                <Button className="rounded-full px-6 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  View My Work <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="rounded-full px-6 border-border hover:border-primary/50 hover:text-primary">
                  About Me
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-8 mt-12"
            >
              {[
                { num: "15+", label: "Projects Shipped" },
                { num: "8+", label: "Years Experience" },
                { num: "3", label: "Countries Active" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-primary" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 600 }}>{stat.num}</div>
                  <div className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border border-border aspect-[4/5]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb2RpbmclMjB3b3Jrc3BhY2UlMjBkYXJrfGVufDF8fHx8MTc3MjgxNTI0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Developer workspace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem" }} className="text-muted-foreground">Active in</div>
                    <div style={{ fontSize: "0.875rem" }}>Uganda, Kenya, Rwanda</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem" }} className="text-muted-foreground">Volunteer Work</div>
                    <div style={{ fontSize: "0.875rem" }}>Tech for Good</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhatIDoSection() {
  const roles = [
    {
      id: 1,
      icon: <Rocket className="w-5 h-5" />,
      title: "Founder",
      subtitle: "Building from zero to one",
      desc: "Building products that solve real problems for communities across East Africa and beyond. From concept to scale, I've founded multiple tech companies that serve thousands.",
      highlights: ["MamaFund — 12,000+ users", "NilePay SDK — 45+ startups", "AfyaConnect — 5,000+ consultations"],
      color: "#e8c872",
    },
    {
      id: 2,
      icon: <Code2 className="w-5 h-5" />,
      title: "Fractional CTO",
      subtitle: "Technical leadership, on demand",
      desc: "Helping startups and scaleups build world-class engineering teams and technical strategies without the full-time commitment. I embed with your team and ship.",
      highlights: ["Architecture & tech strategy", "Team building & hiring", "Scaling from MVP to production"],
      color: "#72c8e8",
    },
    {
      id: 3,
      icon: <Users className="w-5 h-5" />,
      title: "Consultant",
      subtitle: "Strategy meets execution",
      desc: "Advising organisations on digital transformation, tech architecture, and engineering culture that ships. From Fortune 500s to early-stage startups.",
      highlights: ["Digital transformation", "Engineering culture design", "Technical due diligence"],
      color: "#a872e8",
    },
    {
      id: 4,
      icon: <Heart className="w-5 h-5" />,
      title: "Volunteer",
      subtitle: "Tech for good, always",
      desc: "Helping NGOs and community organisations set up tech projects. Because technology should be accessible to everyone, especially those who need it most.",
      highlights: ["Kampala Dev Hub — 3,000+ devs", "Tugende Agri — 6,000+ farmers", "RwandaTech Pipeline — 800+ placed"],
      color: "#e872a8",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const TAB_HEIGHT = 52;
  const CARD_BODY_HEIGHT = 260;

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary" style={{ fontSize: "0.75rem" }}>What I Do</Badge>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 500, lineHeight: 1.2 }}>
              Wearing many hats, <span className="text-primary italic">one mission</span>
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div
            className="relative mx-auto"
            style={{ height: `${roles.length * TAB_HEIGHT + CARD_BODY_HEIGHT}px`, maxWidth: 640 }}
          >
            {roles.map((role, i) => {
              const isActive = i === activeIndex;
              const isBehind = i < activeIndex;
              const topPos = isBehind
                ? i * TAB_HEIGHT
                : isActive
                ? i * TAB_HEIGHT
                : activeIndex * TAB_HEIGHT + CARD_BODY_HEIGHT + (i - activeIndex) * TAB_HEIGHT;

              return (
                <motion.div
                  key={role.id}
                  className="absolute left-0 right-0 rounded-2xl border bg-card overflow-hidden"
                  style={{
                    zIndex: isActive ? 10 : isBehind ? i : 5 + i,
                    borderColor: isActive ? `${role.color}40` : "var(--border)",
                  }}
                  animate={{
                    top: topPos,
                    boxShadow: isActive
                      ? `0 8px 40px -12px ${role.color}25`
                      : "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                >
                  <button
                    onClick={() => setActiveIndex(i)}
                    className="w-full flex items-center gap-4 px-6 cursor-pointer transition-colors"
                    style={{ height: TAB_HEIGHT }}
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0 transition-transform duration-300"
                      style={{
                        backgroundColor: role.color,
                        transform: isActive ? "scale(1.8)" : "scale(1)",
                      }}
                    />
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? `${role.color}20` : `${role.color}0a`,
                        color: role.color,
                      }}
                    >
                      {role.icon}
                    </div>
                    <span
                      className="transition-colors duration-300"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: isActive ? "1.1rem" : "0.92rem",
                        color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                      }}
                    >
                      {role.title}
                    </span>
                    <span
                      className="ml-auto text-muted-foreground hidden sm:block transition-opacity duration-300"
                      style={{ fontSize: "0.75rem", opacity: isActive ? 1 : 0.4 }}
                    >
                      {role.subtitle}
                    </span>
                  </button>

                  <motion.div
                    animate={{
                      height: isActive ? CARD_BODY_HEIGHT : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-8 pt-2">
                      <div
                        className="h-px w-full mb-6"
                        style={{ background: `linear-gradient(90deg, ${role.color}40, transparent)` }}
                      />
                      <p className="text-muted-foreground mb-6" style={{ fontSize: "0.92rem", lineHeight: 1.75 }}>
                        {role.desc}
                      </p>
                      <div>
                        <p className="text-muted-foreground mb-3" style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          Key highlights
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {role.highlights.map((h) => (
                            <span
                              key={h}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card/80"
                              style={{ fontSize: "0.78rem" }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: role.color }} />
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function FeaturedProjectsSection({ projects }: { projects: Project[] }) {
  const coloredProjects = projects.slice(0, 5).map((p, i) => ({
    ...p,
    color: PROJECT_COLORS[i % PROJECT_COLORS.length],
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const TAB_HEIGHT = 56;
  const CARD_BODY_HEIGHT = 340;

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-transparent to-card/30" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
            <div>
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary" style={{ fontSize: "0.75rem" }}>Featured Work</Badge>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 500, lineHeight: 1.2 }}>
                Selected <span className="text-primary italic">projects</span>
              </h2>
            </div>
            <Link href="/projects">
              <Button variant="outline" className="rounded-full gap-2 border-border hover:border-primary/50 hover:text-primary">
                View All Projects <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div
            className="relative mx-auto"
            style={{ height: `${coloredProjects.length * TAB_HEIGHT + CARD_BODY_HEIGHT}px`, maxWidth: 680 }}
          >
            {coloredProjects.map((project, i) => {
              const isActive = i === activeIndex;
              const isBehind = i < activeIndex;
              const topPos = isBehind
                ? i * TAB_HEIGHT
                : isActive
                ? i * TAB_HEIGHT
                : activeIndex * TAB_HEIGHT + CARD_BODY_HEIGHT + (i - activeIndex) * TAB_HEIGHT;

              return (
                <motion.div
                  key={project.slug}
                  className="absolute left-0 right-0 rounded-2xl border bg-card overflow-hidden"
                  style={{
                    zIndex: isActive ? 10 : isBehind ? i : 5 + i,
                    borderColor: isActive ? `${project.color}40` : "var(--border)",
                  }}
                  animate={{
                    top: topPos,
                    boxShadow: isActive
                      ? `0 8px 40px -12px ${project.color}25`
                      : "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                >
                  <button
                    onClick={() => setActiveIndex(i)}
                    className="w-full flex items-center gap-4 px-6 cursor-pointer transition-colors"
                    style={{ height: TAB_HEIGHT }}
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0 transition-transform duration-300"
                      style={{
                        backgroundColor: project.color,
                        transform: isActive ? "scale(1.8)" : "scale(1)",
                      }}
                    />
                    <span
                      className="transition-colors duration-300"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: isActive ? "1.1rem" : "0.92rem",
                        color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                      }}
                    >
                      {project.title}
                    </span>
                    <span
                      className="text-muted-foreground hidden sm:block transition-opacity duration-300"
                      style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em", opacity: isActive ? 1 : 0.4 }}
                    >
                      {project.type}
                    </span>
                    <span className="ml-auto text-muted-foreground" style={{ fontSize: "0.75rem", opacity: isActive ? 1 : 0.4 }}>
                      {project.year}
                    </span>
                  </button>

                  <motion.div
                    animate={{
                      height: isActive ? CARD_BODY_HEIGHT : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="rounded-xl overflow-hidden mb-5 aspect-[16/7] relative">
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <Badge className="rounded-full border-0" style={{ backgroundColor: `${project.color}25`, color: project.color, fontSize: "0.7rem" }}>
                            {project.type}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4" style={{ fontSize: "0.9rem", lineHeight: 1.75 }}>
                        {project.desc}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card/80"
                            style={{ fontSize: "0.75rem" }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: project.color }} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/projects">
              <Button variant="outline" className="rounded-full gap-2 border-border hover:border-primary/50 hover:text-primary" style={{ fontSize: "0.85rem" }}>
                <ExternalLink className="w-3.5 h-3.5" /> See Full Project Details
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <AnimatedSection>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 500, lineHeight: 1.3 }} className="mb-6">
            Let&rsquo;s build something <span className="text-primary italic">meaningful</span> together
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto" style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
            Whether you&rsquo;re a startup looking for technical leadership, an organisation that needs help setting up a tech project,
            or you just want to chat about the East African tech ecosystem &mdash; I&rsquo;d love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:hello@izzie.dev">
              <Button className="rounded-full px-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <Link href="/blog">
              <Button variant="outline" className="rounded-full px-8 border-border hover:border-primary/50 hover:text-primary">
                Read My Blog
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export function HomeContent({ projects }: { projects: Project[] }) {
  return (
    <>
      <HeroSection />
      <WhatIDoSection />
      <FeaturedProjectsSection projects={projects} />
      <CTASection />
    </>
  );
}
