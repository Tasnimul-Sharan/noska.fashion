import {
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categories, formatCurrency, heroProduct, products, sizes } from "@/data/products";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "new", label: "New drops" },
];

const colorOptions = Array.from(
  new Map(
    products.flatMap((product) => product.colors).map((color) => [color.name, color]),
  ).values(),
).slice(0, 9);

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [color, setColor] = useState("All");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    if (typeof router.query.q === "string") {
      queueMicrotask(() => setQuery(router.query.q));
    }
  }, [router.query.q]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesQuery =
          !normalizedQuery ||
          [product.name, product.category, product.collection, product.description, ...product.tags]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesCategory = category === "All" || product.category === category;
        const matchesSize = size === "All" || product.sizes.includes(size);
        const matchesColor =
          color === "All" || product.colors.some((option) => option.name === color);

        return matchesQuery && matchesCategory && matchesSize && matchesColor;
      })
      .sort((a, b) => {
        if (sort === "price-low") return a.price - b.price;
        if (sort === "price-high") return b.price - a.price;
        if (sort === "rating") return b.rating - a.rating;
        if (sort === "new") return b.id.localeCompare(a.id);
        return products.indexOf(a) - products.indexOf(b);
      });
  }, [category, color, query, size, sort]);

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setSize("All");
    setColor("All");
    setSort("featured");
  };

  return (
    <>
      <Head>
        <title>Noska | Premium Fashion Ecommerce</title>
        <meta
          name="description"
          content="Premium Next.js and Tailwind CSS ecommerce storefront for curated dresses."
        />
      </Head>

      <HeroSection />
      <ServiceStrip />

      <section id="shop" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-[#b9404f]">
              <SlidersHorizontal size={17} />
              Curated rack
            </p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Shop dresses</h2>
          </div>
          <div className="text-sm text-[#6f6a63]">
            {filteredProducts.length} styles ready to order
          </div>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((option) => (
            <button
              key={option}
              className={`focus-ring h-11 min-w-fit rounded-lg border px-4 text-sm font-semibold transition ${
                category === option
                  ? "border-[#151515] bg-[#151515] text-white"
                  : "border-[#ded6ca] bg-white text-[#514c45] hover:border-[#b9404f]"
              }`}
              type="button"
              onClick={() => setCategory(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-lg border border-[#e5ddd2] bg-white p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Filters</h3>
              <button
                className="focus-ring flex items-center gap-1 text-sm font-semibold text-[#b9404f]"
                type="button"
                onClick={resetFilters}
              >
                <RotateCcw size={15} />
                Reset
              </button>
            </div>

            <label className="mt-5 block text-sm font-semibold" htmlFor="catalog-search">
              Search
            </label>
            <div className="mt-2 flex h-11 items-center gap-2 rounded-lg border border-[#ded6ca] bg-[#fbfaf8] px-3">
              <Search size={17} className="text-[#7b7167]" />
              <input
                id="catalog-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="focus-ring min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9b9288]"
                placeholder="Midi, satin, festive"
                type="search"
              />
              {query && (
                <button
                  className="focus-ring text-[#7b7167]"
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold">Size</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["All", ...sizes].map((option) => (
                  <button
                    key={option}
                    className={`focus-ring h-10 rounded-lg border text-sm font-semibold ${
                      size === option
                        ? "border-[#151515] bg-[#151515] text-white"
                        : "border-[#ded6ca] bg-[#fbfaf8] text-[#514c45]"
                    }`}
                    type="button"
                    onClick={() => setSize(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold">Color</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  className={`focus-ring h-9 rounded-lg border px-3 text-sm font-semibold ${
                    color === "All"
                      ? "border-[#151515] bg-[#151515] text-white"
                      : "border-[#ded6ca] bg-[#fbfaf8]"
                  }`}
                  type="button"
                  onClick={() => setColor("All")}
                >
                  All
                </button>
                {colorOptions.map((option) => (
                  <button
                    key={option.name}
                    className={`focus-ring flex h-9 items-center gap-2 rounded-lg border px-2 text-sm font-semibold ${
                      color === option.name
                        ? "border-[#151515] bg-[#f8f2ea]"
                        : "border-[#ded6ca] bg-[#fbfaf8]"
                    }`}
                    type="button"
                    onClick={() => setColor(option.name)}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-[#cfc5b8]"
                      style={{ backgroundColor: option.value }}
                    />
                    {option.name}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-5 block text-sm font-semibold" htmlFor="sort">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="focus-ring mt-2 h-11 w-full rounded-lg border border-[#ded6ca] bg-[#fbfaf8] px-3 text-sm font-semibold"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </aside>

          <div>
            {filteredProducts.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-[#e5ddd2] bg-white p-8 text-center">
                <Search size={36} className="text-[#b9404f]" />
                <h3 className="mt-4 text-xl font-semibold">No dresses found</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-[#6f6a63]">
                  Try a different category, size, color, or search phrase.
                </p>
                <button
                  className="focus-ring mt-5 rounded-lg bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
                  type="button"
                  onClick={resetFilters}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Collections />
      <Lookbook />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-[#151515] text-white sm:min-h-[560px] lg:min-h-[610px]">
      <Image
        src={heroProduct.image}
        alt={heroProduct.name}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[65%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,13,0.86),rgba(12,12,13,0.42),rgba(12,12,13,0.18))]" />
      <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-end px-4 pb-12 pt-20 sm:min-h-[560px] sm:px-6 lg:min-h-[610px] lg:px-8">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-sm font-semibold text-[#f0c76a]">
            <Sparkles size={17} />
            Noska Eid Edit is live
          </p>
          <h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">
            Noska
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#f0ece5] sm:text-lg">
            Premium dresses for festive evenings, work days, destination plans,
            and wedding moments.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#shop"
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
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-[#f4eee6]">
            <span>{formatCurrency(heroProduct.price)}</span>
            <span>{heroProduct.material}</span>
            <span>{heroProduct.fit}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceStrip() {
  const items = [
    { icon: Truck, label: "Fast delivery", text: "Dhaka 24-48h" },
    { icon: ShieldCheck, label: "Easy exchange", text: "7-day fit support" },
    { icon: CheckCircle2, label: "Quality checked", text: "Premium finishing" },
  ];

  return (
    <section className="border-y border-[#e7e1d8] bg-white">
      <div className="mx-auto grid max-w-7xl gap-0 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-4 border-b border-[#e7e1d8] py-5 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f5eee5] text-[#b9404f]">
                <Icon size={20} />
              </span>
              <span>
                <span className="block font-semibold">{item.label}</span>
                <span className="mt-1 block text-sm text-[#6f6a63]">{item.text}</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Collections() {
  const edits = [
    {
      title: "Eid Edit",
      href: "/#shop",
      image: products[1].image,
      count: "4 festive silhouettes",
    },
    {
      title: "Power Edit",
      href: "/#shop",
      image: products[10].image,
      count: "Tailored workwear",
    },
    {
      title: "Sunset Resort",
      href: "/#shop",
      image: products[3].image,
      count: "Light vacation dresses",
    },
  ];

  return (
    <section id="collections" className="bg-[#f3eee7] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#b9404f]">Collections</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Shop by mood</h2>
          </div>
          <Link
            href="/#shop"
            className="flex w-fit items-center gap-2 text-sm font-semibold text-[#151515]"
          >
            View all
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {edits.map((edit) => (
            <Link
              key={edit.title}
              href={edit.href}
              className="group relative min-h-96 overflow-hidden rounded-lg bg-[#151515]"
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
          ))}
        </div>
      </div>
    </section>
  );
}

function Lookbook() {
  return (
    <section id="journal" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-[#b9404f]">Lookbook</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Styled for the full day</h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-[#6f6a63]">
            Build a wardrobe from polished work mornings to candlelit dinners,
            with pieces that move across plans.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-[#514c45] sm:grid-cols-2">
            {["Structured fits", "Soft evening shine", "Festive embroidery", "Easy resort layers"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-[#1f7a5a]" />
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[products[2], products[6]].map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group overflow-hidden rounded-lg border border-[#e5ddd2] bg-white"
            >
              <div className="relative aspect-4/5 overflow-hidden bg-[#eee7dd]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-[#7b7167]">{product.collection}</p>
                <h3 className="mt-1 text-lg font-semibold">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
