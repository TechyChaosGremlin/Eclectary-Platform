import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { Product } from '../types/product';
import { products } from '../data/products';

type CartItem = {
  productId: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  totalItems: number;
  subtotal: number;
};

const CART_STORAGE_KEY = 'eclectary-cart';
const CartContext = createContext<CartContextValue | undefined>(undefined);

function readStoredCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) as CartItem[] : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart());

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...currentItems, { productId: product.id, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems((currentItems) => {
      if (quantity <= 0) {
        return currentItems.filter((item) => item.productId !== productId);
      }

      return currentItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      );
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((total, item) => {
      const product = products.find((entry) => entry.id === item.productId);

      return total + (product ? product.price * item.quantity : 0);
    }, 0);

    return {
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart: (productId: number) => items.some((item) => item.productId === productId),
      totalItems: items.reduce((total, item) => total + item.quantity, 0),
      subtotal,
    };
  }, [items, addToCart, removeFromCart, updateQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

export type { CartItem };
