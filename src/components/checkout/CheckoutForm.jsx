import { CheckoutOrderSummary } from "@/components/checkout/CheckoutOrderSummary";
import { ContactSection } from "@/components/checkout/ContactSection";
import { DeliverySection } from "@/components/checkout/DeliverySection";
import { PaymentSection } from "@/components/checkout/PaymentSection";

export function CheckoutForm({
  cart,
  delivery,
  error,
  form,
  freeShippingThreshold,
  payment,
  placeOrder,
  setDelivery,
  setPayment,
  shipping,
  subtotal,
  total,
  updateField,
}) {
  return (
    <form onSubmit={placeOrder} className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <ContactSection form={form} updateField={updateField} />
        <DeliverySection
          address={form.address}
          delivery={delivery}
          freeShippingThreshold={freeShippingThreshold}
          setDelivery={setDelivery}
          subtotal={subtotal}
          updateField={updateField}
        />
        <PaymentSection
          note={form.note}
          payment={payment}
          setPayment={setPayment}
          updateField={updateField}
        />
      </div>

      <CheckoutOrderSummary
        cart={cart}
        error={error}
        shipping={shipping}
        subtotal={subtotal}
        total={total}
      />
    </form>
  );
}
