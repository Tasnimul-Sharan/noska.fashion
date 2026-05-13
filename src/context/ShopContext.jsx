import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ShopContext = createContext(null);

const CART_STORAGE_KEY = "aurelia-cart";
const WISHLIST_STORAGE_KEY = "aurelia-wishlist";
const FREE_SHIPPING_THRESHOLD = 12000;

function lineId(productId, size, color) {
  return `${productId}-${size}-${color}`;
}

function readStorage(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    queueMicrotask(() => {
      if (!active) {
        return;
      }

      setCart(readStorage(CART_STORAGE_KEY, []));
      setWishlist(readStorage(WISHLIST_STORAGE_KEY, []));
      setHydrated(true);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist, hydrated]);

  const addToCart = useCallback((product, options = {}) => {
    const size = options.size || product.sizes?.[0] || "M";
    const color = options.color || product.colors?.[0]?.name || "Default";
    const quantity = Math.max(1, Number(options.quantity) || 1);
    const id = lineId(product.id, size, color);

    setCart((current) => {
      const existing = current.find((line) => line.id === id);

      if (existing) {
        return current.map((line) =>
          line.id === id
            ? { ...line, quantity: Math.min(line.quantity + quantity, 12) }
            : line,
        );
      }

      return [
        ...current,
        {
          id,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          image: product.image,
          price: product.price,
          size,
          color,
          quantity,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setCart((current) =>
      current
        .map((line) =>
          line.id === id ? { ...line, quantity: Math.max(0, quantity) } : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((current) => current.filter((line) => line.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }, []);

  const isInWishlist = useCallback(
    (productId) => wishlist.includes(productId),
    [wishlist],
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [cart],
  );

  const itemCount = useMemo(
    () => cart.reduce((sum, line) => sum + line.quantity, 0),
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      subtotal,
      itemCount,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isInWishlist,
    }),
    [
      addToCart,
      cart,
      clearCart,
      isInWishlist,
      itemCount,
      removeFromCart,
      subtotal,
      toggleWishlist,
      updateQuantity,
      wishlist,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }

  return context;
}
