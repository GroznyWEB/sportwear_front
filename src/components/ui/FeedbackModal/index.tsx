import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import styles from "../FeedbackModal/FeedbackModal.module.scss";
import { handlePhoneChange } from "../../../utils/phoneMask";

const FeedbackModal: React.FC = () => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [phone, setPhone] = useState("+7 ");
  const [phoneError, setPhoneError] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    
    if (form.checkValidity() === false || phoneError) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    setValidated(true);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className={styles.feedbackButton}
      >
        Обратная связь
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Бесплатная консультация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-4">
            Оставьте заявку на консультацию или звоните нам по номеру телефона{" "}
            <br />
            <strong>+7(000) 000-00-00</strong>
          </p>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Ваше имя</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Введите ваше имя"
                />
                <Form.Control.Feedback>Все хорошо!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationCustom02">
                <Form.Label>Номер телефона</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Введите номер телефона"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e, setPhone)} 
                  isInvalid={!!phoneError} 
                />
                <Form.Control.Feedback type="invalid">
                  {phoneError}
                </Form.Control.Feedback>
                <Form.Control.Feedback>Все хорошо!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit" className="w-100">
              Отправить заявку
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FeedbackModal;
