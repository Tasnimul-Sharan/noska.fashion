import {
  Bell,
  Check,
  ChevronDown,
  CircleUserRound,
  Heart,
  LogOut,
  MapPin,
  PackageCheck,
  Pencil,
  Plus,
  ShoppingBag,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { CustomerGuard } from "@/components/customer/CustomerGuard";
import { ProductCard } from "@/components/ProductCard";
import { Seo } from "@/components/Seo";
import { useCustomer } from "@/context/CustomerContext";
import { useShop } from "@/context/ShopContext";
import { formatCurrency, products } from "@/data/products";
import { fadeUp, staggerContainer } from "@/lib/motion";

const tabs = [
  { id: "overview", label: "Overview", icon: CircleUserRound },
  { id: "orders", label: "Orders", icon: PackageCheck },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "profile", label: "Profile", icon: UserRound },
];

export default function AccountPage() {
  const router = useRouter();
  const customer = useCustomer();
  const { wishlist } = useShop();
  const activeTab = tabs.some((tab) => tab.id === router.query.tab) ? router.query.tab : "overview";
  const wishedProducts = useMemo(() => products.filter((product) => wishlist.includes(product.id)), [wishlist]);

  const logout = () => {
    customer.logout();
    router.push("/login");
  };

  return (
    <CustomerGuard>
      <Seo title="My Account" description="Manage your Noska profile, orders, wishlist and delivery addresses." canonicalPath="/account" noindex />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <motion.header className="flex flex-col gap-5 border-b border-[#231f20]/12 pb-7 sm:flex-row sm:items-end sm:justify-between" initial="hidden" animate="show" variants={staggerContainer}>
          <div><motion.p className="text-xs font-bold uppercase tracking-[0.16em] text-[#231f20]/50" variants={fadeUp}>My account</motion.p><motion.h1 className="mt-2 text-3xl font-semibold sm:text-4xl" variants={fadeUp}>Hello, {firstName(customer.profile.name)}</motion.h1><motion.p className="mt-2 text-sm text-[#231f20]/55" variants={fadeUp}>{customer.profile.email} · {customer.profile.tier} member</motion.p></div>
          <motion.div className="flex gap-2" variants={fadeUp}><Link href="/shop" className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#231f20] px-4 text-sm font-semibold text-white"><ShoppingBag size={16} /> Continue shopping</Link><button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#231f20]/20" onClick={logout} aria-label="Log out" title="Log out"><LogOut size={16} /></button></motion.div>
        </motion.header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
          <aside className="h-fit overflow-x-auto rounded-lg border border-[#231f20]/10 bg-white p-2 lg:sticky lg:top-24">
            <nav className="flex min-w-max gap-1 lg:grid lg:min-w-0">{tabs.map(({ id, label, icon: Icon }) => <Link key={id} href={id === "overview" ? "/account" : `/account?tab=${id}`} className={`flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition ${activeTab === id ? "bg-[#231f20] text-white" : "text-[#231f20]/60 hover:bg-[#231f20]/[0.04] hover:text-[#231f20]"}`}><Icon size={17} />{label}</Link>)}</nav>
          </aside>

          <motion.main key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
            {activeTab === "orders" && <OrdersPanel orders={customer.orders} />}
            {activeTab === "wishlist" && <WishlistPanel items={wishedProducts} />}
            {activeTab === "addresses" && <AddressesPanel />}
            {activeTab === "profile" && <ProfilePanel />}
            {activeTab === "overview" && <OverviewPanel wishedCount={wishedProducts.length} />}
          </motion.main>
        </div>
      </section>
    </CustomerGuard>
  );
}

