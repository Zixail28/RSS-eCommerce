import { FC, ReactNode } from "react";
import styles from "./CartSection.module.scss";

const CartSection: FC<{ columns: ReactNode[] }> = ({ columns }) => {
  return (
    <div className={styles.cartSection}>
      {columns.map((column, i) => (
        <p key={i}>{column}</p>
      ))}
    </div>
  );
};

export default CartSection;
