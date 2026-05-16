import { motion } from "framer-motion";
import { CollectionsGrid } from "@/components/collections/CollectionsGrid";
import { Seo } from "@/components/Seo";
import { getCollectionGroups } from "@/data/products";
import { fadeUp, staggerContainer } from "@/lib/motion";
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
        <motion.div
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.p className="text-sm font-semibold uppercase text-tertiary" variants={fadeUp}>
            Collection room
          </motion.p>
          <motion.h1
            className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl"
            variants={fadeUp}
          >
            All Noska collections
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl text-sm leading-6 text-[#d8d0c8] md:text-base"
            variants={fadeUp}
          >
            Each capsule is built around a wardrobe mood: festive days, evening
            shine, structured workwear, destination dressing, and bridal moments.
          </motion.p>
        </motion.div>
      </section>

      <CollectionsGrid />
    </>
  );
}
