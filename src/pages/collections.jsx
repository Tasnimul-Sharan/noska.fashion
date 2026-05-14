import { CollectionsGrid } from "@/components/collections/CollectionsGrid";
import { Seo } from "@/components/Seo";
import { getCollectionGroups } from "@/data/products";
import { createBreadcrumbJsonLd, createCollectionListJsonLd } from "@/lib/seo";

export default function CollectionsPage() {
  const collections = getCollectionGroups();

  return (
    <>
      <Seo
        title="Dress Collections"
        description="Explore every Noska dress collection, from Eid edits and tailored workwear to resort, bridal, evening, velvet, linen, and heritage capsules."
        canonicalPath="/collections"
        image={collections[0].image}
        imageAlt="Noska dress collections"
        jsonLd={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Collections", path: "/collections" },
          ]),
          createCollectionListJsonLd(collections),
        ]}
      />

      <section className="border-b border-border_color bg-[#211d19] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase text-tertiary">Collection room</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
            All Noska collections
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#d8d0c8] md:text-base">
            Each capsule is built around a wardrobe mood: festive days, evening
            shine, structured workwear, destination dressing, and bridal moments.
          </p>
        </div>
      </section>

      <CollectionsGrid />
    </>
  );
}
