import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Seo } from "@/components/Seo";
import { journalPosts } from "@/data/journal";
import { createBreadcrumbJsonLd, createJournalListJsonLd } from "@/lib/seo";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function JournalPage() {
  return (
    <>
      <Seo
        title="Fashion Journal"
        description="Noska styling guides, premium dress edits, Eid outfit ideas, workwear tips, and resort wardrobe notes."
        canonicalPath="/journal"
        image={journalPosts[0].image}
        imageAlt="Noska fashion journal"
        jsonLd={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
          ]),
          createJournalListJsonLd(journalPosts),
        ]}
      />

      <section className="border-b border-border_color bg-secondary text-white">
        <motion.div
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.p className="flex items-center gap-2 text-sm font-semibold uppercase text-tertiary" variants={fadeUp}>
            <BookOpen size={17} />
            Fashion journal
          </motion.p>
          <motion.h1
            className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl"
            variants={fadeUp}
          >
            Style notes for a refined wardrobe
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl text-sm leading-6 text-[#d8d0c8] md:text-base"
            variants={fadeUp}
          >
            Guides for festive dressing, workwear, resort edits, fabric choices,
            and day-to-evening styling.
          </motion.p>
        </motion.div>
      </section>

      <motion.section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {journalPosts.map((post) => (
            <motion.article
              key={post.slug}
              className="overflow-hidden rounded-lg border border-[#e5ddd2] bg-white"
              variants={fadeUp}
              whileHover={{ y: -6 }}
            >
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-4/5 overflow-hidden bg-[#eee7dd]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase text-[#b9404f]">
                    {post.category} · {post.readTime}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold">{post.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#6f6a63]">{post.excerpt}</p>
                  <span className="mt-5 flex items-center gap-2 text-sm font-semibold">
                    Read guide
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </>
  );
}
