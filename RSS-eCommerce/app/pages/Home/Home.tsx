import { FC, useState, useEffect } from "react";

import styles from "./Home.module.scss";
import Sidebar from "../../components/SiderBar/SiderBar";
import Poster from "../../components/Poster/Poster";
import Products from "../../components/Product/Products";
import Advantages from "../../components/Advantages/Advantages";
import ProductsWithFilter from "../../components/ProductsWithFilter/ProductsWithFilter";

import { productsList } from "../../data/users.data";

const Home: FC = () => {
  const [amount, setAmount] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 470) {
        setAmount(3);
      } else {
        setAmount(4);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <section className={styles.sidebar}>
        <Sidebar />
        <Poster />
      </section>
      <Products
        products={productsList}
        title="Flash Sales"
        titleCategory="Today's"
        amount={amount}
      />
      <Advantages />
      <ProductsWithFilter category="All products" />
    </>
  );
};

export default Home;
