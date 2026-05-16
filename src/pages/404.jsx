import { motion } from "framer-motion";
import Link from "next/link";
import { Seo } from "@/components/Seo";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="This Noska page could not be found."
        canonicalPath="/404"
        noindex
      />

      <motion.section
        className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <motion.p className="text-sm font-semibold uppercase text-[#b9404f]" variants={fadeUp}>
          404
        </motion.p>
        <motion.h1 className="mt-3 text-4xl font-semibold md:text-5xl" variants={fadeUp}>
          Page not found
        </motion.h1>
        <motion.p className="mt-4 max-w-xl text-sm leading-6 text-[#6f6a63] md:text-base" variants={fadeUp}>
          The page you are looking for is not available, but the Noska collection is ready.
        </motion.p>
        <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" variants={fadeUp}>
          <Link
            href="/shop"
            className="rounded-lg bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
          >
            Shop dresses
          </Link>
          <Link
            href="/collections"
            className="rounded-lg border border-[#151515] px-5 py-3 text-sm font-semibold"
          >
            View collections
          </Link>
        </motion.div>
      </motion.section>
    </>
  );
}
