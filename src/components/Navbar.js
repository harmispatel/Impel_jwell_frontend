import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BsHandbag, BsHeart } from "react-icons/bs";
import Logo from "../assets/images/logo.png";

const Navbar = () => {
  const [colorChange, setColorchange] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const location = useLocation();
  const currentRoute = location.pathname;
  const navigate = useNavigate()

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) { 
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const CartCounts = JSON.parse(sessionStorage.getItem("cartItems"));

  const Dealer = localStorage.getItem('token')
  const Phone = localStorage.getItem('phone')

  const handleLogout = () => {

    if (Dealer) {
      localStorage.removeItem('isLogin');
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('user_type');
      setIsLoggedOut(true);
      navigate("/Dealer_login")
    } else {
      localStorage.removeItem('_grecaptcha');
      localStorage.removeItem('phone');
      setIsLoggedOut(true);
      navigate("/login")
    }    
  };

  return (
    <header className={colorChange ? "header colorChange" : "header"}>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={currentRoute === "/" ? "nav-link active" : "nav-link"} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={currentRoute === "/shop" ? "nav-link active" : "nav-link"} to="/shop">Shop</Link>
              </li>
              <li className="nav-item">
                <Link className={ currentRoute === "#" ? "nav-link active" : "nav-link"} to="#">About</Link>
              </li>
              <li className="nav-item">
                <Link className={currentRoute === "/#" ? "nav-link active" : "nav-link"} to="#">Contact</Link>
              </li>
            </ul>
          </div>
          <Link className="navbar-brand m-0" to="#">
            <img src={Logo} alt="logo" width={100} />
          </Link>

          <div className="header_icon">
            <ul>
              {Dealer  && 
                <li><button type="submit" className="btn btn-outline-dark">Hello! Dealer</button></li>
              }

              {Phone  && 
                <li><button type="submit" className="btn btn-outline-dark">Hello! User</button></li>
              }
           
              <li className="login_user">
                {Dealer || Phone ? (
                  <Link className="icon" to="#">
                    <FaUserAlt />
                  </Link>
                ) :(
                  <Link className="icon" to="/login">
                    <FaUserAlt />
                  </Link>
                )}
                
                {Dealer && 
                  <div className="login_dropdown">
                    <ul>
                      <li><Link to="/profile">Profile</Link></li>
                      <li><Link to="/wishlist">WishList</Link></li>
                      <li><Link to="/orders">My Orders</Link></li>
                      <li><a href="#" onClick={handleLogout}>LogOut</a></li>
                    </ul>
                  </div>
                }

                {Phone && 
                  <div className="login_dropdown">
                    <ul>
                      <li><Link to="/profile">Profile</Link></li>
                      <li><Link to="#">My Orders</Link></li>
                      <li><a href="#" onClick={handleLogout}>LogOut</a></li>
                    </ul>
                  </div>
                }

              </li>
              <li>
                <Link className="icon" to="/wishlist">
                  <BsHeart />
                </Link>
              </li>
              {/* <li>
                <Link className="icon cart_icon" to="/cart">
                  <BsHandbag />
                  {CartCounts && <div className="cart_count">{CartCounts?.length}</div>}
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
