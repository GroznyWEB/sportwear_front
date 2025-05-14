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
          <div className={styles.whatsApp}>
            <a
              href="https://wa.me/79640609999?text=Здравствуйте,%20хочу%20уточнить%20информацию%20по%20товару"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareWhatsapp size={30} />
            </a>
          </div>

          <div className={styles.telegram}>
            <a
              href="https://t.me/@anarhia13"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram size={30} />
            </a>
          </div>

          <div className={styles.instagram}>
            <a
              href="https://www.instagram.com/submissionkimonos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagramSquare size={30} />
            </a>
          </div>
        </div>

        <div className={styles.footerText}>
          © 2025 Магазин спортивной одежды. Все права защищены.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
