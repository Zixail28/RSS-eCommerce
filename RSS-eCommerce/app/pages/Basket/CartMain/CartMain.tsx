import { FC } from "react";
import styles from "./CartMain.module.scss";
import CartSection from "./CartSection/CartSection";

const CartMain: FC = () => {
  return (
    <div className={styles.cartMainWrapper}>
      <CartSection
        columns={["Product", "Price", "Quantity", "Subtotal"]}
      ></CartSection>
      <CartSection
        columns={["LCD Monitor", "$650", "ElemQuantity", "$650"]}
      ></CartSection>
      <CartSection
        columns={["LCD Monitor", "$650", "ElemQuantity", "$650"]}
      ></CartSection>
      <CartSection
        columns={["LCD Monitor", "$650", "ElemQuantity", "$650"]}
      ></CartSection>
    </div>
  );
};

export default CartMain;
