import "../../assets/styles/global.scss";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../routes/PrivateRoute";
import Home from "../../pages/Home/Home";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import Profile from "../../pages/Profile/Profile";
import Categories from "../../pages/Categories/Categories";
import Product from "../../pages/Product/Product";
import AboutUs from "../../pages/AboutUs/AboutUs";
import { PublicRoute } from "../../routes/PublicRoute";
import Basket from "../../pages/Basket/Basket";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/" element={<PublicRoute />}>
          <Route index path="" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/cart" element={<Basket />}></Route>
          <Route path="/categories/:categoryName" element={<Categories />} />
          <Route
            path="/product/:productName/:productId"
            element={<Product />}
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
