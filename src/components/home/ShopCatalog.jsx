import { RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, sizes } from "@/data/products";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

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

const collectionOptions = [
  "All",
  ...Array.from(new Set(products.map((product) => product.collection))),
];

export function ShopCatalog({ eyebrow = "Curated rack", title = "Shop dresses" }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [collection, setCollection] = useState("All");
  const [size, setSize] = useState("All");
  const [color, setColor] = useState("All");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    if (!router.isReady) return;

    queueMicrotask(() => {
      setQuery(typeof router.query.q === "string" ? router.query.q : "");
    });
  }, [router.isReady, router.query.q]);

  useEffect(() => {
    if (!router.isReady) return;

    queueMicrotask(() => {
      const nextCategory =
        typeof router.query.category === "string" &&
        categories.includes(router.query.category)
          ? router.query.category
          : "All";

      setCategory(nextCategory);
    });
  }, [router.isReady, router.query.category]);

  useEffect(() => {
    if (!router.isReady) return;

    queueMicrotask(() => {
      const nextCollection =
        typeof router.query.collection === "string" &&
        collectionOptions.includes(router.query.collection)
          ? router.query.collection
          : "All";

      setCollection(nextCollection);
    });
  }, [router.isReady, router.query.collection]);

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
        const matchesCollection =
          collection === "All" || product.collection === collection;
        const matchesSize = size === "All" || product.sizes.includes(size);
        const matchesColor =
          color === "All" || product.colors.some((option) => option.name === color);

        return (
          matchesQuery &&
          matchesCategory &&
          matchesCollection &&
          matchesSize &&
          matchesColor
        );
      })
      .sort((a, b) => {
        if (sort === "price-low") return a.price - b.price;
        if (sort === "price-high") return b.price - a.price;
        if (sort === "rating") return b.rating - a.rating;
        if (sort === "new") return b.id.localeCompare(a.id);
        return products.indexOf(a) - products.indexOf(b);
      });
  }, [category, collection, color, query, size, sort]);

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setCollection("All");
    setSize("All");
    setColor("All");
    setSort("featured");
  };
  const activeEyebrow = collection === "All" ? eyebrow : "Collection";
  const activeTitle = collection === "All" ? title : collection;

  return (
    <motion.section
      id="shop"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <motion.div
        className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        variants={fadeUp}
      >
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-[#b9404f]">
            <SlidersHorizontal size={17} />
            {activeEyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">{activeTitle}</h2>
        </div>
        <div className="text-sm text-[#6f6a63]">
          {filteredProducts.length} styles ready to order
        </div>
      </motion.div>

      <motion.div className="mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar" variants={fadeUp}>
        {categories.map((option) => (
          <motion.button
            key={option}
            whileTap={{ scale: 0.96 }}
            className={`focus-ring h-11 min-w-fit rounded-lg border px-4 text-sm font-semibold transition ${
              category === option
                ? "border-[#151515] bg-[#151515] text-white"
                : "border-[#ded6ca] bg-white text-[#514c45] hover:border-[#b9404f]"
            }`}
            type="button"
            onClick={() => setCategory(option)}
          >
            {option}
          </motion.button>
        ))}
      </motion.div>

      <motion.div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]" variants={staggerContainer}>
        <motion.aside className="h-fit rounded-lg border border-[#e5ddd2] bg-white p-4" variants={fadeUp}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Filters</h3>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="focus-ring flex items-center gap-1 text-sm font-semibold text-[#b9404f]"
              type="button"
              onClick={resetFilters}
            >
              <RotateCcw size={15} />
              Reset
            </motion.button>
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
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="focus-ring text-[#7b7167]"
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
              >
                <X size={16} />
              </motion.button>
            )}
          </div>

          <label className="mt-5 block text-sm font-semibold" htmlFor="collection">
            Collection
          </label>
          <select
            id="collection"
            value={collection}
            onChange={(event) => setCollection(event.target.value)}
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-[#ded6ca] bg-[#fbfaf8] px-3 text-sm font-semibold"
          >
            {collectionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div className="mt-5">
            <p className="text-sm font-semibold">Size</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {["All", ...sizes].map((option) => (
                <motion.button
                  key={option}
                  whileTap={{ scale: 0.96 }}
                  className={`focus-ring h-10 rounded-lg border text-sm font-semibold ${
                    size === option
                      ? "border-[#151515] bg-[#151515] text-white"
                      : "border-[#ded6ca] bg-[#fbfaf8] text-[#514c45]"
                  }`}
                  type="button"
                  onClick={() => setSize(option)}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold">Color</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <motion.button
                whileTap={{ scale: 0.96 }}
                className={`focus-ring h-9 rounded-lg border px-3 text-sm font-semibold ${
                  color === "All"
                    ? "border-[#151515] bg-[#151515] text-white"
                    : "border-[#ded6ca] bg-[#fbfaf8]"
                }`}
                type="button"
                onClick={() => setColor("All")}
              >
                All
              </motion.button>
              {colorOptions.map((option) => (
                <motion.button
                  key={option.name}
                  whileTap={{ scale: 0.96 }}
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
                </motion.button>
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
        </motion.aside>

        <div>
          {filteredProducts.length > 0 ? (
            <motion.div
              key={`${query}-${category}-${collection}-${size}-${color}-${sort}`}
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
              initial="hidden"
              animate="show"
              variants={staggerContainer}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-[#e5ddd2] bg-white p-8 text-center"
              variants={fadeUp}
            >
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
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
}
