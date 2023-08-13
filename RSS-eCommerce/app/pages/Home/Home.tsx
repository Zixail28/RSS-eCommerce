import { FC } from 'react';

import styles from './Home.module.scss'
import Sidebar from '../../components/SiderBar/SiderBar';
import Poster from '../../components/Poster/Poster';
import Products from '../../components/Product/Products';

import { productsList } from '../../data/users.data';

const Home: FC = () => {
  return (
    <>
    <section className={styles.sidebar}>
      <Sidebar />
      <Poster />
    </section>
    <Products products={productsList} title="Flash Sales" titlePeriod="Today's" />
    </>
  )
}

export default Home
