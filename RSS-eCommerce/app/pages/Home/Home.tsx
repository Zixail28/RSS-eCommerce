import { FC } from 'react';
import Sidebar from '../../components/SiderBar/SiderBar';

import styles from './Home.module.scss'
import Poster from '../../components/Poster/Poster';

const Home: FC = () => {
  return (
    <section className={styles.sidebar}>
      <Sidebar />
      <Poster />
    </section>
  )
}

export default Home
