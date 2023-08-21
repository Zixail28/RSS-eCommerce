import React, { useState } from "react";
import styles from "./FilterList.module.scss";
import { productsList } from "../../../data/users.data";
import Button from "../../ui/button/button";
import { FiltersItem } from "../../../data/filters";

const FilterList: React.FC<{
  onApplyFilters: (filters: FiltersItem) => void;
}> = ({ onApplyFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState<FiltersItem>({
    brand: "All Brands",
    color: "All Colors",
    availability: "All Availability",
    discountToDay: false,
  });

  const uniqueBrands = Array.from(
    new Set(productsList.flatMap((product) => product.filter.brand)),
  );
  const uniqueColors = Array.from(
    new Set(productsList.flatMap((product) => product.filter.color)),
  );
  const uniqueAvailabilities = Array.from(
    new Set(productsList.flatMap((product) => product.filter.availability)),
  );

  const handleFilterChange = (
    filterType: keyof FiltersItem,
    value: string | boolean,
  ) => {
    setSelectedFilters((prevFilters: FiltersItem) => {
      if (filterType === "brand") {
        return {
          ...prevFilters,
          brand: value === "All Brands" || value === "" ? "All Brands" : value,
        };
      } else if (filterType === "color") {
        return {
          ...prevFilters,
          color: value === "All Colors" || value === "" ? "All Colors" : value,
        };
      } else if (filterType === "availability") {
        return {
          ...prevFilters,
          availability:
            value === "All Availability" || value === ""
              ? "All Availability"
              : value,
        };
      } else if (filterType === "discountToDay") {
        return {
          ...prevFilters,
          discountToDay:
            value === "All Discount" || value === "" ? "All Discount" : value,
        };
      }
      return prevFilters;
    });
  };

  const handleApplyFilters = () => {
    const filteredFilters: FiltersItem = selectedFilters as FiltersItem;
    onApplyFilters(filteredFilters);
  };

  const handleApplySortName = () => {
    console.log("Sort name");
  };

  const handleApplySortPrice = () => {
    console.log("Sort price");
  };

  return (
    <section className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.navItems}>
          {/* link brand */}
          <li>
            <select
              value={selectedFilters.brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
            >
              <option value="">All Brands</option>
              {uniqueBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </li>

          {/* link color */}
          <li>
            <select
              value={selectedFilters.color}
              onChange={(e) => handleFilterChange("color", e.target.value)}
            >
              <option value="">All Colors</option>
              {uniqueColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </li>

          {/* link availability */}
          <li>
            <select
              value={selectedFilters.availability}
              onChange={(e) =>
                handleFilterChange("availability", e.target.value)
              }
            >
              <option value="">All Availability</option>
              {uniqueAvailabilities.map((availability) => (
                <option key={availability} value={availability}>
                  {availability}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </nav>
      <Button type="button" onClick={handleApplyFilters}>
        Apply filters
      </Button>
      <div className={styles.sortProducts}>
        <h5>Sort by name</h5>
        <Button type="button" onClick={handleApplySortName}>
          &#8593; &#8595;
        </Button>
      </div>
      <div className={styles.sortProducts}>
        <h5>Sort by name</h5>
        <Button type="button" onClick={handleApplySortPrice}>
          &#8593; &#8595;
        </Button>
      </div>
    </section>
  );
};

export default FilterList;
