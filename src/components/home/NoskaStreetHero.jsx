import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function NoskaStreetHero({ variant = "page" }) {
  const isHomeTeaser = variant === "home";

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#231f20] text-white">
      <Image
        src={
          isHomeTeaser
            ? "/noska-street/campaign-hero.png"
            : "/noska-street/home-campaign-hero-wide.png"
        }
        alt={
          isHomeTeaser
            ? "Noska Street campaign featuring two women in contemporary tailoring"
            : "Noska Street campaign featuring a woman in city tailoring"
        }
        fill
        priority
        sizes="100vw"
        className={
          isHomeTeaser
            ? "object-cover object-[68%_center] sm:object-center"
            : "object-cover object-[32%_center] sm:object-center"
        }
      />
      <div
        className={`absolute inset-0 ${
          isHomeTeaser ? "bg-[#231f20]/15" : "bg-[#231f20]/20"
        }`}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#231f20]/70 to-transparent" />

      {isHomeTeaser ? (
        <motion.div
          className="relative z-10 flex min-h-[100svh] flex-col items-start justify-end px-4 pb-10 pt-28 text-left sm:px-6 sm:pb-12 lg:px-8 lg:pb-14"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.h1
            className="max-w-6xl font-serif text-6xl font-semibold uppercase leading-[0.82] tracking-normal sm:text-8xl lg:text-[9rem]"
            variants={fadeUp}
          >
            Noska Street
          </motion.h1>
          <motion.div variants={fadeUp}>
            <Link
              href="/noska-street"
              className="focus-ring mt-7 inline-flex items-center gap-2 border-b border-white pb-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
            >
              Go to Noska Street
              <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="relative z-10 flex min-h-[100svh] flex-col items-end justify-end px-4 pb-9 pt-28 text-right sm:px-6 sm:pb-12 lg:px-8 lg:pb-14"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.18em]"
            variants={fadeUp}
          >
            Drop 01 / Dhaka
          </motion.p>
          <motion.h1
            className="mt-3 max-w-6xl font-serif text-6xl font-semibold uppercase leading-[0.82] tracking-normal sm:text-8xl lg:text-[9rem]"
            variants={fadeUp}
          >
            Noska Street
          </motion.h1>
          <motion.div
            className="mt-7 flex w-full max-w-6xl flex-col items-end gap-6"
            variants={fadeUp}
          >
            <p className="max-w-md text-sm leading-6 sm:text-base">
              Built for long days, late plans and the city in between.
            </p>
            <a
              href="#street-edit"
              className="focus-ring inline-flex items-center gap-2 border-b border-white pb-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
            >
              Discover the edit
              <ArrowDown size={15} />
            </a>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
