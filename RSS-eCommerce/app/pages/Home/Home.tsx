import { FC, useState, useEffect } from "react";
import styles from "./Home.module.scss";
import Sidebar from "../../components/SiderBar/SiderBar";
import Poster from "../../components/Poster/Poster";
import Products from "../../components/Product/Products";
import Advantages from "../../components/Advantages/Advantages";
import ProductsWithFilter from "../../components/ProductsWithFilter/ProductsWithFilter";
import {
  ProductItem,
  categoriesServer,
  setProductsServer,
  FiltItem,
} from "../../data/users.data";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchProducts } from "../../services/products/productsThunk";

const Home: FC = () => {
  const [amount, setAmount] = useState(4);
  const dispatch = useAppDispatch();
  const productsAllList = useAppSelector(
    (state) => state.products.products.results,
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
    dispatch(fetchProducts());

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const productsList: ProductItem[] = [];
  for (let i = 0; i < productsAllList.length; i++) {
    const productData = productsAllList[i];
    const images: string[] = [];
    const imagesAll = productData.masterData.current.masterVariant.images;
    for (let k = 0; k < imagesAll.length; k++) {
      images.push(imagesAll[k].url);
    }

    let description = "";
    if (productData.masterData.current.description) {
      description = productData.masterData.current.description["en-US"];
    }
    const shortDescription = description.substring(0, 40);

    let priceOld = 0;
    let price = 0;
    if (productData.masterData.staged.masterVariant.prices[0]) {
      priceOld =
        productData.masterData.staged.masterVariant.prices[0].value.centAmount /
        10;
      price =
        productData.masterData.staged.masterVariant.prices[0].discounted.value
          .centAmount / 10;
    }

    let nameCategories = "";
    if (productData.masterData.current.categories[0]) {
      const categoryId = productData.masterData.current.categories[0].id;
      const foundCategory = categoriesServer.find(
        (category) => category.id === categoryId,
      );

      if (foundCategory) {
        nameCategories = foundCategory.name;
      } else {
        nameCategories = "Category Not Found";
      }
    } else {
      nameCategories = "No Category";
    }

    let filters: FiltItem = {
      brand: [],
      color: [],
      availability: [],
      discountToDay: false,
    };

    // fill filters
    if (nameCategories === "Men’s Fashion" && i % 2 === 0 && i !== 0) {
      filters = {
        brand: ["Marc O'Polo"],
        color: ["red", "green"],
        availability: ["in shop"],
        discountToDay: true,
      };
    }

    if (nameCategories === "Men’s Fashion" && i % 2 !== 0 && i !== 0) {
      filters = {
        brand: ["Adidas"],
        color: ["white", "green"],
        availability: ["on order"],
        discountToDay: true,
      };
    }

    if (nameCategories === "Woman’s Fashion" && i % 2 === 0 && i !== 0) {
      filters = {
        brand: ["Marc O'Polo"],
        color: ["red", "green"],
        availability: ["in shop"],
        discountToDay: true,
      };
    }

    if (nameCategories === "Woman’s Fashion" && i % 2 !== 0 && i !== 0) {
      filters = {
        brand: ["Adidas"],
        color: ["white", "green"],
        availability: ["on order"],
        discountToDay: true,
      };
    }

    if (nameCategories === "Electronics") {
      filters = {
        brand: ["Samsung"],
        color: ["white", "black"],
        availability: ["on order"],
        discountToDay: true,
      };
    }

    if (nameCategories === "Medicine") {
      filters = {
        brand: [],
        color: [],
        availability: ["in shop"],
        discountToDay: true,
      };
    }

    if (nameCategories === "Groceries & Pets") {
      filters = {
        brand: ["Pet"],
        color: [],
        availability: ["in shop"],
        discountToDay: true,
      };
    }

    if (nameCategories === "Health & Beauty") {
      filters = {
        brand: ["Garnier"],
        color: [],
        availability: ["in shop"],
        discountToDay: true,
      };
    }

    const productItem: ProductItem = {
      id: productData.id,
      images: images,
      name: productData.masterData.current.name["en-US"],
      category: nameCategories,
      shortDescription: shortDescription,
      description: description,
      price: price,
      priceOld: priceOld,
      filter: filters,
    };
    productsList.push(productItem);
  }

  setProductsServer(productsList);

  return (
    <>
      <section className={styles.sidebar}>
        <Sidebar />
        <Poster />
      </section>
      <Products
        products={productsList}
        title="Flash Sales"
        titleCategory="Today's"
        amount={amount}
      />
      <Advantages />
      <ProductsWithFilter category="All products" />
    </>
  );
};

export default Home;
