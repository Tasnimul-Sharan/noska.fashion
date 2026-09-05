import { createContext, useContext, useEffect, useState } from "react";
import {
  collectionDescriptions,
  getCollectionGroups,
  products as catalogProducts,
  slugifyCollection,
} from "@/data/products";

const AdminContext = createContext(null);

const STORAGE = {
  session: "noska-admin-session",
  products: "noska-admin-products",
  collections: "noska-admin-collections",
  orders: "noska-admin-orders",
  roles: "noska-admin-roles",
  staff: "noska-admin-staff",
};

export const adminPermissions = [
  { id: "view_dashboard", label: "View dashboard", description: "Store overview, revenue and recent activity", group: "Overview" },
  { id: "manage_products", label: "Manage products", description: "Create, edit and remove catalog products", group: "Catalog" },
  { id: "manage_collections", label: "Manage collections", description: "Create edits and organize storefront collections", group: "Catalog" },
  { id: "manage_inventory", label: "Manage inventory", description: "View and update product stock quantities", group: "Catalog" },
  { id: "manage_orders", label: "Manage orders", description: "View orders and change fulfilment status", group: "Commerce" },
  { id: "view_customers", label: "View customers", description: "Access customer profiles and purchase metrics", group: "Commerce" },
  { id: "manage_users", label: "Manage staff", description: "Invite, edit, disable and remove admin users", group: "Administration" },
  { id: "manage_roles", label: "Manage roles", description: "Create roles and configure their permissions", group: "Administration" },
  { id: "manage_settings", label: "Manage settings", description: "Update store settings and integration details", group: "Administration" },
];

const allPermissionIds = adminPermissions.map((permission) => permission.id);

export const initialRoles = [
  { id: "super-admin", name: "Super Admin", description: "Complete control over the commerce workspace and team access.", permissions: allPermissionIds, system: true },
  { id: "catalog-manager", name: "Catalog Manager", description: "Products, collections and inventory operations.", permissions: ["view_dashboard", "manage_products", "manage_collections", "manage_inventory"], system: false },
  { id: "fulfilment-manager", name: "Fulfilment Manager", description: "Orders, inventory and customer service visibility.", permissions: ["view_dashboard", "manage_orders", "manage_inventory", "view_customers"], system: false },
  { id: "support-agent", name: "Support Agent", description: "Customer and order lookup without catalog access.", permissions: ["view_dashboard", "manage_orders", "view_customers"], system: false },
];

export const demoAdmin = { email: "admin@noska.com", password: "admin123" };

export const initialStaff = [
  { id: "staff-001", name: "Noska Owner", email: demoAdmin.email, password: demoAdmin.password, roleId: "super-admin", status: "Active", lastActive: "Just now", joined: "2026-01-10" },
  { id: "staff-002", name: "Maliha Karim", email: "catalog@noska.com", password: "catalog123", roleId: "catalog-manager", status: "Active", lastActive: "18 minutes ago", joined: "2026-04-16" },
  { id: "staff-003", name: "Rafi Ahmed", email: "orders@noska.com", password: "orders123", roleId: "fulfilment-manager", status: "Active", lastActive: "1 hour ago", joined: "2026-05-02" },
  { id: "staff-004", name: "Tania Noor", email: "support@noska.com", password: "support123", roleId: "support-agent", status: "Inactive", lastActive: "4 days ago", joined: "2026-06-11" },
];