function OverviewPanel({ wishedCount }) {
  const { orders, addresses, profile } = useCustomer();
  const activeOrder = orders.find((order) => order.status !== "Delivered");
  const defaultAddress = addresses.find((address) => address.isDefault) || addresses[0];
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  return <div className="grid gap-5">
    <section className="grid gap-3 sm:grid-cols-3"><Metric icon={PackageCheck} label="Orders" value={String(orders.length)} /><Metric icon={Heart} label="Saved pieces" value={String(wishedCount)} /><Metric icon={ShoppingBag} label="Total spend" value={formatCurrency(totalSpent)} /></section>
    {activeOrder && <section className="rounded-lg border border-[#231f20]/10 bg-[#231f20] p-5 text-white sm:p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-white/50">Current order</p><h2 className="mt-2 text-xl font-semibold">{activeOrder.id}</h2><p className="mt-2 text-sm text-white/60">{activeOrder.status} · {activeOrder.tracking}</p></div><Link href="/account?tab=orders" className="inline-flex h-9 items-center justify-center rounded-lg border border-white/20 px-3 text-xs font-semibold">Track order</Link></div><div className="mt-6 grid grid-cols-4 gap-2">{["Placed", "Confirmed", "Packed", "On the way"].map((step, index) => <div key={step}><span className={`block h-1 rounded-full ${index < 3 ? "bg-white" : "bg-white/20"}`} /><p className="mt-2 text-[10px] text-white/50">{step}</p></div>)}</div></section>}
    <section className="grid gap-5 md:grid-cols-2"><div className="rounded-lg border border-[#231f20]/10 bg-white p-5"><div className="flex items-center justify-between"><h2 className="font-semibold">Default address</h2><Link href="/account?tab=addresses" className="text-xs font-semibold">Manage</Link></div>{defaultAddress ? <div className="mt-5 text-sm leading-6"><p className="font-semibold">{defaultAddress.label}</p><p className="mt-1 text-[#231f20]/55">{defaultAddress.name}<br />{defaultAddress.address}<br />{defaultAddress.city} {defaultAddress.postcode}<br />{defaultAddress.phone}</p></div> : <p className="mt-5 text-sm text-[#231f20]/50">No saved address yet.</p>}</div><div className="rounded-lg border border-[#231f20]/10 bg-white p-5"><h2 className="font-semibold">Member details</h2><dl className="mt-5 grid gap-3 text-sm"><InfoRow label="Membership" value={profile.tier} /><InfoRow label="Email" value={profile.email} /><InfoRow label="Phone" value={profile.phone || "Not added"} /></dl><Link href="/account?tab=profile" className="mt-5 inline-flex text-xs font-semibold">Update profile</Link></div></section>
  </div>;
}

