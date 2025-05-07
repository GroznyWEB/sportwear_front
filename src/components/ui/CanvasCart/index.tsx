import { Offcanvas, Button, Stack } from "react-bootstrap";
import styles from "./CanvasCart.module.scss";
import { MdDelete } from "react-icons/md";
import { API_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const CartOffcanvas = ({ show, handleClose }: any) => {
  const {
    cart,
    removeFromCart,
    totalItems,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useApp().cart;

  const navigate = useNavigate();
  const handleConfirmCart = () => {
    console.log("func");

    navigate("/reservation");
    handleClose();
  };

  return (
    <Offcanvas
      className={styles.cart}
      show={show}
      onHide={handleClose}
      placement="end"
    >
      <Offcanvas.Header className={styles.header} closeButton>
        <Offcanvas.Title>
          Корзина {totalItems > 0 && `(${totalItems})`}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cart.length === 0 ? (
          <div className={styles.empty}>Ваша корзина пока пуста</div>
        ) : (
          <>
            <Stack gap={3} className={styles.itemsList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img
                    src={`${API_URL}/images/${item.image}`}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemInfo}>
                    <h5>{item.name}</h5>
                    <div className={styles.quantityControls}>
                      <Button
                        variant="outline-secondary"
                        onClick={() => decreaseQuantity(item.id)}
                        className={styles.quantityBtn}
                      >
                        -
                      </Button>
                      <span className={styles.quantityValue}>
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline-secondary"
                        onClick={() => increaseQuantity(item.id)}
                        className={styles.quantityBtn}
                      >
                        +
                      </Button>
                    </div>
                    <div className={styles.priceRow}>
                      <span>
                        {item.price.toLocaleString("ru-RU")} ₽ × {item.quantity}
                      </span>
                      <strong>
                        {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                      </strong>
                    </div>
                  </div>
                  <Button
                    variant="link"
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeBtn}
                  >
                    <MdDelete size={20} />
                  </Button>
                </div>
              ))}
            </Stack>
            <div className={styles.summary}>
              <h5 className={styles.total}>
                Общая сумма: {totalPrice.toLocaleString("ru-RU")} ₽
              </h5>

              <Button
                onClick={handleConfirmCart}
                variant="outline-light"
                className={styles.btn}
              >
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartOffcanvas;
