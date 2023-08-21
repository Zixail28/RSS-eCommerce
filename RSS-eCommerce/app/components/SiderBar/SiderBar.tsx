import { NavLink } from "react-router-dom";

import styles from "./SiderBar.module.scss";
import { categories } from "../../data/users.data";

const Sidebar = () => {
  const list = categories;

  return (
    <section className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.navItems}>
          {list.map(({ id, name }) => (
            <li key={id}>
              <NavLink to={`/categories/${id}`}>{name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;