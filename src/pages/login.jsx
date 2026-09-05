import { ArrowRight, Lock, Mail, Phone, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Seo } from "@/components/Seo";
import { demoCustomer, useCustomer } from "@/context/CustomerContext";
import { fadeUp, staggerContainer } from "@/lib/motion";

const initialForm = { name: "", email: demoCustomer.email, phone: "", password: demoCustomer.password };

export default function LoginPage() {
  const router = useRouter();
  const { hydrated, session, login, register } = useCustomer();
  const [authMode, setAuthMode] = useState("login");
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isRegister = authMode === "register";

  useEffect(() => {
    if (hydrated && session) router.replace(getNextPath(router.query.next));
  }, [hydrated, router, session]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const changeMode = (mode) => {
    setAuthMode(mode);
    setError("");
    setForm(mode === "login" ? initialForm : { name: "", email: "", phone: "", password: "" });
  };

  const submit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const result = isRegister ? register(form) : login(form.email, form.password);
    if (!result.ok) {
      setError(result.message);
      setSubmitting(false);
      return;
    }
    router.push(getNextPath(router.query.next));
  };

  return (
    <>
      <Seo title="Login / Register" description="Login or create a Noska account to manage wishlist, order history, addresses, and preferences." canonicalPath="/login" noindex />
      <section className="mx-auto grid min-h-[calc(100vh-160px)] max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
        <motion.div initial="hidden" animate="show" variants={staggerContainer}>
          <motion.p className="text-xs font-bold uppercase tracking-[0.16em] text-[#231f20]/55" variants={fadeUp}>Noska membership</motion.p>
          <motion.h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight md:text-6xl" variants={fadeUp}>Your wardrobe, orders and details together.</motion.h1>
          <motion.p className="mt-5 max-w-xl text-sm leading-7 text-[#231f20]/60 md:text-base" variants={fadeUp}>Sign in to follow deliveries, manage saved pieces, reuse addresses and keep your preferences ready for every collection.</motion.p>
          <motion.div className="mt-8 grid max-w-xl grid-cols-3 border-y border-[#231f20]/12 py-5 text-xs" variants={fadeUp}><span>Order history</span><span>Saved addresses</span><span>Wishlist access</span></motion.div>
        </motion.div>

        <motion.div className="rounded-lg border border-[#231f20]/12 bg-white p-5 shadow-[0_18px_60px_rgba(35,31,32,0.08)] sm:p-7" initial="hidden" animate="show" variants={staggerContainer}>
          <motion.div variants={fadeUp}><span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#231f20] text-white">{isRegister ? <UserPlus size={19} /> : <Lock size={19} />}</span><h2 className="mt-5 text-2xl font-semibold">{isRegister ? "Create your account" : "Welcome back"}</h2><p className="mt-2 text-sm leading-6 text-[#231f20]/55">{isRegister ? "Create a mock customer profile for this storefront." : "Enter your account details to continue."}</p></motion.div>
          <motion.div className="mt-6 grid grid-cols-2 gap-1 rounded-lg bg-[#231f20]/[0.04] p-1" variants={fadeUp}>{["login", "register"].map((mode) => <button key={mode} className={`h-10 rounded-md text-sm font-semibold capitalize ${authMode === mode ? "bg-[#231f20] text-white" : "text-[#231f20]/60"}`} type="button" onClick={() => changeMode(mode)}>{mode}</button>)}</motion.div>
          <motion.form className="mt-6 grid gap-4" variants={staggerContainer} onSubmit={submit}>
            {isRegister && <Field icon={UserPlus} label="Full name" type="text" value={form.name} onChange={(value) => update("name", value)} placeholder="Your full name" />}
            <Field icon={Mail} label="Email address" type="email" value={form.email} onChange={(value) => update("email", value)} placeholder="you@example.com" />
            <Field icon={Lock} label="Password" type="password" value={form.password} onChange={(value) => update("password", value)} placeholder="Minimum 6 characters" />
            {isRegister && <Field icon={Phone} label="Phone number" type="tel" value={form.phone} onChange={(value) => update("phone", value)} placeholder="+8801XXXXXXXXX" />}
            {error && <p className="rounded-lg border border-[#231f20]/20 bg-[#231f20]/[0.04] px-3 py-2 text-sm font-medium" role="alert">{error}</p>}
            <button className="focus-ring flex h-12 items-center justify-center gap-2 rounded-lg bg-[#231f20] px-5 text-sm font-semibold text-white disabled:opacity-60" type="submit" disabled={submitting}>{submitting ? "Please wait..." : isRegister ? "Create account" : "Login"}<ArrowRight size={16} /></button>
          </motion.form>
          {!isRegister && <motion.div className="mt-5 rounded-lg border border-[#231f20]/12 bg-[#231f20]/[0.025] p-4 text-xs" variants={fadeUp}><p className="font-bold">Demo customer</p><p className="mt-2 text-[#231f20]/60">Email: <strong className="text-[#231f20]">{demoCustomer.email}</strong></p><p className="mt-1 text-[#231f20]/60">Password: <strong className="text-[#231f20]">{demoCustomer.password}</strong></p></motion.div>}
          <motion.p className="mt-5 text-center text-sm text-[#231f20]/55" variants={fadeUp}>Continue shopping instead? <Link href="/shop" className="font-semibold text-[#231f20]">Go to shop</Link></motion.p>
        </motion.div>
      </section>
    </>
  );
}

function Field({ icon: Icon, label, placeholder, type, value, onChange }) {
  const id = `customer-${label.toLowerCase().replaceAll(" ", "-")}`;
  return <motion.label variants={fadeUp} htmlFor={id}><span className="text-xs font-semibold">{label}</span><span className="mt-2 flex h-11 items-center gap-2 rounded-lg border border-[#231f20]/15 bg-white px-3 focus-within:border-[#231f20]/40 focus-within:ring-2 focus-within:ring-[#231f20]/10"><Icon size={16} className="shrink-0 text-[#231f20]/40" /><input id={id} className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder={placeholder} type={type} value={value} onChange={(event) => onChange(event.target.value)} required /></span></motion.label>;
}

function getNextPath(next) {
  return typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? next : "/account";
}
