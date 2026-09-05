import { Edit3, FolderPlus, ImageIcon, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeading, StatusBadge, buttonPrimary, buttonSecondary, inputClass } from "@/components/admin/AdminUi";
import { useAdmin } from "@/context/AdminContext";

const emptyCollection = { id: "", name: "", slug: "", description: "", image: "", featured: false, status: "Active" };

export default function AdminCollectionsPage() {
  const { collections, products, saveCollection, deleteCollection } = useAdmin();
  const [editing, setEditing] = useState(null);

  const remove = (collection) => {
    const count = products.filter((product) => product.collection === collection.name).length;
    if (window.confirm(`Delete ${collection.name}? ${count} product(s) will keep their existing collection name.`)) deleteCollection(collection.id);
  };

  return (
    <AdminShell>
      <PageHeading eyebrow="Merchandising" title="Collections" description="Organize the catalog into focused edits for the storefront." actions={<button className={buttonPrimary} onClick={() => setEditing(emptyCollection)}><Plus size={16} /> Add collection</button>} />
      <section className="mt-6 overflow-hidden rounded-lg border border-[#231f20]/10 bg-white">
        <div className="hidden grid-cols-[88px_minmax(220px,1fr)_120px_120px_110px] gap-4 border-b border-[#231f20]/10 bg-[#231f20]/[0.03] px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[#231f20]/50 md:grid"><span>Image</span><span>Collection</span><span>Products</span><span>Status</span><span className="text-right">Actions</span></div>
        <div className="divide-y divide-[#231f20]/10">
          {collections.map((collection) => {
            const count = products.filter((product) => product.collection === collection.name).length;
            return (
              <article key={collection.id} className="grid gap-4 p-4 md:grid-cols-[88px_minmax(220px,1fr)_120px_120px_110px] md:items-center md:px-5">
                {collection.image ? <span className="relative block h-20 w-full overflow-hidden rounded md:h-16"><Image src={collection.image} alt="" fill sizes="88px" className="object-cover" /></span> : <span className="flex h-16 w-full items-center justify-center rounded bg-[#231f20]/[0.05]"><ImageIcon size={18} /></span>}
                <div className="min-w-0"><div className="flex items-center gap-2"><h2 className="truncate font-semibold">{collection.name}</h2>{collection.featured && <StatusBadge tone="soft">Featured</StatusBadge>}</div><p className="mt-1 line-clamp-2 text-xs leading-5 text-[#231f20]/50">{collection.description}</p><p className="mt-1 text-[11px] text-[#231f20]/35">/{collection.slug}</p></div>
                <p className="text-sm"><span className="font-semibold">{count}</span> <span className="text-[#231f20]/45">products</span></p>
                <StatusBadge tone={collection.status === "Active" ? "dark" : "soft"}>{collection.status}</StatusBadge>
                <div className="flex justify-end gap-1"><button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231f20]/15" onClick={() => setEditing(collection)} aria-label={`Edit ${collection.name}`} title="Edit collection"><Edit3 size={15} /></button><button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231f20]/15" onClick={() => remove(collection)} aria-label={`Delete ${collection.name}`} title="Delete collection"><Trash2 size={15} /></button></div>
              </article>
            );
          })}
        </div>
      </section>
      {editing && <CollectionDialog initial={editing} onClose={() => setEditing(null)} onSave={(value) => { saveCollection(value); setEditing(null); }} />}
    </AdminShell>
  );
}

function CollectionDialog({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#231f20]/55 p-0 sm:items-center sm:p-4"><button className="absolute inset-0" onClick={onClose} aria-label="Close dialog" /><form className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-lg bg-white p-5 sm:max-w-xl sm:rounded-lg sm:p-6" onSubmit={(event) => { event.preventDefault(); onSave(form); }}><div className="flex items-start justify-between"><div><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#231f20] text-white"><FolderPlus size={18} /></span><h2 className="mt-4 text-xl font-semibold">{form.id ? "Edit collection" : "New collection"}</h2><p className="mt-1 text-sm text-[#231f20]/50">Set the storefront collection details.</p></div><button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231f20]/15" onClick={onClose} aria-label="Close"><X size={17} /></button></div><div className="mt-6 grid gap-4"><Field label="Name"><input className={inputClass} value={form.name} onChange={(event) => update("name", event.target.value)} required /></Field><Field label="Description"><textarea className={`${inputClass} min-h-24 py-3`} value={form.description} onChange={(event) => update("description", event.target.value)} /></Field><Field label="Cover image URL"><input className={inputClass} type="url" value={form.image} onChange={(event) => update("image", event.target.value)} placeholder="Cloudinary delivery URL" /></Field><div className="grid grid-cols-2 gap-3"><Field label="Status"><select className={inputClass} value={form.status} onChange={(event) => update("status", event.target.value)}><option>Active</option><option>Draft</option></select></Field><label className="flex items-end"><span className="flex h-11 w-full items-center gap-2 rounded-lg border border-[#231f20]/15 px-3 text-sm font-semibold"><input type="checkbox" checked={form.featured} onChange={(event) => update("featured", event.target.checked)} /> Featured</span></label></div></div><div className="mt-6 flex justify-end gap-2"><button type="button" className={buttonSecondary} onClick={onClose}>Cancel</button><button className={buttonPrimary} type="submit">Save collection</button></div></form></div>;
}

function Field({ label, children }) { return <label className="block"><span className="mb-2 block text-xs font-semibold">{label}</span>{children}</label>; }
AdminCollectionsPage.adminPage = true;
