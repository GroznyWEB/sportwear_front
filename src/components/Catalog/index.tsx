import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import styles from "./Catalog.module.scss";
import { Container } from "react-bootstrap";
import FeedbackModal from "../ui/FeedbackModal";
import ProductCard from "../ProductCard";
import { TbCertificate, TbTruckDelivery } from "react-icons/tb";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { LuHandshake } from "react-icons/lu";
import { API_URL } from "../../config";

interface Product {
  _id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  images: string[];
  category: string;
}

const sortOptions = [
  { key: "asc", label: "По возрастанию цены" },
  { key: "desc", label: "По убыванию цены" },
];

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("asc");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/product`); // замени на свой путь
        const data = await response.json();
        console.log('Что пришло с бэка:', data);
        setProducts(data);
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = Array.from(new Set(products.map((product) => product.category)));

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

  if (loading) {
    return <div className={styles.loading}>Загрузка товаров...</div>;
  }

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
        <ProductCard 
        key={product._id} 
        product={{ 
          id: product._id, 
          name: product.name, 
          description: product.description,
          brand: product.brand,
          price: product.price,
          images: product.images
        }} 
      />
        ))}
      </div>

      <div className={styles.feedBack}>
        <FeedbackModal />
      </div>

      <div className={styles.artBoard}>
        <div className={styles.featureCard}>
          <TbTruckDelivery 
            size={50}
            color="black"
          />
          <span>Бесплатная доставка по всей России</span>
        </div>
        <div className={styles.featureCard}>
          <TbCertificate  
            size={50}
            color="black"
          />
          <span>Бренд запатентован</span>
        </div>
        <div className={styles.featureCard}>
          <AiOutlineSafetyCertificate size={50} color='black' />
          <span>Гарантия 6 месяцев</span>
        </div>
        <div className={styles.featureCard}>
          <MdOutlinePayment 
          size={50}
          color="black" 
          />
          <span>Онлайн оплата на нашем сайте</span>
        </div>
        <div className={styles.featureCard}>
          <LuHandshake  size={50} color="black" />
          <span>Бойцы ACA доверяют нам</span>
        </div>
      </div>
    </Container>
  );
};

export default Catalog;
