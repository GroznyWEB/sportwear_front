import React from "react";
import { Col, Form } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ru from "react-phone-number-input/locale/ru";
import styles from "./PhoneInput.module.scss";

interface PhoneInputProps {
  value: string;
  onChange: (value: any) => void;
  id?: string;
  placeholder?: string;
  phoneError: string;
}

const InputPhone: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  phoneError,
}) => {
  // Функция для получения очищенного номера (можно использовать при отправке формы)

  return (
    <Form.Group
      as={Col}
      md="12"
      className="mt-3"
      controlId="validationCustom02"
    >
      <Form.Label>Номер телефона</Form.Label>
      <PhoneInput
        placeholder="+7 123 45 67"
        value={value}
        international
        defaultCountry="RU"
        onChange={onChange}
        labels={ru}
        className={styles.phoneInput}
        limitMaxLength={true}
      />
      <Form.Control.Feedback type="invalid">{phoneError}</Form.Control.Feedback>
      <Form.Control.Feedback>Все хорошо!</Form.Control.Feedback>
    </Form.Group>
  );
};

export default InputPhone;
