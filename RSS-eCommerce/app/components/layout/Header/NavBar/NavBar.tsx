import { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss";

const classGen = ({isActive}: { isActive: boolean }): string => isActive ? styles.active : "";

const NavBar: FC = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navItems}>
        <NavLink to={"/"} className={classGen}>Home</NavLink>
        <NavLink to={"/contact"} className={classGen}>Contact</NavLink>
        <NavLink to={"/about"} className={classGen}>About</NavLink>
        <NavLink to={"/authorization"} className={classGen}>Sign Up</NavLink>
      </ul>
    </nav>
  );
};

export default NavBar;
