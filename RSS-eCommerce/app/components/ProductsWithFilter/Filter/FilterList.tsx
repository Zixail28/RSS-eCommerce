import React, { useState } from "react";
import styles from "./FilterList.module.scss";
import { productsListServer } from "../../../data/users.data";
import Button from "../../ui/Button/Button";
import { FiltersItem, StateSort } from "../../../data/filters";

const FilterList: React.FC<{
  onApplyFilters: (filters: FiltersItem) => void;
  onApplySortName: (stateSortName: StateSort) => void;
  onApplySortPrice: (stateSortPrice: StateSort) => void;
}> = ({ onApplyFilters, onApplySortName, onApplySortPrice }) => {
  const [selectedFilters, setSelectedFilters] = useState<FiltersItem>({
    brand: "All Brands",
    color: "All Colors",
    availability: "All Availability",
    discountToDay: false,
  });

  const [stateSortName, setStateSortName] = useState(StateSort.ascending);
  const [stateSortPrice, setStateSortPrice] = useState(StateSort.none);

  const uniqueBrands = Array.from(
    new Set(productsListServer.flatMap((product) => product.filter.brand)),
  );
  const uniqueColors = Array.from(
    new Set(productsListServer.flatMap((product) => product.filter.color)),
  );
  const uniqueAvailabilities = Array.from(
    new Set(
      productsListServer.flatMap((product) => product.filter.availability),
    ),
  );

  const handleFilterChange = (
    filterType: keyof FiltersItem,
    value: string | boolean,
  ) => {
    setSelectedFilters((prevFilters: FiltersItem) => {
      if (filterType === "brand") {
        return {
          ...prevFilters,
          brand: String(
            value === "All Brands" || value === "" ? "All Brands" : value,
          ),
        };
      } else if (filterType === "color") {
        return {
          ...prevFilters,
          color: String(
            value === "All Colors" || value === "" ? "All Colors" : value,
          ),
        };
      } else if (filterType === "availability") {
        return {
          ...prevFilters,
          availability: String(
            value === "All Availability" || value === ""
              ? "All Availability"
              : value,
          ),
        };
      } else if (filterType === "discountToDay") {
        return {
          ...prevFilters,
          discountToDay: Boolean(
            value === "All Discount" || value === "" ? "All Discount" : value,
          ),
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
    if (stateSortName === StateSort.ascending) {
      setStateSortName(StateSort.descending);
      onApplySortName(StateSort.descending);
      setStateSortPrice(StateSort.none);
      onApplySortPrice(StateSort.none);
    } else if (stateSortName === StateSort.descending) {
      setStateSortName(StateSort.ascending);
      onApplySortName(StateSort.ascending);
      setStateSortPrice(StateSort.none);
      onApplySortPrice(StateSort.none);
    } else {
      setStateSortName(StateSort.ascending);
      onApplySortName(StateSort.ascending);
      setStateSortPrice(StateSort.none);
      onApplySortPrice(StateSort.none);
    }
  };

  const handleApplySortPrice = () => {
    if (stateSortPrice === StateSort.ascending) {
      setStateSortPrice(StateSort.descending);
      onApplySortPrice(StateSort.descending);
      setStateSortName(StateSort.none);
      onApplySortName(StateSort.none);
    } else if (stateSortPrice === StateSort.descending) {
      setStateSortPrice(StateSort.ascending);
      onApplySortPrice(StateSort.ascending);
      setStateSortName(StateSort.none);
      onApplySortName(StateSort.none);
    } else {
      setStateSortPrice(StateSort.ascending);
      onApplySortPrice(StateSort.ascending);
      setStateSortName(StateSort.none);
      onApplySortName(StateSort.none);
    }
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
          {stateSortName === StateSort.none
            ? "↑ ↓"
            : stateSortName === StateSort.ascending
            ? "↑ ↑"
            : "↓ ↓"}
        </Button>
      </div>
      <div className={styles.sortProducts}>
        <h5>Sort by price</h5>
        <Button type="button" onClick={handleApplySortPrice}>
          {stateSortPrice === StateSort.none
            ? "↑ ↓"
            : stateSortPrice === StateSort.ascending
            ? "↑ ↑"
            : "↓ ↓"}
        </Button>
      </div>
    </section>
  );
};

export default FilterList;
