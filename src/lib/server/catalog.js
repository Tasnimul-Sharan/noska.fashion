import {
  collectionDescriptions,
  products as localProducts,
  slugifyCollection,
} from "@/data/products";
import { getDatabase, hasDatabaseConfig } from "@/lib/server/db";

export const CATALOG_REVALIDATE_SECONDS = 300;

function normalizeJsonArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

function mapProduct(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    collection: row.collection,
    price: Number(row.price),
    oldPrice: Number(row.old_price),
    rating: Number(row.rating),
    reviews: Number(row.reviews),
    badge: row.badge,
    stock: Number(row.stock),
    fit: row.fit,
    material: row.material,
    care: row.care,
    image: row.image_url,
    gallery: normalizeJsonArray(row.gallery),
    colors: normalizeJsonArray(row.colors),
    sizes: normalizeJsonArray(row.sizes),
    tags: normalizeJsonArray(row.tags),
    description: row.description,
  };
}

function groupProducts(products) {
  return Array.from(
    products.reduce((groups, product) => {
      const current = groups.get(product.collection) || [];
      current.push(product);
      groups.set(product.collection, current);
      return groups;
    }, new Map()),
  ).map(([title, items]) => ({
    title,
    slug: slugifyCollection(title),
    items,
    categories: [...new Set(items.map((item) => item.category))],
    lowestPrice: Math.min(...items.map((item) => item.price)),
    image: items[0].image,
    description:
      collectionDescriptions[title] || "A refined capsule from the Noska wardrobe.",
  }));
}

async function readProductsFromDatabase() {
  const sql = getDatabase();
  const rows = await sql`
    select
      p.id,
      p.slug,
      p.name,
      p.category,
      c.title as collection,
      p.price,
      p.old_price,
      p.rating,
      p.reviews,
      p.badge,
      p.stock,
      p.fit,
      p.material,
      p.care,
      p.image_url,
      p.gallery,
      p.colors,
      p.sizes,
      p.tags,
      p.description
    from public.products p
    join public.collections c on c.id = p.collection_id
    where p.published = true and c.published = true
    order by p.sort_order asc, p.created_at desc
  `;

  return rows.map(mapProduct);
}

export async function getCatalogProducts() {
  if (!hasDatabaseConfig()) {
    return localProducts;
  }

  try {
    const products = await readProductsFromDatabase();
    return products.length > 0 ? products : localProducts;
  } catch (error) {
    console.error("Catalog database read failed; using local catalog fallback.", error);
    return localProducts;
  }
}

export async function getCatalogProductBySlug(slug) {
  const products = await getCatalogProducts();
  return products.find((product) => product.slug === slug) || null;
}

export async function getCatalogCollections() {
  return groupProducts(await getCatalogProducts());
}

export async function getCatalogCollectionBySlug(slug) {
  const collections = await getCatalogCollections();
  return collections.find((collection) => collection.slug === slug) || null;
}
