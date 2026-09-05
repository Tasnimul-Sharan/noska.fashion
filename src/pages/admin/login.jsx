import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Seo } from "@/components/Seo";
import { demoAdmin, useAdmin } from "@/context/AdminContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { ready, session, login } = useAdmin();
  const [email, setEmail] = useState(demoAdmin.email);
  const [password, setPassword] = useState(demoAdmin.password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (ready && session) router.replace(getNextPath(router.query.next));
  }, [ready, router, session]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const result = login(email, password);
    if (!result.ok) {
      setError(result.message);
      setSubmitting(false);
      return;
    }
    router.replace(getNextPath(router.query.next));
  };

  return (
    <>
      <Seo title="Admin login" description="Noska administration workspace." canonicalPath="/admin/login" noindex />
      <main className="grid min-h-screen bg-white text-[#231f20] lg:grid-cols-[minmax(0,1fr)_minmax(520px,0.72fr)]">
        <section className="relative hidden overflow-hidden bg-[#231f20] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <span className="relative h-14 w-44 overflow-hidden"><Image src="/noshka-logo.png" alt="Noska" fill className="object-contain" priority /></span>
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Commerce administration</p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight">Everything behind the storefront, in one place.</h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">Manage products, collections, orders, stock and customers from a focused workspace built for daily retail operations.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-xs text-white/55">
            <span>Next.js</span><span>Supabase ready</span><span>Cloudinary ready</span>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <span className="relative mx-auto block h-14 w-44 overflow-hidden bg-[#231f20] lg:hidden"><Image src="/noshka-logo.png" alt="Noska" fill className="object-contain" priority /></span>
            <div className="mt-10 lg:mt-0">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#231f20] text-white"><LockKeyhole size={19} /></span>
              <h2 className="mt-5 text-3xl font-semibold">Admin sign in</h2>
              <p className="mt-2 text-sm leading-6 text-[#231f20]/55">Use the demo credentials to enter the management workspace.</p>
            </div>

            <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
              <Field icon={Mail} label="Email address">
                <input className="min-w-0 flex-1 bg-transparent text-sm outline-none" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
              </Field>
              <Field icon={LockKeyhole} label="Password" action={
                <button type="button" className="flex h-8 w-8 items-center justify-center" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
              }>
                <input className="min-w-0 flex-1 bg-transparent text-sm outline-none" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
              </Field>
              {error && <p className="rounded-lg border border-[#231f20]/20 bg-[#231f20]/[0.04] px-3 py-2 text-sm font-medium" role="alert">{error}</p>}
              <button className="h-12 rounded-lg bg-[#231f20] px-5 text-sm font-semibold text-white transition hover:bg-[#231f20]/90 disabled:opacity-60" type="submit" disabled={submitting}>{submitting ? "Signing in..." : "Sign in to admin"}</button>
            </form>

            <div className="mt-6 rounded-lg border border-[#231f20]/12 bg-[#231f20]/[0.025] p-4 text-xs">
              <p className="font-bold">Super Admin demo</p>
              <div className="mt-2 grid grid-cols-[72px_1fr] gap-y-1 text-[#231f20]/60"><span>Email</span><strong className="text-[#231f20]">{demoAdmin.email}</strong><span>Password</span><strong className="text-[#231f20]">{demoAdmin.password}</strong><span>Access</span><strong className="text-[#231f20]">All permissions</strong></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Field({ icon: Icon, label, action, children }) {
  return (
    <label>
      <span className="text-sm font-semibold">{label}</span>
      <span className="mt-2 flex h-12 items-center gap-2 rounded-lg border border-[#231f20]/15 bg-white px-3 focus-within:border-[#231f20]/40 focus-within:ring-2 focus-within:ring-[#231f20]/10">
        <Icon size={17} className="shrink-0 text-[#231f20]/45" />{children}{action}
      </span>
    </label>
  );
}

AdminLoginPage.adminPage = true;

function getNextPath(next) {
  return typeof next === "string" && next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";
}
