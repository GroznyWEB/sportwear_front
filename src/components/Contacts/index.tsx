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
          <p className={styles.contactInfo}>+7 (909) 688-39-00</p>
          <p className={styles.contactInfo}>
            <FaEnvelope className={styles.smallIcon} /> Qatarhab@mail.ru
          </p>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.iconWrapper}>
            <FaShoppingBag className={styles.icon} />
          </div>
          <h3 className={styles.cardTitle}>Маркетплейсы</h3>
          <p className={styles.contactInfo}>Wildberries</p>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.iconWrapper}>
            <FaMapMarkerAlt className={styles.icon} />
          </div>
          <h3 className={styles.cardTitle}>Адрес</h3>
          <p className={styles.contactInfo}>г. Грозный,</p>
          <p className={styles.contactInfo}>ТРЦ Гранд Парк</p>
          <p className={styles.contactInfo}>2 этаж, магазин "Питбуль"</p>
        </div>
      </div>

      <div className={styles.mapWrapper}>
      <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A85466e42ee77f4edf9c00756120334a19c40d54c1030b14b64dd83317104046f&amp;source=constructor" width="100%" height="400"></iframe>
      </div>
    </div>
  );
};

export default Contacts;
