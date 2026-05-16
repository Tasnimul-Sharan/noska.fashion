import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getCollectionBySlug, slugifyCollection } from "@/data/products";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

function getCollectionCard(title) {
  const collection = getCollectionBySlug(slugifyCollection(title));

  return {
    title: collection.title,
    href: `/collections/${collection.slug}`,
    image: collection.image,
    count: `${collection.items.length} style${collection.items.length > 1 ? "s" : ""}`,
  };
}

const edits = [
  getCollectionCard("Eid Edit"),
  getCollectionCard("Power Edit"),
  getCollectionCard("Sunset Resort"),
];

export function Collections() {
  return (
    <motion.section
      id="collections"
      className="bg-[#f3eee7] py-14"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
          variants={fadeUp}
        >
          <div>
            <p className="text-sm font-semibold text-[#b9404f]">Collections</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Shop by mood</h2>
          </div>
          <Link
            href="/collections"
            className="flex w-fit items-center gap-2 text-sm font-semibold text-[#151515]"
          >
            View all
            <ArrowRight size={17} />
          </Link>
        </motion.div>

        <motion.div className="mt-8 grid gap-5 md:grid-cols-3" variants={staggerContainer}>
          {edits.map((edit) => (
            <motion.div
              key={edit.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.24 }}
            >
              <Link
                href={edit.href}
                className="group relative block min-h-96 overflow-hidden rounded-lg bg-[#151515]"
              >
                <Image
                  src={edit.image}
                  alt={edit.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,13,0.08),rgba(12,12,13,0.72))]" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-sm text-[#f0c76a]">{edit.count}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{edit.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
