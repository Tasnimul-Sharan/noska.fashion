// import { ArrowDown, ArrowUpRight } from "lucide-react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { fadeUp, staggerContainer } from "@/lib/motion";

// export function NoskaStreetHero({ variant = "page" }) {
//   const isHomeTeaser = variant === "home";

//   return (
//     <section className="relative min-h-[100svh] overflow-hidden bg-[#231f20] text-white">
//       <Image
//         src={
//           isHomeTeaser
//             ? "/noska-street/campaign-hero.png"
//             : "/noska-street/home-campaign-hero-wide.png"
//         }
//         alt={
//           isHomeTeaser
//             ? "Noska Street campaign featuring two women in contemporary tailoring"
//             : "Noska Street campaign featuring a woman in city tailoring"
//         }
//         fill
//         priority
//         sizes="100vw"
//         className={
//           isHomeTeaser
//             ? "object-cover object-[68%_center] sm:object-center"
//             : "object-cover object-[32%_center] sm:object-center"
//         }
//       />
//       <div
//         className={`absolute inset-0 ${
//           isHomeTeaser ? "bg-[#231f20]/15" : "bg-[#231f20]/20"
//         }`}
//       />
//       <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#231f20]/70 to-transparent" />

//       {isHomeTeaser ? (
//         <motion.div
//           className="relative z-10 flex min-h-[100svh] flex-col items-start justify-end px-4 pb-10 pt-28 text-left sm:px-6 sm:pb-12 lg:px-8 lg:pb-14"
//           initial="hidden"
//           animate="show"
//           variants={staggerContainer}
//         >
//           <motion.h1
//             className="max-w-6xl font-serif text-6xl font-semibold uppercase leading-[0.82] tracking-normal sm:text-8xl lg:text-[9rem]"
//             variants={fadeUp}
//           >
//             Noska Street
//           </motion.h1>
//           <motion.div className="w-full text-right" variants={fadeUp}>
//             <Link
//               href="/noska-street"
//               className="focus-ring mt-7 inline-flex items-center gap-2 border-b border-white pb-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
//             >
//               Go to Noska Street
//               <ArrowUpRight size={15} />
//             </Link>
//           </motion.div>
//         </motion.div>
//       ) : (
// <motion.div
//   className="relative z-10 flex min-h-[100svh] flex-col items-end justify-end px-4 pb-9 pt-28 text-right sm:px-6 sm:pb-12 lg:px-8 lg:pb-14"
//   initial="hidden"
//   animate="show"
//   variants={staggerContainer}
// >
//   <motion.p
//     className="text-[11px] font-semibold uppercase tracking-[0.18em]"
//     variants={fadeUp}
//   >
//     Drop 01 / Dhaka
//   </motion.p>
//   <motion.h1
//     className="mt-3 max-w-6xl font-serif text-6xl font-semibold uppercase leading-[0.82] tracking-normal sm:text-8xl lg:text-[9rem]"
//     variants={fadeUp}
//   >
//     Noska Street
//   </motion.h1>
//   <motion.div
//     className="mt-7 flex w-full max-w-6xl flex-col items-end gap-6"
//     variants={fadeUp}
//   >
//     <p className="max-w-md text-sm leading-6 sm:text-base">
//       Built for long days, late plans and the city in between.
//     </p>
//     <a
//       href="#street-edit"
//       className="focus-ring inline-flex items-center gap-2 border-b border-white pb-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
//     >
//       Discover the edit
//       <ArrowDown size={15} />
//     </a>
//   </motion.div>
// </motion.div>
//       )}
//     </section>
//   );
// }

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
          {/* Title Lockup */}
          {/* <motion.h1
            className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-normal leading-none"
            variants={fadeUp}
          >
            <span className="font-['Amsterdam_Four'] text-6xl lowercase sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              noska street
            </span>
            <span className="inline-flex items-baseline gap-1.5 text-2xl sm:text-3xl lg:text-4xl">
              <span className="font-['Amsterdam_Four'] font-light lowercase">
                by
              </span>
              <span className="font-serif lowercase tracking-wide">noska</span>
            </span>
          </motion.h1> */}

          {/* <motion.h1
            className="
    flex max-w-full flex-wrap items-end gap-x-3 gap-y-4 sm:gap-x-5
    font-normal leading-none tracking-normal
  "
            variants={fadeUp}
          >
            <span
              className="
      font-['Amsterdam']
      text-[66px]
      whitespace-nowrap
      lowercase
      leading-[0.9]
      sm:text-[84px]
      md:text-[102px]
      lg:text-[122px]
      xl:text-[140px]
    "
            >
              noska street
            </span>
            <span
              className="
      mb-[3px]
      inline-flex
      items-baseline
      gap-2
      lowercase
      sm:mb-[5px]
      lg:mb-[8px]
    "
            >
              <span
                className="
        font-['Amsterdam']
        text-[26px]
        font-normal
        leading-none
        sm:text-[32px]
        md:text-[36px]
        lg:text-[42px]
      "
              >
                by
              </span>

              <span
                className="
        font-serif
        text-[34px]
        font-normal
        leading-none
        tracking-normal
        sm:text-[44px]
        md:text-[50px]
        lg:text-[60px]
      "
              >
                noska
              </span>
            </span>
          </motion.h1> */}

          <motion.div
            className="relative w-[280px] sm:w-[380px] md:w-[520px] lg:w-[700px]"
            variants={fadeUp}
          >
            <Image
              src="/noska-street/noska-street-sample.png"
              alt="Noska Street by Noska"
              width={900}
              height={300}
              priority
              className="h-full w-full object-cover object-center"
            />
          </motion.div>

          <motion.div className="w-full text-right" variants={fadeUp}>
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
