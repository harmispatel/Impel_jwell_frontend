import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/shop/Shop";
import ShopDetails from "./pages/shop/ShopDetails";
import Categories from "./pages/categories/Categories";
import CategoriesItems from "./pages/categories/CategoriesItems";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoriesDetail from "./pages/categories/CategoriesDetail";
import ProtectedRoute from "./utils/ProtectedRoute";
import DealerLogIN from "./pages/auth/DealerLogin";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import ScrollToTop from "./components/ScrollToTop";
import DealerProtectedRoute from "./utils/DealerProtectedRoute";
import WishList from "./pages/user/WishList";
import DealerWishList from "./pages/Dealer/WishList";
import DealerProfile from "./pages/Dealer/Profile";
import DealerOrders from "./pages/Dealer/Orders";
import { WishListProvider } from "./context/WishListContext";
import DealerCart from "./pages/Dealer/Cart";
import Cart from "./pages/user/Cart";
import About from "./components/About";

function App() {

  return (
    <WishListProvider>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shopdetails/:id" element={<ShopDetails />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:id" element={<CategoriesItems />} />
            <Route path="categoryDetail/:id" element={<CategoriesDetail />} />

            {/* user protected */}
            <Route path="wishlist" element={ <ProtectedRoute><WishList /></ProtectedRoute>} />
            <Route path="profile" element={ <ProtectedRoute><Profile /></ProtectedRoute> } />
            <Route path="orders" element={ <ProtectedRoute><Orders /></ProtectedRoute> } />
            <Route path="cart" element={<Cart />} />

            {/* Dealer protected */}
            <Route path="dealer_wishlist" element={ <DealerProtectedRoute><DealerWishList /></DealerProtectedRoute>} />
            <Route path="dealer_profile" element={ <DealerProtectedRoute><DealerProfile /></DealerProtectedRoute> } />
            <Route path="dealer_orders" element={ <DealerProtectedRoute><DealerOrders /></DealerProtectedRoute> } />
            <Route path="dealer_cart" element={ <DealerCart /> } />
            
            <Route path="/login" element={<Login />} />
            <Route path="/Dealer_login" element={<DealerLogIN />} />
          </Route>

        </Routes>

      <ToastContainer />
    </WishListProvider>
  );
}
export default App;
