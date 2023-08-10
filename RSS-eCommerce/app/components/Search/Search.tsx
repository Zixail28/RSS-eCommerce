import { FC } from 'react';
import styles from "./Search.module.scss";

const Search: FC = () => {
  return <input className={styles.search} placeholder='What are you looking for?'/>
}

export default Search