import { Feed } from "feed";
import { getBlogPosts, getBlogPost } from "@/lib/content";
import { SITE_URL, SITE_NAME, SITE_AUTHOR, SITE_DESCRIPTION, absoluteUrl } from "@/lib/site";

// Builds a populated Feed instance with full post content. Each route handler
// serializes it to a different format (RSS 2.0 / Atom / JSON Feed).
export async function buildFeed(): Promise<Feed> {
  const posts = getBlogPosts();

  const feed = new Feed({
    title: `${SITE_NAME} — Blog`,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: "en",
    favicon: absoluteUrl("/favicon.ico"),
    copyright: `All rights reserved ${SITE_AUTHOR}`,
    feedLinks: {
      rss: absoluteUrl("/feed.xml"),
      atom: absoluteUrl("/atom.xml"),
      json: absoluteUrl("/feed.json"),
    },
    author: { name: SITE_AUTHOR, link: SITE_URL },
  });

  const full = await Promise.all(posts.map((p) => getBlogPost(p.slug)));

  for (const post of full) {
    if (!post) continue;
    const url = absoluteUrl(`/blog/${post.slug}`);
    // Feed enclosures require absolute URLs; local uploads are site-relative.
    const image = post.image
      ? post.image.startsWith("http")
        ? post.image
        : absoluteUrl(post.image)
      : undefined;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: post.content,
      author: [{ name: SITE_AUTHOR, link: SITE_URL }],
      date: post.date ? new Date(post.date) : new Date(0),
      image,
      category: post.categories.map((name) => ({ name })),
    });
  }

  return feed;
}
