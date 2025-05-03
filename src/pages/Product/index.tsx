import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Product.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { API_URL } from "../../config";

type ProductType = {
  _id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  features?: string[];
  images: string[];
};

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
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/product/${id}`);
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.statusText}`);
        }
        const data = await response.json();
        if (data) {
          console.log("Продукт загружен:", data);
          setProduct(data);
        } else {
          throw new Error("Продукт не найден");
        }
      } catch (error) {
        console.error("Ошибка при загрузке продукта:", error);
        alert("Не удалось загрузить данные о продукте");
      }
    };
    fetchProduct();
  }, [id]);

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

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Пожалуйста, выберите размер");
      return;
    }
    alert(
      `Добавлено в корзину: ${product.name}, размер: ${selectedSize}, количество: ${quantity}`
    );
  };

  return (
    <Container className={styles.container}>
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
                    className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ""}`}
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
                onChange={handleQuantityChange}
                className={styles.quantityInput}
              />
            </div>

            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              ДОБАВИТЬ В КОРЗИНУ
            </button>
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
