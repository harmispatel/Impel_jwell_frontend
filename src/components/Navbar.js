import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { FaBars, FaStar, FaUser, FaUserAlt } from "react-icons/fa";
import { BsHandbag, BsHeart } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { AiFillGold } from "react-icons/ai";

import Logo from "../assets/images/logo.png";
import NOimage from "../assets/images/user-demo-image.png";

import UserService from "../services/Cart";
import Userservice from "../services/Auth";
import FilterServices from "../services/Filter";
import profileService from "../services/Auth";

import { WishlistSystem } from "../context/WishListContext";
import { CartSystem } from "../context/CartContext";
import { ProfileSystem } from "../context/ProfileContext";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";

const Navbar = () => {
  const navbarRef = useRef(null);
  const { cartItems } = useContext(CartSystem);
  const { state: cartstate } = useContext(CartSystem);

  const { wishlistItems } = useContext(WishlistSystem);
  const { state: wishliststate } = useContext(WishlistSystem);

  const { state: imagestate } = useContext(ProfileSystem);
  const { state: namestate } = useContext(ProfileSystem);

  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;

  const Dealer = localStorage.getItem("token");
  const DealerEmail = localStorage.getItem("email");
  const Phone = localStorage.getItem("phone");

  const [colorChange, setColorchange] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const [profileData, setProfileData] = useState([]);
  const [image, setImage] = useState([]);
  const [ProfileMenu, setProfileMenu] = useState(false);
  const ProfileRef = useRef(null);

  const [userCartCounts, setUsererCartCounts] = useState();
  const [wishlistCount, setWishlistCount] = useState();

  const [dealerData, setDealerData] = useState([]);

  const [goldData, setGoldData] = useState([]);

  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState([]);
  const [TagDropdown, setTagDropdown] = useState(false);
  const tagRef = useRef(null);

  const [dispatch, setDispatch] = useState(false);
  const DispatchRef = useRef(null);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const searchParams = new URLSearchParams(location.search);

  let tagIds = searchParams.getAll("tag_id");

  tagIds =
    Array.isArray(tagIds) && tagIds.length > 0 ? tagIds[0].split(",") : [];

  tagIds = tagIds.map((i) => parseFloat(i));

  const handleTag = (tagId) => {
    if (tag.includes(tagId)) {
      setTag(tag.filter((id) => id !== tagId));
    } else {
      setTag([...tag, tagId]);
    }
  };

  const Tags = () => {
    FilterServices.headerTags()
      .then((res) => {
        setTags(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Tags();
  }, []);

  const UserCartItems = () => {
    UserService.CartList({ phone: Phone })
      .then((res) => {
        setUsererCartCounts(res.data.total_quantity);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UserWishlist = () => {
    Userservice.userWishlist({ phone: Phone })
      .then((res) => {
        setWishlistCount(res?.data?.total_quantity);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserProfile = () => {
    profileService
      .getProfile({ phone: Phone })
      .then((res) => {
        setProfileData(res.data.name);
        setImage(res.data.profile);
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = {
  //         PageNo: 1,
  //         PageSize: 100,
  //         DeviceID: 0,
  //         SortBy: "",
  //         SearchText: "",
  //         TranType: "",
  //         CommaSeperate_ItemGroupID: "",
  //         CommaSeperate_ItemID: "",
  //         CommaSeperate_StyleID: "",
  //         CommaSeperate_ProductID: "",
  //         CommaSeperate_SubItemID: "",
  //         CommaSeperate_AppItemCategoryID: "",
  //         CommaSeperate_ItemSubID: "",
  //         CommaSeperate_KarigarID: "",
  //         CommaSeperate_BranchID: "",
  //         CommaSeperate_Size: "",
  //         CommaSeperate_CounterID: "",
  //         MaxNetWt: 0,
  //         MinNetWt: 100,
  //         OnlyCartItem: false,
  //         OnlyWishlistItem: false,
  //         StockStatus: "",
  //         DoNotShowInClientApp: 0,
  //         HasTagImage: 0,
  //       };

  //       const response = await fetch(
  //         "https://api.indianjewelcast.com/api/Tag/GetAll",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(data),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }

  //       const responseData = await response.json();
  //       console.log(responseData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useLayoutEffect(() => {
    UserCartItems();
  }, [cartItems]);

  useLayoutEffect(() => {
    UserWishlist();
  }, [wishlistItems]);

  useLayoutEffect(() => {
    if (Phone) {
      getUserProfile();
    }
  }, [Phone, namestate?.profilename, imagestate?.image]);

  useLayoutEffect(() => {
    if (DealerEmail) {
      getProfileData();
    }
  }, [DealerEmail, imagestate?.image]);

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
      localStorage.removeItem("message");
      localStorage.removeItem("isChecked");
      setIsLoggedOut(true);
      navigate("/login");
    }
  };

  const changeNavbarColor = () => {
    const scrollValue = document?.documentElement?.scrollTop;
    scrollValue > 0 ? setColorchange(true) : setColorchange(false);
  };
  window.addEventListener("scroll", changeNavbarColor);

  const TagsDropdown = () => {
    setTagDropdown(!TagDropdown);
  };

  const ProfileDP = () => {
    setProfileMenu(!ProfileMenu);
  };

  const DispatchLink = () => {
    setDispatch(!dispatch);
  };

  const handleDispatchClick = (event) => {
    if (DispatchRef.current && !DispatchRef.current.contains(event.target)) {
      setDispatch(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDispatchClick);
    window.addEventListener("scroll", handleDispatchClick);

    return () => {
      document.removeEventListener("mousedown", handleDispatchClick);
      window.removeEventListener("scroll", handleDispatchClick);
    };
  }, []);

  const handleProfileClick = (event) => {
    if (ProfileRef.current && !ProfileRef.current.contains(event.target)) {
      setProfileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleProfileClick);
    window.addEventListener("scroll", handleProfileClick);

    return () => {
      document.removeEventListener("mousedown", handleProfileClick);
      window.removeEventListener("scroll", handleProfileClick);
    };
  }, []);

  const handleTagClick = (event) => {
    if (tagRef.current && !tagRef.current.contains(event.target)) {
      setTagDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleTagClick);
    window.addEventListener("scroll", handleTagClick);

    return () => {
      document.removeEventListener("mousedown", handleTagClick);
      window.removeEventListener("scroll", handleTagClick);
    };
  }, []);

  const handleNavClick = () => {
    setIsCollapsed(!isCollapsed);
    setTagDropdown(false);
  };

  const handleScroll = () => {
    const navbar = navbarRef.current;
    if (navbar && navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const wishlistTip = <Tooltip id="tooltip">wishlist</Tooltip>;
  const cartTip = <Tooltip id="tooltip">cart</Tooltip>;

  return (
    <header
      className={`${colorChange === true ? "header sticky_header" : "header"}`}
    >
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <div className="header_inner">
            <button
              className="navbar-toggler"
              type="button"
              onClick={handleNavClick}
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <FaBars className="text-white" />
            </button>
            <div
              className={`collapse navbar-collapse ${
                isCollapsed ? "" : "show"
              }`}
              id="navbarSupportedContent"
              ref={navbarRef}
            >
              <ul className="navbar-nav mb-2 mb-lg-0 w-100">
                <li className="nav-item">
                  <Link
                    className={
                      currentRoute === "/" ? "nav-link active" : "nav-link"
                    }
                    aria-current="page"
                    to="/"
                    onClick={handleNavClick}
                  >
                    Home
                  </Link>
                </li>

                {/* <li className="nav-item">
                  <div onClick={DispatchLink} ref={DispatchRef}>
                    <div
                      className={`dispatch-dropdown ${
                        dispatch ? "active" : ""
                      }`}
                    >
                      <ul>
                        <li>
                          <Link to="/ready-to-dispatch">
                            <AiFillGold />
                            GOLD
                          </Link>
                        </li>
                        <li></li>
                      </ul>
                    </div>

                    <span
                      className="nav-link dropdown-toggle"
                      style={{
                        fontWeight: "500",
                        color: "#000",
                        textTransform: "uppercase",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      <Link to="/ready-to-dispatch">
                        <AiFillGold />
                        Ready To Dispatch
                      </Link>
                    </span>
                  </div>
                </li> */}

                <li className="nav-item">
                  <Link
                    className={
                      currentRoute === "/ready-to-dispatch" ? "nav-link active" : "nav-link"
                    }
                    aria-current="page"
                    to="/ready-to-dispatch"
                    onClick={handleNavClick}
                  >
                    Ready To Dispatch
                  </Link>
                </li>

                <li className="nav-item">
                  <div onClick={TagsDropdown} ref={tagRef}>
                    <div
                      className={`make-by-order-dropdown ${
                        TagDropdown ? "active" : ""
                      }`}
                    >
                      <div className="row">
                        {tags?.length ? (
                          <>
                            <div className="col-md-2">
                              <div className="tags-links">
                                <Link
                                  className={
                                    currentRoute === "/shop"
                                      ? "nav-link active"
                                      : "nav-link"
                                  }
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "800",
                                    textTransform: "uppercase",
                                  }}
                                  to="/shop"
                                  onClick={() => {
                                    handleNavClick();
                                  }}
                                >
                                  All Jewellery
                                </Link>
                              </div>
                            </div>

                            {tags?.map((multitags, index) => (
                              <div className="col-md-2" key={index}>
                                <div className="tags-links">
                                  <Link
                                    to={`/shop?tag_id=${
                                      tagIds.includes(multitags.id)
                                        ? tagIds
                                        : multitags.id
                                    }`}
                                    className="nav-link"
                                    onClick={() => {
                                      handleTag(multitags.id);
                                    }}
                                  >
                                    {multitags.name}
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            <Link
                              className={
                                currentRoute === "/shop"
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              style={{ fontSize: "17px", fontWeight: "800" }}
                              to="/shop"
                              onClick={handleNavClick}
                            >
                              All Jwellery
                            </Link>
                          </>
                        )}
                      </div>
                    </div>

                    <span
                      className="nav-link dropdown-toggle"
                      style={{
                        fontWeight: "500",
                        color: "#000",
                        textTransform: "uppercase",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      Make by order
                    </span>
                  </div>
                </li>

                <li className="nav-item">
                  <Link
                    className={
                      currentRoute === "/customization"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/customization"
                    onClick={handleNavClick}
                  >
                    Customization
                  </Link>
                </li>
              </ul>
            </div>

            <Link className="navbar-brand m-0" to="/">
              <img src={Logo} alt="logo" height={70} />
            </Link>

            <div className="header_icon">
              <ul>
                <li className="m-0">
                  {Dealer && (
                    <ul>
                      <li className="login_user" id="user-profile">
                        <div
                          className="profile"
                          onClick={ProfileDP}
                          ref={ProfileRef}
                        >
                          <div
                            className={`menu ${ProfileMenu ? "active" : ""}`}
                          >
                            <ul>
                              <li>
                                <Link to="/dealer_profile">
                                  <FaUser /> My Profile
                                </Link>
                              </li>
                              <li>
                                <Link to="/my_orders">
                                  <FaCartShopping /> My Orders
                                </Link>
                              </li>
                              <li>
                                <Link to="/dealer_wishlist">
                                  <FaStar /> My Selections
                                </Link>
                              </li>
                              <li>
                                <Link to="/" onClick={handleLogout}>
                                  <IoLogOut />
                                  Logout
                                </Link>
                              </li>
                            </ul>
                          </div>

                          <div className="img-box">
                            {dealerData?.profile ? (
                              <img
                                src={dealerData?.profile}
                                alt=""
                                className="uploaded-image w-100"
                                style={{
                                  borderRadius: "50%",
                                }}
                              />
                            ) : (
                              <>
                                <img
                                  src={NOimage}
                                  alt=""
                                  className="uploaded-image w-100"
                                  style={{
                                    borderRadius: "50%",
                                  }}
                                />
                              </>
                            )}
                          </div>
                          <div className="user dropdown-toggle">
                            {dealerData?.name ? (
                              <span className="ms-2">
                                <b
                                  style={{
                                    fontSize: "20px",
                                  }}
                                >
                                  {dealerData?.name}
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
                                    Hello! Dealer
                                  </b>
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </li>
                    </ul>
                  )}
                  {Phone && (
                    <ul>
                      <li>
                        {Phone && (
                          <OverlayTrigger
                            placement="bottom"
                            overlay={wishlistTip}
                          >
                            <Link className="icon" to="/wishlist">
                              <BsHeart
                                style={{ fontSize: "20px", color: "black" }}
                              />

                              {wishliststate.wishlistItems > 0 && (
                                <div className="cart_count">
                                  {wishliststate.wishlistItems}
                                </div>
                              )}
                            </Link>
                          </OverlayTrigger>
                        )}
                      </li>
                      <li>
                        {Phone && (
                          <OverlayTrigger placement="bottom" overlay={cartTip}>
                            <Link className="icon" to="/cart">
                              <BsHandbag
                                style={{ fontSize: "20px", color: "black" }}
                              />
                              {cartstate.cartItems > 0 && (
                                <div className="cart_count">
                                  {cartstate.cartItems}
                                </div>
                              )}
                            </Link>
                          </OverlayTrigger>
                        )}
                      </li>
                      <li className="login_user" id="user-profile">
                        <div
                          className="profile"
                          onClick={ProfileDP}
                          ref={ProfileRef}
                        >
                          <div
                            className={`menu ${ProfileMenu ? "active" : ""}`}
                          >
                            <ul>
                              <li>
                                <Link to="/profile">
                                  <FaUser />
                                  My Profile
                                </Link>
                              </li>
                              <li>
                                <Link to="/my_orders">
                                  <FaCartShopping />
                                  My Orders
                                </Link>
                              </li>
                              <li>
                                <Link to="/" onClick={handleLogout}>
                                  <IoLogOut />
                                  Logout
                                </Link>
                              </li>
                            </ul>
                          </div>

                          <div className="img-box">
                            {image?.length ? (
                              <img
                                src={image}
                                alt=""
                                className="uploaded-image w-100"
                                style={{
                                  borderRadius: "50%",
                                }}
                              />
                            ) : (
                              <img
                                src={NOimage}
                                alt=""
                                className="uploaded-image w-100"
                                style={{
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                          </div>
                          <div className="user dropdown-toggle">
                            {profileData?.length ? (
                              <span className="ms-2">
                                <b
                                  style={{
                                    fontSize: "20px",
                                  }}
                                >
                                  {profileData}
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
                                    Hello! user
                                  </b>
                                </span>
                              </>
                            )}
                          </div>
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
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
