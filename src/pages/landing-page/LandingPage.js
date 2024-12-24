import React, { useRef, useState } from "react";
import "./index.css";
import banner_1 from "./assets/Banner Images/Impel_Landing Page Banners_01.jpg";

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
import {
  FaBars,
  FaInstagram,
  FaPhoneAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import emailjs from "@emailjs/browser";

import { Col, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";

const LandingPage = () => {
  const formRef = useRef();
  const currentYear = new Date().getFullYear();
  const [showEdit, setShowEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_cd8i9z8",
        "template_4lhpngl",
        {
          to_name: "Impel store",
          to_email: "dharika@brightimpressions.in",
          from_name: form.name,
          from_email: document.querySelector('form input[name="email"]').value,
          from_phone: form.phone,
        },
        "gNvP3pb_uObggad1C"
      )
      .then(
        () => {
          toast.success(
            "Thank you. I will get back to you as soon as possible."
          );
          setForm({
            name: "",
            email: "",
            phone: "",
          });
          setShowEdit(false);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-head-main">
        <div className="container">
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
              <FaBars className="text-white" />
            </button>
            <img
              src="https://impel.store/static/media/logo.4b7825a638146a1cdf28.png"
              alt="logo"
              height={70}
            />

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-2 mb-lg-0 w-100">
                <li className="nav-link-name">
                  <Link aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-link-name">
                  <Link aria-current="page" to="/">
                    About
                  </Link>
                </li>
                <li className="nav-link-name">
                  <Link aria-current="page" to="/">
                    Product
                  </Link>
                </li>
                <li className="nav-link-name">
                  <Link aria-current="page" to="/">
                    Location
                  </Link>
                </li>
                <li className="nav-link-name">
                  <Link aria-current="page" to="/">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link aria-current="page" to="tel:8799619939">
                    <button class="contact-us-btn">
                      <FaPhoneAlt className="me-2" />
                      8799619939
                    </button>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="header_icon">
              <ul>
                <li className="login_user">
                  <button
                    class="contact-us-btn"
                    onClick={() => setShowEdit(!showEdit)}
                  >
                    Inquire now
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Banner Section Start */}
      <section>
        <img className="w-100" src={banner_1} alt="First_image" />
      </section>
      {/* Banner Section End */}

      {/* Product Section Start */}
      <section className="product-section">
        <div className="row justify-content-center">
          <div className="product-text product-info-text-name text-center">
            <h1>IMPEL JEWELRY</h1>
          </div>
          <div className="col-md-8">
            <div className="text-center product-info-text">
              <p>
                Impel is a jewelry store in Ahmedabad offering minimalist
                jewelry collection. We craft minimal jewelry for women designed
                to bring timeless elegance and effortless style to everyday
                moments. Founded by Mr. Bakul Shah in 1975, Impel Jewelry blends
                elegance and simplicity. With over 50,000 designs, it’s become a
                symbol of timeless, premium, minimal luxury for everyday wear.
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-md-3">
            <div className="product-card">
              <img src={product_1} alt="" className="w-100" />
              <div
                className="product-card-name"
                onClick={() => setShowEdit(!showEdit)}
              >
                <h5>Rings</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-card">
              <img src={product_2} alt="" className="w-100" />
              <div
                className="product-card-name"
                onClick={() => setShowEdit(!showEdit)}
              >
                <h5>Necklace</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-card">
              <img src={product_3} alt="" className="w-100" />
              <div
                className="product-card-name"
                onClick={() => setShowEdit(!showEdit)}
              >
                <h5>Earring</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-card">
              <img src={product_4} alt="" className="w-100" />
              <div
                className="product-card-name"
                onClick={() => setShowEdit(!showEdit)}
              >
                <h5>Bracelet</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Section End */}

      {/* Bottom Banner Start */}
      <section className="product-section middle-banner-sec">
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="banner-img">
              <img src={daily_wear} alt="" className="w-100" />
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="h-100 d-flex justify-content-center align-items-center">
              <div className="img-info text-center">
                <h3>Your Daily Dose of Grace</h3>
                <p>Minimal Jewelry Crafted to Add Grace to Every Day</p>
                <button onClick={() => setShowEdit(!showEdit)}>
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="h-100 d-flex justify-content-center align-items-center">
              <div className="img-info text-center">
                <h3>Jewelry as Versatile as You</h3>
                <p>Minimal Jewelry for Every Style, Every Day, Every Moment.</p>
                <button onClick={() => setShowEdit(!showEdit)}>
                  View More
                </button>
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
      {/* Bottom Banner End */}

      {/* Trending Product Section Start */}
      <section className="trending-product">
        <div className="text-center">
          <h2>Trending Products</h2>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div class="product-card" onClick={() => setShowEdit(!showEdit)}>
              <div class="badge">Hot</div>
              <div class="product-tumb">
                <img src={trending_img_1} alt="" className="w-100" />
              </div>
              <div class="product-details">
                <h4>Gold Bracelet</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div class="product-card" onClick={() => setShowEdit(!showEdit)}>
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
            <div class="product-card" onClick={() => setShowEdit(!showEdit)}>
              <div class="badge">Hot</div>
              <div class="product-tumb">
                <img src={trending_img_3} alt="" className="w-100" />
              </div>
              <div class="product-details">
                <h4>Ring</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div class="product-card" onClick={() => setShowEdit(!showEdit)}>
              <div class="badge">Hot</div>
              <div class="product-tumb">
                <img src={trending_img_4} alt="" className="w-100" />
              </div>
              <div class="product-details">
                <h4>Silver Bracelet</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Trending Product Section End */}

      {/* Start-Love Section Start */}
      <section className="love-section product-section">
        <div className="row">
          <div className="col-md-6">
            <div className="h-100 d-flex align-items-center">
              <div className="">
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
      <section className="insta-section">
        <div className="product-text text-center">
          <FaInstagram className="instagram-icon" />
          <h4>impel_store instagram</h4>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-3">
            <div className="insta-image">
              <img src={trending_img_1} alt="" className="w-100" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="insta-image">
              <img src={trending_img_2} alt="" className="w-100" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="insta-image">
              <img src={trending_img_3} alt="" className="w-100" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="insta-image">
              <img src={trending_img_4} alt="" className="w-100" />
            </div>
          </div>
        </div>
      </section>
      {/* Instagram Post Section End */}

      {/* Latest News Section Start */}
      <section className="latest-news">
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.0495103014973!2d72.58762837484393!3d23.021954279174192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85fa6dfce599%3A0x96f7a9db74c08a6b!2sImpel%20Store!5e0!3m2!1sen!2sin!4v1734934977423!5m2!1sen!2sin"
                height="440"
                style={{ border: "0", width: "100%" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div class="form-main">
              <div class="main-wrapper">
                <h2 class="form-head">Contact Form</h2>
                <form
                  class="form-wrapper"
                  ref={formRef}
                  onSubmit={handleSubmit}
                >
                  <div class="form-card">
                    <input
                      class="form-input"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required="required"
                    />
                    <label class="form-label" for="full_name">
                      Full Name
                    </label>
                  </div>

                  <div class="form-card">
                    <input
                      class="form-input"
                      type="email"
                      name="email"
                      id="sender_email"
                      value={form.email}
                      onChange={handleChange}
                      required="required"
                    />
                    <label class="form-label" for="email">
                      Email
                    </label>
                  </div>

                  <div class="form-card">
                    <input
                      class="form-input"
                      type="number"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required="required"
                    />
                    <label class="form-label" for="phone">
                      Phone number
                    </label>
                  </div>
                  <div class="btn-wrap">
                    <button> Submit </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Latest News Section End */}

      {/* Footer Section Start */}
      <section
        className="footer-section"
        style={{ borderTop: "1px solid #000" }}
      >
        <div className="footer_copyright">
          <h2>Copyright © {currentYear} Impel.store</h2>
        </div>
      </section>
      {/* Footer Section End */}

      <Modal
        className=""
        centered
        show={showEdit}
        backdrop="static"
        keyboard={false}
        onHide={() => setShowEdit(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row edit-user-form">
              <Form.Group as={Col} className="mb-2" controlId="formGridState">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  name="name"
                  placeholder="Enter your name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="row edit-user-form">
              <Form.Group as={Col} className="mb-2" controlId="formGridState">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  placeholder="Enter your email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="row edit-user-form">
              <Form.Group as={Col} className="mb-2" controlId="formGridState">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  name="phone"
                  placeholder="Enter phone number"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="text-center mt-2">
              <button className="update_order_btn">Save</button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LandingPage;
