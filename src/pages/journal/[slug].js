import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Seo } from "@/components/Seo";
import { getJournalPostBySlug, journalPosts } from "@/data/journal";
import { getProductBySlug } from "@/data/products";
import {
  createBreadcrumbJsonLd,
  createJournalPostJsonLd,
} from "@/lib/seo";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function JournalDetailPage({ post, featuredProducts }) {
  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        canonicalPath={`/journal/${post.slug}`}
        image={post.image}
        imageAlt={post.title}
        type="article"
        jsonLd={[
          createJournalPostJsonLd(post),
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: post.title, path: `/journal/${post.slug}` },
          ]),
        ]}
      />

      <article>
        <section className="relative min-h-[420px] overflow-hidden bg-[#151515] text-white">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,13,0.92),rgba(12,12,13,0.52),rgba(12,12,13,0.28))]" />
          <motion.div
            className="relative mx-auto flex min-h-[420px] max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 lg:px-8"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <Link
                href="/journal"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#f2d7b0] transition hover:text-white"
              >
                <ArrowLeft size={17} />
                Back to journal
              </Link>
            </motion.div>
            <motion.p className="mt-10 text-sm font-semibold uppercase text-tertiary" variants={fadeUp}>
              {post.category} · {post.readTime}
            </motion.p>
            <motion.h1
              className="mt-3 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl"
              variants={fadeUp}
            >
              {post.title}
            </motion.h1>
            <motion.p
              className="mt-4 max-w-2xl text-sm leading-6 text-[#eee4da] md:text-base"
              variants={fadeUp}
            >
              {post.excerpt}
            </motion.p>
          </motion.div>
        </section>

        <motion.section
          className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.75fr_0.25fr] lg:px-8"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <div className="space-y-5">
            {post.sections.map((section) => (
              <motion.div
                key={section.title}
                className="rounded-lg border border-[#e5ddd2] bg-white p-5"
                variants={fadeUp}
              >
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                <p className="mt-3 text-base leading-7 text-[#6f6a63]">{section.body}</p>
              </motion.div>
            ))}
          </div>
          <motion.aside
            className="h-fit rounded-lg border border-[#e5ddd2] bg-white p-5 lg:sticky lg:top-32"
            variants={fadeUp}
          >
            <CheckCircle2 size={22} className="text-[#1f7a5a]" />
            <h2 className="mt-3 text-xl font-semibold">Styling note</h2>
            <p className="mt-2 text-sm leading-6 text-[#6f6a63]">
              Save pieces you like, then refine size and color from your wishlist
              before checkout.
            </p>
            <Link
              href="/wishlist"
              className="mt-5 inline-flex rounded-lg bg-[#151515] px-4 py-3 text-sm font-semibold text-white"
            >
              Open wishlist
            </Link>
          </motion.aside>
        </motion.section>

        <motion.section
          className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="show"
          variants={staggerContainer}
        >
          <motion.div className="mb-6" variants={fadeUp}>
            <p className="text-sm font-semibold text-[#b9404f]">Shop the guide</p>
            <h2 className="mt-2 text-3xl font-semibold">Featured Noska pieces</h2>
          </motion.div>
          <motion.div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </motion.section>
      </article>
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: journalPosts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const post = getJournalPostBySlug(params.slug);

  return {
    props: {
      post,
      featuredProducts: post.featuredProductSlugs
        .map((slug) => getProductBySlug(slug))
        .filter(Boolean),
    },
  };
}
