import { FC } from "react";
import styles from "./CartTotal.module.scss";
import Button from "../../../components/ui/Button/Button";

const CartTotal: FC = () => {
  return (
    <div className={styles.cartTotalWrapper}>
      <h3>Cart Total</h3>
      <div className={styles.items}>
        <div>
          <div>Subtotal:</div>
          <div>$1750</div>
        </div>
        <hr />
        <div>
          <div>Shipping:</div>
          <div>Free</div>
        </div>
        <hr />
        <div>
          <div>Total:</div>
          <div>$1750</div>
        </div>
      </div>
      <Button>Procees to checkout</Button>
    </div>
  );
};

export default CartTotal;
