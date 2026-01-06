import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addToCart as addToCartAPI,
  removeItem,
  updateCartItem,
  viewCart,
} from "../services/cartServices";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const username = localStorage.getItem("username");

  /* LOAD CART */
  useEffect(() => {
    if (!username) return;

    const loadCart = async () => {
      try {
        const dbCart = await viewCart(username);
        setCart(dbCart || []);
      } catch (err) {
        console.error("Failed to load cart", err);
      }
    };

    loadCart();
  }, [username]);

  /* ADD TO CART */
  const addToCart = async (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    try {
      await addToCartAPI({
        username,
        productId: product.id,
        quantity: 1,
      });
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  /* REMOVE FROM CART */
  const removeFromCart = async (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));

    try {
      await removeItem(productId);
    } catch (err) {
      console.error("Remove from cart failed", err);
    }
  };

  /* UPDATE QUANTITY */
  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );

    try {
      await updateCartItem({
        username,
        productId,
        quantity,
      });
    } catch (err) {
      console.error("Update quantity failed", err);
    }
  };

  /* CLEAR CART */
  const clearCart = () => {
    setCart([]);
  };

  /* HELPERS */
  const getCartTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getCartCount = () =>
    cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
