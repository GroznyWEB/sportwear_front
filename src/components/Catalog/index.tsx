import React from "react";
import styles from "./Catalog.module.scss";
import { Container } from "react-bootstrap";
import FeedbackModal from "../ui/FeedbackModal";
import ProductCard from "../ProductCard";
import { TbCertificate, TbTruckDelivery } from "react-icons/tb";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { LuHandshake } from "react-icons/lu";
import { useApp } from "../context/AppContext";

const Catalog: React.FC = () => {
  const { products, loading } = useApp().products;

  console.log("prods", products);

  const { isFavorite, toggleFavorite } = useApp().favorites;

  const handleFavoriteClick = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка товаров...</div>;
  }

  return (
    <Container className={styles.container}>
      <div className={styles.catalog}>
        <h1>Каталог</h1>
      </div>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            handleFavoriteClick={handleFavoriteClick}
            isFavorite={isFavorite}
            product={{
              id: product._id,
              name: product.name,
              description: product.description,
              brand: product.brand,
              price: product.price,
              images: product.images,
            }}
          />
        ))}
      </div>

      <div className={styles.feedBack}>
        <FeedbackModal />
      </div>

      <div className={styles.artBoard}>
        <div className={styles.featureCard}>
          <TbTruckDelivery size={50} color="black" />
          <span>Бесплатная доставка по всей России</span>
        </div>
        <div className={styles.featureCard}>
          <TbCertificate size={50} color="black" />
          <span>Бренд запатентован</span>
        </div>
        <div className={styles.featureCard}>
          <AiOutlineSafetyCertificate size={50} color="black" />
          <span>Гарантия 6 месяцев</span>
        </div>
        <div className={styles.featureCard}>
          <MdOutlinePayment size={50} color="black" />
          <span>Онлайн оплата на нашем сайте</span>
        </div>
        <div className={styles.featureCard}>
          <LuHandshake size={50} color="black" />
          <span>Бойцы ACA доверяют нам</span>
        </div>
      </div>
    </Container>
  );
};

export default Catalog;
