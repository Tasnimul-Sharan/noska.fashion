import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  formatCurrency,
  getCollectionBySlug,
  getProductBySlug,
  slugifyCollection,
} from "@/data/products";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/motion";

const product = (slug) => getProductBySlug(slug);

const heroTiles = [
  {
    product: product("noor-embroidered-anarkali"),
    className: "md:col-span-7 md:row-span-2",
    imageClassName: "object-[50%_34%]",
  },
  {
    product: product("selene-velvet-midi"),
    className: "md:col-span-5",
    imageClassName: "object-[50%_28%]",
  },
  {
    product: product("elara-metallic-slip"),
    className: "md:col-span-5",
    imageClassName: "object-[50%_42%]",
  },
];

const featurePanels = [
  {
    collection: "Eid Edit",
    label: "Woman",
    kicker: "Festive arrivals",
    product: product("noor-embroidered-anarkali"),
    href: "/collections/eid-edit",
    height: "min-h-[72vh]",
    imageClassName: "object-[52%_32%]",
    logoPosition: "right-[-2rem] top-[14%]",
    textPosition: "items-end justify-end text-right",
    logoTone: "text-white",
  },
  {
    collection: "Moonlit Edit",
    label: "Evening",
    kicker: "Satin and velvet silhouettes",
    product: product("selene-velvet-midi"),
    href: "/collections/moonlit-edit",
    height: "min-h-[78vh]",
    imageClassName: "object-[48%_30%]",
    logoPosition: "left-[-1rem] bottom-[8%]",
    textPosition: "items-start justify-end text-left",
    logoTone: "text-white",
  },
  {
    collection: "Sunset Resort",
    label: "Resort",
    kicker: "Light dresses for warm days",
    product: product("maeve-pleated-maxi"),
    href: "/collections/sunset-resort",
    height: "min-h-[74vh]",
    imageClassName: "object-[48%_40%]",
    logoPosition: "right-[-3rem] bottom-[6%]",
    textPosition: "items-end justify-end text-right",
    logoTone: "text-white",
  },
];

const collectionLinks = [
  "Moonlit Edit",
  "Eid Edit",
  "Nine to Nine",
  "Sunset Resort",
  "White Room",
  "Soft Hours",
  "Gala Room",
  "Weekend Market",
  "After Dark",
];

function collectionHref(title) {
  return `/collections/${slugifyCollection(title)}`;
}

function TinyNav({ tone = "light" }) {
  const className =
    tone === "dark"
      ? "text-[#151515] drop-shadow-[0_1px_10px_rgba(255,255,255,0.78)]"
      : "text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.28)]";

  return (
    <div
      className={`absolute right-4 top-24 z-20 hidden text-right text-[9px] font-semibold uppercase leading-4 tracking-[0.12em] sm:block lg:right-8 ${className}`}
    >
      <Link href="/shop" className="block">
        Shop
      </Link>
      <Link href="/collections" className="block">
        Collections
      </Link>
      <Link href="/wishlist" className="block">
        Wishlist
      </Link>
    </div>
  );
}