function OrdersPanel({ orders }) {
  const [expanded, setExpanded] = useState(orders[0]?.id || null);
  return <section className="rounded-lg border border-[#231f20]/10 bg-white"><PanelHeading title="Order history" description="Review purchases, delivery status and tracking details." />{orders.length ? <div className="divide-y divide-[#231f20]/10">{orders.map((order) => { const open = expanded === order.id; return <article key={order.id} className="p-4 sm:p-5"><button className="grid w-full gap-3 text-left sm:grid-cols-[1fr_150px_130px_auto] sm:items-center" onClick={() => setExpanded(open ? null : order.id)}><span><strong className="block text-sm">{order.id}</strong><small className="mt-1 block text-[#231f20]/45">{formatDate(order.date)} · {order.lines.length} item(s)</small></span><span className="text-sm font-semibold">{formatCurrency(order.total)}</span><span className="w-fit rounded-full bg-[#231f20]/[0.07] px-3 py-1 text-xs font-bold">{order.status}</span><ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} /></button><AnimatePresence>{open && <motion.div className="overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><div className="mt-5 grid gap-5 border-t border-[#231f20]/10 pt-5 md:grid-cols-[1fr_220px]"><div className="grid gap-2">{order.lines.map((line) => <div key={line.name} className="flex justify-between rounded-lg bg-[#231f20]/[0.03] px-3 py-3 text-sm"><span>{line.name} × {line.quantity}</span><strong>{formatCurrency(line.price * line.quantity)}</strong></div>)}</div><div className="text-xs leading-5 text-[#231f20]/55"><p><strong className="text-[#231f20]">Tracking</strong><br />{order.tracking}</p><p className="mt-3"><strong className="text-[#231f20]">Delivery</strong><br />{order.delivery}<br />{order.address}</p><p className="mt-3"><strong className="text-[#231f20]">Payment</strong><br />{order.payment}</p></div></div></motion.div>}</AnimatePresence></article>; })}</div> : <Empty icon={PackageCheck} title="No orders yet" text="Your completed checkouts will appear here." action="Browse products" href="/shop" />}</section>;
}

function WishlistPanel({ items }) {
  return <section className="rounded-lg border border-[#231f20]/10 bg-white"><PanelHeading title="Your wishlist" description="Saved pieces stay ready for your next order." />{items.length ? <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <Empty icon={Heart} title="Your wishlist is empty" text="Tap the heart on any product to save it here." action="Explore the shop" href="/shop" />}</section>;
}

function AddressesPanel() {
  const { addresses, saveAddress, deleteAddress, setDefaultAddress } = useCustomer();
  const [editing, setEditing] = useState(null);
  return <section className="rounded-lg border border-[#231f20]/10 bg-white"><PanelHeading title="Delivery addresses" description="Save addresses for faster checkout." action={<button className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#231f20] px-3 text-xs font-semibold text-white" onClick={() => setEditing(emptyAddress)}><Plus size={14} /> Add address</button>} />{addresses.length ? <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">{addresses.map((address) => <article key={address.id} className="rounded-lg border border-[#231f20]/12 p-4"><div className="flex items-start justify-between"><div><div className="flex items-center gap-2"><h3 className="font-semibold">{address.label}</h3>{address.isDefault && <span className="rounded-full bg-[#231f20] px-2 py-1 text-[10px] font-bold text-white">Default</span>}</div><p className="mt-3 text-sm leading-6 text-[#231f20]/55">{address.name}<br />{address.address}<br />{address.city} {address.postcode}<br />{address.phone}</p></div><div className="flex gap-1"><button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#231f20]/15" onClick={() => setEditing(address)} aria-label={`Edit ${address.label}`}><Pencil size={14} /></button><button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#231f20]/15" onClick={() => { if (window.confirm(`Remove ${address.label} address?`)) deleteAddress(address.id); }} aria-label={`Delete ${address.label}`}><Trash2 size={14} /></button></div></div>{!address.isDefault && <button className="mt-4 text-xs font-semibold" onClick={() => setDefaultAddress(address.id)}>Set as default</button>}</article>)}</div> : <Empty icon={MapPin} title="No saved addresses" text="Add a delivery address for a quicker checkout." action="Add address" onAction={() => setEditing(emptyAddress)} />}{editing && <AddressDialog initial={editing} onClose={() => setEditing(null)} onSave={(value) => { saveAddress(value); setEditing(null); }} />}</section>;
}

function ProfilePanel() {
  const { profile, preferences, updateProfile, updatePreference } = useCustomer();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return <div className="grid gap-5"><form className="rounded-lg border border-[#231f20]/10 bg-white" onSubmit={(event) => { event.preventDefault(); updateProfile(form); setSaved(true); window.setTimeout(() => setSaved(false), 1500); }}><PanelHeading title="Profile details" description="Keep your contact information up to date." /><div className="grid gap-4 p-5 sm:grid-cols-2"><Field label="Full name"><input className={inputClass} value={form.name} onChange={(event) => update("name", event.target.value)} required /></Field><Field label="Email address"><input className={inputClass} type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required /></Field><Field label="Phone number"><input className={inputClass} value={form.phone} onChange={(event) => update("phone", event.target.value)} /></Field><Field label="Birthday"><input className={inputClass} type="date" value={form.birthday || ""} onChange={(event) => update("birthday", event.target.value)} /></Field></div><div className="flex justify-end border-t border-[#231f20]/10 p-5"><button className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#231f20] px-4 text-sm font-semibold text-white">{saved ? <Check size={16} /> : <UserRound size={16} />}{saved ? "Saved" : "Save profile"}</button></div></form><section className="rounded-lg border border-[#231f20]/10 bg-white"><PanelHeading title="Communication preferences" description="Choose how Noska may contact you." /><div className="grid gap-3 p-5 sm:grid-cols-3"><Preference icon={Bell} label="Email updates" checked={preferences.email} onChange={(value) => updatePreference("email", value)} /><Preference icon={Bell} label="SMS alerts" checked={preferences.sms} onChange={(value) => updatePreference("sms", value)} /><Preference icon={Bell} label="WhatsApp" checked={preferences.whatsapp} onChange={(value) => updatePreference("whatsapp", value)} /></div></section></div>;
}

const emptyAddress = { id: "", label: "Home", name: "", phone: "", address: "", city: "Dhaka", postcode: "", isDefault: false };

function AddressDialog({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#231f20]/55 sm:items-center sm:p-4"><button className="absolute inset-0" onClick={onClose} aria-label="Close address form" /><form className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-lg bg-white p-5 sm:max-w-xl sm:rounded-lg sm:p-6" onSubmit={(event) => { event.preventDefault(); onSave(form); }}><div className="flex items-start justify-between"><div><h2 className="text-xl font-semibold">{form.id ? "Edit address" : "Add address"}</h2><p className="mt-1 text-sm text-[#231f20]/50">Delivery information for future orders.</p></div><button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231f20]/15" onClick={onClose} aria-label="Close"><X size={17} /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><Field label="Label"><input className={inputClass} value={form.label} onChange={(event) => update("label", event.target.value)} required /></Field><Field label="Recipient"><input className={inputClass} value={form.name} onChange={(event) => update("name", event.target.value)} required /></Field><Field label="Phone"><input className={inputClass} value={form.phone} onChange={(event) => update("phone", event.target.value)} required /></Field><Field label="City"><input className={inputClass} value={form.city} onChange={(event) => update("city", event.target.value)} required /></Field><Field label="Street address" className="sm:col-span-2"><textarea className={`${inputClass} min-h-20 py-3`} value={form.address} onChange={(event) => update("address", event.target.value)} required /></Field><Field label="Postcode"><input className={inputClass} value={form.postcode} onChange={(event) => update("postcode", event.target.value)} /></Field><label className="flex items-end"><span className="flex h-11 w-full items-center gap-2 rounded-lg border border-[#231f20]/15 px-3 text-sm font-semibold"><input type="checkbox" checked={form.isDefault} onChange={(event) => update("isDefault", event.target.checked)} /> Default address</span></label></div><div className="mt-6 flex justify-end gap-2"><button type="button" className="h-10 rounded-lg border border-[#231f20]/20 px-4 text-sm font-semibold" onClick={onClose}>Cancel</button><button className="h-10 rounded-lg bg-[#231f20] px-4 text-sm font-semibold text-white">Save address</button></div></form></div>;
}

function PanelHeading({ title, description, action }) { return <div className="flex flex-col gap-3 border-b border-[#231f20]/10 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold">{title}</h2><p className="mt-1 text-xs text-[#231f20]/50">{description}</p></div>{action}</div>; }
function Metric({ icon: Icon, label, value }) { return <div className="rounded-lg border border-[#231f20]/10 bg-white p-5"><Icon size={18} /><p className="mt-4 text-xs font-semibold text-[#231f20]/45">{label}</p><p className="mt-1 text-xl font-semibold">{value}</p></div>; }
function InfoRow({ label, value }) { return <div className="flex items-start justify-between gap-4"><dt className="text-[#231f20]/45">{label}</dt><dd className="text-right font-semibold">{value}</dd></div>; }
function Preference({ icon: Icon, label, checked, onChange }) { return <label className="flex min-h-12 items-center justify-between gap-3 rounded-lg border border-[#231f20]/12 px-3 text-sm font-semibold"><span className="flex items-center gap-2"><Icon size={15} />{label}</span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-[#231f20]" /></label>; }
function Field({ label, className = "", children }) { return <label className={`block ${className}`}><span className="mb-2 block text-xs font-semibold">{label}</span>{children}</label>; }
function Empty({ icon: Icon, title, text, action, href, onAction }) { const className = "mt-5 inline-flex h-10 items-center rounded-lg bg-[#231f20] px-4 text-sm font-semibold text-white"; return <div className="flex min-h-72 flex-col items-center justify-center p-8 text-center"><Icon size={28} /><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-1 text-sm text-[#231f20]/50">{text}</p>{href ? <Link href={href} className={className}>{action}</Link> : <button className={className} onClick={onAction}>{action}</button>}</div>; }
function firstName(name) { return name?.trim().split(" ")[0] || "Member"; }
function formatDate(value) { return new Intl.DateTimeFormat("en-BD", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value)); }
const inputClass = "h-11 w-full rounded-lg border border-[#231f20]/15 bg-white px-3 text-sm outline-none focus:border-[#231f20]/40 focus:ring-2 focus:ring-[#231f20]/10";
