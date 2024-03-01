import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import GoTop from "./GoTop";
import profileService from "../services/Home";

const Footer = () => {
  const [siteSetting, setSiteSetting] = useState("");
  const currentYear = new Date().getFullYear();
  const copyrightText = siteSetting?.frontend_copyright;
  const updatedCopyrightText = copyrightText?.replace("{year}", currentYear);

  const SiteSetting = async () => {
    await profileService
      .SiteSetting()
      .then((res) => {
        setSiteSetting(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    SiteSetting();
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_details">
          <Link className="navbar-brand m-0" to="/">
            <img src={Logo} alt="logo" width={100} />
          </Link>

          <div className="footer_list">
            <ul>
              <li className="text-uppercase pb-2 pb-md-0">
                <Link to="/faq">
                  <b>Faq</b>
                </Link>
              </li>
              <li className="text-uppercase pb-2 pb-md-0">
                <Link to="/stores">
                  <b>stores</b>
                </Link>
              </li>
              <li className="text-uppercase pb-2 pb-md-0">
                <Link to="/about-us">
                  <b>about-us</b>
                </Link>
              </li>
              <li className="text-uppercase">
                <Link to="/shopping-and-returns">
                  <b>shopping and returns</b>
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer_social_list">
            <ul>
              {siteSetting?.instagram_link ? (
                <li>
                  <Link to={siteSetting?.instagram_link} target="_blank">
                    <BsInstagram />
                  </Link>
                </li>
              ) : (
                <></>
              )}

              {siteSetting?.facebook_link ? (
                <li>
                  <Link to={siteSetting?.facebook_link} target="_blank">
                    <BsFacebook />
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {siteSetting?.twitter_link ? (
                <li>
                  <Link to={siteSetting?.twitter_link} target="_blank">
                    <BsTwitter />
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {siteSetting?.youtube_link ? (
                <li>
                  <Link to={siteSetting?.youtube_link} target="_blank">
                    <BsYoutube />
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>

          <hr />
          <div className="footer_copyright">
            <h2>
              <div dangerouslySetInnerHTML={{ __html: updatedCopyrightText }} />
            </h2>
          </div>
        </div>
      </div>
      <GoTop />
    </footer>
  );
};

export default Footer;
