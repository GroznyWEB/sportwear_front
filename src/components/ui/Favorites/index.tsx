// components/FavOffcanvas.tsx
import { Offcanvas, Stack, Button } from "react-bootstrap";
import styles from "./Favorites.module.scss";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const FavOffcanvas = ({ show, handleClose }: any) => {
  const { favorites, toggleFavorite } = useApp().favorites;

  console.log("favorites", favorites);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      className={styles.offcanvas}
    >
      <Offcanvas.Header closeButton className={styles.header}>
        <Offcanvas.Title>Избранное ({favorites.length})</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {favorites.length === 0 ? (
          <div className={styles.empty}>
            Вы пока ничего не добавили в избранное
          </div>
        ) : (
          <Stack gap={3} className={styles.itemsList}>
            {favorites.map((item: any) => (
              <div key={item.id} className={styles.item}>
                <Link
                  to={`/product/${item.id}`}
                  className={styles.itemLink}
                  onClick={handleClose}
                >
                  <img
                    src={`http://localhost:4000/images/${item.image}`}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemInfo}>
                    <h5 className={styles.itemName}>{item.name}</h5>
                    <p className={styles.itemBrand}>{item.brand}</p>
                    <p className={styles.itemPrice}>
                      {item.price.toLocaleString("ru-RU")} ₽
                    </p>
                  </div>
                </Link>
                <Button
                  variant="link"
                  className={styles.removeButton}
                  onClick={() => toggleFavorite(item)}
                >
                  <MdDelete size={20} />
                </Button>
              </div>
            ))}
          </Stack>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default FavOffcanvas;