function NoskaMark({ className = "", tone = "text-white" }) {
  return (
    <motion.div
      className={`noska-home-mark pointer-events-none absolute z-10 select-none font-serif font-semibold uppercase ${tone} ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      Noska
    </motion.div>
  );
}

export function EditorialHome() {
  return (
    <div className="bg-white text-[#151515]">
      <section className="relative min-h-screen overflow-hidden bg-white">
        <TinyNav tone="dark" />
        <motion.div
          className="grid min-h-screen grid-cols-1 grid-rows-[44vh_28vh_28vh] gap-0 md:grid-cols-12 md:grid-rows-2"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          {heroTiles.map((tile, index) => (
            <motion.div
              key={tile.product.id}
              className={`relative overflow-hidden bg-[#e8e2d9] ${tile.className}`}
              variants={fadeIn}
            >
              <Image
                src={tile.product.image}
                alt={tile.product.name}
                fill
                priority={index === 0}
                sizes={index === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 42vw, 100vw"}
                className={`object-cover ${tile.imageClassName}`}
              />
            </motion.div>
          ))}
        </motion.div>

        <NoskaMark className="right-[-2.5rem] top-[18%] md:right-[-4rem] md:top-[20%]" />
        <motion.div
          className="absolute bottom-8 left-4 z-20 max-w-xs text-[11px] font-semibold uppercase leading-5 tracking-[0.12em] text-[#151515] drop-shadow-[0_1px_10px_rgba(255,255,255,0.78)] sm:left-6 lg:left-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.56 }}
        >
          <p>New season 2026</p>
          <Link href="/shop" className="mt-2 inline-block border-b border-[#151515] pb-1">
            Woman collection
          </Link>
        </motion.div>
      </section>

      <section className="relative flex min-h-[42vh] items-center justify-center bg-white px-4 text-center">
        <TinyNav tone="dark" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.45 }}
          variants={staggerContainer}
        >
          <motion.p
            className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f6a63]"
            variants={fadeUp}
          >
            Noska studio
          </motion.p>
          <motion.h1
            className="mt-5 font-serif text-5xl font-semibold uppercase tracking-normal sm:text-7xl lg:text-8xl"
            variants={fadeUp}
          >
            The New
          </motion.h1>
          <motion.div variants={fadeUp}>
            <Link
              href="/shop"
              className="mt-6 inline-block border-b border-[#151515] pb-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
            >
              Shop now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {featurePanels.map((panel, index) => (
        <section
          key={panel.collection}
          className={`relative overflow-hidden bg-[#151515] text-white ${panel.height}`}
        >
          <Image
            src={panel.product.image}
            alt={panel.product.name}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover ${panel.imageClassName}`}
          />
          <div className="absolute inset-0 bg-black/10" />
          <TinyNav />
          <NoskaMark className={panel.logoPosition} tone={panel.logoTone} />

          <motion.div
            className={`relative z-20 flex min-h-[inherit] flex-col px-4 pb-10 pt-24 sm:px-6 lg:px-8 ${panel.textPosition}`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={staggerContainer}
          >
            <motion.div
              className="max-w-sm text-[10px] font-semibold uppercase leading-5 tracking-[0.14em] drop-shadow-[0_1px_12px_rgba(0,0,0,0.34)]"
              variants={fadeUp}
            >
              <p>{panel.label}</p>
              <p>{panel.kicker}</p>
              <p>{formatCurrency(panel.product.price)}</p>
              <Link href={panel.href} className="mt-3 inline-block border-b border-white pb-1">
                View collection
              </Link>
            </motion.div>
          </motion.div>
        </section>
      ))}

      <section className="relative grid min-h-[62vh] place-items-center overflow-hidden bg-white px-4 py-20 text-center">
        <TinyNav tone="dark" />
        <motion.div
          className="relative z-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
        >
          <motion.div
            className="relative mx-auto h-72 w-48 overflow-hidden sm:h-96 sm:w-64"
            variants={fadeUp}
          >
            <Image
              src={product("serein-knit-daydress").image}
              alt={product("serein-knit-daydress").name}
              fill
              sizes="(min-width: 640px) 16rem, 12rem"
              className="object-cover object-[50%_25%]"
            />
          </motion.div>
          <motion.h2
            className="relative -mt-12 font-serif text-5xl font-semibold uppercase tracking-normal text-[#5269ff] sm:-mt-16 sm:text-7xl lg:text-8xl"
            variants={fadeUp}
          >
            Soft Hours
          </motion.h2>
          <motion.div variants={fadeUp}>
            <Link
              href={collectionHref("Soft Hours")}
              className="mt-5 inline-block border-b border-[#5269ff] pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5269ff]"
            >
              Knit day dresses
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative min-h-[70vh] overflow-hidden bg-[#d9e3ec]">
        <div className="absolute inset-0 grid md:grid-cols-2">
          {[product("aria-tailored-wrap"), product("iris-utility-shirt-dress")].map((item) => (
            <div key={item.id} className="relative min-h-[35vh] overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-[50%_34%]"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/12" />
        <TinyNav />
        <motion.div
          className="relative z-20 flex min-h-[70vh] flex-col items-center justify-end px-4 pb-12 text-center text-white sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerContainer}
        >
          <motion.p
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            variants={fadeUp}
          >
            Tailored workwear
          </motion.p>
          <motion.h2
            className="mt-2 font-serif text-5xl font-semibold uppercase tracking-normal sm:text-7xl lg:text-8xl"
            variants={fadeUp}
          >
            Nine to Nine
          </motion.h2>
          <motion.div variants={fadeUp}>
            <Link
              href={collectionHref("Nine to Nine")}
              className="mt-4 inline-block border-b border-white pb-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
            >
              View collection
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative bg-white px-4 py-24 sm:px-6 lg:px-8">
        <TinyNav tone="dark" />
        <motion.div
          className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f6a63]">
              Menu
            </p>
            <h2 className="mt-4 font-serif text-5xl font-semibold uppercase leading-none tracking-normal sm:text-7xl">
              Shop by collection
            </h2>
          </motion.div>
          <motion.div
            className="grid gap-x-8 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.12em] sm:grid-cols-2"
            variants={staggerContainer}
          >
            {collectionLinks.map((title) => {
              const collection = getCollectionBySlug(slugifyCollection(title));

              return (
                <motion.div key={title} variants={fadeUp}>
                  <Link
                    href={collectionHref(title)}
                    className="grid grid-cols-[1fr_auto] gap-5 border-b border-[#ded6ca] py-4"
                  >
                    <span>{title}</span>
                    <span>{collection?.items.length || 0}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
