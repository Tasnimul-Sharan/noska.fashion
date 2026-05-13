import {
  CheckCircle2,
  CreditCard,
  MapPin,
  PackageCheck,
  Phone,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useShop } from "@/context/ShopContext";
import { formatCurrency } from "@/data/products";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "Dhaka",
  note: "",
};

export default function CheckoutPage() {
  const { cart, subtotal, freeShippingThreshold, clearCart } = useShop();
  const [form, setForm] = useState(initialForm);
  const [payment, setPayment] = useState("card");
  const [delivery, setDelivery] = useState("standard");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const shipping = useMemo(() => {
    if (subtotal >= freeShippingThreshold || subtotal === 0) return 0;
    return delivery === "express" ? 320 : 180;
  }, [delivery, freeShippingThreshold, subtotal]);

  const total = subtotal + shipping;

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const placeOrder = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      setError("Your bag is empty");
      return;
    }

    const requiredFields = ["name", "email", "phone", "address", "city"];
    const missingField = requiredFields.find((field) => !form[field].trim());

    if (missingField) {
      setError("Please complete your delivery details");
      return;
    }

    const orderNumber = `AA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrder({
      number: orderNumber,
      total,
      email: form.email,
      delivery,
      payment,
      items: cart.length,
    });
    setError("");
    clearCart();
  };

  if (order) {
    return (
      <>
        <Head>
          <title>Order Confirmed | Aurelia Atelier</title>
        </Head>
        <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
          <CheckCircle2 size={56} className="text-[#1f7a5a]" />
          <h1 className="mt-5 text-4xl font-semibold">Order confirmed</h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-[#6f6a63]">
            Order {order.number} has been placed. A confirmation was prepared for{" "}
            {order.email}.
          </p>
          <div className="mt-8 grid w-full gap-3 rounded-[8px] border border-[#e5ddd2] bg-white p-5 text-left sm:grid-cols-2">
            <SummaryTile label="Total" value={formatCurrency(order.total)} />
            <SummaryTile label="Items" value={`${order.items} line item${order.items > 1 ? "s" : ""}`} />
            <SummaryTile label="Delivery" value={order.delivery === "express" ? "Express" : "Standard"} />
            <SummaryTile label="Payment" value={paymentLabel(order.payment)} />
          </div>
          <Link
            href="/#shop"
            className="mt-8 rounded-[8px] bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
          >
            Continue shopping
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout | Aurelia Atelier</title>
      </Head>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-[#b9404f]">Checkout</p>
          <h1 className="mt-2 text-4xl font-semibold">Secure your edit</h1>
        </div>

        {cart.length === 0 ? (
          <div className="mt-10 flex min-h-96 flex-col items-center justify-center rounded-[8px] border border-[#e5ddd2] bg-white p-8 text-center">
            <ShoppingBag size={44} className="text-[#b9404f]" />
            <h2 className="mt-4 text-2xl font-semibold">No items to checkout</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#6f6a63]">
              Add a dress first, then checkout will be ready.
            </p>
            <Link
              href="/#shop"
              className="mt-6 rounded-[8px] bg-[#151515] px-5 py-3 text-sm font-semibold text-white"
            >
              Shop dresses
            </Link>
          </div>
        ) : (
          <form onSubmit={placeOrder} className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              <section className="rounded-[8px] border border-[#e5ddd2] bg-white p-5">
                <div className="flex items-center gap-2">
                  <Phone size={19} className="text-[#b9404f]" />
                  <h2 className="text-xl font-semibold">Contact</h2>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Full name"
                    value={form.name}
                    onChange={(value) => updateField("name", value)}
                    required
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(value) => updateField("email", value)}
                    required
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={(value) => updateField("phone", value)}
                    required
                  />
                  <Field
                    label="City"
                    value={form.city}
                    onChange={(value) => updateField("city", value)}
                    required
                  />
                </div>
              </section>

              <section className="rounded-[8px] border border-[#e5ddd2] bg-white p-5">
                <div className="flex items-center gap-2">
                  <MapPin size={19} className="text-[#b9404f]" />
                  <h2 className="text-xl font-semibold">Delivery</h2>
                </div>
                <div className="mt-5">
                  <label className="text-sm font-semibold" htmlFor="address">
                    Address
                  </label>
                  <textarea
                    id="address"
                    value={form.address}
                    onChange={(event) => updateField("address", event.target.value)}
                    className="focus-ring mt-2 min-h-28 w-full resize-y rounded-[8px] border border-[#ded6ca] bg-[#fbfaf8] px-3 py-3 text-sm outline-none"
                    required
                  />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <DeliveryOption
                    active={delivery === "standard"}
                    icon={Truck}
                    title="Standard"
                    text="2-4 business days"
                    price={subtotal >= freeShippingThreshold ? "Free" : formatCurrency(180)}
                    onClick={() => setDelivery("standard")}
                  />
                  <DeliveryOption
                    active={delivery === "express"}
                    icon={PackageCheck}
                    title="Express"
                    text="24-48 hours"
                    price={subtotal >= freeShippingThreshold ? "Free" : formatCurrency(320)}
                    onClick={() => setDelivery("express")}
                  />
                </div>
              </section>

              <section className="rounded-[8px] border border-[#e5ddd2] bg-white p-5">
                <div className="flex items-center gap-2">
                  <CreditCard size={19} className="text-[#b9404f]" />
                  <h2 className="text-xl font-semibold">Payment</h2>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ["card", "Card"],
                    ["bkash", "bKash"],
                    ["cod", "Cash"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      className={`focus-ring h-12 rounded-[8px] border text-sm font-semibold ${
                        payment === value
                          ? "border-[#151515] bg-[#151515] text-white"
                          : "border-[#ded6ca] bg-[#fbfaf8]"
                      }`}
                      type="button"
                      onClick={() => setPayment(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <label className="mt-5 block text-sm font-semibold" htmlFor="note">
                  Order note
                </label>
                <input
                  id="note"
                  value={form.note}
                  onChange={(event) => updateField("note", event.target.value)}
                  className="focus-ring mt-2 h-11 w-full rounded-[8px] border border-[#ded6ca] bg-[#fbfaf8] px-3 text-sm outline-none"
                  placeholder="Optional"
                />
              </section>
            </div>

            <aside className="h-fit rounded-[8px] border border-[#e5ddd2] bg-white p-5">
              <h2 className="text-xl font-semibold">Order summary</h2>
              <div className="mt-5 space-y-4">
                {cart.map((line) => (
                  <div key={line.id} className="grid grid-cols-[64px_1fr] gap-3">
                    <div className="relative h-20 overflow-hidden rounded-[8px] bg-[#eee7dd]">
                      <Image
                        src={line.image}
                        alt={line.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold leading-5">{line.name}</p>
                      <p className="mt-1 text-xs text-[#7b7167]">
                        {line.size} / {line.color} x {line.quantity}
                      </p>
                      <p className="mt-2 text-sm font-semibold">
                        {formatCurrency(line.price * line.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-3 border-t border-[#e7e1d8] pt-5 text-sm">
                <SummaryLine label="Subtotal" value={formatCurrency(subtotal)} />
                <SummaryLine
                  label="Shipping"
                  value={shipping === 0 ? "Free" : formatCurrency(shipping)}
                />
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-[#e7e1d8] pt-5 text-lg font-semibold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              {error && <p className="mt-3 text-sm text-[#b9404f]">{error}</p>}
              <button
                className="focus-ring mt-5 w-full rounded-[8px] bg-[#b9404f] px-5 py-3 text-sm font-semibold text-white"
                type="submit"
              >
                Place order
              </button>
            </aside>
          </form>
        )}
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = "text", required = false }) {
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div>
      <label className="text-sm font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        required={required}
        className="focus-ring mt-2 h-11 w-full rounded-[8px] border border-[#ded6ca] bg-[#fbfaf8] px-3 text-sm outline-none"
      />
    </div>
  );
}

function DeliveryOption({ active, icon: Icon, title, text, price, onClick }) {
  return (
    <button
      className={`focus-ring rounded-[8px] border p-4 text-left ${
        active ? "border-[#151515] bg-[#fbfaf8]" : "border-[#ded6ca] bg-white"
      }`}
      type="button"
      onClick={onClick}
    >
      <Icon size={19} className="text-[#b9404f]" />
      <span className="mt-3 block font-semibold">{title}</span>
      <span className="mt-1 block text-sm text-[#6f6a63]">{text}</span>
      <span className="mt-2 block text-sm font-semibold">{price}</span>
    </button>
  );
}

function SummaryLine({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#6f6a63]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function SummaryTile({ label, value }) {
  return (
    <div className="rounded-[8px] bg-[#fbfaf8] p-4">
      <p className="text-sm text-[#7b7167]">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function paymentLabel(payment) {
  if (payment === "bkash") return "bKash";
  if (payment === "cod") return "Cash";
  return "Card";
}
