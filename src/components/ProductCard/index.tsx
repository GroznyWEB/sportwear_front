import React from "react";
import { Link } from "react-router-dom";
import { MdFavorite, MdOutlineFavorite } from "react-icons/md";
import styles from "./ProductCard.module.scss";
import { API_URL } from "../../config";

interface ProductCardProps {
  product: {
    id: string;
    images: string[];
    name: string;
    description: string;
    brand: string;
    price: number;
  };
  handleFavoriteClick: (e: any, product: any) => void;
  isFavorite: any;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handleFavoriteClick,
  isFavorite,
}) => {
  return (
    <Link to={`/product/${product.id}`} className={styles.productLink}>
      <div className={styles.productCard}>
        <div
          className={styles.favorite}
          onClick={(e) =>
            handleFavoriteClick(e, {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0],
              brand: product.brand,
            })
          }
        >
          {isFavorite(product.id) ? (
            <MdFavorite size={25} className={styles.fav_icon_active} />
          ) : (
            <MdOutlineFavorite size={25} className={styles.fav_icon} />
          )}
        </div>
        <img
          src={`${API_URL}/images/${product.images[0]}`}
          alt={product.name}
        />
        <h4>{product.name} - {product.description}</h4>
        <h4>{product.brand}</h4>
        <p className={styles.price}>
          {product.price.toLocaleString("ru-RU")} ₽
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
