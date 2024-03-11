import React, { useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import FilterServices from "../services/Filter";
import homeService from "../services/Home";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import banner_1 from "../assets/images/bg-01.jpeg";
import Ring from "../assets/images/ring.png";
import Kada from "../assets/images/kada.jpg";
import Gold_Ring from "../assets/images/gold_ring.png";

const Home = () => {
  const firstbannerRef = useRef(null);
  const secondbannerRef = useRef(null);
  const thirdbannerRef = useRef(null);
  const fourthbannerRef = useRef(null);
  const fifthbannerRef = useRef(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let tagIds = searchParams.getAll("tag_id");
  tagIds =
    Array.isArray(tagIds) && tagIds?.length > 0
      ? tagIds[0].split(",")
      : tagIds
      ? tagIds
      : [];
  tagIds = tagIds.map((i) => parseFloat(i));

  const [bannerSlider, SetBannerSlider] = useState([]);
  const [hero, setHero] = useState([]);
  const [category, SetCategory] = useState([]);
  const [newAdd, SetNewAdd] = useState([]);
  // const [Featured, SetFeatured] = useState([]);
  const [TopSell, SetTopSell] = useState([]);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState([]);
  const [review, setReview] = useState("");

  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  const Tags = () => {
    FilterServices.headerTags()
      .then((res) => {
        setTags(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTag = (e) => {
    setTag([...tag, parseFloat(e.target.value)]);
  };

  useLayoutEffect(() => {
    banners();
    Category();
    Tags();
    RecentAdd();
    Reviews();
    // FeaturedProduct();
    HighSell();
    attemptPlay();
  }, []);

  const banners = () => {
    homeService
      .banners()
      .then((res) => {
        SetBannerSlider(res.data);
        setHero(res.data?.top_banners);
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

  const Reviews = () => {
    homeService
      .TestiMonials()
      .then((res) => {
        setReview(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const FeaturedProduct = () => {
  //   homeService
  //     .Featured()
  //     .then((res) => {
  //       SetFeatured(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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

  const Middle_banner_tag =
    bannerSlider &&
    bannerSlider?.middle_banners &&
    bannerSlider?.middle_banners[0].tag_id;

  const Bottom_banner_tag =
    bannerSlider &&
    bannerSlider?.bottom_banners &&
    bannerSlider?.bottom_banners[0].tag_id;

  return (
    <>
      <Helmet>
        <title>Impel Store - Home</title>
      </Helmet>

      {/* First Banner */}
      <section className="banner position-relative">
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade, Navigation]}
          className="mySwiper"
          onSwiper={(swiper) => (firstbannerRef.current = swiper)}
        >
          {hero?.map((image, i) => {
            return (
              <>
                <SwiperSlide key={i}>
                  <Link
                    to={`/shop?tag_id=${
                      tagIds?.includes(image?.tag_id) ? tagIds : image?.tag_id
                    }`}
                    onClick={(e) => handleTag(e)}
                  >
                    <img
                      className="img-fluid"
                      alt=""
                      style={{ backgroundImage: `url(${image?.image})` }}
                    />
                  </Link>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
        <div className="first_banner_button">
          <button
            onClick={() => firstbannerRef?.current?.slidePrev()}
            className="prev-button-swiper"
          >
            <MdKeyboardArrowLeft className="swiper-icon" />
          </button>
          <button
            onClick={() => firstbannerRef?.current?.slideNext()}
            className="next-button-swiper"
          >
            <MdKeyboardArrowRight className="swiper-icon" />
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="more_categories">
        <div className="container">
          <div className="more_categories_detail">
            <h3>Browse our categories</h3>
            <Link
              to="/categories"
              className="custom-btn btn-16 mb-4"
              style={{ textDecoration: "none" }}
            >
              View All
            </Link>
          </div>
          <div className="second_banner_button">
            <button
              onClick={() => secondbannerRef?.current?.slidePrev()}
              className="prev-button-swiper"
            >
              <MdKeyboardArrowLeft className="swiper-icon" />
            </button>
            <button
              onClick={() => secondbannerRef?.current?.slideNext()}
              className="next-button-swiper"
            >
              <MdKeyboardArrowRight className="swiper-icon" />
            </button>
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
                delay: 4000,
                disableOnInteraction: false,
              }}
              onSwiper={(swiper) => (secondbannerRef.current = swiper)}
            >
              {category?.length ? (
                <>
                  {category?.map((data, index) => {
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

      {/* Second Banner */}
      <section className="discover_banner">
        <div className="container">
          <div className="banner_info">
            <div className="banner_info_inr">
              <div className="banner_detail text-center">
                <div className="info_img">
                  <img src={Ring} width="100px" alt="" />
                </div>
                {bannerSlider &&
                bannerSlider?.middle_banners &&
                bannerSlider?.middle_banners[0] ? (
                  <>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: bannerSlider?.middle_banners[0]?.description,
                      }}
                    />
                  </>
                ) : (
                  <>
                    <h2>Exquisite Jewelry for Everyone</h2>
                    <label></label>
                    <p>Discover our awesome rings collection</p>
                    <button className="btn discover_btn">
                      Discover The Collection
                    </button>
                  </>
                )}

                {tags &&
                  tags.length > 0 &&
                  bannerSlider &&
                  bannerSlider?.middle_banners &&
                  bannerSlider?.middle_banners[0] && (
                    <Link
                      to={`/shop?tag_id=${
                        tagIds?.includes(Middle_banner_tag)
                          ? tagIds
                          : Middle_banner_tag
                      }`}
                      onClick={(e) => handleTag(e)}
                      className="btn discover_btn"
                    >
                      Discover The Collection
                    </Link>
                  )}
              </div>
            </div>
            <div className="banner_img">
              {bannerSlider &&
              bannerSlider?.middle_banners &&
              bannerSlider?.middle_banners[0] ? (
                <img
                  src={bannerSlider?.middle_banners[0]?.image}
                  className="w-100"
                  alt=""
                />
              ) : (
                <img src={banner_1} className="w-100" alt="" />
              )}
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
          <Link
            to="/latest-designs"
            className="custom-btn btn-16 mb-4"
            style={{ textDecoration: "none" }}
          >
            View All
          </Link>
          <div className="second_banner_button">
            <button
              onClick={() => thirdbannerRef?.current?.slidePrev()}
              className="prev-button-swiper"
            >
              <MdKeyboardArrowLeft className="swiper-icon" />
            </button>
            <button
              onClick={() => thirdbannerRef?.current?.slideNext()}
              className="next-button-swiper"
            >
              <MdKeyboardArrowRight className="swiper-icon" />
            </button>
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
              modules={[Pagination, Navigation, Scrollbar, A11y, Autoplay]}
              spaceBetween={20}
              loop={true}
              onSwiper={(swiper) => (thirdbannerRef.current = swiper)}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
            >
              {newAdd?.length ? (
                <>
                  {newAdd?.slice(0, 50).map((data, index) => {
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
                            {/* <div className="edit">
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

      {/* Third Banner */}
      <section className="explore_banner">
        <div className="container">
          <div className="banner_info">
            <div className="banner_img">
              {bannerSlider &&
              bannerSlider?.bottom_banners &&
              bannerSlider?.bottom_banners[0] ? (
                <img src={bannerSlider?.bottom_banners[0]?.image} alt="" />
              ) : (
                <img src={Kada} className="w-100" alt="" />
              )}
            </div>
            <div className="banner_info_inr">
              <div className="banner_detail text-center">
                {bannerSlider &&
                bannerSlider?.bottom_banners &&
                bannerSlider?.bottom_banners[0] ? (
                  <>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: bannerSlider?.bottom_banners[0]?.description,
                      }}
                    />
                  </>
                ) : (
                  <>
                    <h2>Exquisite Jewelry for Everyone</h2>
                    <label></label>
                    <p>Discover our awesome rings collection</p>
                    <div className="info_img_1">
                      <img src={Gold_Ring} width="150px" alt="" />
                    </div>
                    <button className="btn discover_btn">
                      Discover The Collection
                    </button>
                  </>
                )}

                {tags &&
                  tags?.length > 0 &&
                  bannerSlider &&
                  bannerSlider?.bottom_banners &&
                  bannerSlider?.bottom_banners[0] && (
                    <Link
                      to={`/shop?tag_id=${
                        tagIds?.includes(Bottom_banner_tag)
                          ? tagIds
                          : Bottom_banner_tag
                      }`}
                      onClick={(e) => handleTag(e)}
                      className="btn discover_btn"
                    >
                      Discover The Collection
                    </Link>
                  )}

                <div className="info_img">
                  <img src={Ring} width="100px" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top_Sellers */}
      <section className="Top_sellers">
        <div className="container">
          <div className="seller_header">
            <h3>Top sellers</h3>
          </div>
          <Link
            to="/top-selling-designs"
            className="custom-btn btn-16 mb-4"
            style={{ textDecoration: "none" }}
          >
            View All
          </Link>
          <div className="second_banner_button">
            <button
              onClick={() => fourthbannerRef?.current?.slidePrev()}
              className="prev-button-swiper"
            >
              <MdKeyboardArrowLeft className="swiper-icon" />
            </button>
            <button
              onClick={() => fourthbannerRef?.current?.slideNext()}
              className="next-button-swiper"
            >
              <MdKeyboardArrowRight className="swiper-icon" />
            </button>
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
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={10}
              loop={true}
              onSwiper={(swiper) => (fourthbannerRef.current = swiper)}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
            >
              {TopSell?.length ? (
                <>
                  {TopSell?.slice(0, 50).map((data, index) => {
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
      {review?.length && (
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
            <div className="second_banner_button">
              <button
                onClick={() => fifthbannerRef?.current?.slidePrev()}
                className="prev-button-swiper"
              >
                <MdKeyboardArrowLeft className="swiper-icon" />
              </button>
              <button
                onClick={() => fifthbannerRef?.current?.slideNext()}
                className="next-button-swiper"
              >
                <MdKeyboardArrowRight className="swiper-icon" />
              </button>
            </div>
            <div className="testimonial_slide">
              <Swiper
                modules={[Pagination, Scrollbar, A11y, Autoplay, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                onSwiper={(swiper) => (fifthbannerRef.current = swiper)}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
              >
                <>
                  {review?.map((data, index) => (
                    <SwiperSlide key={index}>
                      <div className="testimonial_details">
                        <span>
                          <b>{data?.customer}</b>
                        </span>
                        <p>
                          <q>{data?.messsage}</q>
                        </p>
                        <img
                          className="testimonial-image"
                          src={data?.image}
                          alt=""
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </>
              </Swiper>
            </div>
          </div>
        </section>
      )}

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
