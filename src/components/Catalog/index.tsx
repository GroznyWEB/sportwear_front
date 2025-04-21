import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import styles from "./Catalog.module.scss";
import { Container } from "react-bootstrap";
import FeedbackModal from "../ui/FeedbackModal";
import { Link } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";

const products = [
  { id: 1, name: "Griffon white — Shoyoroll", category: "Category 1", price: 7400 },
  { id: 2, name: "Griffon white — Shoyoroll 2", category: "Category 2", price: 10050 },
  { id: 3, name: "Griffon white — Shoyoroll 3", category: "Category 3", price: 3000 },
  { id: 4, name: "Griffon white — Shoyoroll 4", category: "Category 4", price: 11000 },
  { id: 5, name: "Griffon white — Shoyoroll 5", category: "Category 3", price: 9500 },
  { id: 6, name: "Griffon white — Shoyoroll 6", category: "Category 2", price: 7500 },
  { id: 7, name: "Griffon white — Shoyoroll 7", category: "Category 1", price: 6500 },
  { id: 8, name: "Griffon white — Shoyoroll 8", category: "Category 2", price: 7700 },
];

const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];
const sortOptions = [
  { key: "asc", label: "По возрастанию цены" },
  { key: "desc", label: "По убыванию цены" },
];

const Catalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("asc");

  const filteredProducts = products
    .filter(
      (product) => !selectedCategory || product.category === selectedCategory
    )
    .sort((a, b) =>
      sortOption === "asc" ? a.price - b.price : b.price - a.price
    );

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category === "" ? null : category);
  };

  const handleSortSelect = (option: string | null) => {
    setSortOption(option ?? "asc");
  };

  return (
    <Container className={styles.container}>
      <div className={styles.catalog}>
        <h1>Каталог</h1>
      </div>

      <div className={styles.filters}>
        <DropdownButton
          id="dropdown-category"
          variant="outline"
          title={selectedCategory ? selectedCategory : "Все категории"}
          onSelect={handleCategorySelect}
        >
          <Dropdown.Item eventKey="">Все категории</Dropdown.Item>
          {categories.map((category, index) => (
            <Dropdown.Item key={index} eventKey={category}>
              {category}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <DropdownButton
          variant="outline"
          id="dropdown-sort"
          title={
            sortOption === "asc" ? "По возрастанию цены" : "По убыванию цены"
          }
          onSelect={handleSortSelect}
        >
          {sortOptions.map((option, index) => (
            <Dropdown.Item key={index} eventKey={option.key}>
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div className={styles.productCard}>
              {/* TODO - после бэка добавить логику для добавления в избранное */}
              <div className={styles.favorite}>
                <MdOutlineFavorite size={25} className={styles.fav_icon} />
              </div>
              <img src="/adam-gi.jpeg" alt="фото продукта" />
              <h4>{product.name}</h4>
              <p className={styles.price}>
                {product.price.toLocaleString("ru-RU")} ₽
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.feedBack}>
        <FeedbackModal />
      </div>
      <div className={styles.artBoard}>
        <div>
          <img
            src="/delivery-box.png"
            alt="Доставка"
            className={styles.invertIcon}
          />
          <span>Бесплатная доставка по всей России</span>
        </div>
        <div>
          <img
            src="/certificate.png"
            alt="Сертификат"
            className={styles.invertIcon}
          />
          <span>Бренд запатентован</span>
        </div>
        <div>
          <img src="/guarantee.png" alt="Гарантия" />
          <span>Гарантия 6 месяцев</span>
        </div>
        <div>
          <img
            src="/shopping-bag.png"
            alt="Оплата"
            className={styles.invertIcon}
          />
          <span>Онлайн оплата на нашем сайте</span>
        </div>
        <div>
          <img src="/competition.png" alt="ACA" />
          <span>Бойцы ACA доверяют нам</span>
        </div>
      </div>
    </Container>
  );
};

export default Catalog;
