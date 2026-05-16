import {
  Bell,
  CheckCircle2,
  Heart,
  Mail,
  PackageCheck,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Seo } from "@/components/Seo";
import { useShop } from "@/context/ShopContext";
import { formatCurrency, products } from "@/data/products";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const orders = [
  {
    id: "NS-482913",
    status: "In transit",
    date: "May 12, 2026",
    total: 15400,
    items: "Celeste Satin Midi, Zuri Print Shirt Dress",
  },
  {
    id: "NS-391028",
    status: "Delivered",
    date: "April 28, 2026",
    total: 11800,
    items: "Noor Embroidered Anarkali",
  },
];

export default function AccountPage() {
  const router = useRouter();
  const { wishlist } = useShop();
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [smsUpdates, setSmsUpdates] = useState(false);

  const activeTab = router.query.tab === "wishlist" ? "wishlist" : "overview";
  const wishedProducts = useMemo(
    () => products.filter((product) => wishlist.includes(product.id)),
    [wishlist],
  );

  return (
    <>
      <Seo
        title={activeTab === "wishlist" ? "Wishlist" : "Account"}
        description="Manage your Noska profile, wishlist, order history, and communication preferences."
        canonicalPath="/account"
        noindex
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <div>
            <motion.p className="text-sm font-semibold text-[#b9404f]" variants={fadeUp}>
              Account
            </motion.p>
            <motion.h1 className="mt-2 text-4xl font-semibold" variants={fadeUp}>
              Member dashboard
            </motion.h1>
          </div>
          <motion.div variants={fadeUp}>
            <Link href="/shop" className="w-fit text-sm font-semibold text-[#151515]">
              Shop new arrivals
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.aside
            className="h-fit rounded-lg border border-[#e5ddd2] bg-white p-4"
            variants={fadeUp}
          >
            <div className="flex items-center gap-3 border-b border-[#e7e1d8] pb-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#151515] text-white">
                <User size={20} />
              </span>
              <div>
                <p className="font-semibold">Noska Member</p>
                <p className="text-sm text-[#7b7167]">Premium tier</p>
              </div>
            </div>
            <nav className="mt-4 grid gap-2">
              <TabLink
                href="/account"
                active={activeTab === "overview"}
                icon={Settings}
                label="Overview"
              />
              <TabLink
                href="/account?tab=wishlist"
                active={activeTab === "wishlist"}
                icon={Heart}
                label="Wishlist"
              />
            </nav>
          </motion.aside>

          {activeTab === "wishlist" ? (
            <motion.section
              className="rounded-lg border border-[#e5ddd2] bg-white p-5"
              variants={fadeUp}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#b9404f]">Wishlist</p>
                  <h2 className="mt-1 text-2xl font-semibold">Saved dresses</h2>
                </div>
                <span className="text-sm text-[#6f6a63]">{wishedProducts.length} saved</span>
              </div>

              {wishedProducts.length === 0 ? (
                <motion.div
                  className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-lg border border-[#e7e1d8] bg-[#fbfaf8] p-8 text-center"
                  variants={staggerContainer}
                >
                  <motion.div variants={scaleIn}>
                    <Heart size={40} className="text-[#b9404f]" />
                  </motion.div>
                  <motion.h3 className="mt-4 text-xl font-semibold" variants={fadeUp}>
                    No saved dresses yet
                  </motion.h3>
                  <motion.p
                    className="mt-2 max-w-md text-sm leading-6 text-[#6f6a63]"
                    variants={fadeUp}
                  >
                    Save dresses from the collection and they will appear here.
                  </motion.p>
                  <motion.div variants={fadeUp}>
                    <Link
                      href="/shop"
                      className="mt-6 inline-flex rounded-lg bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
                    >
                      Browse collection
                    </Link>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
                  variants={staggerContainer}
                >
                  {wishedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              )}
            </motion.section>
          ) : (
            <motion.div className="space-y-6" variants={staggerContainer}>
              <motion.section className="grid gap-4 sm:grid-cols-3" variants={staggerContainer}>
                <Metric icon={ShoppingBag} label="Orders" value="12" />
                <Metric icon={Heart} label="Saved" value={String(wishedProducts.length)} />
                <Metric icon={CheckCircle2} label="Tier" value="Premium" />
              </motion.section>

              <motion.section
                className="rounded-lg border border-[#e5ddd2] bg-white p-5"
                variants={fadeUp}
              >
                <div className="flex items-center gap-2">
                  <PackageCheck size={20} className="text-[#b9404f]" />
                  <h2 className="text-xl font-semibold">Recent orders</h2>
                </div>
                <motion.div className="mt-5 space-y-4" variants={staggerContainer}>
                  {orders.map((order) => (
                    <motion.article
                      key={order.id}
                      className="rounded-lg border border-[#e7e1d8] bg-[#fbfaf8] p-4"
                      variants={fadeUp}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="mt-1 text-sm text-[#6f6a63]">{order.items}</p>
                        </div>
                        <span className="w-fit rounded-lg bg-white px-3 py-1 text-sm font-semibold text-[#1f7a5a]">
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#6f6a63]">
                        <span>{order.date}</span>
                        <span>{formatCurrency(order.total)}</span>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </motion.section>

              <motion.section
                className="rounded-lg border border-[#e5ddd2] bg-white p-5"
                variants={fadeUp}
              >
                <div className="flex items-center gap-2">
                  <Bell size={20} className="text-[#b9404f]" />
                  <h2 className="text-xl font-semibold">Preferences</h2>
                </div>
                <motion.div className="mt-5 grid gap-3 sm:grid-cols-2" variants={staggerContainer}>
                  <Preference
                    icon={Mail}
                    label="Email updates"
                    checked={emailUpdates}
                    onChange={setEmailUpdates}
                  />
                  <Preference
                    icon={Bell}
                    label="SMS alerts"
                    checked={smsUpdates}
                    onChange={setSmsUpdates}
                  />
                </motion.div>
              </motion.section>
            </motion.div>
          )}
        </motion.div>
      </section>
    </>
  );
}

function TabLink({ href, active, icon: Icon, label }) {
  return (
    <motion.div whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold ${
          active ? "bg-[#151515] text-white" : "text-[#514c45] hover:bg-[#fbfaf8]"
        }`}
      >
        <Icon size={17} />
        {label}
      </Link>
    </motion.div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <motion.div className="rounded-lg border border-[#e5ddd2] bg-white p-5" variants={fadeUp}>
      <Icon size={20} className="text-[#b9404f]" />
      <p className="mt-4 text-sm text-[#7b7167]">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </motion.div>
  );
}

function Preference({ icon: Icon, label, checked, onChange }) {
  return (
    <motion.label
      className="flex items-center justify-between rounded-lg border border-[#e7e1d8] bg-[#fbfaf8] p-4"
      variants={fadeUp}
    >
      <span className="flex items-center gap-3 font-semibold">
        <Icon size={18} className="text-[#b9404f]" />
        {label}
      </span>
      <input
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
        className="h-5 w-5 accent-[#b9404f]"
      />
    </motion.label>
  );
}
