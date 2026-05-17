import { getCollectionGroups, products } from "@/data/products";
import { journalPosts } from "@/data/journal";
import { absoluteUrl } from "@/lib/seo";

function createUrlEntry(path, priority, changefreq = "weekly") {
  return `
    <url>
      <loc>${absoluteUrl(path)}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`;
}

function createSitemap() {
  const staticRoutes = [
    createUrlEntry("/", "1.0", "daily"),
    createUrlEntry("/shop", "0.9", "daily"),
    createUrlEntry("/collections", "0.8", "weekly"),
    createUrlEntry("/journal", "0.7", "weekly"),
    createUrlEntry("/returns", "0.5", "monthly"),
  ];

  const collectionRoutes = getCollectionGroups().map((collection) =>
    createUrlEntry(`/collections/${collection.slug}`, "0.8", "weekly"),
  );
  const productRoutes = products.map((product) =>
    createUrlEntry(`/products/${product.slug}`, "0.7", "weekly"),
  );
  const journalRoutes = journalPosts.map((post) =>
    createUrlEntry(`/journal/${post.slug}`, "0.6", "monthly"),
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${[...staticRoutes, ...collectionRoutes, ...productRoutes, ...journalRoutes].join("")}
  </urlset>`;
}

export function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/xml");
  res.write(createSitemap());
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
