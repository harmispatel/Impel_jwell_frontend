import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
import GoTop from "./GoTop";
import profileService from "../services/Home";
import { FaPinterest } from "react-icons/fa";

const Footer = () => {
  const location = useLocation();
  const currentRoute = location.pathname;

  const [siteSetting, setSiteSetting] = useState("");
  const [getPage, setGetPage] = useState([]);
  const currentYear = new Date().getFullYear();
  const copyrightText = siteSetting?.frontend_copyright;
  const updatedCopyrightText = copyrightText?.replace("{year}", currentYear);

  const SiteSetting = async () => {
    await profileService
      .SiteSetting()
      .then((res) => {
        setSiteSetting(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPagess = async () => {
    await profileService
      .GetPages()
      .then((res) => {
        setGetPage(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    SiteSetting();
    getPagess();
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
              {getPage?.map((page, index) => {
                console.log("page", page.slug)
                return (
                  <li
                    className={
                      currentRoute === page?.slug
                        ? "text-uppercase pb-2 pb-md-0 active"
                        : "text-uppercase pb-2 pb-md-0"
                    }
                  >
                    <Link to={`${page?.slug}`}>
                      <b>{page?.name}</b>
                    </Link>
                  </li>
                );
              })}
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
              {siteSetting?.pinterest_link ? (
                <li>
                  <Link to={siteSetting?.pinterest_link} target="_blank">
                    <FaPinterest />
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
