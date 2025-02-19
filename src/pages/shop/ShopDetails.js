import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../components/common/BreadCrumb";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import { BsCartDash, BsHandbagFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { WishlistSystem } from "../../context/WishListContext";
import UserCartService from "../../services/Cart";
import Userservice from "../../services/Auth";
import productDetail from "../../services/Shop";
import { CartSystem } from "../../context/CartContext";
import { Accordion } from "react-bootstrap";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeftLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ShopDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { dispatch: wishlistDispatch } = useContext(WishlistSystem);
  const { dispatch: removeWishlistDispatch } = useContext(WishlistSystem);
  const { dispatch: addtocartDispatch } = useContext(CartSystem);

  const { id } = useParams();
  const Dealer = localStorage.getItem("email");
  const Phone = localStorage.getItem("phone");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [UserWishlistItems, setUserWishlistItems] = useState([]);
  const [goldColor, setGoldColor] = useState("yellow_gold");
  const [goldType, setGoldType] = useState("18k");
  const [spinner, setSpinner] = useState(false);
  const [spinner2, setSpinner2] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(true);

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product_detail", id],
    queryFn: () =>
      productDetail.product_detail({
        id: id,
      }),
    keepPreviousData: true,
    onError: (err) => {
      console.log("Error fetching products details:", err);
    },
  });

  const product = data?.data || [];
  const img = data?.data?.image || "";
  const productImages = data?.data?.multiple_image;

  const GetUserCartList = async () => {
    UserCartService.CartList({ phone: Phone })
      .then((res) => {
        setCartItems(res.data.cart_items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetUserWishList = async () => {
    Userservice.userWishlist({ phone: Phone })
      .then((res) => {
        setUserWishlistItems(res?.data?.wishlist_items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetUserCartList();
    GetUserWishList();
  }, []);

  const addToUserWishList = async (product) => {
    setSpinner2(true);
    const payload = { id: product?.id };
    Userservice.addtoWishlist({
      phone: localStorage.getItem("phone"),
      design_id: product?.id,
      quantity: 1,
      gold_color: goldColor,
      gold_type: goldType,
      design_name: product?.name,
    })
      .then((res) => {
        if (res.success === true) {
          GetUserWishList();
          wishlistDispatch({
            type: "ADD_TO_WISHLIST",
            payload,
          });
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSpinner2(false);
      });
  };

  const handleAddToCart = (product) => {
    setSpinner(true);
    const payload = { id: product?.id };
    const CartData = {
      phone: Phone,
      design_name: product?.name,
      design_id: product?.id,
      quantity: 1,
      gold_color: goldColor,
      gold_type: goldType,
    };

    const isItemInWishlist = UserWishlistItems.some(
      (wishlistItem) =>
        wishlistItem.id === product?.id &&
        wishlistItem.goldType === product?.goldType &&
        wishlistItem.goldColor === product?.goldColor
    );

    UserCartService.AddtoCart(CartData)
      .then((res) => {
        if (res.status === true) {
          GetUserCartList();
          addtocartDispatch({
            type: "ADD_TO_CART",
            payload,
          });
          if (isItemInWishlist) {
            removeWishlistDispatch({
              type: "REMOVE_FROM_WISHLIST",
              payload,
            });
          }
          toast.success(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSpinner(false);
      });
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (step) => {
    const newIndex =
      (currentImageIndex + step + productImages?.length) %
      productImages?.length;
    setCurrentImageIndex(newIndex);
  };

  const handleGoldColor = (goldType) => {
    setGoldColor(goldType);
    setGoldType("18k");
  };

  const handleGoldType = (event) => {
    setGoldType(event.target.id);
  };

  const productdetail = {
    // details for 22k gold
    gross_weight_22k: product?.gross_weight_22k?.toFixed(3),
    less_gems_stone: product?.less_gems_stone?.toFixed(2),
    less_cz_stone: product?.less_cz_stone?.toFixed(2),
    net_weight_22k: product?.net_weight_22k?.toFixed(3),
    cz_stone_price: product?.cz_stone_price?.toFixed(2),
    gemstone_price: product?.gemstone_price?.toFixed(2),

    // details for 20k gold
    gross_weight_20k: product?.gross_weight_20k?.toFixed(3),
    less_gems_stone: product?.less_gems_stone?.toFixed(2),
    less_cz_stone: product?.less_cz_stone?.toFixed(2),
    net_weight_20k: product?.net_weight_20k?.toFixed(3),
    cz_stone_price: product?.cz_stone_price?.toFixed(2),
    gemstone_price: product?.gemstone_price?.toFixed(2),

    // details for 18k gold`
    gross_weight_18k: product?.gross_weight_18k?.toFixed(3),
    less_gems_stone: product?.less_gems_stone?.toFixed(2),
    less_cz_stone: product?.less_cz_stone?.toFixed(2),
    net_weight_18k: product?.net_weight_18k?.toFixed(3),
    cz_stone_price: product?.cz_stone_price?.toFixed(2),
    gemstone_price: product?.gemstone_price?.toFixed(2),

    // details for 14k gold
    gross_weight_14k: product?.gross_weight_14k?.toFixed(3),
    less_gems_stone: product?.less_gems_stone?.toFixed(2),
    less_cz_stone: product?.less_cz_stone?.toFixed(2),
    net_weight_14k: product?.net_weight_14k?.toFixed(3),
    cz_stone_price: product?.cz_stone_price?.toFixed(2),
    gemstone_price: product?.gemstone_price?.toFixed(2),
  };

  const UserLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("redirectPath", location.pathname);
    navigate("/login");
  };

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN")?.format(Math?.round(value));

  return (
    <>
      <Helmet>
        <title>
          Impel Store - &nbsp;
          {product && product.name && product.code
            ? `${product.name} (${product.code})`
            : ""}
        </title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <section className="shop_details">
        <div className="container">
          <div className="Shop_product">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="breadcumb-section-btn mb-4">
                  <BreadCrumb
                    firstName="Home"
                    secondName="Shop"
                    thirdName="Shopdetails"
                  />
                  <button
                    className="btn btn-outline-dark d-flex align-items-center text-center"
                    onClick={() => navigate(-1)}
                  >
                    <FaArrowLeftLong />
                  </button>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    {isLoading ? (
                      <>
                        <Skeleton style={{ height: "526px" }} width="100%" />
                      </>
                    ) : isError ? (
                      <div>Error: {error?.message}</div>
                    ) : (
                      <>
                        <div>
                          {productImages?.length === 0 ? (
                            <div id="imageMagnifyer">
                              <motion.img
                                src={img}
                                alt=""
                                className="w-100"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                          ) : (
                            <div className="detalis_slider">
                              <Carousel
                                infiniteLoop
                                useKeyboardArrows
                                autoPlay
                                interval={3000}
                              >
                                {productImages?.map((image, index) => (
                                  <div
                                    key={index}
                                    onClick={() => openLightbox(index)}
                                  >
                                    <motion.img
                                      src={image}
                                      alt=""
                                      className="w-100"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ duration: 0.5 }}
                                    />
                                  </div>
                                ))}
                              </Carousel>

                              {lightboxOpen && (
                                <div className="custom-lightbox">
                                  <div className="custom_lightbox_inr">
                                    <span
                                      className="close-button"
                                      onClick={closeLightbox}
                                    >
                                      <RxCross1 />
                                    </span>
                                    <motion.img
                                      src={productImages[currentImageIndex]}
                                      alt=""
                                      className="w-50"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ duration: 0.5 }}
                                    />
                                    <div className="lightbox-navigation">
                                      <button
                                        onClick={() => navigateLightbox(-1)}
                                        className="prev-button-swiper ms-2"
                                      >
                                        <MdKeyboardArrowLeft className="swiper-icon" />
                                      </button>
                                      <button
                                        onClick={() => navigateLightbox(1)}
                                        className="next-button-swiper me-2"
                                      >
                                        <MdKeyboardArrowRight className="swiper-icon" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="col-md-6 product-details-content">
                    {isLoading ? (
                      <>
                        <Skeleton height={30} width="60%" />
                        <Skeleton height={20} width="40%" className="my-2" />
                        <Skeleton height={20} width="50%" className="my-2" />
                        <Skeleton height={20} width="70%" className="my-2" />
                        <Skeleton height={150} width="100%" className="mt-3" />
                        <Skeleton height={30} width="100%" className="mt-3" />
                      </>
                    ) : (
                      <>
                        <div>
                          <h3>{product?.name}</h3>
                          <h5 className="mb-3">
                            Design code : <strong>{product?.code}</strong>
                          </h5>
                          {product?.description && (
                            <p>{product?.description}</p>
                          )}

                          <div>
                            <div>
                              <button
                                className={`yellow-gold ${
                                  goldColor === "yellow_gold" ? "active" : ""
                                }`}
                                onClick={() => handleGoldColor("yellow_gold")}
                              >
                                Yellow Gold
                              </button>
                              <button
                                className={`rose-gold  mx-3 ${
                                  goldColor === "rose_gold" ? "active" : ""
                                }`}
                                onClick={() => handleGoldColor("rose_gold")}
                              >
                                Rose Gold
                              </button>
                              <button
                                className={`white-gold  mt-md-0 mt-3 ${
                                  goldColor === "white_gold" ? "active" : ""
                                }`}
                                onClick={() => handleGoldColor("white_gold")}
                              >
                                White Gold
                              </button>
                            </div>
                            <div className="mt-3">
                              {goldColor === "yellow_gold" && (
                                <>
                                  <div className="crt-btn">
                                    <div className="radio-item">
                                      <input
                                        name="radio1"
                                        id="22k"
                                        type="radio"
                                        checked={goldType === "22k"}
                                        onChange={handleGoldType}
                                      />
                                      <label htmlFor="22k">22K</label>
                                    </div>
                                    <div className="radio-item">
                                      <input
                                        name="radio1"
                                        id="20k"
                                        type="radio"
                                        checked={goldType === "20k"}
                                        onChange={handleGoldType}
                                      />
                                      <label htmlFor="20k">20K</label>
                                    </div>
                                    <div className="radio-item">
                                      <input
                                        name="radio1"
                                        id="18k"
                                        type="radio"
                                        defaultChecked={goldType === "18k"}
                                        onChange={handleGoldType}
                                      />
                                      <label htmlFor="18k">18K</label>
                                    </div>
                                    <div className="radio-item">
                                      <input
                                        name="radio1"
                                        id="14k"
                                        type="radio"
                                        checked={goldType === "14k"}
                                        onChange={handleGoldType}
                                      />
                                      <label htmlFor="14k">14K</label>
                                    </div>
                                  </div>
                                </>
                              )}
                              {goldColor === "rose_gold" && (
                                <>
                                  <div className="d-flex">
                                    <div className="radio-item">
                                      <input
                                        name="radio1"
                                        id="18k"
                                        type="radio"
                                        defaultChecked={goldType === "18k"}
                                        onChange={handleGoldType}
                                      />
                                      <label htmlFor="18k">18K</label>
                                    </div>
                                    <div className="radio-item ms-3">
                                      <input
                                        name="radio1"
                                        id="14k"
                                        type="radio"
                                        checked={goldType === "14k"}
                                        onChange={handleGoldType}
                                      />
                                      <label htmlFor="14k">14K</label>
                                    </div>
                                  </div>
                                </>
                              )}
                              {goldColor === "white_gold" && (
                                <>
                                  <div className="d-flex ">
                                    <div className="radio-item">
                                      <input
                                        name="radio1"
                                        id="18k"
                                        type="radio"
                                        defaultChecked={goldType === "18k"}
                                        onChange={handleGoldType}
                                      />
                                      <label htmlFor="18k">18K</label>
                                    </div>
                                    <div className="radio-item ms-3">
                                      <input
                                        name="radio1"
                                        id="14k"
                                        type="radio"
                                        checked={goldType === "14k"}
                                        onChange={handleGoldType}
                                      />
                                      <label htmlFor="14k">14K</label>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="mt-3">
                              <Accordion className="accordian">
                                <Accordion.Item eventKey="3" className="my-2">
                                  <Accordion.Header onClick={toggleAccordion}>
                                    Approximate - Estimate
                                  </Accordion.Header>
                                  <Accordion.Body className="p-0">
                                    <div>
                                      {goldColor && goldType && (
                                        <>
                                          <table className="table table-bordered mb-0">
                                            <tbody>
                                              {goldType === "22k" && (
                                                <>
                                                  <tr>
                                                    <th>Gross Weight</th>
                                                    <td>
                                                      {
                                                        productdetail?.gross_weight_22k
                                                      }
                                                      g. (Approx.)
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th>Net Weight</th>
                                                    <td>
                                                      {
                                                        productdetail?.net_weight_22k
                                                      }
                                                      g. (Approx.)
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th>Metal value</th>
                                                    <td>
                                                      ₹
                                                      {numberFormat(
                                                        product?.metal_value_22k
                                                      )}
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th>Making charge</th>
                                                    <td>
                                                      ₹
                                                      {product?.making_charge_discount_22k >
                                                      0 ? (
                                                        <>
                                                          <del>
                                                            {numberFormat(
                                                              product?.making_charge_22k
                                                            )}
                                                          </del>
                                                          &nbsp; (
                                                          {
                                                            product?.sales_westage_discount
                                                          }
                                                          % Off) &nbsp;
                                                          <strong>
                                                            ₹
                                                            {numberFormat(
                                                              product?.making_charge_discount_22k
                                                            )}
                                                          </strong>
                                                        </>
                                                      ) : (
                                                        <>
                                                          <strong>
                                                            ₹
                                                            {numberFormat(
                                                              product?.making_charge_22k
                                                            )}
                                                          </strong>
                                                        </>
                                                      )}
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th>Total Amount</th>
                                                    <td>
                                                      <strong className="text-success">
                                                        ₹
                                                        {numberFormat(
                                                          product?.total_amount_22k
                                                        )}
                                                        &nbsp; (Approx.)
                                                      </strong>
                                                    </td>
                                                  </tr>
                                                </>
                                              )}
                                              {goldType === "20k" && (
                                                <>
                                                  <tr>
                                                    <th>Gross Weight</th>
                                                    <td>
                                                      {
                                                        productdetail?.gross_weight_20k
                                                      }
                                                      g. (Approx.)
                                                    </td>
                                                  </tr>
                                                  {/* <tr>
                                            <th>Less Gems Stone</th>
                                            <td>
                                              {productdetail?.less_gems_stone}
                                              g.
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Less C.Z. Stone</th>
                                            <td>
                                              {productdetail?.less_cz_stone}
                                              g.
                                            </td>
                                          </tr> */}
                                                  <tr>
                                                    <th>Net Weight</th>
                                                    <td>
                                                      {
                                                        productdetail?.net_weight_20k
                                                      }
                                                      g.
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th>Metal value</th>
                                                    <td>
                                                      ₹
                                                      {numberFormat(
                                                        product?.metal_value_20k
                                                      )}
                                                    </td>
                                                  </tr>
                                                  {/* <tr>
                                            <th>CZ Stone Charges</th>
                                            <td>
                                              ₹{productdetail?.cz_stone_price}
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Gem stone charges</th>
                                            <td>
                                              ₹{productdetail?.gemstone_price}
                                            </td>
                                          </tr> */}
                                                  <tr>
                                                    <th>Making charge</th>
                                                    <td>
                                                      ₹
                                                      {product?.making_charge_discount_20k >
                                                      0 ? (
                                                        <>
                                                          <del>
                                                            {numberFormat(
                                                              product?.making_charge_20k
                                                            )}
                                                          </del>
                                                          &nbsp; (
                                                          {
                                                            product?.sales_westage_discount
                                                          }
                                                          % Off) &nbsp;{" "}
                                                          <strong>
                                                            ₹
                                                            {numberFormat(
                                                              product?.making_charge_discount_20k
                                                            )}
                                                          </strong>
                                                        </>
                                                      ) : (
                                                        <>
                                                          <strong>
                                                            {" "}
                                                            {numberFormat(
                                                              product?.making_charge_20k
                                                            )}
                                                          </strong>
                                                        </>
                                                      )}
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th>Total Amount</th>
                                                    <td>
                                                      <strong className="text-success">
                                                        ₹
                                                        {numberFormat(
                                                          product?.total_amount_20k
                                                        )}
                                                        &nbsp; (Approx.)
                                                      </strong>
                                                    </td>
                                                  </tr>
                                                </>
                                              )}
                                              {goldType === "18k" && (
                                                <>
                                                  <tr>
                                                    <th>Gross Weight</th>
                                                    <td>
                                                      {
                                                        productdetail?.gross_weight_18k
                                                      }
                                                      g. (Approx.)
                                                    </td>
                                                  </tr>
                                                  {/* <tr>
                                            <th>Less Gems Stone</th>
                                            <td>
                                              {productdetail?.less_gems_stone}
                                              g.
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Less C.Z. Stone</th>
                                            <td>
                                              {productdetail?.less_cz_stone}
                                              g.
                                            </td>
                                          </tr> */}
                                                  <tr>
                                                    <th>Net Weight</th>
                                                    <td>
                                                      {
                                                        productdetail?.net_weight_18k
                                                      }
                                                      g.
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th>Metal value</th>
                                                    <td>
                                                      ₹
                                                      {numberFormat(
                                                        product?.metal_value_18k
                                                      )}
                                                    </td>
                                                  </tr>
                                                  {/* <tr>
                                            <th>CZ Stone Charges</th>
                                            <td>
                                              ₹{productdetail?.cz_stone_price}
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Gem stone charges</th>
                                            <td>
                                              ₹{productdetail?.gemstone_price}
                                            </td>
                                          </tr> */}
                                                  <tr>
                                                    <th>Making charge</th>
                                                    <td>
                                                      ₹
                                                      {product?.making_charge_discount_18k >
                                                      0 ? (
                                                        <>
                                                          <del>
                                                            {numberFormat(
                                                              product?.making_charge_18k
                                                            )}
                                                          </del>
                                                          &nbsp; (
                                                          {
                                                            product?.sales_westage_discount
                                                          }
                                                          % Off) &nbsp;{" "}
                                                          <strong>
                                                            ₹
                                                            {numberFormat(
                                                              product?.making_charge_discount_18k
                                                            )}
                                                          </strong>
                                                        </>
                                                      ) : (
                                                        <>
                                                          <strong>
                                                            {numberFormat(
                                                              product?.making_charge_18k
                                                            )}
                                                          </strong>
                                                        </>
                                                      )}
                                                    </td>
                                                  </tr>

                                                  <tr>
                                                    <th>Total Amount</th>
                                                    <td>
                                                      <strong className="text-success">
                                                        ₹
                                                        {numberFormat(
                                                          product?.total_amount_18k
                                                        )}
                                                        &nbsp; (Approx.)
                                                      </strong>
                                                    </td>
                                                  </tr>
                                                </>
                                              )}
                                              {goldType === "14k" && (
                                                <>
                                                  <tr>
                                                    <th>Gross Weight</th>
                                                    <td>
                                                      {
                                                        productdetail?.gross_weight_14k
                                                      }
                                                      g. (Approx.)
                                                    </td>
                                                  </tr>
                                                  {/* <tr>
                                            <th>Less Gems Stone</th>
                                            <td>
                                              {productdetail?.less_gems_stone}
                                              g.
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Less C.Z. Stone</th>
                                            <td>
                                              {productdetail?.less_cz_stone}
                                              g.
                                            </td>
                                          </tr> */}
                                                  <tr>
                                                    <th>Net Weight</th>
                                                    <td>
                                                      {
                                                        productdetail?.net_weight_14k
                                                      }
                                                      g.
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th>Metal value</th>
                                                    <td>
                                                      {numberFormat(
                                                        product?.metal_value_14k
                                                      )}
                                                    </td>
                                                  </tr>
                                                  {/* <tr>
                                            <th>CZ Stone Charges</th>
                                            <td>
                                              ₹{productdetail?.cz_stone_price}
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Gem stone charges</th>
                                            <td>
                                              ₹{productdetail?.gemstone_price}
                                            </td>
                                          </tr> */}
                                                  <tr>
                                                    <th>Making charge</th>
                                                    <td>
                                                      ₹
                                                      {product?.making_charge_discount_14k >
                                                      0 ? (
                                                        <>
                                                          <del>
                                                            {numberFormat(
                                                              product?.making_charge_14k
                                                            )}
                                                          </del>
                                                          &nbsp; (
                                                          {numberFormat(
                                                            product?.sales_westage_discount
                                                          )}
                                                          % Off) &nbsp;{" "}
                                                          <strong>
                                                            ₹
                                                            {numberFormat(
                                                              product?.making_charge_discount_14k
                                                            )}
                                                          </strong>
                                                        </>
                                                      ) : (
                                                        <>
                                                          <strong>
                                                            {numberFormat(
                                                              product?.making_charge_14k
                                                            )}
                                                          </strong>
                                                        </>
                                                      )}
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th>Total Amount</th>
                                                    <td>
                                                      <strong className="text-success">
                                                        ₹
                                                        {numberFormat(
                                                          product?.total_amount_14k
                                                        )}
                                                        &nbsp; (Approx.)
                                                      </strong>
                                                    </td>
                                                  </tr>
                                                </>
                                              )}
                                            </tbody>
                                          </table>
                                        </>
                                      )}
                                    </div>
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                            </div>
                            {accordionOpen && (
                              <div className="mt-3">
                                {goldColor && goldType && (
                                  <>
                                    <table className="table table-bordered">
                                      <tbody>
                                        {goldType === "22k" && (
                                          <tr>
                                            <th>Total Amount</th>
                                            <td>
                                              ₹{" "}
                                              {numberFormat(
                                                product?.total_amount_22k
                                              )}
                                              (Approx.)
                                            </td>
                                          </tr>
                                        )}
                                        {goldType === "20k" && (
                                          <tr>
                                            <th>Total Amount</th>
                                            <td>
                                              ₹{" "}
                                              {numberFormat(
                                                product?.total_amount_20k
                                              )}
                                              (Approx.)
                                            </td>
                                          </tr>
                                        )}
                                        {goldType === "18k" && (
                                          <tr>
                                            <th>Total Amount</th>
                                            <td>
                                              ₹{" "}
                                              {numberFormat(
                                                product?.total_amount_18k
                                              )}
                                              (Approx.)
                                            </td>
                                          </tr>
                                        )}
                                        {goldType === "14k" && (
                                          <tr>
                                            <th>Total Amount</th>
                                            <td>
                                              ₹{" "}
                                              {numberFormat(
                                                product?.total_amount_14k
                                              )}
                                              (Approx.)
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="button d-flex pt-2">
                            <div className="add_cart align-items-center d-flex">
                              {Phone ? (
                                <>
                                  {cartItems &&
                                  cartItems?.find(
                                    (item) => item?.design_id === product?.id
                                  ) ? (
                                    <>
                                      <Link
                                        className="btn btn-outline-dark"
                                        to="/cart"
                                      >
                                        <BsCartDash
                                          style={{
                                            fontSize: "26px",
                                            cursor: "pointer",
                                          }}
                                        />
                                      </Link>
                                    </>
                                  ) : (
                                    <>
                                      <div>
                                        <button
                                          className="btn btn-outline-dark"
                                          onClick={() =>
                                            handleAddToCart(product)
                                          }
                                          disabled={spinner}
                                        >
                                          {spinner && (
                                            <CgSpinner
                                              size={20}
                                              className="animate_spin"
                                            />
                                          )}
                                          {!spinner && (
                                            <BsHandbagFill
                                              style={{
                                                fontSize: "26px",
                                                cursor: "pointer",
                                              }}
                                            />
                                          )}
                                        </button>
                                      </div>
                                      <div>
                                        <button
                                          className="btn btn-outline-dark align-items-center"
                                          onClick={() =>
                                            addToUserWishList(product)
                                          }
                                          disabled={UserWishlistItems?.find(
                                            (item) => item?.id === product?.id
                                          )}
                                        >
                                          {UserWishlistItems?.find(
                                            (item) => item?.id === product?.id
                                          ) ? (
                                            <div className="btn-success">
                                              <FaHeart
                                                style={{
                                                  fontSize: "26px",
                                                  cursor: "pointer",
                                                }}
                                              />
                                            </div>
                                          ) : (
                                            <div className="btn-success">
                                              {spinner2 && (
                                                <CgSpinner
                                                  size={20}
                                                  className="animate_spin"
                                                />
                                              )}
                                              {!spinner2 && (
                                                <FaRegHeart
                                                  style={{
                                                    fontSize: "26px",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              )}
                                            </div>
                                          )}
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  {Dealer ? (
                                    <></>
                                  ) : (
                                    <div
                                      className="buttons d-flex"
                                      onClick={(e) => UserLogin(e)}
                                    >
                                      <div className="add_cart align-items-center d-flex">
                                        <div>
                                          <spam className="btn btn-outline-dark">
                                            <BsHandbagFill
                                              style={{
                                                fontSize: "26px",
                                                cursor: "pointer",
                                              }}
                                            />
                                          </spam>
                                        </div>
                                        <div>
                                          <span className="btn btn-outline-dark">
                                            <FaRegHeart
                                              style={{
                                                fontSize: "26px",
                                                cursor: "pointer",
                                              }}
                                            />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>

                          {Phone && (
                            <>
                              {cartItems &&
                              cartItems.find(
                                (item) => item?.design_id === product?.id
                              ) ? (
                                ""
                              ) : (
                                <div className="discount-info">
                                  <span>
                                    To get Maximum Discount apply coupon code in
                                    cart.
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ShopDetails;
