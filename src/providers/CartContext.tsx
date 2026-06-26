"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  title: string;
  slug: string;
  price: number;
  weight: string;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
  initialCart = [],
}: {
  children: React.ReactNode;
  initialCart?: CartItem[];
}) {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  // Sync local storage on mount if localStorage is empty but server had initialCart
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("goni_cart");
      if (!savedCart && initialCart.length > 0) {
        localStorage.setItem("goni_cart", JSON.stringify(initialCart));
      }
    } catch (e) {
      console.warn("localStorage not available:", e);
    }
  }, [initialCart]);

  // Save cart to localStorage and Cookies on change
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem("goni_cart", JSON.stringify(newCart));
    } catch (e) {
      console.warn("localStorage not available:", e);
    }
    // Sync to cookie
    document.cookie = `goni_cart=${encodeURIComponent(JSON.stringify(newCart))}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const addToCart = (newItem: Omit<CartItem, "quantity">, quantityToAdd = 1) => {
    const existingItemIndex = cart.findIndex((item) => item.id === newItem.id);

    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += quantityToAdd;
      saveCart(newCart);
    } else {
      saveCart([...cart, { ...newItem, quantity: quantityToAdd }]);
    }
  };

  const removeFromCart = (id: string) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    saveCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
