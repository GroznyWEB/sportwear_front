import { useState, useEffect, useCallback } from "react";
import { Container, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../Header/Header.module.scss";

import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import { FaRegRectangleList, FaWhatsapp } from "react-icons/fa6";
import { BsFillGeoAltFill, BsPersonCircle } from "react-icons/bs";
import { BiShoppingBag } from "react-icons/bi";

import CartOffcanvas from "../ui/CanvasCart";
import FavOffcanvas from "../ui/Favorites";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const [showFav, setShowFav] = useState(false);
  const [shrink, setShrink] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Уменьшаем шапку при прокрутке
    setShrink(currentScrollY > 50);
    
    // Логика скрытия/показа шапки
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Скролл вниз и проскроллили больше 100px - скрываем
      setVisible(false);
    } else if (currentScrollY < lastScrollY) {
      // Скролл вверх - показываем
      setVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header 
    className={`${styles.header} ${shrink ? styles.shrink : ""} ${!visible ? styles.hidden : ""}`}>
      <Container className={styles.container}>
        {isMobile && (
          <div
            className={styles.burgerMenu}
            onClick={() => setShowMobileMenu(true)}
          >
            <FiMenu size={24} />
          </div>
        )}

        {!isMobile && (
          <div className={styles.leftNavbar}>
            <Link to="/catalog" className={styles.catalog}>Каталог</Link>
            <Link to="/customers" className={styles.forCastomers}>Покупателям</Link>
            <Link to="/contacts" className={styles.media}>Контакты</Link>
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

        <div className={styles.rightNavbar}>
          {!isMobile && (
            <>
              <div className={styles.media}>
                <a
                  href="https://wa.me/79640609999?text=Здравствуйте,%20хочу%20уточнить%20информацию%20по%20товару"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </div>
              <div onClick={() => setShowFav(true)}>Избранное</div>
              <div
                className={styles.cartIconWrapper}
                onClick={() => setShowCart(true)}
              >
                Корзина
              </div>
            </>
          )}

          {isMobile && (
            <>
              <div>
                <MdFavorite onClick={() => setShowFav(true)} size={20} />
              </div>
              <div
                className={styles.cartIconWrapper}
                onClick={() => setShowCart(true)}
              >
                <FiShoppingCart size={20} />
              </div>
            </>
          )}
        </div>
      </Container>

      {/* Мобильное меню */}
      <Offcanvas
        show={showMobileMenu}
        onHide={() => setShowMobileMenu(false)}
        placement="start"
        className={styles.mobileMenu}
        backdropClassName={styles.menuBackdrop}
      >
        <Offcanvas.Header closeButton closeVariant="white" className={styles.menuHeader}>
          <Offcanvas.Title className={styles.menuTitle}>
            <BiShoppingBag size={24} className="me-2" />
            Меню
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className={styles.menuBody}>
          <nav className={styles.mobileNav}>
            <Link
              to="/catalog"
              className={styles.navLink}
              onClick={() => setShowMobileMenu(false)}
            >
              <FaRegRectangleList className={styles.navIcon} />
              <span>Каталог</span>
            </Link>

            <Link
              to="/customers"
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

            <div className={styles.mobileContacts}>
              <h5 className={styles.contactsTitle}>Свяжитесь с нами</h5>
              <a
                href="https://wa.me/79640609999?text=Здравствуйте,%20хочу%20уточнить%20информацию%20по%20товару"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.contactLink} ${styles.whatsapp}`}
              >
                <FaWhatsapp className={styles.contactIcon} />
                WhatsApp
              </a>
            </div>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>

      <CartOffcanvas show={showCart} handleClose={() => setShowCart(false)} />
      <FavOffcanvas show={showFav} handleClose={() => setShowFav(false)} />
    </header>
  );
};

export default Header;
