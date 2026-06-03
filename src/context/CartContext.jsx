import { createContext, useContext, useMemo, useState } from "react";
import { products } from "../data/marketplace.js";

const CartContext = createContext(null);

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("micromart-cart-v2") || "[]");
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [isCartOpen, setCartOpen] = useState(false);

  const persist = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem("micromart-cart-v2", JSON.stringify(nextItems));
  };

  const addItem = (productId, quantity = 1) => {
    const nextItems = items.some((item) => item.productId === productId)
      ? items.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item))
      : [...items, { productId, quantity }];
    persist(nextItems);
    setCartOpen(true);
  };

  const updateQuantity = (productId, quantity) => {
    const nextItems = quantity <= 0
      ? items.filter((item) => item.productId !== productId)
      : items.map((item) => (item.productId === productId ? { ...item, quantity } : item));
    persist(nextItems);
  };

  const clearCart = () => persist([]);

  const detailedItems = useMemo(
    () => items.map((item) => ({ ...item, product: products.find((product) => product.id === item.productId) })).filter((item) => item.product),
    [items],
  );

  const totals = useMemo(() => {
    const subtotal = detailedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const delivery = subtotal > 0 ? 450 : 0;
    return {
      count: detailedItems.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      delivery,
      total: subtotal + delivery,
    };
  }, [detailedItems]);

  const value = {
    items,
    detailedItems,
    totals,
    isCartOpen,
    setCartOpen,
    addItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
