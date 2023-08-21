import "../../assets/styles/global.scss";
import { Route, Routes } from "react-router-dom";
import Layout from "../../pages/Layout";
import Home from "../../pages/Home/Home";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import Categories from "../../pages/Categories/Categories";
import Product from "../../pages/Product/Product";
import { productsList } from "../../data/users.data";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Register />}></Route>
          <Route path="/categories/:categoryName" element={<Categories />} />
          <Route
            path="/product/:productName"
            element={<Product products={productsList} />}
          />
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
