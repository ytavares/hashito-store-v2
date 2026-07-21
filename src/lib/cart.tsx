import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartItem = { productId: string; quantity: number };

type CartContextValue = {
  items: CartItem[];
  addItem: (productId: string, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
  detailed: Array<CartItem & { product: Product; lineTotal: number }>;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "hashito-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const detailed = items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return { ...item, product, lineTotal: product.price * item.quantity };
      })
      .filter(Boolean) as CartContextValue["detailed"];
    const subtotal = detailed.reduce((s, i) => s + i.lineTotal, 0);
    const totalItems = items.reduce((s, i) => s + i.quantity, 0);

    return {
      items,
      addItem: (productId, quantity) => {
        if (quantity <= 0) return;
        setItems((prev) => {
          const existing = prev.find((i) => i.productId === productId);
          if (existing) {
            return prev.map((i) =>
              i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i,
            );
          }
          return [...prev, { productId, quantity }];
        });
      },
      updateQuantity: (productId, quantity) => {
        setItems((prev) =>
          quantity <= 0
            ? prev.filter((i) => i.productId !== productId)
            : prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        );
      },
      removeItem: (productId) => setItems((prev) => prev.filter((i) => i.productId !== productId)),
      clear: () => setItems([]),
      totalItems,
      subtotal,
      detailed,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}