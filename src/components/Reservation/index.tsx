import React, { useState } from "react";
import styles from "./Reservation.module.scss";
import { API_URL } from "../../config";
import InputPhone from "../PhoneInput/PhoneInput";
import { Col, Form, Row } from "react-bootstrap";
import { useApp } from "../context/AppContext";

const Reservation: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [validated, setValidated] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    clearCart,
  } = useApp().cart;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    // Валидация телефона
    const numbers = phone.replace(/\D/g, "");
    if (numbers.length !== 11) {
      setPhoneError("Введите полный номер телефона");
      setValidated(false);
      return;
    }

    // Валидация имени
    if (!name.trim()) {
      setValidated(false);
      return;
    }

    setValidated(true);
    setIsSubmitting(true);

    try {
      // Подготовка данных заказа
      const orderItems = cart.map((item) => ({
        name: item.name,
        size: item.size || "",
        amount: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      }));

      const orderData = {
        name: name.trim(),
        phone,
        order: orderItems,
        total: totalPrice,
      };

      // Отправка заказа на сервер
      const response = await fetch(`${API_URL}/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при оформлении заказа");
      }

      const result = await response.json();
      setOrderNumber(result.orderNumber);
      clearCart(); // Очищаем корзину после успешного оформления
    } catch (error) {
      console.error("Ошибка:", error);
      setSubmitError(
        "Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderNumber) {
    return (
      <div className={styles.reservBlock}>
        <div className={styles.orderSuccess}>
          <h2>Заказ успешно оформлен!</h2>
          <p>
            Номер вашего заказа: <strong>{orderNumber}</strong>
          </p>
          <p>Мы свяжемся с вами в ближайшее время для подтверждения.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.reservBlock}>
      <div className={styles.choose}>Вы выбрали:</div>
      <div className={styles.info}>
        {/* Левая часть - форма */}
        <Form
          className={styles.form}
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Ваше имя</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Введите ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control.Feedback>Все хорошо!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Номер телефона</Form.Label>
              <InputPhone
                value={phone}
                onChange={setPhone}
                phoneError={phoneError}
              />
              {phoneError && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {phoneError}
                </div>
              )}
            </Form.Group>
          </Row>

          {submitError && (
            <div className={styles.submitError}>{submitError}</div>
          )}

          <button type="submit" disabled={isSubmitting || cart.length === 0}>
            {isSubmitting ? "ОФОРМЛЕНИЕ..." : "ЗАБРОНИРОВАТЬ"}
          </button>
        </Form>

        {/* Правая часть - товары */}
        <div className={styles.products}>
          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <div key={item.id} className={styles.product}>
                  <div className={styles.details}>
                    <img
                      src={`${API_URL}/images/${item.image}`}
                      alt={item.name}
                    />
                    <div className={styles.text}>
                      <h4>{item.name}</h4>
                      {item.size && <p>Размер: {item.size}</p>}
                    </div>
                    <div className={styles.quantity}>
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <div className={styles.price}>
                      {item.price.toLocaleString("ru-RU")} р.
                    </div>
                    <div
                      className={styles.remove}
                      onClick={() => removeFromCart(item.id)}
                    >
                      ×
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.total}>
                Сумма: {totalPrice.toLocaleString("ru-RU")} р.
              </div>
            </>
          ) : (
            <div className={styles.emptyCart}>Корзина пуста</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservation;
