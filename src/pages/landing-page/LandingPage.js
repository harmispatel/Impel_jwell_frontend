import React, { useState } from "react";
import "./index.css";
import banner_1 from "./assets/Banner Images/Impel_Landing Page Banners_01.jpg";
import impel_logo from "./assets/jewelery-logo-removebg-preview.png";

import { motion } from "framer-motion";

import product_1 from "./assets/3rd Section/Rings.jpg";
import product_2 from "./assets/3rd Section/Necklace.jpg";
import product_3 from "./assets/3rd Section/Earring.jpg";
import product_4 from "./assets/3rd Section/Bracelet.jpg";

import trending_img_1 from "./assets/Trending Products/Gold Bracelet.jpg";
import trending_img_2 from "./assets/Trending Products/Necklace.jpg";
import trending_img_3 from "./assets/Trending Products/Rings_1.jpg";
import trending_img_4 from "./assets/Trending Products/Silver Bracelet.jpg";

import insta_1 from "./assets/insta_1.jpg";
import insta_2 from "./assets/insta_2.jpg";
import insta_3 from "./assets/insta_3.jpg";
import insta_4 from "./assets/insta_4.jpg";

import love_img from "./assets/silver ring for women.jpg";
import daily_wear from "./assets/daily wear necklace for women.jpg";
import modern_bracelet from "./assets/Bracelet_3.jpg";
import { FaBars, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import emailjs from "@emailjs/browser";

import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { Button, FormFeedback, Input, Label } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";

const LandingPage = () => {
  const currentYear = new Date().getFullYear();
  const [showEdit, setShowEdit] = useState(false);
  const [loader, setLoader] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Must be a valid Email")
        .max(255)
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
    }),
    onSubmit: (values) => {
      setLoader(true);
      emailjs
        .send(
          "service_cd8i9z8",
          "template_4lhpngl",
          {
            to_name: "Impel store",
            to_email: "dharika@brightimpressions.in",
            from_name: values.fullName,
            from_email: values.email,
            from_phone: values.phone,
          },
          "gNvP3pb_uObggad1C"
        )
        .then(
          () => {
            toast.success(
              "Thank you. I will get back to you as soon as possible."
            );
            setLoader(false);
            formik.resetForm();
            setShowEdit(false);
          },
          (error) => {
            console.log(error);
            setLoader(false);
          }
        );
    },
  });

  return (
    <>
      <Helmet>
        <title>Jewelry for Women - Minimalist Jewelry Collection | Impel</title>
        <meta
          name="description"
          content="Impel is a jewelry store in Ahmedabad offering minimalist and daily wear jewelry for women. Explore trendy jewelry collection which will be used in routine activities."
        />
        <meta
          name="keywords"
          content="jewelry, women jewelry, necklaces, earrings, bracelets, rings, Impel Store"
        />
        <meta name="author" content="Impel Store" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />

        <link rel="canonical" href="https://impel.store/jewelery-for-women/" />

        <meta
          name="google-site-verification"
          content="CgblWcrjk3yRwUDKib-eUlvbCW8E9gLmaEclP3t4h5Y"
        />

        <link rel="icon" href="%PUBLIC_URL%/IMPEL-FAV.png" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/IMPEL-FAV.png" />
      </Helmet>

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
            <Link to="/jewelery-for-women">
              <img
                src={impel_logo}
                alt="logo"
                className="impel-jewel-logo"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              />
            </Link>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-2 mb-lg-0 w-100">
                <li className="nav-link-name">
                  <Link
                    aria-current="page"
                    className="nav-link"
                    to="/jewelery-for-women"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-link-name">
                  <a href="#about-us" className="nav-link">
                    About
                  </a>
                </li>
                <li className="nav-link-name">
                  <a href="#trending-products" className="nav-link">
                    Product
                  </a>
                </li>
                <li className="nav-link-name">
                  <a href="#location" className="nav-link">
                    Location
                  </a>
                </li>
                <li className="nav-link-name">
                  <a href="#contact-us" className="nav-link">
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <Link
                    aria-current="page"
                    to="tel:8799619939"
                    className="nav-link"
                  >
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
                    class="inquire-btn"
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
      <section id="home">
        <motion.img
          className="w-100"
          src={banner_1}
          alt="First_image"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
      </section>
      {/* Banner Section End */}

      {/* Product Section Start */}
      <section className="product-section" id="about-us">
        <motion.div
          className="row justify-content-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="product-text product-info-text-name text-center">
            <h1>IMPEL JEWELRY</h1>
          </div>
        </motion.div>

        <motion.div
          className="row justify-content-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
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
        </motion.div>

        <div className="row mt-1">
          {[
            { src: product_1, title: "Rings" },
            { src: product_2, title: "Necklace" },
            { src: product_3, title: "Earring" },
            { src: product_4, title: "Bracelet" },
          ].map((product, index) => (
            <motion.div
              className="col-md-3"
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }} // Staggered animations
            >
              <div className="product-card">
                <img src={product.src} alt="" className="w-100" />
                <div
                  className="product-card-name"
                  onClick={() => setShowEdit(!showEdit)}
                >
                  <h5>{product.title}</h5>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Product Section End */}

      {/* Bottom Banner Start */}
      <section className="product-section middle-banner-sec">
        <motion.div
          className="row mb-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="col-md-6">
            <motion.div
              className="banner-img"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img src={daily_wear} alt="" className="w-100" />
            </motion.div>
          </div>
          <div className="col-md-6">
            <motion.div
              className="h-100 d-flex justify-content-center align-items-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="img-info text-center">
                <h3>Your Daily Dose of Grace</h3>
                <p>Minimal Jewelry Crafted to Add Grace to Every Day</p>
                <button onClick={() => setShowEdit(!showEdit)}>
                  View More
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="row"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="col-md-6">
            <motion.div
              className="h-100 d-flex justify-content-center align-items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="img-info text-center">
                <h3>Jewelry as Versatile as You</h3>
                <p>Minimal Jewelry for Every Style, Every Day, Every Moment.</p>
                <button onClick={() => setShowEdit(!showEdit)}>
                  View More
                </button>
              </div>
            </motion.div>
          </div>
          <div className="col-md-6">
            <motion.div
              className="banner-img"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={modern_bracelet} alt="" className="w-100" />
            </motion.div>
          </div>
        </motion.div>
      </section>
      {/* Bottom Banner End */}

      {/* Trending Product Section Start */}
      <section className="trending-product" id="trending-products">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Trending Products</h2>
        </motion.div>

        <motion.div
          className="row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="col-md-3">
            <motion.div
              className="product-card"
              onClick={() => setShowEdit(!showEdit)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="badge">Hot</div>
              <div className="product-tumb">
                <img src={trending_img_1} alt="" className="w-100" />
              </div>
              <div className="product-details">
                <h4>Gold Bracelet</h4>
              </div>
            </motion.div>
          </div>

          <div className="col-md-3">
            <motion.div
              className="product-card"
              onClick={() => setShowEdit(!showEdit)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="badge">Hot</div>
              <div className="product-tumb">
                <img src={trending_img_2} alt="" className="w-100" />
              </div>
              <div className="product-details">
                <h4>Necklace</h4>
              </div>
            </motion.div>
          </div>

          <div className="col-md-3">
            <motion.div
              className="product-card"
              onClick={() => setShowEdit(!showEdit)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="badge">Hot</div>
              <div className="product-tumb">
                <img src={trending_img_3} alt="" className="w-100" />
              </div>
              <div className="product-details">
                <h4>Ring</h4>
              </div>
            </motion.div>
          </div>

          <div className="col-md-3">
            <motion.div
              className="product-card"
              onClick={() => setShowEdit(!showEdit)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="badge">Hot</div>
              <div className="product-tumb">
                <img src={trending_img_4} alt="" className="w-100" />
              </div>
              <div className="product-details">
                <h4>Silver Bracelet</h4>
              </div>
            </motion.div>
          </div>
        </motion.div>
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
      {/* <section className="insta-section">
        <motion.div
          className="product-text text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaInstagram className="instagram-icon" />
          <h4>impel_store instagram</h4>
        </motion.div>

        <motion.div
          className="row justify-content-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="col-md-3">
            <motion.div
              className="insta-image"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img src={insta_1} alt="" className="w-100" />
            </motion.div>
          </div>

          <div className="col-md-3">
            <motion.div
              className="insta-image"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <img src={insta_2} alt="" className="w-100" />
            </motion.div>
          </div>

          <div className="col-md-3">
            <motion.div
              className="insta-image"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <img src={insta_3} alt="" className="w-100" />
            </motion.div>
          </div>

          <div className="col-md-3">
            <motion.div
              className="insta-image"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <img src={insta_4} alt="" className="w-100" />
            </motion.div>
          </div>
        </motion.div>
      </section> */}
      {/* Instagram Post Section End */}

      {/* Latest News Section Start */}
      <section id="location" className="latest-news">
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.0495103014973!2d72.58762837484393!3d23.021954279174192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85fa6dfce599%3A0x96f7a9db74c08a6b!2sImpel%20Store!5e0!3m2!1sen!2sin!4v1734934977423!5m2!1sen!2sin"
                height="480"
                style={{ border: "0", width: "100%" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="col-md-4 col-12" id="contact-us">
            <div class="form-main">
              <div class="main-wrapper">
                <h2 class="form-head">Contact Form</h2>
                <form class="form-wrapper-main" onSubmit={formik.handleSubmit}>
                  <div className="mb-4 position-relative">
                    <Label className="form-label">Full Name</Label>
                    <Input
                      name="fullName"
                      type="text"
                      className="custom-input"
                      placeholder="Enter your name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fullName || ""}
                      invalid={
                        formik.touched.fullName && formik.errors.fullName
                          ? true
                          : false
                      }
                    />
                    {formik.touched.fullName && formik.errors.fullName ? (
                      <FormFeedback
                        type="invalid"
                        className="position-absolute"
                      >
                        {formik.errors.fullName}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-4 position-relative">
                    <Label className="form-label">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      className="custom-input"
                      placeholder="Enter your email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email || ""}
                      invalid={
                        formik.touched.email && formik.errors.email
                          ? true
                          : false
                      }
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <FormFeedback
                        type="invalid"
                        className="position-absolute"
                      >
                        {formik.errors.email}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-5 position-relative">
                    <Label className="form-label">Phone</Label>
                    <Input
                      name="phone"
                      className="custom-input"
                      type="number"
                      placeholder="Enter your phone number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone || ""}
                      invalid={
                        formik.touched.phone && formik.errors.phone
                          ? true
                          : false
                      }
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <FormFeedback
                        type="invalid"
                        className="position-absolute"
                      >
                        {formik.errors.phone}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="text-center">
                    <Button
                      type="submit"
                      color="primary"
                      className="submit-button"
                    >
                      {loader ? "Submit.." : "Submit"}
                    </Button>
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
        onHide={() => {
          setShowEdit(false);
          formik.resetForm();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Inquire Now</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form class="form-wrapper-main" onSubmit={formik.handleSubmit}>
            <div className="mb-4 position-relative">
              <Label className="form-label">Full Name</Label>
              <Input
                name="fullName"
                type="text"
                className="custom-input"
                placeholder="Enter your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName || ""}
                invalid={
                  formik.touched.fullName && formik.errors.fullName
                    ? true
                    : false
                }
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <FormFeedback type="invalid" className="position-absolute">
                  {formik.errors.fullName}
                </FormFeedback>
              ) : null}
            </div>
            <div className="mb-4 position-relative">
              <Label className="form-label">Email</Label>
              <Input
                name="email"
                type="email"
                className="custom-input"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email || ""}
                invalid={
                  formik.touched.email && formik.errors.email ? true : false
                }
              />
              {formik.touched.email && formik.errors.email ? (
                <FormFeedback type="invalid" className="position-absolute">
                  {formik.errors.email}
                </FormFeedback>
              ) : null}
            </div>
            <div className="mb-5 position-relative">
              <Label className="form-label">Phone</Label>
              <Input
                name="phone"
                className="custom-input"
                type="number"
                placeholder="Enter your phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone || ""}
                invalid={
                  formik.touched.phone && formik.errors.phone ? true : false
                }
              />
              {formik.touched.phone && formik.errors.phone ? (
                <FormFeedback type="invalid" className="position-absolute">
                  {formik.errors.phone}
                </FormFeedback>
              ) : null}
            </div>
            <div className="text-center">
              <Button type="submit" color="primary" className="submit-button">
                {loader ? "Submit.." : "Submit"}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LandingPage;
