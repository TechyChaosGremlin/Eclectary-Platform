/* eslint-disable react-refresh/only-export-components */
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
  addItem: (product: Product, quantity?: number) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  calculateSubtotal: () => number;
  isInCart: (productId: number) => boolean;
  totalItems: number;
  subtotal: number;
};

const CART_STORAGE_KEY = 'eclectary-cart';
const CartContext = createContext<CartContextValue | undefined>(undefined);

function normalizeQuantity(quantity: number): number {
  return Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1;
}

function readStoredCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsedCart = stored ? JSON.parse(stored) : [];

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart.reduce<CartItem[]>((cartItems, item) => {
      if (
        typeof item?.productId !== 'number'
        || typeof item?.quantity !== 'number'
        || item.quantity <= 0
      ) {
        return cartItems;
      }

      return [
        ...cartItems,
        {
          productId: item.productId,
          quantity: normalizeQuantity(item.quantity),
        },
      ];
    }, []);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart());

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    const normalizedQuantity = normalizeQuantity(quantity);

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + normalizedQuantity }
            : item,
        );
      }

      return [...currentItems, { productId: product.id, quantity: normalizedQuantity }];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems((currentItems) => {
      if (!Number.isFinite(quantity) || quantity <= 0) {
        return currentItems.filter((item) => item.productId !== productId);
      }

      return currentItems.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.floor(quantity) } : item,
      );
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const calculateSubtotal = useCallback(() => items.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.productId);

    return total + (product ? product.price * item.quantity : 0);
  }, 0), [items]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = calculateSubtotal();

    return {
      items,
      addItem,
      addToCart: addItem,
      removeItem,
      removeFromCart: removeItem,
      updateQuantity,
      clearCart,
      calculateSubtotal,
      isInCart: (productId: number) => items.some((item) => item.productId === productId),
      totalItems: items.reduce((total, item) => total + item.quantity, 0),
      subtotal,
    };
  }, [items, addItem, removeItem, updateQuantity, clearCart, calculateSubtotal]);

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
