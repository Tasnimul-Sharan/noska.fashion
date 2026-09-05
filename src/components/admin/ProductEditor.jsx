import { ArrowLeft, Check, ImagePlus, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeading, buttonPrimary, buttonSecondary, inputClass } from "@/components/admin/AdminUi";
import { useAdmin } from "@/context/AdminContext";
import { categories, sizes } from "@/data/products";

const emptyProduct = {
  id: "",
  slug: "",
  name: "",
  category: "Evening",
  collection: "Moonlit Edit",
  price: "",
  oldPrice: "",
  stock: 0,
  rating: 0,
  reviews: 0,
  badge: "New arrival",
  status: "Draft",
  fit: "",
  material: "",
  care: "",
  image: "",
  gallery: [],
  colors: [{ name: "Black", value: "#231f20" }],
  sizes: ["S", "M", "L"],
  tags: [],
  description: "",
};

export function ProductEditor({ productId }) {
  const router = useRouter();
  const { products, collections, saveProduct, deleteProduct } = useAdmin();
  const isNew = !productId;
  const product = products.find((item) => item.id === productId);
  const [form, setForm] = useState(() => product ? { ...emptyProduct, ...product, tags: product.tags || [], gallery: product.gallery || [] } : emptyProduct);
  const [saved, setSaved] = useState(false);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const toggleSize = (size) => update("sizes", form.sizes.includes(size) ? form.sizes.filter((item) => item !== size) : [...form.sizes, size]);

  const submit = (event) => {
    event.preventDefault();
    const savedProduct = saveProduct({ ...form, tags: typeof form.tags === "string" ? form.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : form.tags });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
    if (isNew) router.replace(`/admin/products/${savedProduct.id}`);
  };

  const remove = () => {
    if (!window.confirm(`Delete ${form.name}? This only affects mock admin data.`)) return;
    deleteProduct(form.id);
    router.push("/admin/products");
  };

  if (!isNew && !product) {
    return <AdminShell><div className="rounded-lg border border-[#231f20]/10 bg-white p-8"><h1 className="text-xl font-semibold">Product not found</h1><Link href="/admin/products" className={`${buttonSecondary} mt-5`}><ArrowLeft size={16} /> Back to products</Link></div></AdminShell>;
  }

  return (
    <AdminShell>
      <form onSubmit={submit}>
        <PageHeading eyebrow={isNew ? "Catalog / New" : `Catalog / ${form.id}`} title={isNew ? "Add product" : "Edit product"} description="Manage storefront information, pricing, media, variants and publishing status." actions={<><Link href="/admin/products" className={buttonSecondary}><ArrowLeft size={16} /> Cancel</Link>{!isNew && <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#231f20]/20 bg-white" onClick={remove} aria-label="Delete product" title="Delete product"><Trash2 size={16} /></button>}<button className={buttonPrimary} type="submit">{saved ? <Check size={16} /> : <Save size={16} />}{saved ? "Saved" : "Save product"}</button></>} />

        <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-5">
            <Panel title="Product information" description="Core information shown to customers.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Product name" className="sm:col-span-2"><input className={inputClass} value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Product name" required /></Field>
                <Field label="Category"><select className={inputClass} value={form.category} onChange={(event) => update("category", event.target.value)}>{categories.filter((item) => item !== "All").map((item) => <option key={item}>{item}</option>)}</select></Field>
                <Field label="Collection"><select className={inputClass} value={form.collection} onChange={(event) => update("collection", event.target.value)}>{collections.map((item) => <option key={item.id}>{item.name}</option>)}</select></Field>
                <Field label="Description" className="sm:col-span-2"><textarea className={`${inputClass} min-h-28 resize-y py-3`} value={form.description} onChange={(event) => update("description", event.target.value)} placeholder="Describe the product" /></Field>
              </div>
            </Panel>

            <Panel title="Pricing and inventory" description="Set retail pricing and available stock.">
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Price (BDT)"><input className={inputClass} type="number" min="0" value={form.price} onChange={(event) => update("price", event.target.value)} required /></Field>
                <Field label="Compare-at price"><input className={inputClass} type="number" min="0" value={form.oldPrice} onChange={(event) => update("oldPrice", event.target.value)} /></Field>
                <Field label="Total stock"><input className={inputClass} type="number" min="0" value={form.stock} onChange={(event) => update("stock", event.target.value)} required /></Field>
              </div>
              <div className="mt-5 border-t border-[#231f20]/10 pt-5"><p className="text-sm font-semibold">Available sizes</p><div className="mt-3 flex flex-wrap gap-2">{sizes.map((size) => <button key={size} type="button" onClick={() => toggleSize(size)} className={`h-10 min-w-12 rounded-lg border px-3 text-sm font-semibold ${form.sizes.includes(size) ? "border-[#231f20] bg-[#231f20] text-white" : "border-[#231f20]/15 bg-white"}`}>{size}</button>)}</div></div>
            </Panel>

            <Panel title="Product details" description="Useful details for product decisions and care.">
              <div className="grid gap-4 sm:grid-cols-3"><Field label="Fit"><input className={inputClass} value={form.fit} onChange={(event) => update("fit", event.target.value)} /></Field><Field label="Material"><input className={inputClass} value={form.material} onChange={(event) => update("material", event.target.value)} /></Field><Field label="Care"><input className={inputClass} value={form.care} onChange={(event) => update("care", event.target.value)} /></Field><Field label="Search tags" className="sm:col-span-3"><input className={inputClass} value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags} onChange={(event) => update("tags", event.target.value)} placeholder="evening, satin, occasion" /></Field></div>
            </Panel>
          </div>

          <div className="grid content-start gap-5">
            <Panel title="Status"><Field label="Publishing status"><select className={inputClass} value={form.status} onChange={(event) => update("status", event.target.value)}><option>Active</option><option>Draft</option><option>Archived</option></select></Field><Field label="Badge" className="mt-4"><input className={inputClass} value={form.badge} onChange={(event) => update("badge", event.target.value)} /></Field></Panel>
            <Panel title="Media" description="Paste a Cloudinary delivery URL.">
              <div className="overflow-hidden rounded-lg border border-dashed border-[#231f20]/20 bg-[#231f20]/[0.025]">
                {form.image ? <div className="relative aspect-4/5 w-full"><Image src={form.image} alt="Product preview" fill sizes="360px" className="object-cover" /></div> : <div className="flex aspect-4/5 flex-col items-center justify-center p-6 text-center"><ImagePlus size={26} /><p className="mt-3 text-sm font-semibold">No product image</p><p className="mt-1 text-xs text-[#231f20]/45">Cloudinary media will preview here</p></div>}
              </div>
              <Field label="Cloudinary image URL" className="mt-4"><input className={inputClass} type="url" value={form.image} onChange={(event) => update("image", event.target.value)} placeholder="https://res.cloudinary.com/..." /></Field>
            </Panel>
          </div>
        </div>
      </form>
    </AdminShell>
  );
}

function Panel({ title, description, children }) {
  return <section className="rounded-lg border border-[#231f20]/10 bg-white"><div className="border-b border-[#231f20]/10 px-5 py-4"><h2 className="font-semibold">{title}</h2>{description && <p className="mt-1 text-xs text-[#231f20]/50">{description}</p>}</div><div className="p-5">{children}</div></section>;
}

function Field({ label, className = "", children }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-xs font-semibold">{label}</span>{children}</label>;
}
