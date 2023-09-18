import { FC, ReactNode } from "react";
import styles from "./CartSection.module.scss";
import Quantity from "../../../../components/Quantity/Quantity";
import Button from "../../../../components/ui/Button/Button";
import { removeProductInBasketThunk } from "../../../../services/basket/removeProductInBasket";
import { useAppDispatch } from "../../../../hooks/hooks";

const CartSection: FC<{
  columns: ReactNode[];
  style?: React.CSSProperties;
}> = ({ columns, style }) => {
  const [product, price, quantity, subtotal, image, id] = columns;

  const dispatch = useAppDispatch();

  const handleRemoveClick = async () => {
    await dispatch(removeProductInBasketThunk(id as string));
  };

  return (
    <div className={styles.cartSection} style={style}>
      <div>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${image})` }}
        />
        <span>{product}</span>
      </div>
      <span>{typeof quantity === "number" ? `$${price}` : price}</span>
      <span>
        {typeof quantity === "number" ? (
          <Quantity amount={quantity} />
        ) : (
          quantity
        )}
      </span>
      <span>{typeof quantity === "number" ? `$${subtotal}` : subtotal}</span>
      {typeof quantity === "number" && (
        <Button
          styles={{ width: "10%", height: "2rem", fontSize: ".8rem" }}
          onClick={handleRemoveClick}
        >
          Remove
        </Button>
      )}
    </div>
  );
};

export default CartSection;
