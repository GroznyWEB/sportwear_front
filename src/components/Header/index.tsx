import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { LuShoppingCart } from "react-icons/lu";  
import styles from "../Header/Header.module.scss"; 
import LoginModal from "../ui/ModalAuth";
import CartOffcanvas from "../ui/CanvasCart"; 

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false); 
  const [cartCount, setCartCount] = useState(0); 

  const handleLogin = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleLoginSuccess = () => setIsAdmin(true);

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <div className={styles.logo}>
          <img src="/logo-icon.svg" alt="Логотип компании" />
        </div>

        <div className={styles.navbar}>
          <div className={styles.cartIconWrapper} onClick={handleShowCart}>
            <LuShoppingCart size={35} style={{ cursor: "pointer" }} />
            
              <div className={styles.cartCount}>{cartCount}</div>
            
          </div>

          {isAdmin ? (
            <Button variant="light">Личный кабинет</Button>
          ) : (
            <Button variant="light" onClick={handleLogin}>
              Войти
            </Button>
          )}
        </div>
      </Container>

      <LoginModal
        show={showModal}
        handleClose={handleCloseModal}
        handleLoginSuccess={handleLoginSuccess}
      />

      <CartOffcanvas show={showCart} handleClose={handleCloseCart} />
    </header>
  );
};

export default Header;
