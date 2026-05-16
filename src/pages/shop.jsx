import { motion } from "framer-motion";
import { Seo } from "@/components/Seo";
import { ShopCatalog } from "@/components/home/ShopCatalog";
import { products } from "@/data/products";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { createBreadcrumbJsonLd, createItemListJsonLd } from "@/lib/seo";

export default function ShopPage() {
  return (
    <>
      <Seo
        title="Shop Premium Dresses"
        description="Browse every Noska dress with filters for collection, size, color, and category. Shop festive, workwear, resort, bridal, casual, and evening styles."
        canonicalPath="/shop"
        image={products[0].image}
        imageAlt="Noska shop all dresses"
        jsonLd={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
          ]),
          createItemListJsonLd(products, "All Noska dresses", "/shop"),
        ]}
      />

      <section className="border-b border-border_color bg-secondary text-white">
        <motion.div
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.p className="text-sm font-semibold uppercase text-tertiary" variants={fadeUp}>
            The full rack
          </motion.p>
          <motion.h1
            className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl"
            variants={fadeUp}
          >
            Shop all Noska dresses
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl text-sm leading-6 text-[#d8d0c8] md:text-base"
            variants={fadeUp}
          >
            Browse every silhouette, filter by mood and fit, and add your favorite
            pieces straight to cart.
          </motion.p>
        </motion.div>
      </section>

      <ShopCatalog title="All dresses" eyebrow="Shop" />
    </>
  );
}
