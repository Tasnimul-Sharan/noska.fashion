import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency, heroProduct } from "@/data/products";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

export function HeroSection() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-[#151515] text-white sm:min-h-[560px] lg:min-h-[610px]">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06, opacity: 0.82 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={heroProduct.image}
          alt={heroProduct.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center]"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,13,0.86),rgba(12,12,13,0.42),rgba(12,12,13,0.18))]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-end px-4 pb-12 pt-20 sm:min-h-[560px] sm:px-6 lg:min-h-[610px] lg:px-8">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.p
            className="flex items-center gap-2 text-sm font-semibold text-[#f0c76a]"
            variants={fadeUp}
          >
            <Sparkles size={17} />
            Noska Eid Edit is live
          </motion.p>
          <motion.h1
            className="mt-4 max-w-2xl text-5xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl"
            variants={fadeUp}
          >
            Noska
          </motion.h1>
          <motion.p
            className="mt-5 max-w-xl text-base leading-7 text-[#f0ece5] sm:text-lg"
            variants={fadeUp}
          >
            Premium dresses for festive evenings, work days, destination plans,
            and wedding moments.
          </motion.p>
          <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" variants={fadeUp}>
            <Link
              href="/shop"
              className="focus-ring flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-[#151515]"
            >
              Shop collection
              <ArrowRight size={17} />
            </Link>
            <Link
              href={`/products/${heroProduct.slug}`}
              className="focus-ring flex h-12 items-center justify-center rounded-lg border border-white/60 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View featured dress
            </Link>
          </motion.div>
          <motion.div
            className="mt-8 flex flex-wrap gap-4 text-sm text-[#f4eee6]"
            variants={staggerContainer}
          >
            {[formatCurrency(heroProduct.price), heroProduct.material, heroProduct.fit].map(
              (detail) => (
                <motion.span key={detail} variants={scaleIn}>
                  {detail}
                </motion.span>
              ),
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