const initialProducts = catalogProducts.map((product) => ({ ...product, status: product.stock > 0 ? "Active" : "Draft" }));
const initialCollections = getCollectionGroups().map((collection, index) => ({ id: `collection-${index + 1}`, name: collection.title, slug: collection.slug, description: collectionDescriptions[collection.title] || collection.description, image: collection.image, featured: index < 4, status: "Active" }));
const initialOrders = [
  { id: "NSK-2048", customer: "Nadia Rahman", email: "nadia@example.com", date: "2026-09-05", total: 15600, items: 2, payment: "Paid", status: "Processing", city: "Dhaka" },
  { id: "NSK-2047", customer: "Arifa Islam", email: "arifa@example.com", date: "2026-09-05", total: 11800, items: 1, payment: "COD", status: "Confirmed", city: "Chattogram" },
  { id: "NSK-2046", customer: "Tasnim Chowdhury", email: "tasnim@example.com", date: "2026-09-04", total: 22600, items: 3, payment: "Paid", status: "Shipped", city: "Dhaka" },
  { id: "NSK-2045", customer: "Maliha Noor", email: "maliha@example.com", date: "2026-09-04", total: 6400, items: 1, payment: "Paid", status: "Delivered", city: "Sylhet" },
  { id: "NSK-2044", customer: "Sadia Karim", email: "sadia@example.com", date: "2026-09-03", total: 18400, items: 1, payment: "COD", status: "Processing", city: "Khulna" },
  { id: "NSK-2043", customer: "Nusrat Jahan", email: "nusrat@example.com", date: "2026-09-03", total: 10400, items: 2, payment: "Paid", status: "Cancelled", city: "Dhaka" },
  { id: "NSK-2042", customer: "Farzana Akter", email: "farzana@example.com", date: "2026-09-02", total: 29200, items: 2, payment: "Paid", status: "Delivered", city: "Rajshahi" },
];
const initialCustomers = [
  { id: "CUS-1042", name: "Nadia Rahman", email: "nadia@example.com", phone: "+880 1712 345678", orders: 6, spent: 68400, joined: "2026-02-12", status: "Active" },
  { id: "CUS-1041", name: "Arifa Islam", email: "arifa@example.com", phone: "+880 1813 226490", orders: 3, spent: 32900, joined: "2026-03-08", status: "Active" },
  { id: "CUS-1040", name: "Tasnim Chowdhury", email: "tasnim@example.com", phone: "+880 1914 882031", orders: 8, spent: 96700, joined: "2025-12-21", status: "VIP" },
  { id: "CUS-1039", name: "Maliha Noor", email: "maliha@example.com", phone: "+880 1615 440219", orders: 2, spent: 14800, joined: "2026-06-17", status: "Active" },
  { id: "CUS-1038", name: "Sadia Karim", email: "sadia@example.com", phone: "+880 1711 775902", orders: 5, spent: 55900, joined: "2026-01-29", status: "Active" },
];

