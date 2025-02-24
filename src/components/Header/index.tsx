import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { LuShoppingCart } from "react-icons/lu";
import styles from "../Header/Header.module.scss"; // если у тебя есть стили

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = () => {
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
    </header>
  );
};

export default Header;
