import { Check, Cloud, Database, ExternalLink, RefreshCcw, Save, Server, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeading, StatusBadge, buttonPrimary, buttonSecondary, inputClass } from "@/components/admin/AdminUi";
import { useAdmin } from "@/context/AdminContext";

export default function AdminSettingsPage() {
  const { resetDemoData } = useAdmin();
  const [saved, setSaved] = useState(false);
  const [store, setStore] = useState({ name: "Noska", email: "support@noska.com", phone: "01232300344", currency: "BDT", country: "Bangladesh" });
  const update = (key, value) => setStore((current) => ({ ...current, [key]: value }));
  const save = (event) => { event.preventDefault(); setSaved(true); window.setTimeout(() => setSaved(false), 1600); };
  const reset = () => { if (window.confirm("Reset products, collections and orders to the original mock data?")) resetDemoData(); };

  return <AdminShell>
    <PageHeading eyebrow="Configuration" title="Settings" description="Store details and the service connections planned for production." />
    <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
      <form className="rounded-lg border border-[#231f20]/10 bg-white" onSubmit={save}>
        <div className="border-b border-[#231f20]/10 p-5"><h2 className="font-semibold">Store profile</h2><p className="mt-1 text-xs text-[#231f20]/50">Used in customer communication and store metadata.</p></div>
        <div className="grid gap-4 p-5 sm:grid-cols-2"><Field label="Store name"><input className={inputClass} value={store.name} onChange={(event) => update("name", event.target.value)} /></Field><Field label="Support email"><input className={inputClass} type="email" value={store.email} onChange={(event) => update("email", event.target.value)} /></Field><Field label="Support phone"><input className={inputClass} value={store.phone} onChange={(event) => update("phone", event.target.value)} /></Field><Field label="Country"><input className={inputClass} value={store.country} onChange={(event) => update("country", event.target.value)} /></Field><Field label="Store currency"><select className={inputClass} value={store.currency} onChange={(event) => update("currency", event.target.value)}><option>BDT</option><option>USD</option></select></Field></div>
        <div className="flex justify-end border-t border-[#231f20]/10 p-5"><button className={buttonPrimary} type="submit">{saved ? <Check size={16} /> : <Save size={16} />}{saved ? "Saved" : "Save settings"}</button></div>
      </form>

      <div className="grid content-start gap-5">
        <section className="rounded-lg border border-[#231f20]/10 bg-white"><div className="border-b border-[#231f20]/10 p-5"><h2 className="font-semibold">Service connections</h2><p className="mt-1 text-xs text-[#231f20]/50">Architecture status for this workspace.</p></div><div className="divide-y divide-[#231f20]/10"><Integration icon={Server} name="Next.js + Vercel" detail="Application and deployment" status="Connected" /><Integration icon={Database} name="Supabase" detail="Database and authentication" status="Setup ready" /><Integration icon={Cloud} name="Cloudinary" detail="Product image delivery" status="Setup ready" /></div><div className="border-t border-[#231f20]/10 p-4 text-xs leading-5 text-[#231f20]/50">Production keys should be added through Vercel environment variables, never stored in this interface.</div></section>
        <section className="rounded-lg border border-[#231f20]/10 bg-white p-5"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#231f20] text-white"><ShieldCheck size={18} /></span><h2 className="mt-4 font-semibold">Demo data controls</h2><p className="mt-1 text-xs leading-5 text-[#231f20]/50">Restore the local catalog, orders and collections to their original mock state.</p><button className={`${buttonSecondary} mt-4 w-full`} onClick={reset}><RefreshCcw size={15} /> Reset mock data</button></section>
      </div>
    </div>
  </AdminShell>;
}

function Integration({ icon: Icon, name, detail, status }) { return <div className="flex items-center gap-3 p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#231f20]/[0.06]"><Icon size={18} /></span><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{name}</p><p className="mt-0.5 text-xs text-[#231f20]/45">{detail}</p></div><StatusBadge tone={status === "Connected" ? "dark" : "outline"}>{status}</StatusBadge></div>; }
function Field({ label, children }) { return <label className="block"><span className="mb-2 block text-xs font-semibold">{label}</span>{children}</label>; }
AdminSettingsPage.adminPage = true;
