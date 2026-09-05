import { ArrowRight, Banknote, PackageCheck, ShoppingBag, TriangleAlert, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeading, StatusBadge } from "@/components/admin/AdminUi";
import { useAdmin } from "@/context/AdminContext";
import { formatCurrency } from "@/data/products";

const bars = [42, 58, 47, 74, 62, 87, 76, 92, 69, 84, 96, 88];

export default function AdminDashboard() {
  const { products, orders, customers } = useAdmin();
  const revenue = orders.filter((order) => order.status !== "Cancelled").reduce((sum, order) => sum + order.total, 0);
  const lowStock = products.filter((product) => product.stock <= 8);
  const activeOrders = orders.filter((order) => !["Delivered", "Cancelled"].includes(order.status)).length;

  return (
    <AdminShell>
      <PageHeading eyebrow="Overview" title="Good afternoon, Noska" description="A clear view of store performance and the work that needs attention today." actions={<Link href="/admin/products/new" className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#231f20] px-4 text-sm font-semibold text-white"><ShoppingBag size={16} /> Add product</Link>} />

      <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Banknote} label="Mock revenue" value={formatCurrency(revenue)} note="7 recent orders" />
        <Stat icon={PackageCheck} label="Active orders" value={activeOrders} note="Awaiting completion" />
        <Stat icon={ShoppingBag} label="Products" value={products.length} note={`${products.filter((item) => item.status === "Active").length} active`} />
        <Stat icon={Users} label="Customers" value={customers.length} note="Mock customer profiles" />
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.7fr)]">
        <div className="rounded-lg border border-[#231f20]/10 bg-white">
          <div className="flex items-start justify-between border-b border-[#231f20]/10 p-5">
            <div><h2 className="font-semibold">Sales overview</h2><p className="mt-1 text-xs text-[#231f20]/50">Illustrative performance for the last 12 days</p></div>
            <select className="h-9 rounded-lg border border-[#231f20]/15 bg-white px-2 text-xs font-semibold"><option>Last 12 days</option><option>Last 30 days</option></select>
          </div>
          <div className="p-5">
            <div className="mb-6 flex items-end gap-3"><span className="text-3xl font-semibold">{formatCurrency(revenue)}</span><span className="mb-1 rounded-full bg-[#231f20] px-2 py-1 text-[10px] font-bold text-white">+18.4%</span></div>
            <div className="flex h-52 items-end gap-2 border-b border-[#231f20]/10">
              {bars.map((height, index) => <div key={index} className="group relative flex h-full flex-1 items-end"><span className="w-full rounded-t-sm bg-[#231f20]/15 transition group-hover:bg-[#231f20]" style={{ height: `${height}%` }} /><span className="pointer-events-none absolute -top-6 left-1/2 hidden -translate-x-1/2 text-[10px] font-bold group-hover:block">{height}k</span></div>)}
            </div>
            <div className="mt-3 flex justify-between text-[10px] text-[#231f20]/40"><span>Aug 25</span><span>Aug 30</span><span>Sep 05</span></div>
          </div>
        </div>

        <div className="rounded-lg border border-[#231f20]/10 bg-white">
          <div className="flex items-center justify-between border-b border-[#231f20]/10 p-5"><div><h2 className="font-semibold">Low stock</h2><p className="mt-1 text-xs text-[#231f20]/50">Items at 8 pieces or below</p></div><TriangleAlert size={18} /></div>
          <div className="divide-y divide-[#231f20]/10">
            {lowStock.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center gap-3 p-4">
                <Image src={product.image} alt="" width={40} height={48} className="h-12 w-10 rounded object-cover" />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{product.name}</p><p className="mt-0.5 text-xs text-[#231f20]/45">{product.id}</p></div>
                <StatusBadge tone={product.stock <= 3 ? "dark" : "outline"}>{product.stock} left</StatusBadge>
              </div>
            ))}
          </div>
          <Link href="/admin/inventory" className="flex h-12 items-center justify-center gap-2 border-t border-[#231f20]/10 text-xs font-semibold">Manage inventory <ArrowRight size={14} /></Link>
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-lg border border-[#231f20]/10 bg-white">
        <div className="flex items-center justify-between border-b border-[#231f20]/10 p-5"><div><h2 className="font-semibold">Recent orders</h2><p className="mt-1 text-xs text-[#231f20]/50">Latest activity across all channels</p></div><Link href="/admin/orders" className="flex items-center gap-1 text-xs font-semibold">View all <ArrowRight size={14} /></Link></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#231f20]/[0.035] text-[10px] uppercase tracking-widest text-[#231f20]/50"><tr><th className="px-5 py-3">Order</th><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Total</th></tr></thead>
            <tbody className="divide-y divide-[#231f20]/10">{orders.slice(0, 5).map((order) => <tr key={order.id}><td className="px-5 py-4 font-semibold">{order.id}</td><td className="px-5 py-4"><p className="font-medium">{order.customer}</p><p className="text-xs text-[#231f20]/45">{order.city}</p></td><td className="px-5 py-4 text-[#231f20]/60">{order.date}</td><td className="px-5 py-4"><StatusBadge tone={order.status === "Delivered" ? "dark" : "soft"}>{order.status}</StatusBadge></td><td className="px-5 py-4 text-right font-semibold">{formatCurrency(order.total)}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}

function Stat({ icon: Icon, label, value, note }) {
  return <div className="rounded-lg border border-[#231f20]/10 bg-white p-5"><div className="flex items-center justify-between"><p className="text-xs font-semibold text-[#231f20]/50">{label}</p><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#231f20] text-white"><Icon size={17} /></span></div><p className="mt-5 text-2xl font-semibold">{value}</p><p className="mt-1 text-xs text-[#231f20]/45">{note}</p></div>;
}

AdminDashboard.adminPage = true;
