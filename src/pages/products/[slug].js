import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Seo } from "@/components/Seo";
import { useShop } from "@/context/ShopContext";
import {
  formatCurrency,
  getOptionStock,
  getProductBySlug,
  getProductsByIds,
  getRelatedProducts,
  getStockStatus,
  products,
  slugifyCollection,
} from "@/data/products";
import {
  createBreadcrumbJsonLd,
  createProductJsonLd,
  createItemListJsonLd,
} from "@/lib/seo";
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from "@/lib/motion";

export default function ProductDetail({ product }) {
  const {
    addToCart,
    addRecentlyViewed,
    isInWishlist,
    recentlyViewed,
    toggleWishlist,
  } = useShop();
  const [activeImage, setActiveImage] = useState(product.gallery[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const wished = isInWishlist(product.id);
  const collectionHref = `/collections/${slugifyCollection(product.collection)}`;
  const optionStock = getOptionStock(product, size, color);
  const stockStatus = getStockStatus(optionStock);
  const soldOut = optionStock <= 0;

  useEffect(() => {
    addRecentlyViewed(product.id);
  }, [addRecentlyViewed, product.id]);

  const recommendations = useMemo(() => getRelatedProducts(product, 3), [product]);
  const recentlyViewedProducts = useMemo(
    () => getProductsByIds(recentlyViewed).filter((item) => item.id !== product.id).slice(0, 3),
    [product.id, recentlyViewed],
  );

  const addSelectedToCart = () => {
    if (soldOut) {
      return;
    }

    addToCart(product, { size, color, quantity });
  };

  return (
    <>
      <Seo
        title={`${product.name} | Premium ${product.category} Dress`}
        description={`${product.description} Available in ${product.colors
          .map((option) => option.name)
          .join(", ")} with sizes ${product.sizes.join(", ")}.`}
        canonicalPath={`/products/${product.slug}`}
        image={product.image}
        imageAlt={product.name}
        type="product"
        jsonLd={[
          createProductJsonLd(product),
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: product.collection, path: collectionHref },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
          createItemListJsonLd(recommendations, `Recommended ${product.category} dresses`, `/shop`),
        ]}
      />

      <motion.section
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp}>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#514c45] transition hover:text-[#b9404f]"
          >
            <ArrowLeft size={17} />
            Back to shop
          </Link>
        </motion.div>

        <motion.div className="mt-7 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]" variants={staggerContainer}>
          <motion.div className="grid gap-4 md:grid-cols-[96px_1fr]" variants={fadeUp}>
            <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
              {product.gallery.map((image) => (
                <motion.button
                  key={image}
                  whileTap={{ scale: 0.94 }}
                  className={`focus-ring relative h-24 w-20 shrink-0 overflow-hidden rounded-lg border bg-[#eee7dd] md:w-24 ${
                    activeImage === image ? "border-[#151515]" : "border-[#e0d8cc]"
                  }`}
                  type="button"
                  aria-label="Change product image"
                  onClick={() => setActiveImage(image)}
                >
                  <Image src={image} alt={product.name} fill sizes="96px" className="object-cover" />
                </motion.button>
              ))}
            </div>
            <motion.div
              className="relative order-1 aspect-4/5 overflow-hidden rounded-lg bg-[#eee7dd] md:order-2"
              layout
            >
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
              <div className="absolute left-4 top-4 rounded-lg bg-white/92 px-3 py-1 text-sm font-semibold">
                {product.badge}
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="lg:pl-6" variants={staggerContainer}>
            <motion.div className="flex flex-wrap items-center gap-3 text-sm" variants={fadeUp}>
              <Link
                href={collectionHref}
                className="rounded-lg bg-[#f4ece2] px-3 py-1 font-semibold text-[#b9404f] transition hover:bg-[#ead8ca]"
              >
                {product.collection}
              </Link>
              <span className="flex items-center gap-1 text-[#514c45]">
                <Star size={16} fill="#e6b84f" className="text-[#e6b84f]" />
                {product.rating} ({product.reviews} reviews)
              </span>
            </motion.div>

            <motion.h1 className="mt-4 text-4xl font-semibold leading-[1.1] md:text-5xl" variants={fadeUp}>
              {product.name}
            </motion.h1>
            <motion.p className="mt-4 text-base leading-7 text-[#6f6a63]" variants={fadeUp}>
              {product.description}
            </motion.p>

            <motion.div className="mt-5 flex items-center gap-3" variants={fadeUp}>
              <span className="text-2xl font-semibold">{formatCurrency(product.price)}</span>
              <span className="text-lg text-[#9b9288] line-through">
                {formatCurrency(product.oldPrice)}
              </span>
            </motion.div>

            <motion.div className="mt-7" variants={fadeUp}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Color</p>
                <p className="text-sm text-[#7b7167]">{color}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((option) => (
                  <button
                    key={option.name}
                    className={`focus-ring flex h-11 items-center gap-2 rounded-lg border px-3 text-sm font-semibold ${
                      color === option.name
                        ? "border-[#151515] bg-white"
                        : "border-[#ded6ca] bg-[#fbfaf8]"
                    }`}
                    type="button"
                    onClick={() => setColor(option.name)}
                  >
                    <span
                      className="h-5 w-5 rounded-full border border-[#cbc0b4]"
                      style={{ backgroundColor: option.value }}
                    />
                    {option.name}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div className="mt-7" variants={fadeUp}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Size</p>
                <Link href="/shop" className="text-sm font-semibold text-[#b9404f]">
                  Size guide
                </Link>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {product.sizes.map((option) => (
                  <button
                    key={option}
                    className={`focus-ring h-12 rounded-lg border text-sm font-semibold ${
                      size === option
                        ? "border-[#151515] bg-[#151515] text-white"
                        : "border-[#ded6ca] bg-white text-[#514c45]"
                    }`}
                    type="button"
                    onClick={() => setSize(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              className={`mt-5 rounded-lg px-4 py-3 text-sm font-semibold ${
                stockStatus.tone === "success"
                  ? "bg-[#eaf7f1] text-[#1f7a5a]"
                  : stockStatus.tone === "warning"
                    ? "bg-[#fff6dc] text-[#8a6515]"
                    : "bg-[#ffe2e6] text-[#8f2637]"
              }`}
              variants={fadeUp}
            >
              {stockStatus.label} for {size} / {color}.{" "}
              <span className="font-medium">{stockStatus.detail}</span>
            </motion.div>

            <motion.div className="mt-7 flex flex-col gap-3 sm:flex-row" variants={fadeUp}>
              <div className="flex h-12 w-full items-center justify-between rounded-lg border border-[#ded6ca] bg-white sm:w-36">
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  className="focus-ring flex h-12 w-12 items-center justify-center"
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                >
                  <Minus size={16} />
                </motion.button>
                <span className="font-semibold">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  className="focus-ring flex h-12 w-12 items-center justify-center"
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((value) => Math.min(12, value + 1))}
                >
                  <Plus size={16} />
                </motion.button>
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="focus-ring flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#151515] px-5 text-sm font-semibold text-white transition hover:bg-[#b9404f] disabled:bg-[#9b9288]"
                type="button"
                disabled={soldOut}
                onClick={addSelectedToCart}
              >
                <ShoppingBag size={18} />
                {soldOut ? "Sold out" : "Add to cart"}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="focus-ring flex h-12 items-center justify-center gap-2 rounded-lg border border-[#151515] px-5 text-sm font-semibold"
                type="button"
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart size={18} fill={wished ? "#b9404f" : "none"} />
                Wishlist
              </motion.button>
            </motion.div>

            <motion.div className="mt-7 grid gap-3 sm:grid-cols-3" variants={staggerContainer}>
              <InfoTile icon={Truck} label="Delivery" text="Dhaka 24-48h" />
              <InfoTile icon={ShieldCheck} label="Exchange" text="7-day support" />
              <InfoTile icon={CheckCircle2} label="Stock" text={`${product.stock} left`} />
            </motion.div>

            <motion.div className="mt-8 divide-y divide-[#e7e1d8] border-y border-[#e7e1d8]" variants={staggerContainer}>
              <DetailRow title="Fit" text={product.fit} />
              <DetailRow title="Fabric" text={product.material} />
              <DetailRow title="Care" text={product.care} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <motion.div className="mb-6 flex items-end justify-between" variants={fadeUp}>
          <div>
            <p className="text-sm font-semibold text-[#b9404f]">Recommended</p>
            <h2 className="mt-2 text-3xl font-semibold">Related from the collection</h2>
          </div>
          <Link
            href={collectionHref}
            className="hidden text-sm font-semibold text-[#151515] sm:block"
          >
            View collection
          </Link>
        </motion.div>
        <motion.div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer}>
          {recommendations.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </motion.div>
      </motion.section>

      {recentlyViewedProducts.length > 0 && (
        <motion.section
          className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div className="mb-6" variants={fadeUp}>
            <p className="text-sm font-semibold text-[#b9404f]">Recently viewed</p>
            <h2 className="mt-2 text-3xl font-semibold">Back to pieces you opened</h2>
          </motion.div>
          <motion.div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer}>
            {recentlyViewedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </motion.div>
        </motion.section>
      )}
    </>
  );
}

function InfoTile({ icon: Icon, label, text }) {
  return (
    <motion.div className="rounded-lg border border-[#e5ddd2] bg-white p-3" variants={scaleIn}>
      <Icon size={18} className="text-[#b9404f]" />
      <p className="mt-2 text-sm font-semibold">{label}</p>
      <p className="mt-1 text-xs text-[#7b7167]">{text}</p>
    </motion.div>
  );
}

function DetailRow({ title, text }) {
  return (
    <motion.div className="grid grid-cols-[96px_1fr] gap-4 py-4 text-sm" variants={fadeUp}>
      <span className="font-semibold">{title}</span>
      <span className="text-[#6f6a63]">{text}</span>
    </motion.div>
  );
}

export function getStaticPaths() {
  return {
    paths: products.map((product) => ({ params: { slug: product.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug);

  return {
    props: {
      product,
    },
  };
}
