import React from "react";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import GoTop from "./GoTop";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_details">
          <Link className="navbar-brand m-0" to="#">
            <img src={Logo} alt="logo" width={100} />
          </Link>

          <div className="footer_list">
            <ul>
              <li><Link to='#'>FAQ</Link></li>
              <li><Link to='#'>Virtual Shopping</Link></li>
              <li><Link to='#'>Shopping & Returns</Link></li>
              <li><Link to='#'>Create Your Jewellery</Link></li>
              <li><Link to='#'>Ring Sizer</Link></li>
              <li><Link to='#'>Stores</Link></li>
            </ul>
          </div>

          <div className="footer_social_list">
            <ul>
              <li><Link to='#'><BsInstagram /></Link></li>
              <li><Link to='#'><BsFacebook /></Link></li>
              <li><Link to='#'><BsTwitter /></Link></li>
              <li><Link to='#'><BsYoutube /></Link></li>
            </ul>
          </div>

          <hr />
          <div className="footer_copyright">
            <h2>Copyright © 2023 Jewellery Store</h2>
          </div>
        </div>
      </div>
      <GoTop />
    </footer>
  );
};

export default Footer;
