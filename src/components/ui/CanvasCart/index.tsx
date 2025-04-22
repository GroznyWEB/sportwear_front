
import { Offcanvas, Button } from "react-bootstrap";
import styles from './CanvasCart.module.scss'
const CartOffcanvas = ({ show, handleClose }) => {
  return (
    <Offcanvas className={styles.cart} show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header className={styles.title} closeButton>
        <Offcanvas.Title>Корзина:</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div>
          Ваша корзина пока пуста.
        </div>
        <Button variant="outline-light" className={styles.btn}>Оформить заказ</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartOffcanvas;
