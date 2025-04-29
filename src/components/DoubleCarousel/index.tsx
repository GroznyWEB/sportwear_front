import React, { useState, useEffect } from "react";
import "./index.scss";
import { API_URL } from "../../config";

interface Props {
  scrollToCatalog: () => void;
}

const CustomDoubleCarousel: React.FC<Props> = ({ scrollToCatalog }) => {
  const gearImages = [
    { src: `${API_URL}/images/red-other1.webp`, alt: "Боксерские перчатки" },
    { src: `${API_URL}/images/sub-red8.webp`, alt: "Шорты для ММА" },
    { src: `${API_URL}/images/sub-yellow2.webp`, alt: "Защита для тренировок" },
  ];

  const clothingImages = [
    { src: `${API_URL}/images/red-other8.webp`, alt: "Футболка тренировочная" },
    { src: `${API_URL}/images/sub-white11.webp`, alt: "Штаны для единоборств" },
    { src: `${API_URL}/images/sub-yellow6.webp`, alt: "Толстовка с логотипом" },
  ];

  const [currentGearIndex, setCurrentGearIndex] = useState(0);
  const [currentClothingIndex, setCurrentClothingIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Проверяем, мобильное ли устройство
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Проверяем сразу при загрузке
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = (type: "gear" | "clothing") => {
    setAnimate(true);
    setTimeout(() => {
      if (type === "gear") {
        setCurrentGearIndex((prev) => (prev + 1) % gearImages.length);
      } else {
        setCurrentClothingIndex((prev) => (prev + 1) % clothingImages.length);
      }
      setAnimate(false);
    }, 300);
  };

  useEffect(() => {
    const gearInterval = setInterval(() => nextSlide("gear"), 5000);
    const clothingInterval = isMobile 
      ? null 
      : setInterval(() => nextSlide("clothing"), 5000);
    
    return () => {
      clearInterval(gearInterval);
      if (clothingInterval) clearInterval(clothingInterval);
    };
  }, [isMobile]);

  return (
    <div className="custom-carousel-container">
      <div className="promo-banner">
        <h1>Бренд экипировки и одежда для единоборств</h1>
        <p>
          10% скидка на весь асортимент товаров при вводе промокода «SALE10» в
          корзине
        </p>
        <button className="catalog-link" onClick={scrollToCatalog}>
          КАТАЛОГ ТОВАРОВ →
        </button>
      </div>

      <div className="double-carousel">
        {/* Всегда показываем карусель с gearImages */}
        <div className="carousel-column">
          <div className={`carousel-slide ${animate ? "fade-out" : "fade-in"}`}>
            <img
              src={gearImages[currentGearIndex].src}
              alt={gearImages[currentGearIndex].alt}
            />
          </div>
        </div>

        {/* Показываем вторую карусель только на десктопе */}
        {!isMobile && (
          <div className="carousel-column">
            <div className={`carousel-slide ${animate ? "fade-out" : "fade-in"}`}>
              <img
                src={clothingImages[currentClothingIndex].src}
                alt={clothingImages[currentClothingIndex].alt}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDoubleCarousel;