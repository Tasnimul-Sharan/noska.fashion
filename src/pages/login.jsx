import { Lock, Mail, Phone, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Seo } from "@/components/Seo";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function LoginPage() {
  const [authMode, setAuthMode] = useState("login");
  const isRegister = authMode === "register";

  return (
    <>
      <Seo
        title="Login / Register"
        description="Login or create a Noska account to manage wishlist, order history, and member preferences."
        canonicalPath="/login"
        noindex
      />

      <section className="mx-auto grid min-h-[70vh] max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <motion.div initial="hidden" animate="show" variants={staggerContainer}>
          <motion.p className="text-sm font-semibold text-[#b9404f]" variants={fadeUp}>
            Member access
          </motion.p>
          <motion.h1 className="mt-2 max-w-2xl text-4xl font-semibold leading-tight md:text-6xl" variants={fadeUp}>
            Login or create your Noska account
          </motion.h1>
          <motion.p className="mt-4 max-w-xl text-sm leading-6 text-[#6f6a63] md:text-base" variants={fadeUp}>
            Manage saved dresses, track order history, and keep checkout details ready
            for the next drop.
          </motion.p>
          <motion.div className="mt-6 flex flex-wrap gap-3 text-sm" variants={fadeUp}>
            <span className="rounded-lg bg-white px-3 py-2 font-semibold">Wishlist sync</span>
            <span className="rounded-lg bg-white px-3 py-2 font-semibold">Order tracking</span>
            <span className="rounded-lg bg-white px-3 py-2 font-semibold">Member preferences</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="rounded-lg border border-[#e5ddd2] bg-white p-5 shadow-soft"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp}>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#151515] text-white">
              {isRegister ? <UserPlus size={21} /> : <Lock size={21} />}
            </div>
            <h2 className="mt-4 text-2xl font-semibold">
              {isRegister ? "Create account" : "Welcome back"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#6f6a63]">
              This is a demo form for the storefront account experience.
            </p>
          </motion.div>

          <motion.div className="mt-5 grid grid-cols-2 gap-2 rounded-lg bg-[#fbfaf8] p-1" variants={fadeUp}>
            {["login", "register"].map((mode) => (
              <button
                key={mode}
                className={`h-10 rounded-lg text-sm font-semibold capitalize ${
                  authMode === mode ? "bg-[#151515] text-white" : "text-[#514c45]"
                }`}
                type="button"
                onClick={() => setAuthMode(mode)}
              >
                {mode}
              </button>
            ))}
          </motion.div>

          <motion.form
            className="mt-5 grid gap-4"
            variants={staggerContainer}
            onSubmit={(event) => event.preventDefault()}
          >
            {isRegister && (
              <Field icon={UserPlus} label="Full name" placeholder="Noska Member" type="text" />
            )}
            <Field icon={Mail} label="Email" placeholder="you@example.com" type="email" />
            <Field icon={Lock} label="Password" placeholder="Minimum 8 characters" type="password" />
            {isRegister && (
              <Field icon={Phone} label="Phone" placeholder="+8801XXXXXXXXX" type="tel" />
            )}
            <button
              className="focus-ring h-12 rounded-lg bg-[#b9404f] px-5 text-sm font-semibold text-white"
              type="submit"
            >
              {isRegister ? "Create account" : "Login"}
            </button>
          </motion.form>

          <motion.p className="mt-5 text-center text-sm text-[#6f6a63]" variants={fadeUp}>
            Want to browse first?{" "}
            <Link href="/shop" className="font-semibold text-[#151515]">
              Go to shop
            </Link>
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}

function Field({ icon: Icon, label, placeholder, type }) {
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <motion.div variants={fadeUp}>
      <label className="text-sm font-semibold" htmlFor={id}>
        {label}
      </label>
      <div className="mt-2 flex h-11 items-center gap-2 rounded-lg border border-[#ded6ca] bg-[#fbfaf8] px-3">
        <Icon size={17} className="text-[#b9404f]" />
        <input
          id={id}
          className="focus-ring min-w-0 flex-1 bg-transparent text-sm outline-none"
          placeholder={placeholder}
          type={type}
          required
        />
      </div>
    </motion.div>
  );
}
