import "../../assets/styles/global.scss";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from '../../routes/PrivateRoute';
import Layout from "../../pages/Layout";
import Home from "../../pages/Home/Home";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import Profile from '../../pages/Profile/Profile';
import Categories from "../../pages/Categories/Categories";
import SearchPage from "../../pages/SearchPage/SearchPage";
import Product from "../../pages/Product/Product";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index path="" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/categories/:categoryName" element={<Categories />} />
          <Route path="/product/:productName" element={<Product />} />
          <Route path="/search/:query" element={<SearchPage />} />
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
