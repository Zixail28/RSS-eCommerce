import { FC, useState, useEffect } from 'react';

import styles from './Home.module.scss'
import Sidebar from '../../components/SiderBar/SiderBar';
import Poster from '../../components/Poster/Poster';
import Products from '../../components/Product/Products';

import { productsList } from '../../data/users.data';

const Home: FC = () => {
  const [amount, setAmount] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 750) {
        setAmount(3);
      } else {
        setAmount(5);
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
    <Products products={productsList} title="Flash Sales" titlePeriod="Today's" amount={amount} />
    </>
  )
}

export default Home;
