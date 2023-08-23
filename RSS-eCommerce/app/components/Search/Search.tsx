import { FC, ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Search.module.scss";
import searchIcon from "../../assets/images/search.svg";

const Search: FC = () => {
  const [searchText, setSearchText] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    setSearchText("");
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        placeholder="What are you looking for?"
        value={searchText}
        onChange={handleInputChange}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        <Link to={`/search/${searchText}`}>
          <img src={searchIcon} alt="Search" />
        </Link>
      </button>
    </div>
  );
};

export default Search;
