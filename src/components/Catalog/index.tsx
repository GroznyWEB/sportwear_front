import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from 'react-bootstrap/Button';
import styles from "./Catalog.module.scss";

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
    <div className={styles.catalog}>
      <h3>Каталог</h3>

      <div className={styles.filters}>
        <DropdownButton
          id="dropdown-category"
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
          <div key={product.id} className={styles.productCard}>
            <img src="/gi-bjj.jpeg" alt="фото продукта" />
            <h4>{product.name}</h4>
            <p>Категория: {product.category}</p>
            <p>Цена: {product.price} ₽</p>
            <Button variant="outline-dark">Подробнее</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
