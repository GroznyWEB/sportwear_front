import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import styles from "../Header/Header.module.scss";
import LoginModal from "../ui/ModalAuth";
import CartOffcanvas from "../ui/CanvasCart";
import { Link } from "react-router-dom";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${shrink ? styles.shrink : ""}`}>
      <Container className={styles.container}>
        <div className={styles.leftNavbar}>
          <div>Каталог</div>
          <Link to="/castomers" className={styles.forCastomers}>Покупателям</Link>
          <Link to="/contacts" className={styles.media}>
            Контакты
          </Link>
        </div>

        <div className={styles.logo}>
          <Link to="/">
            <img src="/logo-icon-gray.png" alt="Логотип компании" />
          </Link>
        </div>
        <div className={styles.rightNavbar}>
          <div className={styles.media}>WhatsApp</div>
          <div>Поиск</div>
          <div
            className={styles.cartIconWrapper}
            onClick={() => setShowCart(true)}
          >
            {/* <PiShoppingCartSimpleThin size={35} style={{ cursor: "pointer" }} /> */}
            Корзина
            {/* <div className={styles.cartCount}>{cartCount}</div> */}
          </div>
          {isAdmin ? (
            <Button variant="light">Личный кабинет</Button>
          ) : (
            <div onClick={() => setShowModal(true)}>Войти</div>
          )}
        </div>
      </Container>

      <LoginModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleLoginSuccess={() => setIsAdmin(true)}
      />
      <CartOffcanvas show={showCart} handleClose={() => setShowCart(false)} />
    </header>
  );
};

export default Header;
