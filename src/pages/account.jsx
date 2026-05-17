import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Heart,
  Lock,
  Mail,
  PackageCheck,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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
    payment: "bKash verified",
    delivery: "Express delivery",
    address: "Banani, Dhaka",
    timeline: ["Order placed", "Payment verified", "Packed", "Out for delivery"],
    lines: [
      { name: "Celeste Satin Midi", quantity: 1, price: 7800 },
      { name: "Zuri Print Shirt Dress", quantity: 1, price: 5900 },
    ],
  },
  {
    id: "NS-391028",
    status: "Delivered",
    date: "April 28, 2026",
    total: 11800,
    payment: "Cash on delivery",
    delivery: "Standard delivery",
    address: "Gulshan, Dhaka",
    timeline: ["Order placed", "Packed", "Out for delivery", "Delivered"],
    lines: [{ name: "Noor Embroidered Anarkali", quantity: 1, price: 11800 }],
  },
];

export default function AccountPage() {
  const router = useRouter();
  const { wishlist } = useShop();
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [smsUpdates, setSmsUpdates] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [expandedOrder, setExpandedOrder] = useState(orders[0].id);

  const activeTab = getActiveTab(router.query.tab);
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
              <TabLink href="/account" active={activeTab === "overview"} icon={Settings} label="Overview" />
              <TabLink href="/account?tab=orders" active={activeTab === "orders"} icon={PackageCheck} label="Orders" />
              <TabLink href="/login" active={activeTab === "login"} icon={Lock} label="Login / Register" />
              <TabLink href="/wishlist" active={activeTab === "wishlist"} icon={Heart} label="Wishlist" />
            </nav>
          </motion.aside>

          {activeTab === "orders" ? (
            <OrdersPanel
              expandedOrder={expandedOrder}
              setExpandedOrder={setExpandedOrder}
            />
          ) : activeTab === "login" ? (
            <AuthPanel authMode={authMode} setAuthMode={setAuthMode} />
          ) : activeTab === "wishlist" ? (
            <WishlistPreview wishedProducts={wishedProducts} />
          ) : (
            <OverviewPanel
              emailUpdates={emailUpdates}
              setEmailUpdates={setEmailUpdates}
              setSmsUpdates={setSmsUpdates}
              smsUpdates={smsUpdates}
              wishedProducts={wishedProducts}
            />
          )}
        </motion.div>
      </section>
    </>
  );
}

function OverviewPanel({
  emailUpdates,
  setEmailUpdates,
  setSmsUpdates,
  smsUpdates,
  wishedProducts,
}) {
  return (
    <motion.div className="space-y-6" variants={staggerContainer}>
      <motion.section className="grid gap-4 sm:grid-cols-3" variants={staggerContainer}>
        <Metric icon={ShoppingBag} label="Orders" value="12" />
        <Metric icon={Heart} label="Saved" value={String(wishedProducts.length)} />
        <Metric icon={CheckCircle2} label="Tier" value="Premium" />
      </motion.section>

      <OrdersPanel compact expandedOrder={orders[0].id} setExpandedOrder={() => {}} />

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
  );
}

