import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShoppingBag,
} from "react-icons/fa";
import styles from "./Contacts.module.scss";

const Contacts: React.FC = () => {
  return (
    <div className={styles.contactsContainer}>
      <h1 className={styles.title}>Контакты</h1>

      <div className={styles.cardsGrid}>
        <div className={styles.contactCard}>
          <div className={styles.iconWrapper}>
            <FaPhone className={styles.icon} />
          </div>
          <h3 className={styles.cardTitle}>Связаться</h3>
          <p className={styles.contactInfo}>
            <a href="tel:+79640609999" className={styles.contactLink}>
              +7 (964) 060-99-99
            </a>
          </p>
          <p className={styles.contactInfo}>
            <a
              href="mailto:halid.esanukaev.86@mail.ru"
              className={styles.contactLink}
            >
              <FaEnvelope className={styles.smallIcon} />{" "}
              halid.esanukaev.86@mail.ru
            </a>
          </p>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.iconWrapper}>
            <FaShoppingBag className={styles.icon} />
          </div>
          <h3 className={styles.cardTitle}>Маркетплейсы</h3>
          <p className={styles.contactInfo}>
            <a
              href="https://wildberries.ru"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              Wildberries
            </a>
          </p>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.iconWrapper}>
            <FaMapMarkerAlt className={styles.icon} />
          </div>
          <h3 className={styles.cardTitle}>Адрес</h3>
          <p className={styles.contactInfo}>Проспект,</p>
          <p className={styles.contactInfo}>ТРЦ Грозный Молл</p>
        </div>
      </div>

      <div className={styles.mapWrapper}>
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A252a54a05cb72b94c3d8b88e7d558c57a8e51e0f4e4fa09360d4d23353b12f9b&amp;source=constructor"
          className={styles.map}
          title="Карта расположения"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Contacts;
