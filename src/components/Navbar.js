import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BsHandbag, BsHeart } from "react-icons/bs";
import Logo from "../assets/images/logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DealerService from "../services/Dealer/Cart";
import UserService from "../services/Cart";
import { Tooltip as ReactTooltip } from "react-tooltip";
import homeService from "../services/Home";

const Navbar = () => {
  const [colorChange, setColorchange] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [dealerCartCounts, setDealerCartCounts] = useState();
  const [userCartCounts, setUsererCartCounts] = useState();
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const location = useLocation();
  const currentRoute = location.pathname;
  const navigate = useNavigate();

  const Dealer = localStorage.getItem("token");
  const DealerEmail = localStorage.getItem("email");
  const Phone = localStorage.getItem("phone");
  const CartCounts = JSON.parse(sessionStorage.getItem("cartItems"));
  const productsquantity = localStorage.getItem("total_quantity");

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const DealerCart = () => {
    DealerService.CartList({ email: DealerEmail })
      .then((res) => {
        setDealerCartCounts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UserCartItems = () => {
    UserService.CartList({ phone: Phone })
      .then((res) => {
        setUsererCartCounts(res.data.total_quantity);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Tags = () => {
    homeService
      .headerTags()
      .then((res) => {
        setTags(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterTags = (tag) => {
    setSelectedTag(tag);
    navigate("/shop");
  };

  useEffect(() => {
    DealerCart();
    UserCartItems();
    Tags();
  }, []);

  const handleLogout = () => {
    if (Dealer) {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("user_type");
      localStorage.removeItem("user_id");
      localStorage.removeItem("total_quantity");
      setIsLoggedOut(true);
      navigate("/Dealer_login");
    } else {
      localStorage.removeItem("_grecaptcha");
      localStorage.removeItem("phone");
      localStorage.removeItem("verification");
      localStorage.removeItem("user_type");
      localStorage.removeItem("user_id");
      localStorage.removeItem("total_quantity");
      localStorage.removeItem("savedDiscount");
      localStorage.removeItem("username");
      setIsLoggedOut(true);
      navigate("/login");
    }
  };

  return (
    <header className={colorChange ? "header sticky_header" : "header"}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="header_inner">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse position-relative"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={
                    currentRoute === "/" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item main-tags">
                <Link className="nav-link" aria-current="page">
                  Tags
                </Link>
                <div className="tags-dropdown">
                  <div className="row">
                    {tags?.map((multitags, index) => (
                      <div className="col-md-3">
                        <div className="tags-links" key={index}>
                          <Link
                            to="/shop"
                            onClick={() => filterTags(multitags.name)}
                          >
                            {multitags.name}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    currentRoute === "/shop" ? "nav-link active" : "nav-link"
                  }
                  to="/shop"
                >
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    currentRoute === "/about" ? "nav-link active" : "nav-link"
                  }
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <Link className="navbar-brand m-0" to="/">
            <img src={Logo} alt="logo" width={100} />
          </Link>
          <div className="header_icon">
            <ul>
              {Dealer && (
                <ul>
                  <li className="user-name">
                    <button type="submit" className="btn btn-outline-dark">
                      Hello! Dealer
                    </button>
                  </li>

                  <li className="login_user">
                    <Link
                      className="icon"
                      to="#"
                      data-tooltip-id="my-tooltip-1"
                    >
                      <FaUserAlt />
                    </Link>

                    <div className="login_dropdown dealer_dropdown">
                      <ul>
                        <li>
                          <Link to="/dealer_profile">My Profile</Link>
                        </li>
                        <li>
                          <Link to="/dealer_orders">My Orders</Link>
                        </li>
                        <li>
                          <Link to="/dealer_wishlist">My Selections</Link>
                        </li>
                        <li>
                          <a href="#" onClick={handleLogout}>
                            LogOut
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              )}

              {Phone && (
                <ul>
                  <li className="user-name">
                    <button type="submit" className="btn btn-outline-dark">
                      Hello! User
                    </button>
                  </li>

                  <li className="login_user">
                    <Link
                      className="icon"
                      to="#"
                      data-tooltip-id="my-tooltip-1"
                    >
                      <FaUserAlt />
                    </Link>

                    <div className="login_dropdown">
                      <ul>
                        <li>
                          <Link to="/profile">Profile</Link>
                        </li>
                        {/* <li><Link to="/orders">My Orders</Link></li> */}
                        <li>
                          <a href="#" onClick={handleLogout}>
                            LogOut
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              )}

              {!(Dealer || Phone) && (
                <li className="login_user">
                  <Link
                    className="icon"
                    to="/login"
                    data-tooltip-id="my-tooltip-1"
                  >
                    <FaUserAlt />
                  </Link>
                </li>
              )}

              {/* <li>
                <Link
                  className="icon"
                  to={Dealer ? "/dealer_wishlist" : "/wishlist"}
                >
                  <BsHeart />
                </Link>
              </li> */}

              {Phone && (
                <li>
                  <Link
                    className="icon"
                    to="/wishlist"
                    data-tooltip-id="my-tooltip-2"
                  >
                    <BsHeart />
                  </Link>
                </li>
              )}
              <li>
                {Phone && (
                  <Link
                    className="icon cart_icon"
                    to="/cart"
                    data-tooltip-id="my-tooltip-3"
                  >
                    <BsHandbag style={{ fontSize: "20px", color: "black" }} />
                    {userCartCounts?.length > 0 && (
                      <div className="cart_count">{userCartCounts}</div>
                    )}
                  </Link>
                )}
              </li>
              <ReactTooltip id="my-tooltip-1" place="top" content="user" />
              <ReactTooltip id="my-tooltip-2" place="top" content="wishlist" />
              <ReactTooltip id="my-tooltip-3" place="top" content="cart" />
              {/* {(Dealer || Phone) && (
                <li>
                  {Dealer ? (
                    // <Link className="icon cart_icon" to="/dealer_cart">
                    //   <BsHandbag />
                    //   {dealerCartCounts?.length > 0 && (
                    //     <div className="cart_count">
                    //       {dealerCartCounts?.length}
                    //     </div>
                    //   )}
                    // </Link>
                    <div></div>
                  ) : (
                   
                  )}
                </li>
              )} */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
