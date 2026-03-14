import { getProjects } from "@/lib/content";
import { HomeContent } from "@/components/home/home-content";

export default function HomePage() {
  const projects = getProjects();

  return <HomeContent projects={projects} />;
}
