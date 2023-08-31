import '../../assets/styles/global.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from '../../pages/Layout';
import Home from '../../pages/Home/Home';
import PageNotFound from '../../pages/PageNotFound/PageNotFound';
import Login from '../../pages/Auth/Login';
import Register from '../../pages/Auth/Register';
import Profile from '../../pages/Profile/Profile';
import { PrivateRoute } from '../../routes/PrivateRoute';

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
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
