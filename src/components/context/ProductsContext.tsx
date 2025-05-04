import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_URL } from '../../config';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
}

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: true,
  error: null,
  refresh: async () => {},
});

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Проверяем кэш
      const cachedProducts = localStorage.getItem('cachedProducts');
      if (cachedProducts) {
        setProducts(JSON.parse(cachedProducts));
      }

      const response = await fetch(`${API_URL}/products`);
      
      if (response.status === 304) return; // Данные не изменились
      if (!response.ok) throw new Error('Ошибка загрузки');
      
      const data = await response.json();
      setProducts(data);
      localStorage.setItem('cachedProducts', JSON.stringify(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    
    const interval = setInterval(fetchProducts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error, refresh: fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);