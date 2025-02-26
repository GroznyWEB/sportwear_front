// src/components/Header/index.tsx
import React, { useState } from 'react';
import styles from './Catalog.module.scss';

const products = [
    { id: 1, name: 'Product 1', category: 'Category 1', price: 7400 },
    { id: 2, name: 'Product 2', category: 'Category 2', price: 10050 },
    { id: 3, name: 'Product 3', category: 'Category 3', price: 3000 },
    { id: 4, name: 'Product 4', category: 'Category 4', price: 11000 },
    { id: 5, name: 'Product 5', category: 'Category 3', price: 9500 },
    { id: 6, name: 'Product 6', category: 'Category 2', price: 7500 },
    { id: 7, name: 'Product 7', category: 'Category 1', price: 6500 },
    { id: 8, name: 'Product 8', category: 'Category 2', price: 7700 },


];

const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];

const Catalog: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortByPrice, setSortByPrice] = useState(false);

    const filteredProducts = products
        .filter(product => !selectedCategory || product.category === selectedCategory)
        .sort((a, b) => (sortByPrice ? a.price - b.price : 0));

    return (
        <div className={styles.catalog}>
            <h3>Каталог</h3>
            
            {/* Фильтр по категориям */}
            <div className={styles.filters}>
                <label>
                    Категория:
                    <select 
                        value={selectedCategory || ''} 
                        onChange={(e) => setSelectedCategory(e.target.value || null)}>
                        <option value="">Все категории</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </label>

                {/* Фильтр по цене */}
                <label>
                    <input
                        type="checkbox"
                        checked={sortByPrice}
                        onChange={() => setSortByPrice(!sortByPrice)}
                    />
                    Сортировать по возрастанию цены
                </label>
            </div>

            {/* Карточки товаров */}
            <div className={styles.productGrid}>
                {filteredProducts.map(product => (
                    <div key={product.id} className={styles.productCard}>
                        <img src="/gi-bjj.jpeg" alt="фото продукта" />
                        <h4>{product.name}</h4>
                        <p>Категория: {product.category}</p>
                        <p>Цена: {product.price} ₽</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalog;


