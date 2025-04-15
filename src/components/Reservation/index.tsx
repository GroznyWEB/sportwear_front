import React from "react";
import styles from "./Reservation.module.scss";

const Reservation: React.FC = () => {
  return (
    <div className={styles.reservBlock}>
    <div className={styles.choose}>Вы выбрали:</div>
    <div className={styles.info}>
      {/* Левая часть */}
      <div className={styles.form}>
        <input type="text" placeholder="Ваше имя" />
        <input type="text" placeholder="+7 (999) 999-99-99" />
        <button>ЗАБРОНИРОВАТЬ</button>
      </div>
  
      {/* Правая часть */}
      <div className={styles.product}>
        <div className={styles.details}>
          <img src="/gray-gi.jpeg" alt="product" />
          <div className={styles.text}>
            <h4>Griffon white — Shoyoroll</h4>
            <p>Размер: A2L</p>
            <p>Цвет: white</p>
          </div>
          <div className={styles.quantity}>
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </div>
          <div className={styles.price}>10 000 р.</div>
          <div className={styles.remove}>×</div>
        </div>
        <div className={styles.total}>Сумма: 10 000 р.</div>
      </div>
    </div>
  </div>
  
  );
};

export default Reservation;
