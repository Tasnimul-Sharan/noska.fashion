import { Mail, MoreHorizontal, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { EmptyState, PageHeading, SearchField, StatusBadge } from "@/components/admin/AdminUi";
import { useAdmin } from "@/context/AdminContext";
import { formatCurrency } from "@/data/products";

export default function AdminCustomersPage() {
  const { customers } = useAdmin();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => customers.filter((customer) => `${customer.name} ${customer.email} ${customer.phone}`.toLowerCase().includes(query.toLowerCase())), [customers, query]);
  const totalSpent = customers.reduce((sum, customer) => sum + customer.spent, 0);

  return <AdminShell>
    <PageHeading eyebrow="Audience" title="Customers" description="View customer profiles, order activity and lifetime value." />
    <section className="mt-6 grid gap-3 sm:grid-cols-3"><Metric label="Customer profiles" value={customers.length} /><Metric label="Returning customers" value={customers.filter((item) => item.orders > 1).length} /><Metric label="Recorded spend" value={formatCurrency(totalSpent)} /></section>
    <section className="mt-5 overflow-hidden rounded-lg border border-[#231f20]/10 bg-white">
      <div className="border-b border-[#231f20]/10 p-4"><div className="max-w-lg"><SearchField value={query} onChange={setQuery} placeholder="Search name, email or phone" /></div></div>
      {filtered.length ? <div className="overflow-x-auto"><table className="w-full min-w-[860px] text-left text-sm"><thead className="bg-[#231f20]/[0.03] text-[10px] uppercase tracking-widest text-[#231f20]/50"><tr><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Phone</th><th className="px-5 py-3">Joined</th><th className="px-5 py-3">Orders</th><th className="px-5 py-3">Spent</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-[#231f20]/10">{filtered.map((customer) => <tr key={customer.id}><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#231f20] text-xs font-bold text-white">{customer.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span><div><p className="font-semibold">{customer.name}</p><p className="mt-1 text-xs text-[#231f20]/45">{customer.email}</p></div></div></td><td className="px-5 py-4 text-[#231f20]/65">{customer.phone}</td><td className="px-5 py-4 text-[#231f20]/65">{customer.joined}</td><td className="px-5 py-4 font-semibold">{customer.orders}</td><td className="px-5 py-4 font-semibold">{formatCurrency(customer.spent)}</td><td className="px-5 py-4"><StatusBadge tone={customer.status === "VIP" ? "dark" : "soft"}>{customer.status}</StatusBadge></td><td className="px-5 py-4"><div className="flex justify-end gap-1"><a href={`mailto:${customer.email}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231f20]/15" aria-label={`Email ${customer.name}`} title="Send email"><Mail size={15} /></a><button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231f20]/15" aria-label={`More options for ${customer.name}`} title="More options"><MoreHorizontal size={16} /></button></div></td></tr>)}</tbody></table></div> : <EmptyState icon={Users} title="No customers found" description="Try another name, email address or phone number." />}
    </section>
  </AdminShell>;
}

function Metric({ label, value }) { return <div className="rounded-lg border border-[#231f20]/10 bg-white p-5"><p className="text-xs font-semibold text-[#231f20]/50">{label}</p><p className="mt-3 text-2xl font-semibold">{value}</p></div>; }
AdminCustomersPage.adminPage = true;
