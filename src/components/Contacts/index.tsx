import React from 'react'
import styles from './Contacts.module.scss'

const Contacts: React.FC = () => {
  return (
    <div className={styles.info}>
      <h1>Контакты</h1>
      <div className={styles.infoBlock}>
        <div className={styles.card}>
          <img src="/contacts.png" alt="Контакты" />
          <h3>Связаться</h3>
          <p><a href="tel:+79640609999">+7(964)0609999</a></p>
          <p><a href="mailto:halid.esanukaev.86@mail.ru">halid.esanukaev.86@mail.ru</a></p>
        </div>
        <div className={styles.card}>
          <img src="/shopping-bag.png" alt="Маркетплейсы" />
          <h3>Маркетплейсы</h3>
          <p><a href="https://wildberries.ru" target="_blank" rel="noopener noreferrer">Wildberries</a></p>
        </div>
        <div className={styles.card}>
          <img src="/location1.png" alt="Адрес" />
          <h3>Адрес</h3>
          <p>Проспект ,</p>
          <p>ТРЦ Грозный Молл</p>
        </div>
      </div>

      <div className={styles.mapContainer}>
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A252a54a05cb72b94c3d8b88e7d558c57a8e51e0f4e4fa09360d4d23353b12f9b&amp;source=constructor"
          width="100%"
          height="400"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  )
}

export default Contacts
