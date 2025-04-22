import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Product.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const products = [
  { id: 1, name: "Кимоно для БЖЖ Submission", category: "Кимоно", price: 7400, description: "Профессиональное кимоно для бразильского джиу-джитсу", features: [
    "Куртка и штаны выполнены из хлопка высокой плотности",
    "Усиленные швы для повышенной износостойкости",
    "Поставляется в удобной сумке для переноски",
    "Доступно в различных цветах"
  ] },
  { id: 2, name: "Product 2", category: "Category 2", price: 10050 },
  { id: 3, name: "Product 3", category: "Category 3", price: 3000 },
  { id: 4, name: "Product 4", category: "Category 4", price: 11000 },
  { id: 5, name: "Product 5", category: "Category 3", price: 9500 },
  { id: 6, name: "Product 6", category: "Category 2", price: 7500 },
  { id: 7, name: "Product 7", category: "Category 1", price: 6500 },
  { id: 8, name: "Product 8", category: "Category 2", price: 7700 },
];

const sizeOptions = ["A00", "A0", "A1", "A1L", "A2", "A2L", "A2H", "A3", "A3L", "A3H", "A4", "A5"];

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
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find((product) => product.id === Number(id));
  const galleryImages = ["/adam-gi.jpeg", "/adam-gi-2.jpeg", "/adam-gi-3.jpeg"];

  if (!product) {
    return <div className={styles.notFound}>Продукт не найден</div>;
  }

  const images = galleryImages.map((image) => ({
    original: image,
    thumbnail: image,
  }));

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
    // Здесь будет логика добавления в корзину
    alert(`Добавлено в корзину: ${product.name}, размер: ${selectedSize}, количество: ${quantity}`);
  };

  return (
    <Container className={styles.container}>
      <h1 className={styles.productTitle}>{product.name}</h1>

      <Row className={styles.productRow}>
        <Col lg={6} className={styles.galleryCol}>
          <div className={styles.galleryWrapper}>
            <ImageGallery 
              items={images} 
              showPlayButton={false}
              showFullscreenButton={true}
              showNav={true}
              thumbnailPosition="bottom"
              additionalClass={styles.customGallery}
            />
          </div>
        </Col>

        <Col lg={6} className={styles.detailsCol}>
          <div className={styles.detailsCard}>
            <div className={styles.productMeta}>
              <span className={styles.category}>{product.category}</span>
              <span className={styles.price}>{product.price.toLocaleString()} ₽</span>
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

            <button 
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              ДОБАВИТЬ В КОРЗИНУ
            </button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <div className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>Описание</h2>
            <p className={styles.descriptionText}>{product.description || "Кимоно(ги) для БЖЖ (бразильское джиу-джитсу)"}</p>
            
            <ul className={styles.featuresList}>
              {(product.features || [
                "Куртка и штаны выполнены из хлопка высокой плотности",
                "Поставляется ги в удобной сумке для переноски"
              ]).map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  <span className={styles.featureIcon}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
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