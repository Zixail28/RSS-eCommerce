import { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Basket.module.scss";
import CartTotal from "./CartTotal/CartTotal";
import CartMain from "./CartMain/CartMain";

const Basket: FC = () => {
  return (
    <div className={styles.basket}>
      <div className={styles.linksPage}>
        <NavLink to={"/"}>Home</NavLink>
        <p> / </p>
        <p>Cart</p>
      </div>

      <CartMain></CartMain>

      <CartTotal></CartTotal>
    </div>
  );
};

export default Basket;
