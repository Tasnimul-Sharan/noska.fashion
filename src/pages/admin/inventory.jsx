import { Boxes, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeading, SearchField, StatusBadge } from "@/components/admin/AdminUi";
import { useAdmin } from "@/context/AdminContext";

export default function AdminInventoryPage() {
  const { products, updateStock } = useAdmin();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("All");
  const filtered = useMemo(() => products.filter((product) => `${product.name} ${product.id}`.toLowerCase().includes(query.toLowerCase()) && (mode === "All" || (mode === "Low stock" && product.stock <= 8) || (mode === "Out of stock" && product.stock === 0))), [mode, products, query]);
  const stockTotal = products.reduce((sum, product) => sum + product.stock, 0);

  return <AdminShell>
    <PageHeading eyebrow="Operations" title="Inventory" description="Keep catalog quantities accurate. Mock changes are saved automatically on this device." />
    <section className="mt-6 grid gap-3 sm:grid-cols-3"><Metric label="Total units" value={stockTotal} /><Metric label="Low stock products" value={products.filter((item) => item.stock > 0 && item.stock <= 8).length} /><Metric label="Out of stock" value={products.filter((item) => item.stock === 0).length} /></section>
    <section className="mt-5 overflow-hidden rounded-lg border border-[#231f20]/10 bg-white">
      <div className="grid gap-3 border-b border-[#231f20]/10 p-4 sm:grid-cols-[minmax(220px,1fr)_180px]"><SearchField value={query} onChange={setQuery} placeholder="Search product or SKU" /><select className="h-10 rounded-lg border border-[#231f20]/15 bg-white px-3 text-sm" value={mode} onChange={(event) => setMode(event.target.value)}><option>All</option><option>Low stock</option><option>Out of stock</option></select></div>
      <div className="divide-y divide-[#231f20]/10">{filtered.map((product) => <article key={product.id} className="grid gap-4 p-4 md:grid-cols-[minmax(260px,1fr)_160px_190px] md:items-center md:px-5"><div className="flex min-w-0 items-center gap-3"><Image src={product.image} alt="" width={44} height={56} className="h-14 w-11 rounded object-cover" /><div className="min-w-0"><p className="truncate text-sm font-semibold">{product.name}</p><p className="mt-1 text-xs text-[#231f20]/45">{product.id} · {product.sizes.join(", ")}</p></div></div><div><StatusBadge tone={product.stock === 0 ? "dark" : product.stock <= 8 ? "outline" : "soft"}>{product.stock === 0 ? "Out of stock" : product.stock <= 8 ? "Low stock" : "In stock"}</StatusBadge></div><div className="flex h-10 items-center justify-between rounded-lg border border-[#231f20]/15 bg-white"><button className="flex h-10 w-10 items-center justify-center" onClick={() => updateStock(product.id, product.stock - 1)} aria-label={`Decrease ${product.name} stock`}><Minus size={15} /></button><input className="w-16 bg-transparent text-center text-sm font-bold outline-none" type="number" min="0" value={product.stock} onChange={(event) => updateStock(product.id, event.target.value)} aria-label={`${product.name} stock`} /><button className="flex h-10 w-10 items-center justify-center" onClick={() => updateStock(product.id, product.stock + 1)} aria-label={`Increase ${product.name} stock`}><Plus size={15} /></button></div></article>)}</div>
      {!filtered.length && <div className="flex min-h-56 flex-col items-center justify-center p-8 text-center"><Boxes size={25} /><p className="mt-3 font-semibold">No inventory matches this view</p><p className="mt-1 text-sm text-[#231f20]/50">Try a different filter or search term.</p></div>}
    </section>
  </AdminShell>;
}

function Metric({ label, value }) { return <div className="rounded-lg border border-[#231f20]/10 bg-white p-5"><p className="text-xs font-semibold text-[#231f20]/50">{label}</p><p className="mt-3 text-2xl font-semibold">{value}</p></div>; }
AdminInventoryPage.adminPage = true;
