import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Product.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { API_URL } from "../../config";
import { useProducts } from "../../components/context/ProductsContext";
import useNotification from "../../hooks/useNotification";

const sizeOptions = [
  "A00", "A0", "A1", "A1L", "A2", "A2L", "A2H", "A3", "A3L", "A3H", "A4", "A5"
];

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
  const { products } = useProducts();
  const product = products.find((p) => p._id === id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { showNotification, NotificationComponent } = useNotification();


  // Добавляем состояния для корзины и избранного
  const [cart, setCart] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);

  // Загружаем данные из localStorage при монтировании
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Функция добавления в корзину
  const handleAddToCart = () => {
    if (!selectedSize) {
      showNotification('Пожалуйста, выберите размер', { type: 'error' });
      return;
    }

    const newItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity,
      image: product.images[0] || ''
    };

    const updatedCart = [...cart, newItem];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    showNotification(
      `Добавлено в корзину: ${product.name}, размер: ${selectedSize}, количество: ${quantity}`,
      { type: 'success' }
    );
  };

  // Функция добавления в избранное
  const handleAddToFavorite = () => {
    const newFavorite = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0] || ''
    };

    // Проверяем, не добавлен ли уже товар в избранное
    const isAlreadyFavorite = favorites.some(item => item.id === product._id);

    if (isAlreadyFavorite) {
      const updatedFavorites = favorites.filter(item => item.id !== product._id);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, newFavorite];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
    showNotification(
      isAlreadyFavorite
        ? 'Товар удален из избранного'
        : 'Добавлено в избранное',
      { type: isAlreadyFavorite ? 'info' : 'success' }
    );
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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <Container className={styles.container}>
      <NotificationComponent/>

      <h1 className={styles.productTitle}>{product.name || "Без названия"}</h1>

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
                additionalClass={styles.customGallery}
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
                {product.price ? `${product.price.toLocaleString()} ₽` : "Цена не указана"}
              </span>
            </div>

            <div className={styles.sizeSection}>
              <h3 className={styles.sectionTitle}>Выберите размер</h3>
              <div className={styles.sizeGrid}>
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ''}`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.quantitySection}>
              <label htmlFor="quantity" className={styles.quantityLabel}>Количество:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1"
                onChange={handleQuantityChange}
                className={styles.quantityInput}
              />
            </div>

            <div className={styles.buttons}>
              <button
                onClick={handleAddToCart}
                className={styles.cartButton}
              >
                ДОБАВИТЬ В КОРЗИНУ
              </button>
              <button
                onClick={handleAddToFavorite}
                className={`${styles.favoriteButton} ${favorites.some(item => item.id === product._id) ? styles.favorited : ''
                  }`}
              >
                {favorites.some(item => item.id === product._id)
                  ? 'В ИЗБРАННОМ'
                  : 'ДОБАВИТЬ В ИЗБРАННОЕ'}
              </button>
            </div>


            <Col lg={12}>
              <div className={styles.descriptionSection}>
                <h2 className={styles.sectionTitle}>Описание</h2>
                <p className={styles.descriptionText}>
                  {product.description || "Описание отсутствует"}
                </p>

                {Array.isArray(product.features) && product.features.length > 0 && (
                  <ul className={styles.featuresList}>
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className={styles.featureItem}>
                        <span className={styles.featureIcon}>✓</span>
                        {feature}
                      </li>
                    ))}
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
