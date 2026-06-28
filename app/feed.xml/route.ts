import { buildFeed } from "@/lib/feed";

export const dynamic = "force-static";

export async function GET() {
  const feed = await buildFeed();
  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
