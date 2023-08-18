import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { useAppSelector } from '../../../../hooks/hooks';

const classGen = ({ isActive }: { isActive: boolean }): string =>
  isActive ? styles.active : '';

const NavBar: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  return (
    <nav className={styles.nav}>
      <ul className={styles.navItems}>
        <NavLink to={'/'} className={classGen}>
          Home
        </NavLink>
        <NavLink to={'/contact'} className={classGen}>
          Contact
        </NavLink>
        <NavLink to={'/about'} className={classGen}>
          About
        </NavLink>
        {!isAuth && (
          <>
            <NavLink to={'/login'} className={classGen}>
              Login
            </NavLink>

            <NavLink to={'/registration'} className={classGen}>
              Register
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
