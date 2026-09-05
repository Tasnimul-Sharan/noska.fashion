import { Eye, PackageOpen, X } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { EmptyState, PageHeading, SearchField, StatusBadge, inputClass } from "@/components/admin/AdminUi";
import { useAdmin } from "@/context/AdminContext";
import { formatCurrency } from "@/data/products";

const statuses = ["Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAdmin();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => orders.filter((order) => `${order.id} ${order.customer} ${order.email} ${order.city}`.toLowerCase().includes(query.toLowerCase()) && (status === "All" || order.status === status)), [orders, query, status]);

  return <AdminShell>
    <PageHeading eyebrow="Sales" title="Orders" description="Review incoming orders and move each one through fulfilment." />
    <section className="mt-6 overflow-hidden rounded-lg border border-[#231f20]/10 bg-white">
      <div className="grid gap-3 border-b border-[#231f20]/10 p-4 sm:grid-cols-[minmax(220px,1fr)_180px]"><SearchField value={query} onChange={setQuery} placeholder="Search order or customer" /><select className={inputClass} value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select></div>
      {filtered.length ? <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-[#231f20]/[0.03] text-[10px] uppercase tracking-widest text-[#231f20]/50"><tr><th className="px-5 py-3">Order</th><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Items</th><th className="px-5 py-3">Payment</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Total</th><th className="px-5 py-3 text-right">View</th></tr></thead><tbody className="divide-y divide-[#231f20]/10">{filtered.map((order) => <tr key={order.id}><td className="px-5 py-4"><p className="font-semibold">{order.id}</p><p className="mt-1 text-xs text-[#231f20]/45">{order.date}</p></td><td className="px-5 py-4"><p className="font-medium">{order.customer}</p><p className="mt-1 text-xs text-[#231f20]/45">{order.city}</p></td><td className="px-5 py-4">{order.items}</td><td className="px-5 py-4"><StatusBadge tone="outline">{order.payment}</StatusBadge></td><td className="px-5 py-4"><select className="h-9 rounded-lg border border-[#231f20]/15 bg-white px-2 text-xs font-semibold" value={order.status} onChange={(event) => updateOrderStatus(order.id, event.target.value)}>{statuses.map((item) => <option key={item}>{item}</option>)}</select></td><td className="px-5 py-4 font-semibold">{formatCurrency(order.total)}</td><td className="px-5 py-4 text-right"><button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#231f20]/15" onClick={() => setSelected(order)} aria-label={`View ${order.id}`} title="View order"><Eye size={15} /></button></td></tr>)}</tbody></table></div> : <EmptyState icon={PackageOpen} title="No orders found" description="Adjust your filters to find a matching order." />}
    </section>
    {selected && <OrderDrawer order={orders.find((order) => order.id === selected.id) || selected} updateStatus={updateOrderStatus} onClose={() => setSelected(null)} />}
  </AdminShell>;
}

function OrderDrawer({ order, updateStatus, onClose }) {
  return <div className="fixed inset-0 z-50"><button className="absolute inset-0 bg-[#231f20]/45" onClick={onClose} aria-label="Close order details" /><aside className="absolute inset-y-0 right-0 w-full max-w-md overflow-y-auto bg-white p-5 shadow-2xl sm:p-6"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[#231f20]/45">Order details</p><h2 className="mt-2 text-2xl font-semibold">{order.id}</h2><p className="mt-1 text-sm text-[#231f20]/50">Placed on {order.date}</p></div><button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231f20]/15" onClick={onClose} aria-label="Close"><X size={17} /></button></div><div className="mt-6 border-y border-[#231f20]/10 py-5"><p className="text-xs font-semibold text-[#231f20]/50">Customer</p><p className="mt-2 font-semibold">{order.customer}</p><p className="mt-1 text-sm text-[#231f20]/55">{order.email}</p><p className="mt-1 text-sm text-[#231f20]/55">{order.city}, Bangladesh</p></div><div className="grid grid-cols-2 gap-3 border-b border-[#231f20]/10 py-5"><div><p className="text-xs text-[#231f20]/45">Items</p><p className="mt-1 font-semibold">{order.items} pieces</p></div><div><p className="text-xs text-[#231f20]/45">Payment</p><p className="mt-1 font-semibold">{order.payment}</p></div></div><label className="mt-5 block"><span className="mb-2 block text-xs font-semibold">Fulfilment status</span><select className={inputClass} value={order.status} onChange={(event) => updateStatus(order.id, event.target.value)}>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label><div className="mt-8 flex items-center justify-between rounded-lg bg-[#231f20] p-5 text-white"><span className="text-sm text-white/60">Order total</span><strong className="text-xl">{formatCurrency(order.total)}</strong></div></aside></div>;
}
AdminOrdersPage.adminPage = true;
