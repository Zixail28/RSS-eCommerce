import { FC } from 'react'
import { Link } from "react-router-dom";

import styles from "./Footer.module.scss";
import Search from "../../Search/Search";

const Footer: FC<{ classes: string }> = ({ classes }) => {
  return (
    <footer className={styles.footer}>
      <div className={classes}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link to={"/"}><h1>Exclusive</h1></Link>
            <p>Subscribe</p>
            <p>Get 10% off your first order</p>
            <Search></Search>
          </div>

          <div className={styles.support}>
            <h1>Support</h1>
            <p>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>

          <div className={styles.account}>
            <h1>Account</h1>
            <Link to={"/user"}>My account</Link>
            <Link to={"/authorization"}>Login/Register</Link>
            <Link to={"/cart"}>Cart</Link>
            <Link to={"/Wishlist"}>Wishlist</Link>
            <Link to={"/Product"}>Shop</Link>
          </div>

          <div className={styles.github}>
            <h1>Quick Link</h1>
            <a href="https://github.com/Zixail28" target="_blank" rel="noreferrer">Denis</a>
            <a href="https://github.com/ISerhiienko" target="_blank" rel="noreferrer">Igor</a>
            <a href="https://github.com/LizavetaNik" target="_blank" rel="noreferrer">Liza</a>
          </div>
        </div>
      </div> 
    </footer>
  );
}

export default Footer;