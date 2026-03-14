import { getAchievements, getAchievementsByYear } from "@/lib/content";
import { AchievementTimeline } from "@/components/achievements/achievement-timeline";
import { Badge } from "@/components/ui/badge";
import { StatsGrid } from "@/components/achievements/stats-grid";

export default function AchievementsPage() {
  const milestones = getAchievementsByYear();

  return (
    <div className="pt-32 pb-20">
      <section className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary" style={{ fontSize: "0.75rem" }}>Achievements</Badge>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.15, fontWeight: 500 }} className="mb-4">
            Milestones & <span className="text-primary italic">moments</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl" style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
            A timeline of the moments, achievements, and milestones that have shaped my journey.
            Every metric here represents real people impacted.
          </p>
        </div>

        <StatsGrid />

        <AchievementTimeline milestones={milestones} />

        <div className="mt-20 text-center">
          <p className="text-muted-foreground" style={{ fontSize: "1rem", lineHeight: 1.8, fontStyle: "italic" }}>
            &ldquo;The best way to predict the future is to build it &mdash; especially for those who need it most.&rdquo;
          </p>
          <p className="text-primary mt-2" style={{ fontSize: "0.85rem" }}>&mdash; Izzie</p>
        </div>
      </section>
    </div>
  );
}
