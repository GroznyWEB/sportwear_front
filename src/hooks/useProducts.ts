import { useState, useEffect } from 'react';
import { API_URL } from '../config';

export const useProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const cachedProducts = localStorage.getItem('cachedProducts');
      if (cachedProducts) setProducts(JSON.parse(cachedProducts));

      const response = await fetch(`${API_URL}/products`);
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

  return { products, loading, error, refresh: fetchProducts };
};