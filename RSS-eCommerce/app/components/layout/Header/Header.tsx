import { FC, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import NavBar from "./NavBar/NavBar";
import Search from "../../Search/Search";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthState, selectName } from "../../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks/hooks";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../hooks/hooks";

const Header: FC<{ classes: string }> = ({ classes }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const name = useSelector(selectName);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuth } = useAppSelector((state) => state.auth);

  const handleClick = () => {
    dispatch(clearAuthState());
    navigate("/");
    toast.success(`You have successfully logged out`);
  };

  const handleMenuClick = () => {
    setIsMenuHidden(!isMenuHidden);
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={`${styles.header} ${classes}`}>
      <h1>Exclusive</h1>
      {windowWidth <= 600 && isMenuHidden && (
        <div className={styles.hamburgerIcon} onClick={handleMenuClick}>
          <div className={styles.hamburgerLine}></div>
          <div className={styles.hamburgerLine}></div>
          <div className={styles.hamburgerLine}></div>
        </div>
      )}

      {windowWidth <= 600 && isMenuOpen && (
        <div className={styles.crossIcon} onClick={handleMenuClick}>
          &#10005;
        </div>
      )}

      {(windowWidth <= 600 && isMenuOpen) || windowWidth > 600 ? (
        <NavBar></NavBar>
      ) : null}

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
