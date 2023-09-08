import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/shop/Shop";
import ShopDetails from "./pages/shop/ShopDetails";
import Categories from "./pages/categories/Categories";
import CategoriesItems from "./pages/categories/CategoriesItems";
import WishList from "./pages/carts/WishList";
import Login from "./pages/auth/Login";
import Cart from "./pages/carts/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoriesDetail from "./pages/categories/CategoriesDetail";
import { useState } from "react";
import { useEffect } from "react";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const checkUserToken = () => {
  //   const userToken = localStorage.getItem('user-token');
  //   if (!userToken || userToken === 'undefined') {
  //       setIsLoggedIn(false);
  //   }
  //   setIsLoggedIn(true);
  // }

  // useEffect(()=>{
  //   checkUserToken()
  // },[isLoggedIn])

  return (
    <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shopdetails/:id" element={<ShopDetails />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:id" element={<CategoriesItems />} />
            <Route path="categoryDetail/:id" element={<CategoriesDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={ <ProtectedRoute><WishList /></ProtectedRoute> } />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>

      <ToastContainer />
    </>
  );
}
export default App;
