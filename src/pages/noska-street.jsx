import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Seo } from "@/components/Seo";
import { NoskaStreetHero } from "@/components/home/NoskaStreetHero";
import {
  formatCurrency,
  getProductBySlug,
} from "@/data/products";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/motion";

const streetProducts = [
  "celeste-satin-midi",
  "aria-tailored-wrap",
  "iris-utility-shirt-dress",
  "mira-ribbed-polo-dress",
]
  .map((slug) => getProductBySlug(slug))
  .filter(Boolean);

const storyTiles = [
  {
    product: getProductBySlug("celeste-satin-midi"),
    label: "City uniform",
    className: "md:col-span-7 md:row-span-2",
    imageClassName: "object-[50%_30%]",
  },
  {
    product: getProductBySlug("aria-tailored-wrap"),
    label: "After hours",
    className: "md:col-span-5",
    imageClassName: "object-[50%_28%]",
  },
  {
    product: getProductBySlug("iris-utility-shirt-dress"),
    label: "New movement",
    className: "md:col-span-5",
    imageClassName: "object-[50%_34%]",
  },
].filter((tile) => tile.product);

export default function NoskaStreetPage() {
  return (
    <>
      <Seo
        title="Noska Street"
        description="Noska Street: contemporary city dressing, relaxed tailoring and everyday statement pieces."
        canonicalPath="/noska-street"
      />

      <div className="bg-white text-[#231f20]">
        <NoskaStreetHero />

        <section
          id="street-edit"
          className="flex min-h-[46vh] items-center justify-center bg-white px-4 py-20 text-center sm:px-6"
        >
          <motion.div
            className="max-w-4xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={staggerContainer}
          >
            <motion.p
              className="text-[10px] font-semibold uppercase tracking-[0.18em]"
              variants={fadeUp}
            >
              The street edit
            </motion.p>
            <motion.h2
              className="mt-5 font-serif text-5xl font-semibold uppercase leading-[0.92] tracking-normal sm:text-7xl lg:text-8xl"
              variants={fadeUp}
            >
              Tailored to move
            </motion.h2>
            <motion.p
              className="mx-auto mt-6 max-w-xl text-sm leading-6 sm:text-base"
              variants={fadeUp}
            >
              Sharp layers meet easy proportions in an everyday wardrobe made
              for changing pace.
            </motion.p>
          </motion.div>
        </section>

        <section className="grid min-h-[100svh] grid-rows-[58vh_42vh_42vh] bg-[#231f20] md:grid-cols-12 md:grid-rows-2">
          {storyTiles.map((tile, index) => (
            <motion.article
              key={tile.product.id}
              className={`group relative min-h-0 overflow-hidden ${tile.className}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <Image
                src={tile.product.image}
                alt={tile.product.name}
                fill
                sizes={index === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 42vw, 100vw"}
                className={`object-cover transition duration-700 group-hover:scale-[1.025] ${tile.imageClassName}`}
              />
              <div className="absolute inset-0 bg-[#231f20]/10" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#231f20]/65 to-transparent px-4 pb-5 pt-20 text-white sm:px-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                    {tile.label}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl uppercase sm:text-4xl">
                    {tile.product.name}
                  </h3>
                </div>
                <Link
                  href={`/products/${tile.product.slug}`}
                  className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center border border-white"
                  aria-label={`View ${tile.product.name}`}
                >
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </motion.article>
          ))}
        </section>

        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <motion.div
            className="mx-auto max-w-[1500px]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            <motion.div
              className="mb-10 flex items-end justify-between gap-6 border-b border-[#231f20] pb-5"
              variants={fadeUp}
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                  Drop 01
                </p>
                <h2 className="mt-2 font-serif text-4xl font-semibold uppercase tracking-normal sm:text-6xl">
                  Shop the street
                </h2>
              </div>
              <Link
                href="/shop"
                className="focus-ring hidden items-center gap-2 border-b border-[#231f20] pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] sm:inline-flex"
              >
                View all
                <ArrowUpRight size={14} />
              </Link>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5"
              variants={staggerContainer}
            >
              {streetProducts.map((product) => (
                <motion.article key={product.id} variants={fadeUp}>
                  <Link href={`/products/${product.slug}`} className="group block">
                    <div className="relative aspect-3/4 overflow-hidden bg-[#231f20]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="object-cover object-[50%_28%] transition duration-700 group-hover:scale-[1.035]"
                      />
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-3 text-[11px] uppercase tracking-[0.1em]">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="mt-1">{product.category}</p>
                      </div>
                      <p className="shrink-0 font-semibold">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>

            <motion.div className="mt-12 text-center sm:hidden" variants={fadeUp}>
              <Link
                href="/shop"
                className="focus-ring inline-flex items-center gap-2 border-b border-[#231f20] pb-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
              >
                View all
                <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <section className="bg-[#231f20] px-4 py-24 text-white sm:px-6 sm:py-32 lg:px-8">
          <motion.div
            className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-end"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              className="font-serif text-5xl font-semibold uppercase leading-[0.9] tracking-normal sm:text-7xl lg:text-8xl"
              variants={fadeUp}
            >
              Your city.<br />Your rhythm.
            </motion.h2>
            <motion.div variants={fadeUp}>
              <p className="max-w-md text-sm leading-6 sm:text-base">
                Noska Street is a daily uniform with a sharper point of view:
                versatile, expressive and ready for wherever the day turns.
              </p>
              <Link
                href="/shop"
                className="focus-ring mt-8 inline-flex items-center gap-2 border-b border-white pb-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
              >
                Enter the collection
                <ArrowUpRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
