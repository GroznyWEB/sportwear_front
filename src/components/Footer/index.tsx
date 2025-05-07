import React from "react";
import { Container } from "react-bootstrap";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { FaSquareWhatsapp, FaTelegram } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.logo}>
          <Link to="/">
            <img src="/logo-icon-gray.png" alt="Логотип компании" />
          </Link>
        </div>
        <div className={styles.socialIcons}>
          <FaSquareWhatsapp size={30} />
          <FaTelegram size={30} />
          <FaInstagramSquare size={30} />
        </div>
        <div className={styles.footerText}>
          © 2025 Магазин спортивной одежды. Все права защищены.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
