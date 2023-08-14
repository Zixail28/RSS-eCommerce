import { FC } from 'react';
import styles from './Header.module.scss';
import NavBar from './NavBar/NavBar';
import Search from '../../Search/Search';
import { Link } from 'react-router-dom';
import { selectName } from '../../../features/auth/authSlice';
import { useSelector } from 'react-redux';

const Header: FC<{ classes: string }> = ({ classes }) => {
  const name = useSelector(selectName);

  return (
    <header className={`${styles.header} ${classes}`}>
      <h1>Exclusive</h1>
      <NavBar></NavBar>
      <div className={styles.panel}>
        <Search></Search>
        <div className={styles.icons}>
          <Link to="/wishlist">
            <span className={styles.wishlist}></span>
          </Link>
          <Link to="/cart">
            <span className={styles.cart}></span>
          </Link>
          <Link to="/user">
            <span className={styles.user}></span>
          </Link>
        </div>
        {name}
      </div>
    </header>
  );
};

export default Header;
