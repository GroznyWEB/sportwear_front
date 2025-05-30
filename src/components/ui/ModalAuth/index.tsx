import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

type LoginModalProps = {
  show: boolean;
  handleClose: () => void;
  handleLoginSuccess: () => void;
};

type FormData = {
  login: string;
  password: string;
};

const LoginModal: React.FC<LoginModalProps> = ({
  show,
  handleClose,
  handleLoginSuccess,
}) => {
  const [formData, setFormData] = useState<FormData>({
    login: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Login:", formData.login, "Password:", formData.password);

    if (formData.login === "admin" && formData.password === "password") {
      handleLoginSuccess();
      handleClose();
    } else {
      alert("Неверный логин или пароль");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Авторизация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formLogin">
            <Form.Label>Логин</Form.Label>
            <Form.Control
              type="text"
              name="login"
              value={formData.login}
              onChange={handleInputChange}
              placeholder="Введите логин"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Введите пароль"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Авторизоваться
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
