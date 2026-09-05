import {
  Bell,
  Boxes,
  ChevronDown,
  CircleGauge,
  FolderKanban,
  KeyRound,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  UserCog,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { useAdmin } from "@/context/AdminContext";

const links = [
  { href: "/admin", label: "Dashboard", icon: CircleGauge, permission: "view_dashboard" },
  { href: "/admin/products", label: "Products", icon: ShoppingBag, permission: "manage_products" },
  { href: "/admin/collections", label: "Collections", icon: FolderKanban, permission: "manage_collections" },
  { href: "/admin/orders", label: "Orders", icon: Package, permission: "manage_orders" },
  { href: "/admin/inventory", label: "Inventory", icon: Boxes, permission: "manage_inventory" },
  { href: "/admin/customers", label: "Customers", icon: Users, permission: "view_customers" },
  { href: "/admin/team", label: "Staff users", icon: UserCog, permission: "manage_users" },
  { href: "/admin/roles", label: "Roles & access", icon: KeyRound, permission: "manage_roles" },
  { href: "/admin/settings", label: "Settings", icon: Settings, permission: "manage_settings" },
];

const pageTitles = {
  "/admin": "Dashboard",
  "/admin/products": "Products",
  "/admin/products/new": "Add product",
  "/admin/collections": "Collections",
  "/admin/orders": "Orders",
  "/admin/inventory": "Inventory",
  "/admin/customers": "Customers",
  "/admin/team": "Staff users",
  "/admin/roles": "Roles & access",
  "/admin/settings": "Settings",
};

export function AdminShell({ children }) {
  const router = useRouter();
  const { session, logout, can } = useAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const title = pageTitles[router.pathname] || (router.pathname === "/admin/products/[id]" ? "Edit product" : "Admin");

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  return (
    <AdminGuard>
      <div className="admin-root min-h-screen bg-[#231f20]/[0.025] text-[#231f20]">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/10 bg-[#231f20] text-white lg:block">
          <Sidebar pathname={router.pathname} onLogout={handleLogout} can={can} />
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button className="absolute inset-0 bg-[#231f20]/50" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />
            <aside className="relative h-full w-72 bg-[#231f20] text-white shadow-2xl">
              <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/15" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={18} /></button>
              <Sidebar pathname={router.pathname} onLogout={handleLogout} onNavigate={() => setMobileOpen(false)} can={can} />
            </aside>
          </div>
        )}

        <div className="lg:pl-64">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#231f20]/10 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#231f20]/15 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={18} /></button>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold sm:text-base">{title}</p>
                <p className="hidden text-xs text-[#231f20]/45 sm:block">Noska commerce workspace</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/" target="_blank" className="hidden h-9 items-center rounded-lg border border-[#231f20]/15 px-3 text-xs font-semibold sm:inline-flex">View store</Link>
              <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#231f20]/15" aria-label="Notifications" title="Notifications"><Bell size={17} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#231f20] ring-2 ring-white" /></button>
              <div className="relative">
                <button className="flex h-9 items-center gap-2 rounded-lg border border-[#231f20]/15 px-2" onClick={() => setProfileOpen((value) => !value)} aria-expanded={profileOpen}>
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#231f20] text-[10px] font-bold text-white">{getInitials(session?.name)}</span>
                  <span className="hidden text-xs font-semibold sm:block">{session?.name}</span>
                  <ChevronDown size={14} className="hidden sm:block" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-lg border border-[#231f20]/10 bg-white p-2 shadow-xl">
                    <div className="border-b border-[#231f20]/10 px-2 py-2">
                      <p className="text-xs font-semibold">{session?.email}</p>
                      <p className="mt-0.5 text-[11px] text-[#231f20]/50">{session?.role}</p>
                    </div>
                    <button className="mt-1 flex h-9 w-full items-center gap-2 rounded-md px-2 text-xs font-semibold hover:bg-[#231f20]/[0.05]" onClick={handleLogout}><LogOut size={15} /> Log out</button>
                  </div>
                )}
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}

function Sidebar({ pathname, onLogout, onNavigate, can }) {
  return (
    <div className="flex h-full flex-col p-4">
      <Link href="/admin" className="flex h-16 items-center border-b border-white/10 px-2" onClick={onNavigate}>
        <span className="relative h-10 w-32 overflow-hidden">
          <Image src="/noshka-logo.png" alt="Noska" fill sizes="128px" className="object-contain" priority />
        </span>
      </Link>
      <p className="px-3 pb-2 pt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Workspace</p>
      <nav className="grid gap-1">
        {links.filter((link) => can(link.permission)).map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} onClick={onNavigate} className={`flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition ${active ? "admin-nav-active bg-white text-[#231f20]" : "text-white/65 hover:bg-white/10 hover:text-white"}`}>
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-white/10 pt-4">
        <div className="mb-3 rounded-lg border border-white/10 p-3">
          <div className="flex items-center gap-2 text-xs font-semibold"><span className="h-2 w-2 rounded-full bg-white" /> Mock data mode</div>
          <p className="mt-1 text-[11px] leading-4 text-white/45">Supabase and Cloudinary ready for connection.</p>
        </div>
        <button className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-white/60 hover:bg-white/10 hover:text-white" onClick={onLogout}><LogOut size={17} /> Log out</button>
      </div>
    </div>
  );
}

function getInitials(name) {
  return name?.split(" ").map((word) => word[0]).slice(0, 2).join("").toUpperCase() || "NA";
}
