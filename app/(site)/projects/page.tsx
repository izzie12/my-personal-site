import { getProjects } from "@/lib/content";
import { ProjectList } from "@/components/projects/project-list";
import { Badge } from "@/components/ui/badge";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="pt-32 pb-20">
      <section className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary" style={{ fontSize: "0.75rem" }}>Projects</Badge>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15, fontWeight: 500 }} className="mb-4">
            Work that <span className="text-primary italic">matters</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl" style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
            A selection of projects I&rsquo;ve founded, consulted on, or volunteered my time for. Each one represents a step
            towards making technology more accessible and impactful.
          </p>
        </div>

        <ProjectList projects={projects} />
      </section>
    </div>
  );
}
