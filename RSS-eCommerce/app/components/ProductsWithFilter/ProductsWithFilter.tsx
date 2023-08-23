import { FC, useState, useEffect } from "react";
import FilterList from "./Filter/FilterList";
import Products from "../../components/Product/Products";
import styles from "./ProductsWithFilter.module.scss";
import { productsList } from "../../data/users.data";
import Button from "../../components/ui/button/button";
import { FiltersItem, StateSort } from "../../data/filters";

interface ProductsProps {
  category: string;
}

const ProductsWithFilter: FC<ProductsProps> = ({ category }) => {
  const [amount, setAmount] = useState(8);
  const [start, setStart] = useState(0);
  const [sortNameDirection, setSortNameDirection] = useState(
    StateSort.ascending,
  );
  const [sortPriceDirection, setSortPriceDirection] = useState(
    StateSort.ascending,
  );

  const [filteredProductsCount, setFilteredProductsCount] = useState(
    productsList.length,
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 470) {
        setAmount(3);
      } else {
        setAmount(4);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [appliedFilters, setAppliedFilters] = useState<FiltersItem>({
    brand: "All Brands",
    color: "All Colors",
    availability: "All Availability",
    discountToDay: false,
  });

  const handleApplyFilters = (filters: FiltersItem) => {
    setStart(0);
    setAppliedFilters(filters);

    const filteredCount = productsList.filter((product) => {
      return (
        (filters.brand === "All Brands" ||
          product.filter.brand.some((brand) =>
            filters.brand.includes(brand),
          )) &&
        (filters.color === "All Colors" ||
          product.filter.color.some((color) =>
            filters.color.includes(color),
          )) &&
        (filters.availability === "All Availability" ||
          product.filter.availability.some((availability) =>
            filters.availability.includes(availability),
          )) &&
        (!filters.discountToDay ||
          product.filter.discountToDay === filters.discountToDay) &&
        (category === "" ||
          category === "All products" ||
          product.category === category)
      );
    }).length;

    setFilteredProductsCount(filteredCount);
  };

  const handleApplySortName = (state: StateSort) => {
    setSortNameDirection(state);
  };

  const handleApplySortPrice = (state: StateSort) => {
    setSortPriceDirection(state);
  };

  const handleNextClick = () => {
    if (start + amount < filteredProductsCount) {
      setStart(start + amount);
    }
  };

  const handlePrevClick = () => {
    if (start - amount >= 0) {
      setStart(start - amount);
    }
  };

  console.log(appliedFilters);

  return (
    <section className={styles.productsWithFilter}>
      <FilterList
        onApplyFilters={handleApplyFilters}
        onApplySortName={handleApplySortName}
        onApplySortPrice={handleApplySortPrice}
      />
      <div className={styles.allProducts}>
        <Products
          products={productsList}
          title=""
          titleCategory={category}
          amount={amount}
          filters={appliedFilters}
          start={start}
          sortNameDirection={sortNameDirection}
          sortPriceDirection={sortPriceDirection}
        />
        <div className={styles.buttons}>
          <Button type="button" onClick={handlePrevClick}>
            &larr;
          </Button>
          <Button type="button" onClick={handleNextClick}>
            &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsWithFilter;