function OrdersPanel({ compact = false, expandedOrder, setExpandedOrder }) {
  const visibleOrders = compact ? orders.slice(0, 1) : orders;

  return (
    <motion.section
      className="rounded-lg border border-[#e5ddd2] bg-white p-5"
      variants={fadeUp}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <PackageCheck size={20} className="text-[#b9404f]" />
          <h2 className="text-xl font-semibold">Order history</h2>
        </div>
        {compact && (
          <Link href="/account?tab=orders" className="text-sm font-semibold text-[#151515]">
            View all orders
          </Link>
        )}
      </div>
      <motion.div className="mt-5 space-y-4" variants={staggerContainer}>
        {visibleOrders.map((order) => {
          const expanded = expandedOrder === order.id;

          return (
            <motion.article
              key={order.id}
              className="rounded-lg border border-[#e7e1d8] bg-[#fbfaf8] p-4"
              variants={fadeUp}
            >
              <button
                className="flex w-full flex-col gap-3 text-left sm:flex-row sm:items-start sm:justify-between"
                type="button"
                onClick={() => setExpandedOrder(expanded ? null : order.id)}
              >
                <span>
                  <span className="block font-semibold">{order.id}</span>
                  <span className="mt-1 block text-sm text-[#6f6a63]">
                    {order.date} · {formatCurrency(order.total)}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-fit rounded-lg bg-white px-3 py-1 text-sm font-semibold text-[#1f7a5a]">
                    {order.status}
                  </span>
                  <ChevronDown
                    size={17}
                    className={`transition ${expanded ? "rotate-180" : ""}`}
                  />
                </span>
              </button>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    className="mt-4 border-t border-[#e7e1d8] pt-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="grid gap-3 text-sm sm:grid-cols-3">
                      <SummaryTile label="Payment" value={order.payment} />
                      <SummaryTile label="Delivery" value={order.delivery} />
                      <SummaryTile label="Address" value={order.address} />
                    </div>
                    <div className="mt-4 grid gap-2">
                      {order.lines.map((line) => (
                        <div
                          key={line.name}
                          className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm"
                        >
                          <span>
                            {line.name} x {line.quantity}
                          </span>
                          <span className="font-semibold">{formatCurrency(line.price)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {order.timeline.map((step) => (
                        <span
                          key={step}
                          className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-[#514c45]"
                        >
                          {step}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </motion.div>
    </motion.section>
  );
}

function AuthPanel({ authMode, setAuthMode }) {
  const isRegister = authMode === "register";

  return (
    <motion.section
      className="rounded-lg border border-[#e5ddd2] bg-white p-5"
      variants={fadeUp}
    >
      <div>
        <p className="text-sm font-semibold text-[#b9404f]">Member access</p>
        <h2 className="mt-1 text-2xl font-semibold">
          {isRegister ? "Create your account" : "Login to Noska"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#6f6a63]">
          Demo account form for order history, wishlist, and member preferences.
        </p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 rounded-lg bg-[#fbfaf8] p-1">
        {["login", "register"].map((mode) => (
          <button
            key={mode}
            className={`h-10 rounded-lg text-sm font-semibold capitalize ${
              authMode === mode ? "bg-[#151515] text-white" : "text-[#514c45]"
            }`}
            type="button"
            onClick={() => setAuthMode(mode)}
          >
            {mode}
          </button>
        ))}
      </div>
      <form className="mt-5 grid gap-4" onSubmit={(event) => event.preventDefault()}>
        {isRegister && (
          <Field label="Full name" placeholder="Noska Member" type="text" />
        )}
        <Field label="Email" placeholder="you@example.com" type="email" />
        <Field label="Password" placeholder="Minimum 8 characters" type="password" />
        {isRegister && <Field label="Phone" placeholder="+8801XXXXXXXXX" type="tel" />}
        <button
          className="focus-ring h-12 rounded-lg bg-[#b9404f] px-5 text-sm font-semibold text-white"
          type="submit"
        >
          {isRegister ? "Create account" : "Login"}
        </button>
      </form>
    </motion.section>
  );
}

function WishlistPreview({ wishedProducts }) {
  return (
    <motion.section
      className="rounded-lg border border-[#e5ddd2] bg-white p-5"
      variants={fadeUp}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#b9404f]">Wishlist</p>
          <h2 className="mt-1 text-2xl font-semibold">Saved dresses</h2>
        </div>
        <Link href="/wishlist" className="text-sm font-semibold text-[#151515]">
          Manage wishlist
        </Link>
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
        </motion.div>
      ) : (
        <motion.div
          className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer}
        >
          {wishedProducts.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}
    </motion.section>
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

function SummaryTile({ label, value }) {
  return (
    <div className="rounded-lg bg-white p-3">
      <p className="text-xs font-semibold uppercase text-[#7b7167]">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function Field({ label, placeholder, type }) {
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div>
      <label className="text-sm font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="focus-ring mt-2 h-11 w-full rounded-lg border border-[#ded6ca] bg-[#fbfaf8] px-3 text-sm outline-none"
        placeholder={placeholder}
        type={type}
        required
      />
    </div>
  );
}

function getActiveTab(tab) {
  if (["orders", "login", "wishlist"].includes(tab)) {
    return tab;
  }

  return "overview";
}
