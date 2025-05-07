import { createContext, useContext, ReactNode } from 'react';
import { useProducts } from '../../hooks/useProducts';
import useFavorites from '../../hooks/useFavorites';
import { useCart } from '../../hooks/useCart';

interface AppContextType {
  products: ReturnType<typeof useProducts>;
  favorites: ReturnType<typeof useFavorites>;
  cart: ReturnType<typeof useCart>
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const products = useProducts();
  const favorites = useFavorites();
  const cart = useCart();

  return (
    <AppContext.Provider value={{ products, favorites, cart }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};