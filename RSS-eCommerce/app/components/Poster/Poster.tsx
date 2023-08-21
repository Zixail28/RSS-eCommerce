import styles from "./Poster.module.scss";

import imagePoster from "../../assets/images/poster.svg";
import imageApple from "../../assets/images/apple.svg";

const Poster = () => (
  <section className={styles.poster}>
    <div className={styles.product}>
      <div className={styles.description}>
        <div className={styles.title}>
          <img src={imageApple} alt="Apple" width="40" height="49"/>
          <p>iPhone 14 Series</p>   
        </div>
        <div className={styles.price}>
          <h1>Up to 10%</h1> 
          <h1>off Voucher</h1> 
        </div>
        <button className={styles.show}>Show now &#8594;</button>
      </div>
      <div className={styles.picture}>
        <img src={imagePoster} alt="Poster" width="80%"/>
      </div> 
    </div>
  </section>
);

export default Poster;