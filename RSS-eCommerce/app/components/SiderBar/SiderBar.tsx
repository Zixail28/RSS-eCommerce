import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchCategories } from "../../services/category/categoryThunk";
import { useEffect } from "react";
import { setCategoriesServer } from "../../data/users.data";

import styles from "./SiderBar.module.scss";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.category.categories.results,
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      setCategoriesServer(
        categories.map((category) => ({
          id: category.id,
          name: category.name["en-US"],
        })),
      );
    }
  }, [categories]);

  return (
    <section className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.navItems}>
          {categories.map((category) => (
            <li key={category.name["en-US"]}>
              <NavLink to={`/categories/${category.name["en-US"]}`}>
                {category.name["en-US"]}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;
