import styles from "./Advantages.module.scss";
import services1 from "../../assets/images/services1.svg";
import services2 from "../../assets/images/services2.svg";
import services3 from "../../assets/images/services3.svg";

const Advantages = () => {
  return (
    <section className={styles.advantages}>
      <div className={styles.advantage}>
        <img src={services1} alt="FREE AND FAST DELIVERY" />
        <h3>FREE AND FAST DELIVERY</h3>
        <p>Free delivery for all orders over $140</p>
      </div>

      <div className={styles.advantage}>
        <img src={services2} alt="24/7 CUSTOMER SERVICE" />
        <h3>24/7 CUSTOMER SERVICE</h3>
        <p>Friendly 24/7 customer support</p>
      </div>

      <div className={styles.advantage}>
        <img src={services3} alt="MONEY BACK GUARANTEE" />
        <h3>MONEY BACK GUARANTEE</h3>
        <p>We reurn money within 30 days</p>
      </div>
    </section>
  );
};

export default Advantages;
