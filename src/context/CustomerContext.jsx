import { createContext, useContext, useEffect, useState } from "react";

const CustomerContext = createContext(null);
const STORAGE_KEY = "noska-customer-store";

export const demoCustomer = {
  email: "customer@noska.com",
  password: "customer123",
};

const demoProfile = {
  id: "CUS-1042",
  name: "Nadia Rahman",
  email: demoCustomer.email,
  phone: "+880 1712 345678",
  birthday: "1997-08-18",
  tier: "Premium",
};

const initialState = {
  session: null,
  accounts: [{ ...demoProfile, password: demoCustomer.password }],
  profile: demoProfile,
  addresses: [
    { id: "address-1", label: "Home", name: "Nadia Rahman", phone: "+880 1712 345678", address: "House 18, Road 7, Banani", city: "Dhaka", postcode: "1213", isDefault: true },
    { id: "address-2", label: "Office", name: "Nadia Rahman", phone: "+880 1712 345678", address: "Gulshan Avenue, Gulshan 1", city: "Dhaka", postcode: "1212", isDefault: false },
  ],
  preferences: { email: true, sms: false, whatsapp: true },
  orders: [
    { id: "NS-482913", status: "In transit", date: "2026-08-28", total: 15400, payment: "bKash", delivery: "Express delivery", address: "Banani, Dhaka", tracking: "NSK-PTH-849201", timeline: ["Order placed", "Payment verified", "Packed", "Out for delivery"], lines: [{ name: "Celeste Satin Midi", quantity: 1, price: 7800 }, { name: "Zuri Print Shirt Dress", quantity: 1, price: 5900 }] },
    { id: "NS-391028", status: "Delivered", date: "2026-07-19", total: 11800, payment: "Cash on delivery", delivery: "Standard delivery", address: "Banani, Dhaka", tracking: "NSK-RDX-731028", timeline: ["Order placed", "Packed", "Out for delivery", "Delivered"], lines: [{ name: "Noor Embroidered Anarkali", quantity: 1, price: 11800 }] },
  ],
};

function readStore() {
  if (typeof window === "undefined") return initialState;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? { ...initialState, ...JSON.parse(value) } : initialState;
  } catch {
    return initialState;
  }
}

export function CustomerProvider({ children }) {
  const [store, setStore] = useState(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      setStore(readStore());
      setHydrated(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }, [hydrated, store]);

  const login = (email, password) => {
    const account = store.accounts.find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password);
    if (!account) return { ok: false, message: "Email or password is incorrect." };
    const { password: _password, ...session } = account;
    setStore((current) => ({ ...current, session, profile: session }));
    return { ok: true };
  };

  const register = ({ name, email, phone, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    if (store.accounts.some((item) => item.email.toLowerCase() === cleanEmail)) return { ok: false, message: "An account already exists with this email." };
    if (password.length < 6) return { ok: false, message: "Password must be at least 6 characters." };
    const account = { id: `CUS-${Date.now()}`, name: name.trim(), email: cleanEmail, phone: phone.trim(), birthday: "", tier: "Member", password };
    const { password: _password, ...session } = account;
    setStore((current) => ({ ...current, accounts: [...current.accounts, account], session, profile: session, addresses: [], orders: [] }));
    return { ok: true };
  };

  const logout = () => setStore((current) => ({ ...current, session: null }));

  const updateProfile = (profile) => setStore((current) => ({
    ...current,
    profile,
    session: { ...current.session, ...profile },
    accounts: current.accounts.map((account) => account.id === profile.id ? { ...account, ...profile } : account),
  }));

  const saveAddress = (address) => setStore((current) => {
    const next = { ...address, id: address.id || `address-${Date.now()}` };
    let addresses = current.addresses.some((item) => item.id === next.id) ? current.addresses.map((item) => item.id === next.id ? next : item) : [...current.addresses, next];
    if (next.isDefault || addresses.length === 1) addresses = addresses.map((item) => ({ ...item, isDefault: item.id === next.id }));
    return { ...current, addresses };
  });

  const deleteAddress = (id) => setStore((current) => {
    const remaining = current.addresses.filter((item) => item.id !== id);
    if (remaining.length && !remaining.some((item) => item.isDefault)) remaining[0] = { ...remaining[0], isDefault: true };
    return { ...current, addresses: remaining };
  });

  const setDefaultAddress = (id) => setStore((current) => ({ ...current, addresses: current.addresses.map((item) => ({ ...item, isDefault: item.id === id })) }));
  const updatePreference = (key, value) => setStore((current) => ({ ...current, preferences: { ...current.preferences, [key]: value } }));
  const addOrder = (order) => setStore((current) => ({ ...current, orders: [order, ...current.orders] }));

  return <CustomerContext.Provider value={{ hydrated, session: store.session, profile: store.profile, addresses: store.addresses, preferences: store.preferences, orders: store.orders, login, register, logout, updateProfile, saveAddress, deleteAddress, setDefaultAddress, updatePreference, addOrder }}>{children}</CustomerContext.Provider>;
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (!context) throw new Error("useCustomer must be used within CustomerProvider");
  return context;
}
