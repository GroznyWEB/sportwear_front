// hooks/useCart.ts
import { useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string; // опционально, если есть выбор размера
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  console.log('cart', cart);
  
  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


  const increaseQuantity = (productId: string) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId 
          ? { ...item, quantity: Number(item.quantity) + 1 } 
          : item
      )
    );
  };
  
  const decreaseQuantity = (productId: string) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { 
              ...item, 
              quantity: Math.max(1, item.quantity - 1) // Не меньше 1
            }
          : item
      )
    );
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity
  };
};