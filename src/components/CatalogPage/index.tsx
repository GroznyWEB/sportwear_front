// src/pages/CatalogPage.tsx
import React from "react";
import Catalog from "../../components/Catalog"; // путь к компоненту
import styles from "./CatalogPage.module.scss";

const CatalogPage: React.FC = () => {
  return (
    <div className={styles.catalogPage}>
      <Catalog />
    </div>
  );
};

export default CatalogPage;
