import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import banner_1 from "../assets/images/bg-01.jpeg";
import Ring from "../assets/images/ring.png";
import Kada from "../assets/images/kada.jpg";
import Gold_Ring from "../assets/images/gold_ring.png";
import homeService from "../services/Home";
import { Link } from "react-router-dom";
import gif from "../assets/images/intro.gif";

const Home = () => {
  const [bannerSlider, SetBannerSlider] = useState([]);
  const [category, SetCategory] = useState([]);
  const [newAdd, SetNewAdd] = useState([]);
  const [Featured, SetFeatured] = useState([]);
  const [TopSell, SetTopSell] = useState([]);

  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    banners();
    Category();
    RecentAdd();
    FeaturedProduct();
    HighSell();
    attemptPlay();
  }, []);

  const banners = () => {
    homeService
      .slider()
      .then((res) => {
        SetBannerSlider(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Category = () => {
    homeService
      .category()
      .then((res) => {
        SetCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RecentAdd = () => {
    homeService
      .RecentAdd()
      .then((res) => {
        SetNewAdd(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const FeaturedProduct = () => {
    homeService
      .Featured()
      .then((res) => {
        SetFeatured(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HighSell = () => {
    homeService
      .TopSelling()
      .then((res) => {
        SetTopSell(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* home */}
      <section className="banner">
        <div className="banner_content">
          <div className="banner_detail_iner animate__animated animate__fadeInLeft">
            <h1>TRY TO SOMETHING NEW</h1>
            <p>Because every piece caries a precious story</p>

            <button className="btn btn-outline-warning">Explore More</button>
          </div>
        </div>
        <div className="banner_slide">
          <Swiper
            modules={[Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 2000 }}
          >
            {/* {bannerSlider.map((data,index) => {
              return (
                <SwiperSlide key={index} >
                  <img src={data.image} alt="" />
                </SwiperSlide>
              );
            })} */}
            <SwiperSlide>
              <img src={gif} alt="" />
            </SwiperSlide>
          </Swiper>

          {/* <video  
            playsInline
            loop
            muted
            src={introBanner} 
            ref={videoEl}
            className="w-100" /> */}
        </div>
      </section>

      {/* categories */}
      <section className="more_categories">
        <div className="container">
          <div className="more_categories_detail">
            <h3>Browse our categories</h3>
            <Link
              className="btn text-decoration-none "
              style={{ color: "#000" }}
              to="/categories"
            >
              <u>View All</u>
            </Link>
          </div>
          <div className="more_categories_slide">
            <Swiper
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                992: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                1199: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={50}
              loop={true}
              autoplay={{
                delay: 800,
                disableOnInteraction: false,
              }}
            >
              {category.length ? (
                <>
                  {category.map((data, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Link
                          to={`/categories/${data.id}`}
                          className="text-decoration-none"
                          style={{ color: "#000" }}
                        >
                          <div className="category_box animate__animated animate__fadeInLeft animate__delay-2s">
                            <img
                              src={data.image}
                              className="w-100"
                              alt="item_category"
                            />
                            <div className="category_name">{data.name}</div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </Swiper>
          </div>
        </div>
      </section>

      {/* first banner */}
      <section className="discover_banner">
        <div className="container">
          <div className="banner_info">
            <div className="banner_info_inr">
              <div className="banner_detail text-center">
                <div className="info_img">
                  <img src={Ring} width="100px" alt="" />
                </div>
                <h2>Exquisite Jewelry for Everyone</h2>
                <label></label>
                <p>Discover our awesome rings collection</p>
                <button className="btn discover_btn">
                  Discover The Collection
                </button>
              </div>
            </div>
            <div className="banner_img">
              <img src={banner_1} className="w-100" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="new_arrivals">
        <div className="container">
          <div className="new_arrival_detail">
            <h3>New Arrivals</h3>
          </div>
          <div className="new_arrival_slide">
            <Swiper
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                992: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                1199: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              modules={[Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={20}
              loop={true}
              autoplay={{
                delay: 1200,
                disableOnInteraction: false,
              }}
            >
              {newAdd.length ? (
                <>
                  {newAdd.slice(0, 6).map((data, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Link
                          to={`/shopdetails/${data.id}`}
                          className="text-decoration-none"
                          style={{ color: "#000" }}
                        >
                          <div className="profile-pic">
                            <div className="profile_img">
                              <img src={data.image} alt="" />
                            </div>
                            {/* <div class="edit">
                          <div>
                            <a
                              href="#"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-title="Add to cart"
                            >
                              <BsFillBagPlusFill />
                            </a>
                          </div>
                          <div>
                            <a
                              href="#"
                              data-toggle="tooltip"
                              title="Quick View"
                            >
                              <BsHeart />
                            </a>
                          </div>
                        </div> */}
                            <div className="product_details">
                              <h4>{data.name}</h4>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </Swiper>
          </div>
        </div>
      </section>

      {/* second banner */}
      <section className="explore_banner">
        <div className="container">
          <div className="banner_info">
            <div className="banner_img">
              <img src={Kada} className="w-100" alt="" />
            </div>
            <div className="banner_info_inr">
              <div className="banner_detail text-center">
                <h2>Exquisite Jewelry for Everyone</h2>
                <label></label>
                <p>Discover our awesome rings collection</p>
                <div className="info_img">
                  <img src={Gold_Ring} width="150px" alt="" />
                </div>
                <button className="btn discover_btn">
                  Discover The Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* top_sellers */}
      <section className="Top_sellers">
        <div className="container">
          <div className="seller_header">
            <h3>Top sellers</h3>
          </div>
          <div className="seller_slider">
            <Swiper
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                992: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                1199: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              Navigation={true}
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={10}
              loop={true}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
            >
              {TopSell?.length ? (
                <>
                  {TopSell?.slice(0, 6).map((data, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Link
                          to={`/shopdetails/${data.id}`}
                          className="text-decoration-none"
                          style={{ color: "#000" }}
                        >
                          <div className="profile-pic">
                            <img src={data.image} alt="" />
                            <div className="product_details">
                              <h4>{data.name}</h4>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </Swiper>
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="testimonial">
        <div className="container">
          <div className="testimonial_header">
            <img
              src="https://websitedemos.net/jewellery-store-04/wp-content/uploads/sites/935/2021/08/quotation-mark.png"
              alt=""
              className="w-100"
            />
            <h3>TESTIMONIALS</h3>
          </div>
          <div className="testimonial_slide">
            <Swiper
              modules={[Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
            >
              <SwiperSlide>
                <div className="testimonial_details">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    <br />
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    <br />
                    aliqua veniam...
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonial_details">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    <br />
                    sed do eiusmod tempor incididunt ut labore et dolore <br />
                    magna aliqua veniam...
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="testimonial_details">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    <br />
                    sed do eiusmod tempor incididunt ut labore et dolore <br />
                    magna aliqua veniam...
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* Featured product */}
      {/* <section className="Featured_products">
        <div className="container">
          <div className="Featured_header">
            <h3>Featured Products</h3>
          </div>
          <div className="Featured_slider">
            <Swiper
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                992: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                1199: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
              }}
              spaceBetween={20}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {Featured.slice(0, 6).map((data) => {
                return (
                  <SwiperSlide>
                    <Link
                      to={`/shopdetails/${data.id}`}
                      className="text-decoration-none"
                      style={{ color: "#000" }}
                    >
                      <div className="profile-pic">
                        <img src={data.image} alt="" />
                        <div className="product_details">
                          <h4>{data.name}</h4>
                          <p>Minola Golden Earrings</p>
                          <h5>₹{data.price}</h5>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Home;
