import { FC } from "react";
import { useParams } from "react-router-dom";

import styles from "./Categories.module.scss";
import ProductsWithFilter from "../../components/ProductsWithFilter/ProductsWithFilter";

const Categories: FC = () => {
  const { categoryName } = useParams();

  const titleCategory = categoryName || "DefaultCategoryName";

  return (
    <>
      <section className={styles.sidebar}>
        <ProductsWithFilter category={titleCategory} />
      </section>
    </>
  );
};

export default Categories;
