
import { FC } from "react";
import { Link } from "react-router-dom";
import { Product } from '../../data/users.data';
import styles from "./Products.module.scss";
import rectangle from "../../assets/images/rectangle.svg";
import heart from "../../assets/images/heart.svg";
import view from "../../assets/images/view.svg";

interface ProductsProps {
  products: Product[];
  title: string;
  titlePeriod: string;
}
  
const Products: FC<ProductsProps> = ({ products, title, titlePeriod }) => {
  return (
    <section className={styles.products}>
      <div className={styles.title}>
        <img src={rectangle} alt="Rectangle" width="20" height="40"/>
        <p>{titlePeriod}</p>   
      </div>
      <h2>{title}</h2>
      <div className={styles.list}>
        {products.map(({ id, images, name, price, priceOld }) => {
          const percentDiscount = (price * 100) / priceOld; // Рассчет процента скидки
          return (
            <Link to={`/products/${id}`} key={id} className={styles.product}>
              <div className={styles.image}>
                <div className={styles.titleImg}>
                  <div className={styles.discount}>
                    <span>-{percentDiscount.toFixed(2)}%</span>
                  </div>  
                  <div className={styles.heart}>
                    <img src={heart} alt="Heart" />
                    <img src={view} alt="Quick view" />
                  </div>  
                </div>
                <div className={styles.picture}>
                  <img src={images} alt="Product" width="60%" /> 
                </div>
                <button className={styles.button}>Add To Cart</button>
              </div>

              <div className={styles.wrapper}>
                <h3 className={styles.name}>{name}</h3>
                <div className={styles.info}>
                  <div className={styles.prices}>
                    <div className={styles.price}>{price}$</div>
                    <div className={styles.oldPrice}>
                      {Math.floor(price * 0.8)}$
                    </div>
                  </div>

                  <div className={styles.purchases}>
                    {Math.floor(Math.random() * 20 + 1)} purchased
                  </div>
                </div>
              </div>
            </Link>
          );
        })}  
      </div>
    </section>
  );
};

export default Products;




