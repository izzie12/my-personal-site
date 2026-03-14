"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/blog", label: "Blog" },
  { path: "/achievements", label: "Achievements" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 600 }}>I</span>
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 600 }}>Izzie</span>
            </div>
            <p className="text-muted-foreground" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>
              Founder, Fractional CTO & Consultant based in the UK.
              Building bridges between East African innovation and global technology.
            </p>
          </div>
          <div>
            <h4 className="text-foreground mb-4" style={{ fontSize: "0.875rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Navigate</h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path} className="text-muted-foreground hover:text-primary transition-colors" style={{ fontSize: "0.875rem" }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-foreground mb-4" style={{ fontSize: "0.875rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:hello@izzie.dev" className="text-muted-foreground hover:text-primary transition-colors" style={{ fontSize: "0.875rem" }}>hello@izzie.dev</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" style={{ fontSize: "0.875rem" }}>GitHub</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" style={{ fontSize: "0.875rem" }}>LinkedIn</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" style={{ fontSize: "0.875rem" }}>Twitter / X</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
            &copy; 2026 Izzie. Built with love from Kampala to London.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            style={{ fontSize: "0.8rem" }}
          >
            Back to top <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
