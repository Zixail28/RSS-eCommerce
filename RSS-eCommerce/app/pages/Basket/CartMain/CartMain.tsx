import { FC } from "react";
import styles from "./CartMain.module.scss";
import CartSection from "./CartSection/CartSection";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Button from "../../../components/ui/Button/Button";
import { removeProductInBasketThunk } from "../../../services/basket/removeProductInBasket";
import { useNavigate } from "react-router-dom";

const CartMain: FC = () => {
  const { lineItems } = useAppSelector((state) => state.basket.cart);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRemoveClick = async () => {
    for await (const line of lineItems) {
      await dispatch(removeProductInBasketThunk(line.id));
    }
  };

  return (
    <div className={styles.cartMainWrapper}>
      <CartSection
        columns={["Product", "Price", "Quantity", "Subtotal"]}
        style={{ paddingRight: "calc(1.5rem + 10%)" }}
      ></CartSection>
      {lineItems.length !== 0 ? (
        <>
          {lineItems.map(
            ({
              quantity,
              name: { "en-US": nameUS },
              totalPrice: { centAmount: totalAmount },
              price: {
                discounted: {
                  value: { centAmount },
                },
              },
              id,
              variant: { images },
            }) => {
              return (
                <CartSection
                  key={id}
                  columns={[
                    nameUS,
                    centAmount,
                    quantity,
                    totalAmount,
                    images[0].url,
                    id,
                  ]}
                />
              );
            },
          )}
          <Button styles={{ width: "30%" }} onClick={handleRemoveClick}>
            Remove all from basket
          </Button>
        </>
      ) : (
        <div className={styles.emptyCartWrapper}>
          <h1>Cart is empty</h1>
          <Button onClick={() => navigate("/")}>Go to catalog</Button>
        </div>
      )}
    </div>
  );
};

export default CartMain;
