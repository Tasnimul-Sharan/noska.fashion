import { Edit3, PackageSearch, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { EmptyState, PageHeading, Pagination, SearchField, StatusBadge, buttonPrimary } from "@/components/admin/AdminUi";
import { useAdmin } from "@/context/AdminContext";
import { formatCurrency } from "@/data/products";

export default function AdminProductsPage() {
  const { products, collections, deleteProduct } = useAdmin();
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => products.filter((product) => {
    const matchesQuery = `${product.name} ${product.id} ${product.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (collection === "All" || product.collection === collection) && (status === "All" || product.status === status);
  }), [collection, products, query, status]);

  const remove = (product) => {
    if (window.confirm(`Delete ${product.name}? This only affects mock admin data.`)) deleteProduct(product.id);
  };

  return (
    <AdminShell>
      <PageHeading eyebrow="Catalog" title="Products" description="Manage product information, storefront visibility, pricing and stock." actions={<Link href="/admin/products/new" className={buttonPrimary}><Plus size={16} /> Add product</Link>} />
      <div className="mt-6 rounded-lg border border-[#231f20]/10 bg-white">
        <div className="grid gap-3 border-b border-[#231f20]/10 p-4 md:grid-cols-[minmax(240px,1fr)_200px_160px]">
          <SearchField value={query} onChange={setQuery} placeholder="Search name, SKU or category" />
          <select className="h-10 rounded-lg border border-[#231f20]/15 bg-white px-3 text-sm" value={collection} onChange={(event) => setCollection(event.target.value)}><option>All</option>{collections.map((item) => <option key={item.id}>{item.name}</option>)}</select>
          <select className="h-10 rounded-lg border border-[#231f20]/15 bg-white px-3 text-sm" value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option><option>Active</option><option>Draft</option><option>Archived</option></select>
        </div>

        {filtered.length ? <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-[#231f20]/[0.03] text-[10px] uppercase tracking-widest text-[#231f20]/50"><tr><th className="px-5 py-3">Product</th><th className="px-5 py-3">Collection</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Inventory</th><th className="px-5 py-3">Price</th><th className="px-5 py-3 text-right">Actions</th></tr></thead>
              <tbody className="divide-y divide-[#231f20]/10">{filtered.map((product) => <tr key={product.id} className="hover:bg-[#231f20]/[0.015]"><td className="px-5 py-3"><div className="flex items-center gap-3"><Image src={product.image} alt="" width={44} height={56} className="h-14 w-11 rounded object-cover" /><div className="min-w-0"><p className="max-w-xs truncate font-semibold">{product.name}</p><p className="mt-1 text-xs text-[#231f20]/45">{product.id} · {product.category}</p></div></div></td><td className="px-5 py-3 text-[#231f20]/65">{product.collection}</td><td className="px-5 py-3"><StatusBadge tone={product.status === "Active" ? "dark" : "soft"}>{product.status}</StatusBadge></td><td className="px-5 py-3"><span className={product.stock <= 8 ? "font-bold" : ""}>{product.stock}</span><span className="text-[#231f20]/45"> in stock</span></td><td className="px-5 py-3 font-semibold">{formatCurrency(product.price)}</td><td className="px-5 py-3"><div className="flex justify-end gap-1"><Link href={`/admin/products/${product.id}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231f20]/15" aria-label={`Edit ${product.name}`} title="Edit product"><Edit3 size={15} /></Link><button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231f20]/15" onClick={() => remove(product)} aria-label={`Delete ${product.name}`} title="Delete product"><Trash2 size={15} /></button></div></td></tr>)}</tbody>
            </table>
          </div>
          <div className="divide-y divide-[#231f20]/10 md:hidden">{filtered.map((product) => <article key={product.id} className="p-4"><div className="flex gap-3"><Image src={product.image} alt="" width={64} height={80} className="h-20 w-16 rounded object-cover" /><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div><h2 className="line-clamp-2 text-sm font-semibold">{product.name}</h2><p className="mt-1 text-xs text-[#231f20]/45">{product.id}</p></div><StatusBadge tone={product.status === "Active" ? "dark" : "soft"}>{product.status}</StatusBadge></div><p className="mt-2 text-xs">{product.stock} in stock · {formatCurrency(product.price)}</p></div></div><div className="mt-3 flex gap-2"><Link href={`/admin/products/${product.id}`} className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-[#231f20]/15 text-xs font-semibold"><Edit3 size={14} /> Edit</Link><button className="flex h-9 w-10 items-center justify-center rounded-lg border border-[#231f20]/15" onClick={() => remove(product)} aria-label={`Delete ${product.name}`}><Trash2 size={14} /></button></div></article>)}</div>
          <Pagination count={filtered.length} label="products" />
        </> : <EmptyState icon={query ? Search : PackageSearch} title="No products found" description="Adjust the search or filters to find a product in the mock catalog." />}
      </div>
    </AdminShell>
  );
}

AdminProductsPage.adminPage = true;
