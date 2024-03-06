import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/shop/Shop";
import ShopDetails from "./pages/shop/ShopDetails";
import Categories from "./pages/categories/Categories";
import CategoriesItems from "./pages/categories/CategoriesItems";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import DealerLogin from "./pages/auth/DealerLogin";
import Profile from "./pages/user/Profile";
import OrderDetails from "./pages/user/OrderDetails";
import ScrollToTop from "./components/ScrollToTop";
import DealerProtectedRoute from "./utils/DealerProtectedRoute";
import WishList from "./pages/user/WishList";
import DealerWishList from "./pages/Dealer/WishList";
import DealerProfile from "./pages/Dealer/Profile";
import Cart from "./pages/user/Cart";
import { Toaster } from "react-hot-toast";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Errorpage from "./components/Errorpage";
import MyOrders from "./pages/user/MyOrders";
import { HelmetProvider } from "react-helmet-async";
import Resetpassword from "./pages/auth/Resetpassword";
import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishListContext";
import ProfileProvider from "./context/ProfileContext";
import { useEffect } from "react";
import CustomPage from "./components/CustomPage";
import WomansClub from "./components/common/WomansClub";
import Topseller from "./pages/shop/Topseller";
import LatestDesign from "./pages/shop/LatestDesign"

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = localStorage.getItem("user_type");
  const popupshow = localStorage.getItem("user_type");
  const helmetContext = {};

  // const shouldShowPopup =
  //   !["/login", "/Dealer_login", "/forget-password"].some((path) =>
  //     location.pathname.startsWith(path)
  //   ) && !location.pathname.startsWith("/reset-password/");

  useEffect(() => {
    if (userType == 1 && location.pathname === "/login") {
      navigate("/");
    } else if (userType == 2 && location.pathname === "/login") {
      navigate("/");
    }

    if (userType == 2 && location.pathname === "/Dealer_login") {
      navigate("/");
    } else if (userType == 1 && location.pathname === "/Dealer_login") {
      navigate("/");
    }
  }, [userType, location.pathname, navigate]);

  function renderLayout() {
    if (
      location.pathname.startsWith("/login") ||
      location.pathname.startsWith("/forget-password") ||
      location.pathname.startsWith("/reset-password") ||
      location.pathname.startsWith("/Dealer_login")
    ) {
      return null;
    } else {
      return <Layout />;
    }
  }

  return (
    <>
      <WishlistProvider>
        <ProfileProvider>
          <CartProvider>
            <ScrollToTop />
            {!location.pathname.startsWith("/login") &&
              !location.pathname.startsWith("/forget-password") &&
              !location.pathname.startsWith("/reset-password") &&
              !location.pathname.startsWith("/Dealer_login") && <WomansClub />}

            <HelmetProvider context={helmetContext}>
              {/* {shouldShowPopup && popupshow == null ? <Popup /> : <></>} */}
              <Routes>
                <>
                  <Route path="/" element={renderLayout()}>
                    {/* COMMON COMPONENT */}
                    <Route index element={<Home />} />
                    <Route path="shop" element={<Shop />} />
                    <Route
                      path="customization"
                      element={<CustomPage page_slug="customization" />}
                    />
                    <Route
                      path="faq"
                      element={<CustomPage page_slug="faq" />}
                    />
                    <Route
                      path="about-us"
                      element={<CustomPage page_slug="about-us" />}
                    />
                    <Route
                      path="shopping-and-returns"
                      element={<CustomPage page_slug="shopping-and-returns" />}
                    />
                    <Route
                      path="contact-us"
                      element={<CustomPage page_slug="contact-us" />}
                    />

                    <Route path="shopdetails/:id" element={<ShopDetails />} />
                    <Route path="categories" element={<Categories />} />
                    <Route
                      path="categories/:id"
                      element={<CategoriesItems />}
                    />
                    <Route path="top-selling-designs" element={<Topseller />} />
                    <Route path="latest-designs" element={<LatestDesign />} />


                    {/* USER PROTECTED */}
                    <Route
                      path="wishlist"
                      element={
                        <ProtectedRoute>
                          <WishList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="cart"
                      element={
                        <ProtectedRoute>
                          <Cart />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="my_orders" element={<MyOrders />} />
                    <Route
                      path="order-details/:id"
                      element={<OrderDetails />}
                    />

                    {/* DEALER PROTECTED */}
                    <Route
                      path="dealer_wishlist"
                      element={
                        <DealerProtectedRoute>
                          <DealerWishList />
                        </DealerProtectedRoute>
                      }
                    />
                    <Route
                      path="dealer_profile"
                      element={
                        <DealerProtectedRoute>
                          <DealerProfile />
                        </DealerProtectedRoute>
                      }
                    />

                    {/* AUTH */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/Dealer_login" element={<DealerLogin />} />
                    <Route
                      path="/forget-password"
                      element={<ForgetPassword />}
                    />
                    <Route
                      path="/reset-password/:token"
                      element={<Resetpassword />}
                    />
                  </Route>
                </>

                <Route path="*" element={<Errorpage />} />
              </Routes>
            </HelmetProvider>
          </CartProvider>
        </ProfileProvider>
      </WishlistProvider>
      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}
export default App;
