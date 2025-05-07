// hooks/useFavorites.ts
import { useState, useEffect } from "react";

interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
}

const useFavorites = () => {
    const [favorites, setFavorites] = useState<any>(() =>
        localStorage.getItem("favorites")
    //@ts-ignore
      ? JSON.parse(localStorage.getItem("favorites"))
      : []
  );

  // Загрузка избранного при загрузке компонента
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      } catch (e) {
        console.error("Ошибка загрузки избранного:", e);
        localStorage.removeItem("favorites");
      }
    }
  }, []);

  // Сохранение при изменении
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: FavoriteProduct) => {
    setFavorites((prev: any) => {
      // Если товар уже в избранном - удаляем
      if (prev.some((item: any) => item.id === product.id)) {
        return prev.filter((item: any) => item.id !== product.id);
      }
      // Если нет - добавляем
      return [...prev, product];
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some((item: any) => item.id === id);
  };

  return { favorites, toggleFavorite, isFavorite };
};

export default useFavorites;
