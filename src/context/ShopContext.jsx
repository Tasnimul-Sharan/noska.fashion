import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ShopContext = createContext(null);

const CART_STORAGE_KEY = "noska-cart";
const WISHLIST_STORAGE_KEY = "noska-wishlist";
const RECENTLY_VIEWED_STORAGE_KEY = "noska-recently-viewed";
const THEME_STORAGE_KEY = "noska-theme";
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
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [theme, setTheme] = useState("light");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    queueMicrotask(() => {
      if (!active) {
        return;
      }

      setCart(readStorage(CART_STORAGE_KEY, []));
      setWishlist(readStorage(WISHLIST_STORAGE_KEY, []));
      setRecentlyViewed(readStorage(RECENTLY_VIEWED_STORAGE_KEY, []));
      setTheme(readStorage(THEME_STORAGE_KEY, "light"));
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

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(
        RECENTLY_VIEWED_STORAGE_KEY,
        JSON.stringify(recentlyViewed),
      );
    }
  }, [recentlyViewed, hydrated]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  }, [hydrated, theme]);

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

  const updateCartItemOptions = useCallback((id, options = {}) => {
    setCart((current) => {
      const line = current.find((item) => item.id === id);

      if (!line) {
        return current;
      }

      const nextSize = options.size || line.size;
      const nextColor = options.color || line.color;
      const nextId = lineId(line.productId, nextSize, nextColor);

      if (nextId === id) {
        return current;
      }

      const existing = current.find((item) => item.id === nextId);
      const withoutCurrent = current.filter((item) => item.id !== id);

      if (existing) {
        return withoutCurrent.map((item) =>
          item.id === nextId
            ? { ...item, quantity: Math.min(item.quantity + line.quantity, 12) }
            : item,
        );
      }

      return [...withoutCurrent, { ...line, id: nextId, size: nextSize, color: nextColor }];
    });
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

  const removeFromWishlist = useCallback((productId) => {
    setWishlist((current) => current.filter((id) => id !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId) => wishlist.includes(productId),
    [wishlist],
  );

  const addRecentlyViewed = useCallback((productId) => {
    setRecentlyViewed((current) => [
      productId,
      ...current.filter((id) => id !== productId),
    ].slice(0, 8));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

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
      recentlyViewed,
      theme,
      subtotal,
      itemCount,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      addToCart,
      updateQuantity,
      updateCartItemOptions,
      removeFromCart,
      clearCart,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
      addRecentlyViewed,
      toggleTheme,
    }),
    [
      addRecentlyViewed,
      addToCart,
      cart,
      clearCart,
      isInWishlist,
      itemCount,
      recentlyViewed,
      removeFromWishlist,
      removeFromCart,
      subtotal,
      theme,
      toggleTheme,
      toggleWishlist,
      updateCartItemOptions,
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
