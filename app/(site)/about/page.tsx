"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { MapPin, Heart, Globe, Coffee, BookOpen, Plane } from "lucide-react";
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
    { icon: <Heart className="w-5 h-5" />, title: "Community First", desc: "Technology only matters if it lifts people up. Every line of code should serve a human need." },
    { icon: <Globe className="w-5 h-5" />, title: "Bridge Builder", desc: "Connecting the brilliant minds in East Africa with global opportunities and resources." },
    { icon: <Coffee className="w-5 h-5" />, title: "Always Learning", desc: "From Rolex stands in Kampala to coffee shops in Shoreditch, every conversation is a lesson." },
    { icon: <BookOpen className="w-5 h-5" />, title: "Open Source", desc: "Knowledge shared is knowledge multiplied. I believe in building in the open." },
  ];

  const places = [
    {
      name: "Uganda",
      role: "Home Country",
      desc: "Born and raised in Kampala. Uganda is where my heart is and where my tech journey began.",
      image: "https://images.unsplash.com/photo-1675756261486-09bd1e0f6c8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLYW1wYWxhJTIwVWdhbmRhJTIwY2l0eXNjYXBlJTIwYWVyaWFsfGVufDF8fHx8MTc3MjkyMjcwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      name: "Kenya",
      role: "Innovation Hub",
      desc: "Nairobi's tech ecosystem is electric. I work closely with startups and the vibrant developer community there.",
      image: "https://images.unsplash.com/photo-1768489038219-553695bd4169?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOYWlyb2JpJTIwS2VueWElMjBtb2Rlcm4lMjBjaXR5fGVufDF8fHx8MTc3MjkyMjcwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      name: "United Kingdom",
      role: "Current Base",
      desc: "London is where I call home now. The diversity and global perspective here fuel everything I do.",
      image: "https://images.unsplash.com/photo-1624643449508-a424b08861c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb25kb24lMjBza3lsaW5lJTIwbW9kZXJufGVufDF8fHx8MTc3MjkyMjcwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
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
              From Kampala&rsquo;s streets to London&rsquo;s <span className="text-primary italic">tech scene</span>
            </h1>
            <div className="space-y-4 text-muted-foreground" style={{ fontSize: "1rem", lineHeight: 1.8 }}>
              <p>
                I&rsquo;m Izzie &mdash; a Ugandan-born, London-based technologist with a deep passion for building things that matter.
                My journey started writing my first lines of code in a small internet cafe in Kampala, where the connection dropped
                every ten minutes but the curiosity never did.
              </p>
              <p>
                Today, I wear many hats: founder, fractional CTO, consultant, and volunteer. But at the core, I&rsquo;m someone who
                believes technology can transform lives &mdash; especially in the communities that need it most. I&rsquo;ve spent the
                last 8+ years building products, leading engineering teams, and helping organisations across East Africa and the UK
                turn ambitious ideas into reality.
              </p>
              <p>
                When I&rsquo;m not coding or in meetings, you&rsquo;ll find me mentoring young developers in Kampala, speaking at tech events
                in Nairobi, or exploring the hiking trails around the Lake District. I&rsquo;m a firm believer that the best ideas come
                from the intersection of different worlds.
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
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary" style={{ fontSize: "0.75rem" }}>
              <Plane className="w-3 h-3 mr-1" /> Where I&rsquo;m Active
            </Badge>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 500 }}>
              Three countries, <span className="text-primary italic">one mission</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {places.map((place, i) => (
            <AnimatedSection key={place.name} delay={i * 0.1}>
              <div className="group rounded-2xl border border-border overflow-hidden bg-card/30 hover:border-primary/20 transition-all duration-500 h-full">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <ImageWithFallback
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-primary text-primary-foreground" style={{ fontSize: "0.7rem" }}>
                      <MapPin className="w-3 h-3 mr-1" /> {place.name}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-primary mb-1" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{place.role}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>{place.desc}</p>
                </div>
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
                { emoji: "☕", label: "Favourite fuel", value: "Ugandan coffee" },
                { emoji: "🏔️", label: "Dream hike", value: "Rwenzori Mountains" },
                { emoji: "📚", label: "Currently reading", value: "Atomic Habits" },
                { emoji: "🎵", label: "Work playlist", value: "Afrobeats & Lo-fi" },
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
