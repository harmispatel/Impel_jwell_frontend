import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BsHandbag, BsHeart } from "react-icons/bs";
import Logo from "../assets/images/logo.png";
import DealerService from "../services/Dealer/Cart";
import UserService from "../services/Cart";
import { Tooltip as ReactTooltip } from "react-tooltip";
import FilterServices from "../services/Filter";
import profileService from "../services/Auth";
import { CartSystem } from "../context/CartContext";
import { WishlistSystem } from "../context/WishListContext";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = (props) => {
  const { profileData } = props;

  const { state: wishliststate } = useContext(WishlistSystem);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  let tagIds = searchParams.getAll("tag_id");
  tagIds =
    Array.isArray(tagIds) && tagIds?.length > 0
      ? tagIds[0].split(",")
      : tagIds
      ? tagIds
      : [];
  tagIds = tagIds.map((i) => parseFloat(i));
  const currentRoute = location.pathname;

  const Dealer = localStorage.getItem("token");
  const DealerEmail = localStorage.getItem("email");
  const Phone = localStorage.getItem("phone");

  const [colorChange, setColorchange] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  // const [dealerCartCounts, setDealerCartCounts] = useState();
  const [userCartCounts, setUsererCartCounts] = useState();

  const [dealerData, setDealerData] = useState([]);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState([]);

  const handleTag = (e) => {
    setTag([...tag, parseFloat(e.target.value)]);
  };

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  // const DealerCart = () => {
  //   DealerService.CartList({ email: DealerEmail })
  //     .then((res) => {
  //       setDealerCartCounts(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
    FilterServices.headerTags()
      .then((res) => {
        setTags(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProfileData = () => {
    profileService
      .profile({ email: DealerEmail, token: Dealer })
      .then((res) => {
        setDealerData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // DealerCart();
    UserCartItems();
    getProfileData();
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
      localStorage.removeItem("isChecked");
      setIsLoggedOut(true);
      navigate("/login");
    }
  };
  return (
    <header className={colorChange ? "header sticky_header" : "header"}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <div className="header_inner">
            {/* <div className="position-relative">

          </div> */}
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
              className="collapse navbar-collapse navbar-collapse-start"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-2 mb-lg-0 w-100">
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
                <li className="nav-item">
                  <div>
                    <Link
                      className={
                        currentRoute === "#" ? "nav-link active" : "nav-link"
                      }
                      aria-current="page"
                      to="#"
                    >
                      Ready To Dispatch
                    </Link>
                  </div>
                </li>

                <li className="nav-item main-tags">
                  <Link
                    // to={`/shop${tagIds?.length > 0 ? `?tag_id=${tagIds}` : ""}`}
                    to="#"
                    className="nav-link"
                    aria-current="page"
                  >
                    Tags
                    <IoMdArrowDropdown />
                  </Link>
                  <div className="tags-dropdown">
                    <div className="row">
                      {tags?.length ? (
                        <>
                          <div className="col-md-2">
                            <Link
                              className={
                                currentRoute === "/shop"
                                  ? "nav-link active tag-shop-link"
                                  : "nav-link"
                              }
                              style={{ fontSize: "17px", fontWeight: "800" }}
                              to="/shop"
                            >
                              All jewellery
                            </Link>
                          </div>

                          {tags?.map((multitags, index) => (
                            <div className="col-md-2" key={index}>
                              <div className="tags-links">
                                <Link
                                  to={`/shop?tag_id=${
                                    tagIds?.includes(multitags?.id)
                                      ? tagIds
                                      : [...tagIds, multitags?.id]
                                  }`}
                                  onClick={(e) => handleTag(e)}
                                >
                                  {multitags.name}
                                </Link>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </li>
                <li className="nav-item"></li>
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
                <li className="m-0">
                  {Dealer && (
                    <ul>
                      <li className="login_user">
                        <Link
                          className="icon"
                          to="#"
                          style={{ textDecoration: "none" }}
                        >
                          <img
                            src={dealerData?.profile}
                            alt=""
                            className="uploaded-image"
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }}
                          />
                          {dealerData?.name ? (
                            <span className="ms-2">
                              <b
                                style={{
                                  fontSize: "20px",
                                }}
                              >
                                {dealerData?.name}
                                <IoMdArrowDropdown />
                              </b>
                            </span>
                          ) : (
                            <>
                              <span className="ms-2">
                                <b
                                  style={{
                                    fontSize: "20px",
                                  }}
                                >
                                  Hello! Dealer <IoMdArrowDropdown />
                                </b>
                              </span>
                            </>
                          )}
                        </Link>

                        <div className="login_dropdown dealer_dropdown">
                          <ul>
                            <li>
                              <Link to="/dealer_profile">My Profile</Link>
                            </li>
                            <li>
                              <Link to="/my_orders">My Orders</Link>
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
                      <li>
                        {Phone && (
                          <Link
                            className="icon"
                            to="/wishlist"
                            data-tooltip-id="my-tooltip-2"
                          >
                            <BsHeart />
                            {wishliststate.wishlistItems > 0 && (
                              <div className="cart_count">
                                {wishliststate.wishlistItems}
                              </div>
                            )}
                          </Link>
                        )}
                      </li>
                      <li>
                        {Phone && (
                          <Link
                            className="icon cart_icon"
                            to="/cart"
                            data-tooltip-id="my-tooltip-3"
                          >
                            <BsHandbag
                              style={{ fontSize: "20px", color: "black" }}
                            />
                            {userCartCounts > 0 && (
                              <div className="cart_count">{userCartCounts}</div>
                            )}
                          </Link>
                        )}
                      </li>

                      <li className="login_user">
                        <Link
                          className="icon"
                          to="#"
                          style={{ textDecoration: "none" }}
                        >
                          <img
                            src={profileData?.profile}
                            alt=""
                            className="uploaded-image"
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }}
                          />
                          {profileData?.name ? (
                            <span className="ms-2">
                              <b
                                style={{
                                  fontSize: "20px",
                                }}
                              >
                                {profileData?.name}
                                <IoMdArrowDropdown />
                              </b>
                            </span>
                          ) : (
                            <>
                              <span className="ms-2">
                                <b
                                  style={{
                                    fontSize: "20px",
                                  }}
                                >
                                  Hello! user <IoMdArrowDropdown />
                                </b>
                              </span>
                            </>
                          )}
                        </Link>

                        <div className="login_dropdown">
                          <ul>
                            <li>
                              <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                              <Link to="/my_orders">My Orders</Link>
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
                </li>

                {!(Dealer || Phone) && (
                  <li className="login_user">
                    <Link className="icon" to="/login">
                      <FaUserAlt />
                    </Link>
                  </li>
                )}

                <ReactTooltip
                  id="my-tooltip-2"
                  place="top"
                  content="wishlist"
                />
                <ReactTooltip id="my-tooltip-3" place="top" content="cart" />
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
