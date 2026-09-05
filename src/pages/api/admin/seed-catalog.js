import {
  collectionDescriptions,
  getCollectionGroups,
  products,
} from "@/data/products";
import { getDatabase, hasDatabaseConfig } from "@/lib/server/db";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ message: "Method not allowed" });
  }

  if (
    !process.env.REVALIDATION_SECRET ||
    request.headers.authorization !== `Bearer ${process.env.REVALIDATION_SECRET}`
  ) {
    return response.status(401).json({ message: "Invalid admin secret" });
  }

  if (!hasDatabaseConfig()) {
    return response.status(503).json({ message: "DATABASE_URL is not configured" });
  }

  const sql = getDatabase();
  const collections = getCollectionGroups();

  try {
    await sql.begin(async (transaction) => {
      const collectionIds = new Map();

      for (const [index, collection] of collections.entries()) {
        const [savedCollection] = await transaction`
          insert into public.collections (
            slug,
            title,
            description,
            image_url,
            sort_order,
            published
          ) values (
            ${collection.slug},
            ${collection.title},
            ${collectionDescriptions[collection.title] || collection.description},
            ${collection.image},
            ${index},
            true
          )
          on conflict (slug) do update set
            title = excluded.title,
            description = excluded.description,
            image_url = excluded.image_url,
            sort_order = excluded.sort_order,
            published = true
          returning id
        `;

        collectionIds.set(collection.title, savedCollection.id);
      }

      for (const [index, product] of products.entries()) {
        await transaction`
          insert into public.products (
            id,
            slug,
            name,
            category,
            collection_id,
            price,
            old_price,
            rating,
            reviews,
            badge,
            stock,
            fit,
            material,
            care,
            image_url,
            gallery,
            colors,
            sizes,
            tags,
            description,
            sort_order,
            published
          ) values (
            ${product.id},
            ${product.slug},
            ${product.name},
            ${product.category},
            ${collectionIds.get(product.collection)},
            ${product.price},
            ${product.oldPrice},
            ${product.rating},
            ${product.reviews},
            ${product.badge},
            ${product.stock},
            ${product.fit},
            ${product.material},
            ${product.care},
            ${product.image},
            ${transaction.json(product.gallery)},
            ${transaction.json(product.colors)},
            ${transaction.json(product.sizes)},
            ${transaction.json(product.tags)},
            ${product.description},
            ${index},
            true
          )
          on conflict (id) do update set
            slug = excluded.slug,
            name = excluded.name,
            category = excluded.category,
            collection_id = excluded.collection_id,
            price = excluded.price,
            old_price = excluded.old_price,
            rating = excluded.rating,
            reviews = excluded.reviews,
            badge = excluded.badge,
            stock = excluded.stock,
            fit = excluded.fit,
            material = excluded.material,
            care = excluded.care,
            image_url = excluded.image_url,
            gallery = excluded.gallery,
            colors = excluded.colors,
            sizes = excluded.sizes,
            tags = excluded.tags,
            description = excluded.description,
            sort_order = excluded.sort_order,
            published = true
        `;
      }
    });

    const paths = [
      "/",
      "/shop",
      "/collections",
      ...collections.map((collection) => `/collections/${collection.slug}`),
    ];

    await Promise.all(paths.map((path) => response.revalidate(path)));

    return response.status(200).json({
      imported: true,
      collections: collections.length,
      products: products.length,
      revalidatedPaths: paths.length,
    });
  } catch (error) {
    console.error("Catalog seed failed.", error);
    return response.status(500).json({ message: "Catalog seed failed" });
  }
}
