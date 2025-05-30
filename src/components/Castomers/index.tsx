import React, { useState } from "react";
import styles from "./Castomers.module.scss";
import { FaPlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

type InfoItem = {
    title: string;
    content: string[];
};

const data: InfoItem[] = [
  {
    title: "Доставка",
    content: [
      "Доставка бесплатная по России.",
      "Доставку осуществляем по России при помощи транспортной компании «СДЭК» и «Почта России».",
      "После подтверждения заказа, мы свяжемся с вами и вместе уточним детали и учтём все ваши пожелания."
    ]
  },
  {
    title: "Возврат",
    content: [
      "Вы можете вернуть товар в течение 14 дней после получения.",
      "Товар должен быть в оригинальной упаковке и без следов ношения."
    ]
  },
  {
    title: "Размерная сетка",
    content: ["Размеры указаны в карточке товара. Если не уверены — свяжитесь с нами."]
  },
  {
    title: "Уход за одеждой",
    content: ["Стирать при температуре не выше 30°C", "Не отбеливать", "Гладить на низкой температуре"]
  }
];

const Castomers: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Открыт первый блок по умолчанию

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className={styles.castomers}>
    <h1>Покупателям</h1>
    {data.map((item, index) => (
      <div key={index} className={styles.item}>
        <div className={styles.header} onClick={() => toggle(index)}>
          <h3>{item.title}</h3>
          {openIndex === index ? <IoCloseSharp size={20} /> : <FaPlus size={20} />}
        </div>
        <div className={`${styles.content} ${openIndex === index ? styles.open : ''}`}>
          <ul>
            {item.content.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
  );
};

export default Castomers;
