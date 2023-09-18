import { FC } from "react";
import styles from "./CartMain.module.scss";
import CartSection from "./CartSection/CartSection";
import { useAppSelector } from "../../../hooks/hooks";

const CartMain: FC = () => {
  const { lineItems } = useAppSelector((state) => state.basket.cart);

  console.log(lineItems);

  return (
    <div className={styles.cartMainWrapper}>
      <CartSection
        columns={["Product", "Price", "Quantity", "Subtotal"]}
      ></CartSection>
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
          variant: { images },
        }) => {
          console.log(quantity, images[0].url, nameUS, totalAmount, centAmount);
          return (
            <CartSection
              columns={[
                nameUS,
                centAmount,
                quantity,
                totalAmount,
                images[0].url,
              ]}
            />
          );
        },
      )}
    </div>
  );
};

export default CartMain;
