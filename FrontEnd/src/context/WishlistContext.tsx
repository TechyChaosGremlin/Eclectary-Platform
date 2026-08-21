import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type WishlistContextValue = {
  ids: number[];
  toggleWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
  clearWishlist: () => void;
};

const WISHLIST_STORAGE_KEY = 'eclectary-wishlist';
const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

function readStoredWishlist(): number[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    return stored ? JSON.parse(stored) as number[] : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<number[]>(() => readStoredWishlist());

  useEffect(() => {
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const toggleWishlist = useCallback((productId: number) => {
    setIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
    );
  }, []);

  const clearWishlist = useCallback(() => setIds([]), []);

  const value = useMemo<WishlistContextValue>(() => ({
    ids,
    toggleWishlist,
    isWishlisted: (productId: number) => ids.includes(productId),
    clearWishlist,
  }), [ids, toggleWishlist, clearWishlist]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }

  return context;
}
