import { FC, ChangeEvent, useState } from "react";
import styles from "./Search.module.scss";
import { searchProducts } from "../../services/searchProductsThunk/searchProductsThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Link } from "react-router-dom";
import { clearSearchState } from "../../features/searchProductsSlice";

const Search: FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.search.products);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(searchProducts({ searchText }));
    setShowResults(true);
  };

  const hideResults = () => {
    setShowResults(false);
    dispatch(clearSearchState());
  };

  return (
    <form className={styles.search__container} onSubmit={handleSearch}>
      <input
        className={styles.search__input}
        placeholder="What are you looking for?"
        value={searchText}
        onChange={handleInputChange}
      />
      <button type="submit" className={styles.search__button}>
        🔍
      </button>
      {showResults && (
        <div className={styles.results}>
          {products.results &&
            products.results.map((item) => (
              <Link
                to={`/product/${item.name["en-US"]}/id=${item.id}`}
                key={item.id}
                onClick={hideResults}
              >
                <img
                  src={item.masterVariant.images[0].url}
                  alt={item.name["en-US"]}
                />
                <span>{item.name["en-US"]}</span>
              </Link>
            ))}
        </div>
      )}
    </form>
  );
};

export default Search;