function readStored(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function readSession() {
  const stored = readStored(STORAGE.session, null);
  if (!stored) return null;
  return { ...stored, userId: stored.userId || "staff-001", roleId: stored.roleId || "super-admin", role: stored.role === "Administrator" ? "Super Admin" : stored.role };
}

export function permissionForPath(pathname) {
  if (pathname === "/admin") return "view_dashboard";
  if (pathname.startsWith("/admin/products")) return "manage_products";
  if (pathname.startsWith("/admin/collections")) return "manage_collections";
  if (pathname.startsWith("/admin/orders")) return "manage_orders";
  if (pathname.startsWith("/admin/inventory")) return "manage_inventory";
  if (pathname.startsWith("/admin/customers")) return "view_customers";
  if (pathname.startsWith("/admin/team")) return "manage_users";
  if (pathname.startsWith("/admin/roles")) return "manage_roles";
  if (pathname.startsWith("/admin/settings")) return "manage_settings";
  return null;
}

export function AdminProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState(readSession);
  const [products, setProducts] = useState(() => readStored(STORAGE.products, initialProducts));
  const [collections, setCollections] = useState(() => readStored(STORAGE.collections, initialCollections));
  const [orders, setOrders] = useState(() => readStored(STORAGE.orders, initialOrders));
  const [roles, setRoles] = useState(() => readStored(STORAGE.roles, initialRoles));
  const [staff, setStaff] = useState(() => readStored(STORAGE.staff, initialStaff));
  const [customers] = useState(initialCustomers);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => { if (ready) window.localStorage.setItem(STORAGE.products, JSON.stringify(products)); }, [products, ready]);
  useEffect(() => { if (ready) window.localStorage.setItem(STORAGE.collections, JSON.stringify(collections)); }, [collections, ready]);
  useEffect(() => { if (ready) window.localStorage.setItem(STORAGE.orders, JSON.stringify(orders)); }, [orders, ready]);
  useEffect(() => { if (ready) window.localStorage.setItem(STORAGE.roles, JSON.stringify(roles)); }, [ready, roles]);
  useEffect(() => { if (ready) window.localStorage.setItem(STORAGE.staff, JSON.stringify(staff)); }, [ready, staff]);

  const currentRole = roles.find((role) => role.id === session?.roleId) || null;
  const can = (permission) => Boolean(currentRole?.permissions.includes(permission));

  const login = (email, password) => {
    const user = staff.find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password);
    if (!user) return { ok: false, message: "Email or password is incorrect." };
    if (user.status !== "Active") return { ok: false, message: "This staff account is inactive. Contact a Super Admin." };
    const role = roles.find((item) => item.id === user.roleId);
    if (!role) return { ok: false, message: "This account does not have a valid role." };
    const nextSession = { userId: user.id, name: user.name, email: user.email, roleId: role.id, role: role.name };
    window.localStorage.setItem(STORAGE.session, JSON.stringify(nextSession));
    setSession(nextSession);
    return { ok: true };
  };

  const logout = () => {
    window.localStorage.removeItem(STORAGE.session);
    setSession(null);
  };

  const saveStaff = (payload) => {
    const emailTaken = staff.some((user) => user.email.toLowerCase() === payload.email.trim().toLowerCase() && user.id !== payload.id);
    if (emailTaken) return { ok: false, message: "Another staff user already uses this email." };
    if (!payload.id && (!payload.password || payload.password.length < 6)) return { ok: false, message: "New staff passwords must be at least 6 characters." };
    if (payload.id === session?.userId && (payload.roleId !== session.roleId || payload.status !== "Active")) return { ok: false, message: "You cannot change your own role or deactivate your own account." };
    const existing = staff.find((user) => user.id === payload.id);
    const user = { ...existing, ...payload, id: payload.id || `staff-${Date.now()}`, email: payload.email.trim().toLowerCase(), joined: existing?.joined || new Date().toISOString().slice(0, 10), lastActive: existing?.lastActive || "Never" };
    setStaff((current) => existing ? current.map((item) => item.id === user.id ? user : item) : [user, ...current]);
    if (user.id === session?.userId) setSession((current) => ({ ...current, name: user.name, email: user.email }));
    return { ok: true, user };
  };

  const deleteStaff = (id) => {
    if (id === session?.userId) return { ok: false, message: "You cannot remove your own account." };
    setStaff((current) => current.filter((user) => user.id !== id));
    return { ok: true };
  };

  const toggleStaffStatus = (id) => {
    if (id === session?.userId) return { ok: false, message: "You cannot deactivate your own account." };
    setStaff((current) => current.map((user) => user.id === id ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user));
    return { ok: true };
  };

  const saveRole = (payload) => {
    if (!payload.permissions.length) return { ok: false, message: "Select at least one permission for this role." };
    const nameTaken = roles.some((role) => role.name.toLowerCase() === payload.name.trim().toLowerCase() && role.id !== payload.id);
    if (nameTaken) return { ok: false, message: "A role with this name already exists." };
    const existing = roles.find((role) => role.id === payload.id);
    if (existing?.system) return { ok: false, message: "The Super Admin system role cannot be modified." };
    const role = { ...payload, id: payload.id || `role-${Date.now()}`, name: payload.name.trim(), system: false };
    setRoles((current) => existing ? current.map((item) => item.id === role.id ? role : item) : [...current, role]);
    return { ok: true, role };
  };

  const deleteRole = (id) => {
    const role = roles.find((item) => item.id === id);
    if (role?.system) return { ok: false, message: "The Super Admin system role cannot be deleted." };
    if (staff.some((user) => user.roleId === id)) return { ok: false, message: "Move assigned staff to another role before deleting this role." };
    setRoles((current) => current.filter((item) => item.id !== id));
    return { ok: true };
  };

  const saveProduct = (payload) => {
    const existing = products.some((product) => product.id === payload.id);
    const cleanName = payload.name.trim();
    const nextProduct = { ...payload, id: payload.id || `adr-${Date.now()}`, slug: payload.slug || slugifyCollection(cleanName), name: cleanName, price: Number(payload.price) || 0, oldPrice: Number(payload.oldPrice) || 0, stock: Number(payload.stock) || 0, rating: Number(payload.rating) || 0, reviews: Number(payload.reviews) || 0, gallery: payload.gallery?.length ? payload.gallery : [payload.image] };
    setProducts((current) => existing ? current.map((product) => product.id === nextProduct.id ? nextProduct : product) : [nextProduct, ...current]);
    return nextProduct;
  };
  const deleteProduct = (id) => setProducts((current) => current.filter((product) => product.id !== id));
  const updateStock = (id, stock) => setProducts((current) => current.map((product) => product.id === id ? { ...product, stock: Math.max(0, Number(stock) || 0) } : product));
  const updateOrderStatus = (id, status) => setOrders((current) => current.map((order) => order.id === id ? { ...order, status } : order));
  const saveCollection = (payload) => {
    const collection = { ...payload, id: payload.id || `collection-${Date.now()}`, slug: payload.slug || slugifyCollection(payload.name) };
    setCollections((current) => current.some((item) => item.id === collection.id) ? current.map((item) => item.id === collection.id ? collection : item) : [collection, ...current]);
    return collection;
  };
  const deleteCollection = (id) => setCollections((current) => current.filter((collection) => collection.id !== id));
  const resetDemoData = () => { setProducts(initialProducts); setCollections(initialCollections); setOrders(initialOrders); };

  return <AdminContext.Provider value={{ ready, session, currentRole, permissions: currentRole?.permissions || [], can, products, collections, orders, customers, roles, staff, login, logout, saveStaff, deleteStaff, toggleStaffStatus, saveRole, deleteRole, saveProduct, deleteProduct, updateStock, updateOrderStatus, saveCollection, deleteCollection, resetDemoData }}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}
