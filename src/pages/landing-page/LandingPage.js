import React from "react";
import "./index.css";
import bottom_banner from "./assets/bottom-banner.png";

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
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  About
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Product
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Product Section Start */}

      <section className="product-section">
        <div className="row justify-content-center">
          <div className="product-text text-center">
            <h5>IMPEL JEWELRY</h5>
          </div>
          <div className="col-md-6">
            <div className="text-center">
              <h4>
                Lorem ipsum dolor sit amet consectetur adipiscing elit accumsan
                per feugiat auctor tortor fringilla lectus, ligula habitant nunc
                quis ultricies tristique.
              </h4>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-3">
            <div className="product-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcLqhoKWDjExZQ6I9xOh0yNg-miRWWNf2c8A&s"
                alt=""
                className="w-100"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcLqhoKWDjExZQ6I9xOh0yNg-miRWWNf2c8A&s"
                alt=""
                className="w-100"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcLqhoKWDjExZQ6I9xOh0yNg-miRWWNf2c8A&s"
                alt=""
                className="w-100"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="product-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcLqhoKWDjExZQ6I9xOh0yNg-miRWWNf2c8A&s"
                alt=""
                className="w-100"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Product Section End */}

      {/* Bottom Banner Start */}
      <section className="product-section mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="banner-img">
              <img
                src="https://static.toiimg.com/thumb/msid-100766424,width-1280,height-720,resizemode-4/100766424.jpg"
                alt=""
                className="w-100"
              />
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="h-100 d-flex justify-content-center align-items-center">
              <div className="img-info text-center">
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing</p>
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
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing</p>
                <button>See Now</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="banner-img">
              <img
                src="https://static.toiimg.com/thumb/msid-100766424,width-1280,height-720,resizemode-4/100766424.jpg"
                alt=""
                className="w-100"
              />
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
                <img src="https://i.imgur.com/xdbHo4E.png" alt="" />
              </div>
              <div class="product-details">
                <span class="product-catagory">Women,bag</span>
                <h4>
                  <a href="">Women leather bag</a>
                </h4>
                <p>₹ 100</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div class="product-card">
              <div class="badge">Hot</div>
              <div class="product-tumb">
                <img src="https://i.imgur.com/xdbHo4E.png" alt="" />
              </div>
              <div class="product-details">
                <span class="product-catagory">Women,bag</span>
                <h4>
                  <a href="">Women leather bag</a>
                </h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Vero, possimus nostrum!
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div class="product-card">
              <div class="badge">Hot</div>
              <div class="product-tumb">
                <img src="https://i.imgur.com/xdbHo4E.png" alt="" />
              </div>
              <div class="product-details">
                <span class="product-catagory">Women,bag</span>
                <h4>
                  <a href="">Women leather bag</a>
                </h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Vero, possimus nostrum!
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div class="product-card">
              <div class="badge">Hot</div>
              <div class="product-tumb">
                <img src="https://i.imgur.com/xdbHo4E.png" alt="" />
              </div>
              <div class="product-details">
                <span class="product-catagory">Women,bag</span>
                <h4>
                  <a href="">Women leather bag</a>
                </h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Vero, possimus nostrum!
                </p>
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
                <h3>It started with love</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit felis
                  faucibus, parturient fermentum elementum erat litora habitasse
                  eget conubia leo, vel scelerisque montes fames dapibus
                  praesent cubilia ridiculus.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit felis
                  faucibus, parturient fermentum elementum erat litora habitasse
                  eget conubia leo, vel scelerisque montes fames dapibus
                  praesent cubilia ridiculus.
                </p>
                <button>See Now</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="banner-img">
              <img src={bottom_banner} alt="" className="w-100" />
            </div>
          </div>
        </div>
      </section>
      {/* Start-Love Section End */}

      {/* Latest News Section Start */}
      <section className="latest-news">
        <div className="row">
          <div className="newsletter text-center">
            <h3>Latest From Impel!</h3>
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
