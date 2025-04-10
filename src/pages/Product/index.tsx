import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Product.module.scss";
import { Container } from "react-bootstrap";

const products = [
  { id: 1, name: "Product 1", category: "Category 1", price: 7400 },
  { id: 2, name: "Product 2", category: "Category 2", price: 10050 },
  { id: 3, name: "Product 3", category: "Category 3", price: 3000 },
  { id: 4, name: "Product 4", category: "Category 4", price: 11000 },
  { id: 5, name: "Product 5", category: "Category 3", price: 9500 },
  { id: 6, name: "Product 6", category: "Category 2", price: 7500 },
  { id: 7, name: "Product 7", category: "Category 1", price: 6500 },
  { id: 8, name: "Product 8", category: "Category 2", price: 7700 },
];

// Компонент слайдера изображений
const ProductSlider = ({ galleryImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prevSlide = () => {
    const index =
      currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const index =
      currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  const setSlide = (index) => {
    setCurrentIndex(index);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        <div className={styles.thumbnails}>
          {galleryImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`${styles.thumbnail} ${currentIndex === index ? styles.activeThumbnail : ""}`}
              onClick={() => setSlide(index)}
            />
          ))}
        </div>

        <div className={styles.mainImage} onClick={openModal}>
          <img src={galleryImages[currentIndex]} alt="Главное изображение" />
        </div>

        <button className={styles.prevBtn} onClick={prevSlide}>
          &#10094;
        </button>
        <button className={styles.nextBtn} onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.closeModal} onClick={closeModal}>
              &times;
            </span>
            <div className={styles.modalImageWrapper}>
              <button className={styles.modalPrevBtn} onClick={prevSlide}>
                &#10094;
              </button>
              <img
                className={styles.modalImage}
                src={galleryImages[currentIndex]}
                alt="Увеличенное изображение"
              />
              <button className={styles.modalNextBtn} onClick={nextSlide}>
                &#10095;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((product) => product.id === Number(id));

  const galleryImages = ["/adam-gi.jpeg", "/adam-gi-2.jpeg", "/adam-gi-3.jpeg"];

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <Container>
      <h1 className={styles.name}>{product.name}</h1>

      <div className={styles.content}>
        <div className={styles.image}>
          <ProductSlider galleryImages={galleryImages} />
        </div>

        <div className={styles.details}>
          <p>Категория: {product.category}</p>
          <p className={styles.price}>Цена: {product.price} ₽</p>

          <div className={styles.size}>
            <p>Выберите размер</p>
            <div className={styles.sizes}>
            <div className={styles.sizeItem}>
                <button className={styles.sizeBtn}>A00</button>
              </div>
              <div className={styles.sizeItem}>
                <button className={styles.sizeBtn}>A0</button>
              </div>
              <div className={styles.sizeItem}>
                <button className={styles.sizeBtn}>A1</button>
              </div>
              <div className={styles.sizeItem}>
                <button className={styles.sizeBtn}>A1L</button>
              </div>
              <div className={styles.sizeItem}>
                <button className={styles.sizeBtn}>A2</button>
              </div>
              <div className={styles.sizeItem}>
                <button className={styles.sizeBtn}>A2L</button>
              </div>
              <div className={styles.sizeItem}>
                <button className={styles.sizeBtn}>A2H</button>
              </div>
              <div className={styles.sizeItem}>
                <button className={styles.sizeBtn}>A3</button>
              </div>
              <div className={styles.sizeItem}>
                <button className={styles.sizeBtn}>A3L</button>
              </div>
              <div className={styles.sizeItem}>
                <button className={styles.sizeBtn}>A3H</button>
              </div>
              <div className={styles.sizeItem}>
                <button className={styles.sizeBtn}>A4</button>
              </div>
              <div className={styles.sizeItem}>
                <button className={styles.sizeBtn}>A5</button>
              </div>
            </div>
          </div>

          <div className={styles.quantity}>
            <label htmlFor="quantity">Количество:</label>
            <input type="number" id="quantity" defaultValue="1" min="1" />
          </div>

          <button className={styles.addToCartBtn}>ДОБАВИТЬ В КОРЗИНУ</button>
        </div>
      </div>

      <div className={styles.productDescription}>
        <h2>Описание</h2>
        <p>Кимоно(ги) для БЖЖ (бразильское джиу-джитсу)...</p>
        <ul className={styles.features}>
          <li>Куртка и штаны выполнены из хлопка...</li>
          <li>Поставляется ги в сумке...</li>
        </ul>
      </div>

      <div className={styles.sizeTable}>
        <h3>Условная таблица размеров ги для БЖЖ от Submission:</h3>
        <table>
          <thead>
            <tr>
              <th>Размер</th>
              <th>Рост атлета (см)</th>
              <th>Вес атлета (кг)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A0</td>
              <td>152 - 165</td>
              <td>45.4 - 63.5</td>
            </tr>
            <tr>
              <td>A1</td>
              <td>157 - 168</td>
              <td>49.9 - 68</td>
            </tr>
            <tr>
              <td>A2</td>
              <td>173 - 183</td>
              <td>74.8 - 94</td>
            </tr>
            <tr>
              <td>A2L</td>
              <td>180 - 191</td>
              <td>74.8 - 99.8</td>
            </tr>
            <tr>
              <td>A3</td>
              <td>180 - 191</td>
              <td>81.6 - 104</td>
            </tr>
            <tr>
              <td>A3L</td>
              <td>188 - 196</td>
              <td>81.6 - 109</td>
            </tr>
            <tr>
              <td>A4</td>
              <td>188 - 196</td>
              <td>90.7 - 118</td>
            </tr>
            <tr>
              <td>A5</td>
              <td>196 - 203</td>
              <td>90.7 - 122</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Product;
