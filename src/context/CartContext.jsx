import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("sepetim");
    return localData ? JSON.parse(localData) : [];
  });

  const [couponValue, setCouponValue] = useState(0);

  const applyCoupon = (code) => {
    if (code.toUpperCase() === "BEDAVA20") {
      setCouponValue(0.20);
    } else {
      setCouponValue(0);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    localStorage.setItem("sepetim", JSON.stringify(cart));
  }, [cart]);

  // --- HESAPLAMALARIN SIRALAMASI ÇOK ÖNEMLİ ---

  // 1. Önce temel toplamı buluyoruz
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // 2. Kargo hesaplamasını yapıyoruz (Çünkü finalTotal için shippingFee lazım)
  const shippingLimit = 200;
  const shippingFee = totalPrice >= shippingLimit || totalPrice === 0 ? 0 : 15;
  const amountToFreeShipping = Math.max(0, shippingLimit - totalPrice);

  // 3. İndirim miktarını hesaplıyoruz
  const discountAmount = totalPrice * couponValue;

  // 4. En son her şey hazır olduğunda Final Total hesaplıyoruz
  const finalTotal = (totalPrice - discountAmount) + shippingFee;

  // --- FONKSİYONLAR ---

  const addToCart = (product) => {
    setCart((prevCart) => {
      const isExisting = prevCart.find((item) => item.id === product.id);
      if (isExisting) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem.quantity === 1) {
        return prevCart.filter(item => item.id !== productId);
      } else {
        return prevCart.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item);
      }
    });
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, clearCart, removeFromCart, decreaseQuantity, 
      totalItems, totalPrice, shippingFee, finalTotal, 
      increaseQuantity, amountToFreeShipping, applyCoupon, couponValue 
    }}>
      {children}
    </CartContext.Provider>
  );
};