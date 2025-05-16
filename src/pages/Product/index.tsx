import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Product.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { API_URL } from "../../config";
import useNotification from "../../hooks/useNotification";
import { useApp } from "../../components/context/AppContext";

// type ProductType = {
//   _id: string;
//   name: string;
//   category: string;
//   price: number;
//   description?: string;
//   features?: string[];
//   images: string[];
// };

const sizeOptions = ["A0", "A1", "A1L", "A2", "A2L", "A3"];

const sizeTableData = [
  { size: "A0", height: "152 - 165", weight: "45.4 - 63.5" },
  { size: "A1", height: "157 - 168", weight: "49.9 - 68" },
  { size: "A2", height: "173 - 183", weight: "74.8 - 94" },
  { size: "A2L", height: "180 - 191", weight: "74.8 - 99.8" },
  { size: "A3", height: "180 - 191", weight: "81.6 - 104" },
  { size: "A3L", height: "188 - 196", weight: "81.6 - 109" },
  { size: "A4", height: "188 - 196", weight: "90.7 - 118" },
  { size: "A5", height: "196 - 203", weight: "90.7 - 122" },
];

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, cart, favorites } = useApp();
  const product = products.products.find((p) => p._id === id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);
  const { showNotification, NotificationComponent } = useNotification();

  const isInCart = cart.cart.some((item) => item.id === product?._id);

  const { toggleFavorite, isFavorite } = favorites;

  // Функция добавления в корзину
  const handleAddToCart = () => {
    if (!selectedSize) {
      showNotification("Пожалуйста, выберите размер", { type: "error" });
      return;
    }

    const newItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.images[0] || "",
    };

    cart.addToCart(newItem, quantity);

    showNotification(
      `Добавлено в корзину: ${product.name}, размер: ${selectedSize}, количество: ${quantity}`,
      { type: "success" }
    );
  };

  // Функция добавления в избранное
  const handleAddToFavorite = () => {
    if (!product) return;

    toggleFavorite({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "",
      brand: product.brand || "",
    });

    showNotification(
      isFavorite(product._id)
        ? "Товар удален из избранного"
        : "Добавлено в избранное",
      { type: isFavorite(product._id) ? "info" : "success" }
    );
  };

  const handleTouchStart = (e: any) => {
    e.stopPropagation();
  };
  
  const handleTouchMove = (e: any) => {
    e.stopPropagation();
  };

  if (!product) {
    return <div className={styles.notFound}>Продукт не найден</div>;
  }

  const galleryImages = Array.isArray(product.images)
    ? product.images.map((img: string) => ({
        original: `${API_URL}/images/${img}`,
        thumbnail: `${API_URL}/images/${img}`,
      }))
    : [];

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size === selectedSize ? null : size);
  };

  return (
    <Container className={styles.container}>
      <h1 className={styles.productTitle}>{product.name || "Без названия"}</h1>
      <NotificationComponent />

      <Row className={styles.productRow}>
        <Col lg={6} className={styles.galleryCol}>
          <div className={styles.galleryWrapper}>
            {galleryImages.length > 0 ? (
              <ImageGallery
              items={galleryImages}
              showPlayButton={false}
              showFullscreenButton={true}
              showNav={true}
              thumbnailPosition="bottom"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              additionalClass={styles.customGallery}
              useBrowserFullscreen={false}
              disableSwipe={window.innerWidth < 768} // Отключаем свайп только на мобильных
              />
            ) : (
              <div className={styles.noImages}>Изображения отсутствуют</div>
            )}
          </div>
        </Col>

        <Col lg={6} className={styles.detailsCol}>
          <div className={styles.detailsCard}>
            <div className={styles.productMeta}>
              <span className={styles.category}>
                {product.category || "Категория не указана"}
              </span>
              <span className={styles.price}>
                {product.price
                  ? `${product.price.toLocaleString()} ₽`
                  : "Цена не указана"}
              </span>
            </div>

            <div className={styles.sizeSection}>
              <h3 className={styles.sectionTitle}>Выберите размер</h3>
              <div className={styles.sizeGrid}>
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeButton} ${
                      selectedSize === size ? styles.selected : ""
                    }`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.quantitySection}>
              <label htmlFor="quantity" className={styles.quantityLabel}>
                Количество:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1"
                onChange={(e: any) => setQuantity(e.target.value)}
                className={styles.quantityInput}
              />
            </div>
            <div className={styles.buttons}>
              <button onClick={handleAddToCart} className={styles.cartButton}>
                {isInCart ? "ТОВАР В КОРЗИНЕ" : "ДОБАВИТЬ В КОРЗИНУ"}
              </button>
              <button
                onClick={handleAddToFavorite}
                className={`${styles.favoriteButton} ${
                  isFavorite(product._id) ? styles.favorited : ""
                }`}
              >
                {isFavorite(product._id)
                  ? "В ИЗБРАННОМ"
                  : "ДОБАВИТЬ В ИЗБРАННОЕ"}
              </button>
            </div>
            <Col lg={12}>
              <div className={styles.descriptionSection}>
                <h2 className={styles.sectionTitle}>Описание</h2>
                <div className={styles.descriptionText}>
                  <h3>⚔️ S U B M I S S I O N — WARRIOR EDITION ⚔️</h3>
                  <p>
                    <strong>
                      Оригинальное кимоно Submission из новой коллекции WARRIOR
                      EDITION
                    </strong>
                    — это идеальное сочетание стиля, качества и
                    функциональности, созданное для настоящих бойцов.
                  </p>

                  <h3>Преимущества:</h3>
                  <ul>
                    <li>
                      ✅ Соответствует стандартам <strong>IBJJF</strong>,
                      <strong>UAEJJ</strong> и <strong>ACBJJ</strong>
                    </li>
                    <li>
                      ✅ Прошло предварительную усадку — не теряет форму после
                      стирки
                    </li>
                    <li>
                      ✅ Изготовлено из
                      <strong>100% премиального хлопка</strong>
                    </li>
                    <li>
                      ✅ Усиленные швы в ключевых зонах для максимальной
                      прочности
                    </li>
                    <li>
                      ✅ Все логотипы выполнены в виде <strong>вышивки</strong>{" "}
                      — долговечно и эстетично
                    </li>
                  </ul>

                  <h3>Характеристики:</h3>
                  <ul>
                    <li>
                      <strong>Материал:</strong> 100% хлопок
                    </li>
                    <li>
                      <strong>Плотность ткани:</strong> 450 г/м²
                    </li>
                    <li>
                      <strong>Штаны:</strong> Твил — прочная и износостойкая
                      ткань
                    </li>
                  </ul>

                  <p>
                    <strong>Доступные размеры:</strong> A0, A1, A1L, A2, A2L, A3
                  </p>

                  <p>
                    <em>
                      Будь готов к бою — выбери кимоно, которое подчеркивает
                      твой боевой дух.
                    </em>
                  </p>
                  <p>
                    <strong>SUBMISSION — экипировка победителей.</strong>
                  </p>
                </div>

                {Array.isArray(product.features) &&
                  product.features.length > 0 && (
                    <ul className={styles.featuresList}>
                      {product.features.map(
                        (feature: string, index: number) => (
                          <li key={index} className={styles.featureItem}>
                            <span className={styles.featureIcon}>✓</span>
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                  )}
              </div>
            </Col>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <div className={styles.sizeTableSection}>
            <h3 className={styles.sectionTitle}>Таблица размеров</h3>
            <div className={styles.tableResponsive}>
              <table className={styles.sizeTable}>
                <thead>
                  <tr>
                    <th>Размер</th>
                    <th>Рост атлета (см)</th>
                    <th>Вес атлета (кг)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeTableData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.size}</td>
                      <td>{row.height}</td>
                      <td>{row.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
