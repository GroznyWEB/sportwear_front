import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import styles from "./FeedbackModal.module.scss";
import InputPhone from "../../PhoneInput/PhoneInput";
import { API_URL } from "../../../config";

const FeedbackModal: React.FC = () => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSubmitSuccess(false);
    setSubmitError("");
  };

  const handleShow = () => setShow(true);

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
      // Подготовка данных для отправки
      const feedbackData = {
        name: name.trim(),
        phone: phone,
        type: "Консультация",
        date: new Date().toLocaleString(),
      };

      // Отправка на сервер
      const response = await fetch(`${API_URL}/send-feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке формы");
      }

      setSubmitSuccess(true);
    } catch (error) {
      console.error("Ошибка:", error);
      setSubmitError(
        "Произошла ошибка при отправке. Пожалуйста, попробуйте позже."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        className={`${styles.btn} ${styles.feedback_btn}`}
        variant="outline-light"
        onClick={handleShow}
      >
        Обратная связь
      </Button>

      <Modal className={styles.feedback} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Бесплатная консультация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitSuccess ? (
            <div className={styles.successMessage}>
              <h4>Спасибо за вашу заявку!</h4>
              <p>Мы свяжемся с вами в ближайшее время.</p>
              <Button
                variant="success"
                onClick={handleClose}
                className={styles.btn}
              >
                Закрыть
              </Button>
            </div>
          ) : (
            <>
              <p className="mb-4">
                Оставьте заявку на консультацию или звоните нам по номеру
                телефона{" "}
                <strong>
                  <a href="tel:+79640609999">+7 (964) 060-99-99</a>
                </strong>
              </p>

              {submitError && (
                <div className={styles.errorAlert}>{submitError}</div>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
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

                  <InputPhone
                    value={phone}
                    onChange={setPhone}
                    phoneError={phoneError}
                  />
                  {phoneError && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {phoneError}
                    </div>
                  )}
                </Row>
                <Button
                  type="submit"
                  className={styles.btn}
                  disabled={isSubmitting || (!name && !phone)}
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </Button>
              </Form>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FeedbackModal;
