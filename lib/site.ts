// Canonical absolute base URL for the site. Used by metadata, feeds, sitemap,
// canonical links and share buttons. Set NEXT_PUBLIC_SITE_URL in the host env
// to the real domain; the fallback is the Netlify preview URL.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://izzie-personal-site.netlify.app"
).replace(/\/$/, "");

export const SITE_NAME = "Izzie";
export const SITE_AUTHOR = "Isaac Ntegeka";
export const SITE_DESCRIPTION =
  "London-based founder and full-stack developer. Writing about life, technology, identity, and everything in between.";

// Build an absolute URL from a site-relative path.
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
