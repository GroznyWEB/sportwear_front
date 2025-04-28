import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: {
    image: string[];
    id: number;
    name: string;
    description: string;
    brend: string;
    price: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className={styles.productLink}>
      <div className={styles.productCard}>
        <div className={styles.favorite}>
          <MdOutlineFavorite size={25} className={styles.fav_icon} />
        </div>
        <img
          src={`http://localhost:4000/images/${product.image[0]}`}
          alt={product.name}
        />
        <h4>{product.name}</h4>
        <h4>{product.description}</h4>
        <h4>{product.brend}</h4>
        <p className={styles.price}>
          {product.price.toLocaleString("ru-RU")} ₽
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
