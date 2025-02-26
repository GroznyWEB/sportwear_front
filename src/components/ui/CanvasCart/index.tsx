
import { Offcanvas, Button } from "react-bootstrap";

const CartOffcanvas = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Корзина</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Ваша корзина пока пуста.
        <Button variant="primary" className="mt-3">Оформить заказ</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartOffcanvas;
