import { useState, useEffect } from "react";
import { Container, Button, Offcanvas, ListGroupItem } from "react-bootstrap";
import styles from "../Header/Header.module.scss";
import LoginModal from "../ui/ModalAuth";
import CartOffcanvas from "../ui/CanvasCart";
import { Link } from "react-router-dom";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { MdFavorite } from "react-icons/md";
import { FaRegRectangleList, FaWhatsapp } from "react-icons/fa6";
import { BsBoxArrowInRight, BsFillGeoAltFill, BsPersonCircle } from "react-icons/bs";
import { BiShoppingBag } from "react-icons/bi";
import { IoListCircleOutline } from "react-icons/io5";
import FavOffcanvas from "../ui/Favorites";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showFav, setShowFav] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [shrink, setShrink] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${shrink ? styles.shrink : ""}`}>
      <Container className={styles.container}>
        {isMobile && (
          <div className={styles.burgerMenu} onClick={() => setShowMobileMenu(true)}>
            <FiMenu size={24} />
          </div>
        )}

        {!isMobile && (

          <div className={styles.leftNavbar}>
            <Link to="/catalog" className={styles.catalog}> Каталог</Link>
            <Link to="/castomers" className={styles.forCastomers}>
              Покупателям
            </Link>
            <Link to="/contacts" className={styles.media}>
              Контакты
            </Link>
          </div>
        )}



        <div className={styles.logo}>
          <Link to="/">
            <img
              src="/logo-icon-gray.png"
              alt="Логотип компании"
              className={isMobile ? styles.mobileLogo : ""}
            />
          </Link>
        </div>

        {isMobile ? (
          <div className={styles.rightNavbar}>
            <div><MdFavorite onClick={() => setShowFav(true)} size={20} /> </div>
            <div
              className={styles.cartIconWrapper}
              onClick={() => setShowCart(true)}
            >
              <FiShoppingCart size={20} />
            </div>
            {/* {isAdmin ? (
                  <Button variant="light">Личный кабинет</Button>
                ) : (
                  <div onClick={() => setShowModal(true)}>Войти</div>
                )} */}
          </div>
        ) : (
          <div className={styles.rightNavbar}>
            <div className={styles.media}>WhatsApp</div>
            <div onClick={() => setShowFav(true)}
            >Избранное</div>
            <div
              className={styles.cartIconWrapper}
              onClick={() => setShowCart(true)}
            >
              Корзина
            </div>
            {/* {isAdmin ? (
              <Button variant="light">Личный кабинет</Button>
            ) : (
              <div onClick={() => setShowModal(true)}>Войти</div>
            )} */}
          </div>
        )}

      </Container>

      {/* Мобильное меню (Offcanvas) */}
      <Offcanvas
        show={showMobileMenu}
        onHide={() => setShowMobileMenu(false)}
        placement="start"
        className={styles.mobileMenu}
        backdropClassName={styles.menuBackdrop}
      >
        <Offcanvas.Header closeButton closeVariant="white" className={styles.menuHeader}>
          <Offcanvas.Title className={styles.menuTitle}>
            <BiShoppingBag size={24} className="me-2" /> {/* Иконка из react-icons */}
            Меню
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className={styles.menuBody}>
          <nav className={styles.mobileNav}>
            {/* Основные пункты меню */}
            <Link
              to="/catalog"
              className={styles.navLink}
              onClick={() => setShowMobileMenu(false)}
            >
              <FaRegRectangleList className={styles.navIcon} /> {/* Иконка */}
              <span>Каталог</span>
            </Link>

            <Link
              to="/castomers"
              className={styles.navLink}
              onClick={() => setShowMobileMenu(false)}
            >
              <BsPersonCircle className={styles.navIcon} />
              <span>Покупателям</span>
            </Link>

            <Link
              to="/contacts"
              className={styles.navLink}
              onClick={() => setShowMobileMenu(false)}
            >
              <BsFillGeoAltFill className={styles.navIcon} />
              <span>Контакты</span>
            </Link>

            {/* Блок контактов */}
            <div className={styles.mobileContacts}>
              <h5 className={styles.contactsTitle}>Свяжитесь с нами</h5>

              <a
                href="https://wa.me/номер"
                className={`${styles.contactLink} ${styles.whatsapp}`}
              >
                <FaWhatsapp className={styles.contactIcon} />
                WhatsApp
              </a>

              {/* <button 
          className={`${styles.contactLink} ${styles.loginBtn}`}
          onClick={() => { setShowModal(true); setShowMobileMenu(false); }}
        >
          <BsBoxArrowInRight className={styles.contactIcon} />
          Войти
        </button> */}
            </div>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>

      <LoginModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleLoginSuccess={() => setIsAdmin(true)}
      />
      <CartOffcanvas show={showCart} handleClose={() => setShowCart(false)} />
      <FavOffcanvas show={showFav} handleClose={() => setShowFav(false)} />

    </header>
  );
};

export default Header;
