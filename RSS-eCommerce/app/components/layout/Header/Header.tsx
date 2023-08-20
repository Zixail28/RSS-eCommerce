import { FC } from 'react';
import styles from './Header.module.scss';
import NavBar from './NavBar/NavBar';
import Search from '../../Search/Search';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthState, selectName } from '../../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/hooks';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../../hooks/hooks';

const Header: FC<{ classes: string }> = ({ classes }) => {
  const name = useSelector(selectName);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuth } = useAppSelector((state) => state.auth);

  const handleClick = () => {
    dispatch(clearAuthState());
    navigate('/');
    toast.success(`You have successfully logged out`);
  };

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
          {isAuth && (
            <button className={styles.logout} onClick={handleClick}>
              Log out
            </button>
          )}
        </div>
        {name}
      </div>
    </header>
  );
};

export default Header;
