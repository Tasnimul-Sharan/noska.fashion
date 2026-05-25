import { ArrowRight, CheckCircle2, PackageCheck, RotateCcw, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Seo } from "@/components/Seo";
import { createBreadcrumbJsonLd } from "@/lib/seo";
import { fadeUp, staggerContainer } from "@/lib/motion";

const policySteps = [
  {
    icon: RotateCcw,
    title: "7-day exchange window",
    text: "Request an exchange within 7 days of delivery if the fit or size is not right.",
  },
  {
    icon: ShieldCheck,
    title: "Original condition",
    text: "Items must be unworn, unwashed, with tags and packaging intact.",
  },
  {
    icon: PackageCheck,
    title: "Pickup or studio drop",
    text: "Our support team will guide you through pickup, courier return, or studio drop-off.",
  },
];

const faqs = [
  ["Can I return sale items?", "Sale items can be exchanged for size when stock is available."],
  ["How long does exchange take?", "Dhaka exchanges usually complete within 2-4 business days after pickup."],
  ["Can I change delivery address?", "Address changes are possible before dispatch through customer support."],
];

export default function ReturnsPage() {
  return (
    <>
      <Seo
        title="Return & Exchange Policy"
        description="Read Noska return, exchange, fit support, and delivery policy for premium dresses in Bangladesh."
        canonicalPath="/returns"
        jsonLd={[
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Return & Exchange Policy", path: "/returns" },
          ]),
        ]}
      />

      <section className="border-b border-border_color bg-[#211d19] text-white">
        <motion.div
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.p className="text-sm font-semibold uppercase text-tertiary" variants={fadeUp}>
            Service promise
          </motion.p>
          <motion.h1
            className="mt-3 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl"
            variants={fadeUp}
          >
            Return & exchange policy
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl text-sm leading-6 text-[#d8d0c8] md:text-base"
            variants={fadeUp}
          >
            Fit support, clear exchange steps, and premium care guidance for every
            Noska order.
          </motion.p>
        </motion.div>
      </section>

      <motion.section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {policySteps.map((step) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.title}
                className="rounded-lg border border-[#e5ddd2] bg-white p-5"
                variants={fadeUp}
              >
                <Icon size={22} className="text-[#b9404f]" />
                <h2 className="mt-4 text-xl font-semibold">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#6f6a63]">{step.text}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="mt-8 grid gap-8 rounded-lg border border-[#e5ddd2] bg-white p-5 lg:grid-cols-[0.9fr_1.1fr]"
          variants={fadeUp}
        >
          <div>
            <CheckCircle2 size={28} className="text-[#1f7a5a]" />
            <h2 className="mt-4 text-2xl font-semibold">How to request support</h2>
            <p className="mt-3 text-sm leading-6 text-[#6f6a63]">
              Keep your order number, delivery phone, and item details ready. Our
              team will confirm eligibility and next steps.
            </p>
            <Link
              href="/account?tab=orders"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
            >
              View order history
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid gap-3">
            {faqs.map(([question, answer]) => (
              <div key={question} className="rounded-lg bg-[#fbfaf8] p-4">
                <p className="font-semibold">{question}</p>
                <p className="mt-2 text-sm leading-6 text-[#6f6a63]">{answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}
