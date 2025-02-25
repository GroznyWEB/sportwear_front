import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { LuShoppingCart } from "react-icons/lu";
import styles from "../Header/Header.module.scss"; 
import LoginModal from "../ui/ModalAuth"; 

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    setShowModal(true); 
  };

  const handleClose = () => {
    setShowModal(false); 
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true); 
  };

  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <div className={styles.logo}>
          <img src="/logo-icon.svg" alt="Логотип компании" />
        </div>

        <div className={styles.navbar}>
          <LuShoppingCart size={35} />

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
        handleClose={handleClose}
        handleLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
};

export default Header;
