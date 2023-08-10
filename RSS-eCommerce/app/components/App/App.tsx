import "../../assets/styles/global.scss";
import { Route, Routes } from "react-router-dom";
import Layout from "../../pages/Layout";
import Home from "../../pages/Home/Home";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import Auth from "../../pages/Auth/Auth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="" element={<Home />}></Route>
          <Route path="/authorization" element={<Auth />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
