import React, {useState} from 'react';
import { Container, Button } from 'react-bootstrap';
import { CiShoppingCart } from 'react-icons/ci';
import styles from '../Header/Header.module.scss'; // если у тебя есть стили

const Header = () => {

  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = () => {

    setIsAdmin(true);
  }

  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <div className={styles.logo}>
          <img src="/logo-icon.svg" alt="Логотип компании" />
        </div>

        <h3>Магазин спортивной одежды</h3>

        <div className={styles.navbar}>
          <div className={styles.cartIcon}>
            <CiShoppingCart size={35} />
          </div>
          {isAdmin ? (
            <Button variant="primary" className={styles.loginButton}>
              Личный кабинет
            </Button>
          ) : (
            <Button variant="primary" className={styles.loginButton} onClick={handleLogin}>
              Войти
            </Button>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
