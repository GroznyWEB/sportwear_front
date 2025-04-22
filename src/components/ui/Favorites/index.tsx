
import { Offcanvas, Button } from "react-bootstrap";
import styles from './Favorites.module.scss'
const FavOffcanvas = ({ show, handleClose }) => {
  return (
    <Offcanvas className={styles.fav} show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header className={styles.title} closeButton>
        <Offcanvas.Title >Избранное:</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div>
          Вы ничего не добавили в избранное.
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default FavOffcanvas;
