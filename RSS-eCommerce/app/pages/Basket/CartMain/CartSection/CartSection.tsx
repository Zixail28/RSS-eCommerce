import { FC, ReactNode } from "react";
import styles from "./CartSection.module.scss";
import Quantity from "../../../../components/Quantity/Quantity";

const CartSection: FC<{ columns: ReactNode[] }> = ({ columns }) => {
  const [product, price, quantity, subtotal, image] = columns;
  return (
    <div className={styles.cartSection}>
      <div>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${image})` }}
        />
        <p>{product}</p>
      </div>
      <p>{typeof quantity === "number" ? `$${price}` : price}</p>
      <p>
        {typeof quantity === "number" ? (
          <Quantity amount={quantity} />
        ) : (
          quantity
        )}
      </p>
      <p>{typeof quantity === "number" ? `$${subtotal}` : subtotal}</p>
    </div>
  );
};

export default CartSection;
