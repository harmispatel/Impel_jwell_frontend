import React from "react";
import "./index.css";
import banner_1 from "./assets/Banner Images/Impel_Landing Page Banners_01.jpg";
import banner_2 from "./assets/Banner Images/Impel_Landing Page Banners_02.jpg";
import banner_3 from "./assets/Banner Images/Impel_Landing Page Banners_03.jpg";

import product_1 from "./assets/3rd Section/Rings.jpg";
import product_2 from "./assets/3rd Section/Necklace.jpg";
import product_3 from "./assets/3rd Section/Earring.jpg";
import product_4 from "./assets/3rd Section/Bracelet.jpg";

import trending_img_1 from "./assets/Trending Products/Gold Bracelet.jpg";
import trending_img_2 from "./assets/Trending Products/Necklace.jpg";
import trending_img_3 from "./assets/Trending Products/Rings_1.jpg";
import trending_img_4 from "./assets/Trending Products/Silver Bracelet.jpg";

import love_img from "./assets/silver ring for women.jpg";
import daily_wear from "./assets/daily wear necklace for women.jpg";
import modern_bracelet from "./assets/Bracelet_3.jpg";
import Carousel from "react-bootstrap/Carousel";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <nav
        class="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#cb7f61" }}
      >
        <div class="container-fluid my-container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto navbar-name-list">
              <li class="nav-item">
                <Link class="nav-link nav-link-name" aria-current="page" to="#">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link nav-link-name" to="#">
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link nav-link-name" to="#">
                  Product
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link nav-link-name" to="#">
                  Connectivity
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link nav-link-name" to="#">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Banner Section Start */}
      <section>
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <img className="d-block w-100" src={banner_1} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={banner_2} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={banner_3} alt="First slide" />
          </Carousel.Item>
        </Carousel>
      </section>
      {/* Banner Section End */}

      {/* Product Section Start */}
      <section className="product-section">
        <div className="row justify-content-center">
          <div className="product-text product-info-text-name text-center">
            <h5>IMPEL JEWELRY</h5>
          </div>
          <div className="col-md-8">
            <div className="text-center product-info-text">
              <h4>
                Impel is a jewelry store in Ahmadabad offering minimalist
                jewelry collection. We craft minimal jewelry for women designed
                to bring timeless elegance and effortless style to everyday
                moments. Founded by Mr. Bakul Shah in 1975, Impel Jewelry blends
                elegance and simplicity. With over 50,000 designs, it’s become a
                symbol of timeless, premium, minimal luxury for everyday wear.
              </h4>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-3">
            <div className="product-card">
              <img src={product_1} alt="" className="w-100" />
              <div className="product-card-name">
                <h5>Rings</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-card">
              <img src={product_2} alt="" className="w-100" />
              <div className="product-card-name">
                <h5>Necklace</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-card">
              <img src={product_3} alt="" className="w-100" />
              <div className="product-card-name">
                <h5>Earring</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-card">
              <img src={product_4} alt="" className="w-100" />
              <div className="product-card-name">
                <h5>Bracelet</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Section End */}

      {/* Bottom Banner Start */}
      <section className="product-section mt-1">
        <div className="row">
          <div className="col-md-6">
            <div className="banner-img">
              <img src={daily_wear} alt="" className="w-100" />
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="h-100 d-flex justify-content-center align-items-center">
              <div className="img-info text-center">
                <h3>Your Daily Dose of Grace —</h3>
                <p>Minimal Jewelry Crafted to Add Grace to Every Day</p>
                <button>See Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Bottom Banner End */}

      {/* Last Banner Start */}
      <section className="product-section mb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="h-100 d-flex justify-content-center align-items-center">
              <div className="img-info text-center">
                <h3>Jewelry as Versatile as You —</h3>
                <p>Minimal Jewelry for Every Style, Every Day, Every Moment.</p>
                <button>See Now</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="banner-img">
              <img src={modern_bracelet} alt="" className="w-100" />
            </div>
          </div>
        </div>
      </section>
      {/* Last Banner End */}

      {/* Trending Product Section Start */}
      <section className="trending-product">
        <div className="row">
          <div className="text-center mt-5">
            <h2>Trending Products</h2>
          </div>
          <div className="col-md-3">
            <div class="product-card">
              <div class="badge">Hot</div>
              <div class="product-tumb">
                <img src={trending_img_1} alt="" className="w-100" />
              </div>
              <div class="product-details">
                <h4>
                  <a href="">Gold Bracelet</a>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div class="product-card">
              <div class="badge">Hot</div>
              <div class="product-tumb">
                <img src={trending_img_2} alt="" className="w-100" />
              </div>
              <div class="product-details">
                <h4>Necklace</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div class="product-card">
              <div class="badge">Hot</div>
              <div class="product-tumb">
                <img src={trending_img_3} alt="" className="w-100" />
              </div>
              <div class="product-details">
                <h4>
                  <a href="">Ring</a>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div class="product-card">
              <div class="badge">Hot</div>
              <div class="product-tumb">
                <img src={trending_img_4} alt="" className="w-100" />
              </div>
              <div class="product-details">
                <h4>
                  <a href="">Silver Bracelet</a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Trending Product Section End */}

      {/* Start-Love Section Start */}
      <section className="product-section mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="h-100 d-flex align-items-center">
              <div className="img-info">
                <h2>It Started With Love</h2>
                <p>
                  Our commitment to quality begins with meticulously inspected
                  and precisely measured raw materials. Guided by a team of the
                  most skilled designers in the market, we bring stunning
                  jewelry designs to life.
                </p>
                <p>
                  This expertise in jewelry casting is seamlessly paired with
                  our renowned in-house design capabilities, delivering
                  exceptional creations for our customers.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="banner-img">
              <img src={love_img} alt="" className="w-100" />
            </div>
          </div>
        </div>
      </section>
      {/* Start-Love Section End */}

      {/* Instagram Post Section Start */}
      <section className="insta-section mt-4">
        <div className="row justify-content-center">
          <div className="product-text text-center mt-4">
            <FaInstagram className="instagram-icon" />
            <h4>impel_store instagram</h4>
          </div>
          <div className="row mt-3 mb-5">
            <div className="col-md-3">
              <img src={trending_img_1} alt="" className="w-100" />
            </div>
            <div className="col-md-3">
              <img src={trending_img_2} alt="" className="w-100" />
            </div>
            <div className="col-md-3">
              <img src={trending_img_3} alt="" className="w-100" />
            </div>
            <div className="col-md-3">
              <img src={trending_img_4} alt="" className="w-100" />
            </div>
          </div>
        </div>
      </section>
      {/* Instagram Post Section End */}

      {/* Latest News Section Start */}
      <section className="latest-news mt-5 mb-5">
        {/* <div className="row">
          <div className="newsletter text-center">
            <h3>Latest From Impel!</h3>
          </div>
        </div> */}
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <div class="latest_product_info newsletter">
              <h3>latest From Impel!</h3>
              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email address"
                />
                <button class="btn inq_btn">inquiry</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Latest News Section End */}

      {/* Google Map Section Start */}
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.0171989114215!2d72.5870875747427!3d23.023140716308067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e844a3ea592a9%3A0xd3f0a4b932c42678!2sManek%20Chowk%2C%20Old%20City%2C%20Khadia%2C%20Ahmedabad%2C%20Gujarat%20380001!5e0!3m2!1sen!2sin!4v1733912939870!5m2!1sen!2sin"
          height="350"
          style={{ border: "0", width: "100%" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <hr />
      </div>
      {/* Google Map Section End */}

      {/* Footer Section Start */}
      <section className="footer-section">
        <div className="footer_copyright">
          <h2>Copyright © {currentYear} Impel.store</h2>
        </div>
      </section>
      {/* Footer Section End */}
    </>
  );
};

export default LandingPage;
