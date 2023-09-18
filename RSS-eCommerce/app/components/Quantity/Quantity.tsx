import { FC, useState } from "react";
import styles from "./Quantity.module.scss";

const Quantity: FC<{ amount: number }> = ({ amount }) => {
  const [count, setCount] = useState<number>(amount);

  function handleClick(type: string) {
    switch (type) {
      case "increment":
        setCount((prev) => prev + 1);
        break;
      case "decrement":
        if (count > 1) {
          setCount((prev) => prev - 1);
        }
        break;
    }
  }

  return (
    <div className={styles.quantity}>
      <div>
        <p>{count < 10 ? "0" + count : count}</p>
        <div>
          <div className={styles.arrowWrapper}>
            <i
              className={styles.arrow + " " + styles.up}
              onClick={() => handleClick("increment")}
            ></i>
          </div>
          <div className={styles.arrowWrapper}>
            <i
              className={styles.arrow + " " + styles.down}
              onClick={() => handleClick("decrement")}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quantity;
