import { RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import {
  categories,
  formatCurrency,
  getPriceRange,
  products,
  sizes,
} from "@/data/products";
import { easeOut, fadeIn, fadeUp, panelSlide, staggerContainer } from "@/lib/motion";

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

const priceRange = getPriceRange();

export function ShopCatalog({ eyebrow = "Curated rack", title = "Shop dresses" }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [collection, setCollection] = useState("All");
  const [size, setSize] = useState("All");
  const [color, setColor] = useState("All");
  const [sort, setSort] = useState("featured");
  const [priceMin, setPriceMin] = useState(priceRange.min);
  const [priceMax, setPriceMax] = useState(priceRange.max);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
        const matchesPrice = product.price >= priceMin && product.price <= priceMax;

        return (
          matchesQuery &&
          matchesCategory &&
          matchesCollection &&
          matchesSize &&
          matchesColor &&
          matchesPrice
        );
      })
      .sort((a, b) => {
        if (sort === "price-low") return a.price - b.price;
        if (sort === "price-high") return b.price - a.price;
        if (sort === "rating") return b.rating - a.rating;
        if (sort === "new") return b.id.localeCompare(a.id);
        return products.indexOf(a) - products.indexOf(b);
      });
  }, [category, collection, color, priceMax, priceMin, query, size, sort]);

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setCollection("All");
    setSize("All");
    setColor("All");
    setSort("featured");
    setPriceMin(priceRange.min);
    setPriceMax(priceRange.max);
  };

  const updatePriceMin = (value) => {
    const nextValue = Number(value);
    setPriceMin(Math.min(Math.max(priceRange.min, nextValue), priceMax));
  };

  const updatePriceMax = (value) => {
    const nextValue = Number(value);
    setPriceMax(Math.max(Math.min(priceRange.max, nextValue), priceMin));
  };

  const activeEyebrow = collection === "All" ? eyebrow : "Collection";
  const activeTitle = collection === "All" ? title : collection;
  const filterProps = {
    category,
    collection,
    color,
    priceMax,
    priceMin,
    query,
    resetFilters,
    setCategory,
    setCollection,
    setColor,
    setQuery,
    setSize,
    setSort,
    size,
    sort,
    updatePriceMax,
    updatePriceMin,
  };

  return (
    <motion.section
      id="shop"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      initial="hidden"
      animate="show"
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="text-sm text-[#6f6a63]">
            {filteredProducts.length} styles ready to order
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="focus-ring flex h-11 w-fit items-center gap-2 rounded-lg border border-[#151515] bg-white px-4 text-sm font-semibold lg:hidden"
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <SlidersHorizontal size={17} />
            Filters
          </motion.button>
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
        <FilterPanel
          {...filterProps}
          className="hidden h-fit rounded-lg border border-[#e5ddd2] bg-white p-4 lg:sticky lg:top-32 lg:block lg:max-h-[calc(100vh-9rem)] lg:self-start lg:overflow-y-auto"
        />

        <div>
          {filteredProducts.length > 0 ? (
            <motion.div
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
              layout
              transition={{ layout: { duration: 0.32, ease: easeOut } }}
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
                Try a different category, size, color, price range, or search phrase.
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

      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#151515]/45 lg:hidden"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={fadeIn}
          >
            <motion.div
              className="ml-auto flex h-full w-full max-w-sm flex-col bg-[#fbfaf8] shadow-2xl"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={panelSlide}
              data-lenis-prevent=""
            >
              <div className="flex items-center justify-between border-b border-[#e7e1d8] p-5">
                <div>
                  <p className="text-sm font-semibold text-[#b9404f]">Shop filters</p>
                  <h3 className="mt-1 text-xl font-semibold">Refine the rack</h3>
                </div>
                <button
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg border border-[#ded6ca] bg-white"
                  type="button"
                  aria-label="Close filters"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="cart-scroll min-h-0 flex-1 overflow-y-auto p-5">
                <FilterPanel {...filterProps} className="rounded-lg border border-[#e5ddd2] bg-white p-4" />
              </div>
              <div className="border-t border-[#e7e1d8] p-5">
                <button
                  className="focus-ring h-12 w-full rounded-lg bg-[#151515] px-5 text-sm font-semibold text-white"
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  Show {filteredProducts.length} styles
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function FilterPanel({
  category,
  className,
  collection,
  color,
  priceMax,
  priceMin,
  query,
  resetFilters,
  setCategory,
  setCollection,
  setColor,
  setQuery,
  setSize,
  setSort,
  size,
  sort,
  updatePriceMax,
  updatePriceMin,
}) {
  return (
    <motion.aside className={className} variants={fadeUp}>
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

      <label className="mt-5 block text-sm font-semibold" htmlFor="category">
        Category
      </label>
      <select
        id="category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="focus-ring mt-2 h-11 w-full rounded-lg border border-[#ded6ca] bg-[#fbfaf8] px-3 text-sm font-semibold"
      >
        {categories.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

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
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">Price</p>
          <span className="text-xs font-semibold text-[#7b7167]">
            {formatCurrency(priceMin)} - {formatCurrency(priceMax)}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <input
            value={priceMin}
            onChange={(event) => updatePriceMin(event.target.value)}
            min={priceRange.min}
            max={priceRange.max}
            className="focus-ring h-10 rounded-lg border border-[#ded6ca] bg-[#fbfaf8] px-2 text-sm font-semibold"
            type="number"
            aria-label="Minimum price"
          />
          <input
            value={priceMax}
            onChange={(event) => updatePriceMax(event.target.value)}
            min={priceRange.min}
            max={priceRange.max}
            className="focus-ring h-10 rounded-lg border border-[#ded6ca] bg-[#fbfaf8] px-2 text-sm font-semibold"
            type="number"
            aria-label="Maximum price"
          />
        </div>
        <div className="mt-3 grid gap-2">
          <input
            value={priceMin}
            onChange={(event) => updatePriceMin(event.target.value)}
            min={priceRange.min}
            max={priceRange.max}
            step="100"
            type="range"
            aria-label="Minimum price range"
            className="accent-[#b9404f]"
          />
          <input
            value={priceMax}
            onChange={(event) => updatePriceMax(event.target.value)}
            min={priceRange.min}
            max={priceRange.max}
            step="100"
            type="range"
            aria-label="Maximum price range"
            className="accent-[#b9404f]"
          />
        </div>
      </div>

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
  );
}
