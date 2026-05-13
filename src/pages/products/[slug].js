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
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useShop } from "@/context/ShopContext";
import { formatCurrency, getProductBySlug, products } from "@/data/products";

export default function ProductDetail({ product }) {
  const { addToCart, isInWishlist, toggleWishlist } = useShop();
  const [activeImage, setActiveImage] = useState(product.gallery[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const wished = isInWishlist(product.id);

  const recommendations = useMemo(
    () =>
      products
        .filter((item) => item.category === product.category && item.id !== product.id)
        .concat(products.filter((item) => item.category !== product.category))
        .slice(0, 3),
    [product],
  );

  const addSelectedToCart = () => {
    addToCart(product, { size, color, quantity });
  };

  return (
    <>
      <Head>
        <title>{product.name} | Aurelia Atelier</title>
        <meta name="description" content={product.description} />
      </Head>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/#shop"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#514c45] transition hover:text-[#b9404f]"
        >
          <ArrowLeft size={17} />
          Back to shop
        </Link>

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4 md:grid-cols-[96px_1fr]">
            <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
              {product.gallery.map((image) => (
                <button
                  key={image}
                  className={`focus-ring relative h-24 w-20 shrink-0 overflow-hidden rounded-[8px] border bg-[#eee7dd] md:w-24 ${
                    activeImage === image ? "border-[#151515]" : "border-[#e0d8cc]"
                  }`}
                  type="button"
                  aria-label="Change product image"
                  onClick={() => setActiveImage(image)}
                >
                  <Image src={image} alt={product.name} fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
            <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[8px] bg-[#eee7dd] md:order-2">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
              <div className="absolute left-4 top-4 rounded-[8px] bg-white/92 px-3 py-1 text-sm font-semibold">
                {product.badge}
              </div>
            </div>
          </div>

          <div className="lg:pl-6">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-[8px] bg-[#f4ece2] px-3 py-1 font-semibold text-[#b9404f]">
                {product.collection}
              </span>
              <span className="flex items-center gap-1 text-[#514c45]">
                <Star size={16} fill="#e6b84f" className="text-[#e6b84f]" />
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-semibold leading-[1.1] md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-base leading-7 text-[#6f6a63]">{product.description}</p>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-2xl font-semibold">{formatCurrency(product.price)}</span>
              <span className="text-lg text-[#9b9288] line-through">
                {formatCurrency(product.oldPrice)}
              </span>
            </div>

            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Color</p>
                <p className="text-sm text-[#7b7167]">{color}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((option) => (
                  <button
                    key={option.name}
                    className={`focus-ring flex h-11 items-center gap-2 rounded-[8px] border px-3 text-sm font-semibold ${
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
            </div>

            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Size</p>
                <Link href="/#shop" className="text-sm font-semibold text-[#b9404f]">
                  Size guide
                </Link>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {product.sizes.map((option) => (
                  <button
                    key={option}
                    className={`focus-ring h-12 rounded-[8px] border text-sm font-semibold ${
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
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <div className="flex h-12 w-full items-center justify-between rounded-[8px] border border-[#ded6ca] bg-white sm:w-36">
                <button
                  className="focus-ring flex h-12 w-12 items-center justify-center"
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="font-semibold">{quantity}</span>
                <button
                  className="focus-ring flex h-12 w-12 items-center justify-center"
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((value) => Math.min(12, value + 1))}
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                className="focus-ring flex h-12 flex-1 items-center justify-center gap-2 rounded-[8px] bg-[#151515] px-5 text-sm font-semibold text-white transition hover:bg-[#b9404f]"
                type="button"
                onClick={addSelectedToCart}
              >
                <ShoppingBag size={18} />
                Add to cart
              </button>
              <button
                className="focus-ring flex h-12 items-center justify-center gap-2 rounded-[8px] border border-[#151515] px-5 text-sm font-semibold"
                type="button"
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart size={18} fill={wished ? "#b9404f" : "none"} />
                Wishlist
              </button>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <InfoTile icon={Truck} label="Delivery" text="Dhaka 24-48h" />
              <InfoTile icon={ShieldCheck} label="Exchange" text="7-day support" />
              <InfoTile icon={CheckCircle2} label="Stock" text={`${product.stock} left`} />
            </div>

            <div className="mt-8 divide-y divide-[#e7e1d8] border-y border-[#e7e1d8]">
              <DetailRow title="Fit" text={product.fit} />
              <DetailRow title="Fabric" text={product.material} />
              <DetailRow title="Care" text={product.care} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-[#b9404f]">Recommended</p>
            <h2 className="mt-2 text-3xl font-semibold">Complete the edit</h2>
          </div>
          <Link href="/#shop" className="hidden text-sm font-semibold text-[#151515] sm:block">
            View all
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </>
  );
}

function InfoTile({ icon: Icon, label, text }) {
  return (
    <div className="rounded-[8px] border border-[#e5ddd2] bg-white p-3">
      <Icon size={18} className="text-[#b9404f]" />
      <p className="mt-2 text-sm font-semibold">{label}</p>
      <p className="mt-1 text-xs text-[#7b7167]">{text}</p>
    </div>
  );
}

function DetailRow({ title, text }) {
  return (
    <div className="grid grid-cols-[96px_1fr] gap-4 py-4 text-sm">
      <span className="font-semibold">{title}</span>
      <span className="text-[#6f6a63]">{text}</span>
    </div>
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
