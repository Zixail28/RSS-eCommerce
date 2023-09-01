import { FC } from "react";
import { useParams } from "react-router-dom";
import Products from "../../components/Product/Products";
import { productsListServer } from "../../data/users.data";

const SearchPage: FC = () => {
  const { query } = useParams<{ query: string }>();

  return (
    <section>
      <h2>Search Results for: {query}</h2>
      <Products
        products={productsListServer}
        title=""
        titleCategory="All products"
        amount={productsListServer.length}
        searchFilter={query}
      />
    </section>
  );
};

export default SearchPage;
