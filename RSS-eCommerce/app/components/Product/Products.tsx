import { FC } from "react";
import { Link } from "react-router-dom";
import { ProductItem } from "../../data/users.data";
import { FiltersItem, StateSort } from "../../data/filters";
import styles from "./Products.module.scss";
import rectangle from "../../assets/images/rectangle.svg";
import heart from "../../assets/images/heart.svg";
import view from "../../assets/images/view.svg";

interface ProductsProps {
  products: ProductItem[];
  title: string;
  titleCategory: string;
  amount: number;
  filters?: FiltersItem;
  start?: number;
  sortNameDirection?: StateSort;
  sortPriceDirection?: StateSort;
}

const Products: FC<ProductsProps> = ({
  products,
  title,
  titleCategory,
  amount,
  filters,
  start = 0,
  sortNameDirection = StateSort.ascending,
  sortPriceDirection = StateSort.ascending,
}) => {
  let list = products.slice();

  if (sortNameDirection === StateSort.ascending) {
    list.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortNameDirection === StateSort.descending) {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortPriceDirection === StateSort.ascending) {
    list.sort((a, b) => a.price - b.price);
  } else if (sortPriceDirection === StateSort.descending) {
    list.sort((a, b) => b.price - a.price);
  }

  if (filters) {
    list = list.filter((product) => {
      return (
        (filters.brand === "All Brands" ||
          product.filter.brand.some((brand) =>
            filters.brand.includes(brand),
          )) &&
        (filters.color === "All Colors" ||
          product.filter.color.some((color) =>
            filters.color.includes(color),
          )) &&
        (filters.availability === "All Availability" ||
          product.filter.availability.some((availability) =>
            filters.availability.includes(availability),
          )) &&
        (!filters.discountToDay ||
          product.filter.discountToDay === filters.discountToDay) &&
        (titleCategory === "" ||
          titleCategory === "All products" ||
          product.category === titleCategory)
      );
    });
  }

  if (title === "Flash Sales") {
    list = list.filter((product) => product.filter.discountToDay === true);
  }

  list = list.slice(start, start + amount);

  return (
    <section className={styles.products}>
      <div className={styles.title}>
        <img src={rectangle} alt="Rectangle" width="20" height="40" />
        <p>{titleCategory}</p>
      </div>
      <h2>{title}</h2>
      <div className={styles.list}>
        {list.map(({ id, images, name, shortDescription, price, priceOld }) => {
          const percentDiscount = Math.round((price * 100) / priceOld);

          return (
            <div className={styles.product} key={id}>
              <div className={styles.titleImg}>
                <div className={styles.discount}>
                  <span>-{percentDiscount}%</span>
                </div>
                <div className={styles.heart}>
                  <img src={heart} alt="Heart" />
                  <img src={view} alt="Quick view" />
                </div>
              </div>

              <Link
                to={`/product/${name}`}
                key={id}
                className={styles.productLink}
              >
                <div className={styles.image}>
                  <div className={styles.picture}>
                    <img src={images[0]} alt="Product" width="60%" />
                  </div>
                  <button className={styles.button}>Add To Cart</button>
                </div>

                <div className={styles.wrapper}>
                  <h3 className={styles.name}>{name}</h3>
                  <p>{shortDescription}</p>
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
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
