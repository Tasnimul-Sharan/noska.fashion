import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { accessories } from "@/data/accessories";
import { products } from "@/data/products";
import { fadeUp, staggerContainer } from "@/lib/motion";

const editorialSlides = [
  {
    eyebrow: "WOMAN",
    title: "DRESSES",
    text: "Occasionwear, polished day dresses, and refined evening silhouettes.",
    href: "/shop",
    image: products[1].image,
    align: "center",
  },
  {
    eyebrow: "NEW COLLECTION",
    title: "MOONLIT EDIT",
    text: "Satin, velvet, and soft structure for after-dark plans.",
    href: "/collections/moonlit-edit",
    image: products[12].image,
    align: "left",
  },
  {
    eyebrow: "ACCESSORIES",
    title: "FINISHING PIECES",
    text: "Bags, jewellery, scarves, belts, and eyewear to complete the look.",
    href: "/shop",
    image: accessories[0].image,
    align: "right",
  },
];

export function EditorialHome() {
  return (
    <div className="bg-[#fbfaf8]">
      {editorialSlides.map((slide, index) => (
        <section
          key={slide.title}
          className="relative min-h-screen overflow-hidden bg-[#151515] text-white"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.20),rgba(0,0,0,0.20),rgba(0,0,0,0.58))]" />
          <motion.div
            className={`relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-14 pt-28 sm:px-6 lg:px-8 ${
              slide.align === "left"
                ? "items-start justify-end text-left"
                : slide.align === "right"
                  ? "items-end justify-end text-right"
                  : "items-center justify-end text-center"
            }`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.45 }}
            variants={staggerContainer}
          >
            <motion.p
              className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white"
              variants={fadeUp}
            >
              {slide.eyebrow}
            </motion.p>
            <motion.h2
              className="mt-3 text-5xl font-semibold uppercase leading-none tracking-[0.08em] sm:text-7xl lg:text-8xl"
              variants={fadeUp}
            >
              {slide.title}
            </motion.h2>
            <motion.p
              className="mt-4 max-w-xl text-sm leading-6 text-white/88 sm:text-base"
              variants={fadeUp}
            >
              {slide.text}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href={slide.href}
                className="mt-7 inline-flex items-center gap-2 border-b border-white pb-1 text-[12px] font-semibold uppercase tracking-[0.16em]"
              >
                View collection
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        </section>
      ))}

      <section className="min-h-[70vh] px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.65fr_1.35fr]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#7b7167]">
              Menu
            </p>
            <h2 className="mt-4 text-5xl font-semibold uppercase leading-none sm:text-7xl">
              Shop by collection
            </h2>
          </motion.div>
          <motion.div
            className="grid gap-x-8 gap-y-4 text-sm font-semibold uppercase tracking-[0.12em] sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
          >
            {[
              "Eid Edit",
              "Moonlit Edit",
              "Nine to Nine",
              "Sunset Resort",
              "Garden Mehfil",
              "Heritage Luxe",
            ].map((collection) => (
              <motion.div key={collection} variants={fadeUp}>
                <Link
                  href={`/shop?collection=${encodeURIComponent(collection)}`}
                  className="block border-b border-[#d8d0c8] py-3"
                >
                  {collection}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
