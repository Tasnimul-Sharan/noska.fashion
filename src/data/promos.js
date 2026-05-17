export const promoCodes = [
  {
    code: "NOSKA15",
    discount: 0.15,
    label: "15% off the full edit",
    hint: "Best for bigger carts",
  },
  {
    code: "EID10",
    discount: 0.1,
    label: "10% festive saving",
    hint: "Works on every dress",
  },
  {
    code: "FIRST500",
    amount: 500,
    label: "BDT 500 welcome credit",
    hint: "New member demo code",
  },
];

export function getPromoByCode(code) {
  return promoCodes.find((promo) => promo.code === code);
}

export function calculatePromoDiscount(code, subtotal) {
  const promo = getPromoByCode(code);

  if (!promo) {
    return 0;
  }

  if (promo.amount) {
    return Math.min(subtotal, promo.amount);
  }

  return Math.round(subtotal * promo.discount);
}
