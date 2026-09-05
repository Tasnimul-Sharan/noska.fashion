import { ArrowLeft, LoaderCircle, ShieldX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { permissionForPath, useAdmin } from "@/context/AdminContext";

export function AdminGuard({ children }) {
  const router = useRouter();
  const { ready, session, can } = useAdmin();
  const requiredPermission = permissionForPath(router.pathname);
  const fallback = [
    ["view_dashboard", "/admin"],
    ["manage_products", "/admin/products"],
    ["manage_orders", "/admin/orders"],
    ["manage_inventory", "/admin/inventory"],
    ["view_customers", "/admin/customers"],
  ].find(([permission]) => can(permission))?.[1];

  useEffect(() => {
    if (ready && !session) router.replace(`/admin/login?next=${encodeURIComponent(router.asPath)}`);
  }, [ready, router, session]);

  if (!ready || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-[#231f20]">
        <LoaderCircle className="animate-spin" size={24} aria-label="Loading admin" />
      </div>
    );
  }

  if (requiredPermission && !can(requiredPermission)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#231f20]/[0.025] p-5 text-[#231f20]">
        <div className="w-full max-w-md rounded-lg border border-[#231f20]/10 bg-white p-7 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#231f20] text-white"><ShieldX size={21} /></span>
          <h1 className="mt-5 text-2xl font-semibold">Access restricted</h1>
          <p className="mt-2 text-sm leading-6 text-[#231f20]/55">Your assigned role does not allow this section. Ask a Super Admin to update your permissions.</p>
          {fallback && <Link href={fallback} className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-[#231f20] px-4 text-sm font-semibold text-white"><ArrowLeft size={15} /> Open an allowed section</Link>}
        </div>
      </div>
    );
  }

  return children;
}
