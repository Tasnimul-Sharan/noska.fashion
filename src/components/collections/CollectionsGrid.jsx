import { ArrowRight, Layers3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency, products } from "@/data/products";

const collectionCopy = {
  "Moonlit Edit": "Polished evening dresses with satin shine and soft sculpting.",
  "Eid Edit": "Festive silhouettes with embroidery, color, and occasion-ready movement.",
  "Nine to Nine": "Structured day-to-evening pieces for polished schedules.",
  "Sunset Resort": "Lightweight dresses for warm getaways and relaxed plans.",
  "White Room": "Bridal and reception-ready pieces with refined detail.",
  "Soft Hours": "Comfortable knits and easy shapes for daily wear.",
  "Gala Room": "Elevated gowns for formal evenings and special entrances.",
  "Weekend Market": "Printed, casual dresses made for expressive weekends.",
  "After Dark": "Party dresses with metallic texture and evening energy.",
  "Power Edit": "Tailored workwear with sharper lines and confident fits.",
  "Garden Mehfil": "Fresh florals for daylight occasions and festive gatherings.",
};

const collectionGroups = Array.from(
  products.reduce((groups, product) => {
    const current = groups.get(product.collection) || [];
    current.push(product);
    groups.set(product.collection, current);
    return groups;
  }, new Map()),
).map(([title, items]) => {
  const categories = [...new Set(items.map((item) => item.category))];
  const lowestPrice = Math.min(...items.map((item) => item.price));

  return {
    title,
    items,
    categories,
    lowestPrice,
    image: items[0].image,
    description: collectionCopy[title] || "A refined capsule from the Noska wardrobe.",
  };
});

export function CollectionsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {collectionGroups.map((collection) => (
          <Link
            key={collection.title}
            href={`/shop?collection=${encodeURIComponent(collection.title)}`}
            className="group overflow-hidden rounded-lg border border-border_soft bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-premium"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-image_wash">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,13,0.02),rgba(12,12,13,0.58))]" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg bg-white/92 px-3 py-1 text-xs font-semibold text-secondary">
                <Layers3 size={14} />
                {collection.items.length} style{collection.items.length > 1 ? "s" : ""}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-xs font-semibold uppercase text-tertiary">
                  From {formatCurrency(collection.lowestPrice)}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">{collection.title}</h2>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm leading-6 text-muted">{collection.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {collection.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-lg bg-cream px-3 py-1 text-xs font-semibold text-muted_dark"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-secondary transition group-hover:text-primary">
                Shop collection
                <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
