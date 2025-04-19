import React, { useState, useEffect } from "react";
import "./index.scss";

interface Props {
  scrollToCatalog: () => void;
}

const CustomDoubleCarousel: React.FC<Props> = ({ scrollToCatalog }) => {
  const gearImages = [
    { src: "/adam-gi.jpeg", alt: "Боксерские перчатки" },
    { src: "/adam-gi-2.jpeg", alt: "Шорты для ММА" },
    { src: "/adam-gi-3.jpeg", alt: "Защита для тренировок" },
  ];

  const clothingImages = [
    { src: "/adam-gi.jpeg", alt: "Футболка тренировочная" },
    { src: "/adam-gi-2.jpeg", alt: "Штаны для единоборств" },
    { src: "/adam-gi-3.jpeg", alt: "Толстовка с логотипом" },
  ];

  const [currentGearIndex, setCurrentGearIndex] = useState(0);
  const [currentClothingIndex, setCurrentClothingIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  // Функция для переключения слайдов с анимацией
  const nextSlide = (type) => {
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
    const clothingInterval = setInterval(() => nextSlide("clothing"), 5000);
    return () => {
      clearInterval(gearInterval);
      clearInterval(clothingInterval);
    };
  }, []);

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
        <div className="carousel-column">
          <div className={`carousel-slide ${animate ? "fade-out" : "fade-in"}`}>
            <img
              src={gearImages[currentGearIndex].src}
              alt={gearImages[currentGearIndex].alt}
            />
          </div>
        </div>

        <div className="carousel-column">
          <div className={`carousel-slide ${animate ? "fade-out" : "fade-in"}`}>
            <img
              src={clothingImages[currentClothingIndex].src}
              alt={clothingImages[currentClothingIndex].alt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDoubleCarousel;
