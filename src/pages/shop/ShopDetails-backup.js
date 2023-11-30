import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import productDetail from "../../services/Shop";
import BreadCrumb from "../../components/common/BreadCrumb";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import toast from "react-hot-toast";
import { RxChevronLeft, RxChevronRight, RxCross1 } from "react-icons/rx";
import DealeCartService from "../../services/Dealer/Cart";
import UserCartService from "../../services/Cart";
import Userservice from "../../services/Auth";
import DealerWishlist from "../../services/Dealer/Collection";
import { BsCartDash, BsHandbagFill } from "react-icons/bs";
import { FaHeart, FaLongArrowAltLeft, FaRegHeart } from "react-icons/fa";
import ReactLoading from "react-loading";

const ShopDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [img, setImg] = useState();
  const [productImages, setProduuctImages] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [DealercartItems, setDealerCartItems] = useState([]);
  const [userWishlist, setUserWishlist] = useState(false);
  const [dealerWishlist, setDealerWishlist] = useState(false);
  const [UserWishlistItems, setUserWishlistItems] = useState([]);
  const [selectedGoldType, setSelectedGoldType] = useState("yellow_gold");
  const [DealerWishlistItems, setDealerWishlistItems] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState("18k");
  const [error, setError] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const data = { categoryId: product?.category_id?.id };
  const Dealer = localStorage.getItem("email");
  const Phone = localStorage.getItem("phone");

  const productData = async () => {
    const data = {
      id: id,
    };

    await productDetail
      .product_detail(data)
      .then((res) => {
        setTimeout(() => {
          setProduct(res.data);
          setImg(res.data.image);
          setProduuctImages(res.data.multiple_image);
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const Relatedproduct = async () => {
    try {
      const response = await productDetail.related_products(data);
      setRelatedProduct(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const GetCarList = async () => {
    DealeCartService.CartList({ email: Dealer })
      .then((res) => {
        setDealerCartItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        setUserWishlistItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetDealerWishList = async () => {
    DealerWishlist.ListCollection({ email: Dealer })
      .then((res) => {
        setDealerWishlistItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    productData();
    Relatedproduct();
    GetUserCartList();
    GetCarList();
    GetUserWishList();
    GetDealerWishList();
  }, []);

  const addToUserWishList = async (product) => {
    Userservice.addtoWishlist({
      phone: localStorage.getItem("phone"),
      design_id: product.id,
      quantity: productQuantity,
    })
      .then((res) => {
        if (res.success === true) {
          setUserWishlist(true);
          GetUserWishList();
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
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
      (currentImageIndex + step + productImages.length) % productImages.length;
    setCurrentImageIndex(newIndex);
  };

  const handleAddToCart = (product) => {
    if (selectedRadio === "") {
      setError("Please select an option");
    } else {
      const CartData = {
        phone: Phone,
        design_name: product.name,
        design_id: product.id,
        quantity: productQuantity,
        gold_color: selectedGoldType,
        gold_type: selectedRadio,
      };

      UserCartService.AddtoCart(CartData)
        .then((res) => {
          if (res.status === true) {
            GetUserCartList();
            toast.success(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleGoldTypeClick = (buttonId) => {
    setSelectedGoldType(buttonId);
  };
  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.id);
    setError("");
  };
  return (
    <section className="shop_details">
      <div className="container">
        <div className="Shop_product">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="pb-3">
                <Link className="btn btn-outline-dark" to="/shop">
                  <FaLongArrowAltLeft className="me-2" />
                  Back to shop
                </Link>
              </div>
              <BreadCrumb
                firstName="Home"
                firstUrl="/"
                secondName="Shop"
                secondUrl="/shop"
                thirdName="Shopdetails"
              />
              {isLoading ? (
                <div className="h-100 d-flex justify-content-center">
                  <ReactLoading
                    type={"cubes"}
                    color={"#053961"}
                    delay={"2"}
                    height={"20%"}
                    width={"10%"}
                    className="loader"
                  />
                </div>
              ) : (
                <>
                  <div className="row">
                    <div className="col-md-6">
                      <div>
                        {productImages?.length === 0 ? (
                          <div id="imageMagnifyer">
                            <img src={img} alt="" className="w-100" />
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
                                  <img
                                    src={image}
                                    alt={`Product Image ${index}`}
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
                                  <img
                                    className="w-50"
                                    src={productImages[currentImageIndex]}
                                    alt={`Product Image ${currentImageIndex}`}
                                  />
                                  <div className="lightbox-navigation">
                                    <button
                                      className="btn"
                                      onClick={() => navigateLightbox(-1)}
                                    >
                                      <RxChevronLeft />
                                    </button>
                                    <button
                                      className="btn"
                                      onClick={() => navigateLightbox(1)}
                                    >
                                      <RxChevronRight />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <h3>{product?.name}</h3>
                        <p>{product?.category}</p>
                        <h5>
                          Design code : <strong>{product?.code}</strong>
                        </h5>
                        <h5>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat two.
                        </h5>
                        <div>
                          <div>
                            <button
                              className={`btn  yellow-gold ${
                                selectedGoldType === "yellow_gold"
                                  ? "active"
                                  : ""
                              }`}
                              defaultValue="yellow_gold"
                              onClick={() => handleGoldTypeClick("yellow_gold")}
                            >
                              Yellow Gold
                            </button>
                            <button
                              className={`btn rose-gold mx-3 ${
                                selectedGoldType === "rose_gold" ? "active" : ""
                              }`}
                              onClick={() => handleGoldTypeClick("rose_gold")}
                            >
                              Rose Gold
                            </button>
                            <button
                              className={`btn white-gold ${
                                selectedGoldType === "white_gold"
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() => handleGoldTypeClick("white_gold")}
                            >
                              White Gold
                            </button>
                          </div>
                          <div className="mt-3">
                            {selectedGoldType === "yellow_gold" && (
                              <>
                                <div className="d-flex justify-content-between">
                                  <div class="radio-item">
                                    <input
                                      name="radio1"
                                      id="22k"
                                      type="radio"
                                      checked={selectedRadio === "22k"}
                                      onChange={handleRadioChange}
                                    />
                                    <label for="22k">22K</label>
                                  </div>
                                  <div className="radio-item">
                                    <input
                                      name="radio1"
                                      id="20k"
                                      type="radio"
                                      checked={selectedRadio === "20k"}
                                      onChange={handleRadioChange}
                                    />
                                    <label for="20k">20K</label>
                                  </div>
                                  <div className="radio-item">
                                    <input
                                      name="radio1"
                                      id="18k"
                                      type="radio"
                                      defaultChecked={selectedRadio === "18k"}
                                      onChange={handleRadioChange}
                                    />
                                    <label for="18k">18K</label>
                                  </div>
                                  <div className="radio-item">
                                    <input
                                      name="radio1"
                                      id="14k"
                                      type="radio"
                                      checked={selectedRadio === "14k"}
                                      onChange={handleRadioChange}
                                    />
                                    <label for="14k">14K</label>
                                  </div>
                                </div>
                              </>
                            )}
                            {selectedGoldType === "rose_gold" && (
                              <>
                                <div className="d-flex">
                                  <div className="radio-item">
                                    <input
                                      name="radio1"
                                      id="18k"
                                      type="radio"
                                      defaultChecked={selectedRadio === "18k"}
                                      onChange={handleRadioChange}
                                    />
                                    <label for="18k">18K</label>
                                  </div>
                                  <div className="radio-item ms-3">
                                    <input
                                      name="radio1"
                                      id="14k"
                                      type="radio"
                                      checked={selectedRadio === "14k"}
                                      onChange={handleRadioChange}
                                    />
                                    <label for="14k">14K</label>
                                  </div>
                                </div>
                              </>
                            )}
                            {selectedGoldType === "white_gold" && (
                              <>
                                <div className="d-flex">
                                  <div className="radio-item">
                                    <input
                                      name="radio1"
                                      id="18k"
                                      type="radio"
                                      defaultChecked={selectedRadio === "18k"}
                                      onChange={handleRadioChange}
                                    />
                                    <label for="18k">18K</label>
                                  </div>
                                  <div className="radio-item ms-3">
                                    <input
                                      name="radio1"
                                      id="14k"
                                      type="radio"
                                      checked={selectedRadio === "14k"}
                                      onChange={handleRadioChange}
                                    />
                                    <label for="14k">14K</label>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                          <div className="mt-3">
                            {selectedRadio === "22k" && (
                              <>
                                <table className="table table-bordered text-center">
                                  <thead>
                                    <tr>
                                      <th colspan="3">Approximate -Estimate</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    <tr>
                                      <th>Gross Weight</th>
                                      <td>
                                        {(product?.gross_weight_22k).toFixed(2)}
                                        g.(Approx.)
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Less Gems Stone</th>
                                      <td>
                                        {(product?.less_gems_stone).toFixed(2)}
                                        g.
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Less C.Z. Stone</th>
                                      <td>
                                        {(product?.less_cz_stone).toFixed(2)} g.
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Net Weight</th>
                                      <td>
                                        {(product?.net_weight_22k).toFixed(2)}
                                        g.
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Price</th>
                                      <td>
                                        ₹ {(product?.price_22k).toFixed(2)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>CZ Stone Charges</th>
                                      <td>
                                        ₹ {(product?.cz_stone_price).toFixed(2)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Gem stone charges</th>
                                      <td>
                                        ₹ {(product?.gemstone_price).toFixed(2)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>
                                        Making charge (
                                        {product?.percentage.length
                                          ? product?.percentage
                                          : 0}
                                        %)
                                      </th>
                                      <td>
                                        ₹ {(product?.making_charge).toFixed(2)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Total Amount</th>
                                      <td>
                                        ₹{(product?.total_price_22k).toFixed(2)}
                                        (Approx.)
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </>
                            )}
                            {selectedRadio === "20k" && (
                              <>
                                <table className="table table-bordered text-center">
                                  <thead>
                                    <tr>
                                      <th colspan="3">Approximate -Estimate</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    <tr>
                                      <th>Gross Weight</th>
                                      <td>
                                        {(product?.gross_weight_20k).toFixed(2)}
                                        g.(Approx.)
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Less Gems Stone</th>
                                      <td>
                                        {(product?.less_gems_stone).toFixed(2)}
                                        g.
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Less C.Z. Stone</th>
                                      <td>
                                        {(product?.less_cz_stone).toFixed(2)}g.
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Net Weight</th>
                                      <td>
                                        {(product?.net_weight_20k).toFixed(2)}
                                        g.
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Price</th>
                                      <td>
                                        ₹ {(product?.price_20k).toFixed(2)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>CZ Stone Charges</th>
                                      <td>
                                        ₹ {(product?.cz_stone_price).toFixed(2)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Gem stone charges</th>
                                      <td>
                                        ₹ {(product?.gemstone_price).toFixed(2)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>
                                        Making charge (
                                        {product?.percentage.length
                                          ? product?.percentage
                                          : 0}
                                        %)
                                      </th>
                                      <td>
                                        ₹ {(product?.making_charge).toFixed(2)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Total Amount</th>
                                      <td>
                                        ₹{(product?.total_price_20k).toFixed(2)}
                                        (Approx.)
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </>
                            )}
                            {selectedRadio === "18k" && (
                              <table className="table table-bordered text-center">
                                <thead>
                                  <tr>
                                    <th colspan="3">Approximate -Estimate</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <th>Gross Weight</th>
                                    <td>
                                      {(product?.gross_weight_18k).toFixed(2)}
                                      g.(Approx.)
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Less Gems Stone</th>
                                    <td>
                                      {(product?.less_gems_stone).toFixed(2)} g.
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Less C.Z. Stone</th>
                                    <td>
                                      {(product?.less_cz_stone).toFixed(2)} g.
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Net Weight</th>
                                    <td>
                                      {(product?.net_weight_18k).toFixed(2)}
                                      g.
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Price</th>
                                    <td>₹ {(product?.price_18k).toFixed(2)}</td>
                                  </tr>
                                  <tr>
                                    <th>CZ Stone Charges</th>
                                    <td>
                                      ₹ {(product?.cz_stone_price).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Gem stone charges</th>
                                    <td>
                                      ₹ {(product?.gemstone_price).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>
                                      Making charge (
                                      {product?.percentage.length
                                        ? product?.percentage
                                        : 0}
                                      %)
                                    </th>
                                    <td>
                                      ₹ {(product?.making_charge).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Total Amount</th>
                                    <td>
                                      ₹ {(product?.total_price_18k).toFixed(2)}
                                      (Approx.)
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                            {selectedRadio === "14k" && (
                              <table className="table table-bordered text-center">
                                <thead>
                                  <tr>
                                    <th colspan="3">Approximate -Estimate</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr>
                                    <th>Gross Weight</th>
                                    <td>
                                      {(product?.gross_weight_14k).toFixed(2)}
                                      g.(Approx.)
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Less Gems Stone</th>
                                    <td>
                                      {(product?.less_gems_stone).toFixed(2)} g.
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Less C.Z. Stone</th>
                                    <td>
                                      {(product?.less_cz_stone).toFixed(2)} g.
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Net Weight</th>
                                    <td>
                                      {(product?.net_weight_14k).toFixed(2)}
                                      g.
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Price</th>
                                    <td>₹ {(product?.price_14k).toFixed(2)}</td>
                                  </tr>
                                  <tr>
                                    <th>CZ Stone Charges</th>
                                    <td>
                                      ₹ {(product?.cz_stone_price).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Gem stone charges</th>
                                    <td>
                                      ₹ {(product?.gemstone_price).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>
                                      Making charge (
                                      {product?.percentage.length
                                        ? product?.percentage
                                        : 0}
                                      %)
                                    </th>
                                    <td>
                                      ₹ {(product?.making_charge).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Total Amount</th>
                                    <td>
                                      ₹ {(product?.total_price_14k).toFixed(2)}
                                      (Approx.)
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                          </div>
                          {error && <div style={{ color: "red" }}>{error}</div>}
                        </div>
                        <div className="buttons pt-4 d-flex justify-content-space-between">
                          {/* {Phone ? (
                            <div className="quantity">
                              {productQuantity === 1 ? (
                                <button
                                  className="btn"
                                  onClick={() =>
                                    setProductQuantity(productQuantity - 1)
                                  }
                                  disabled={productQuantity === 1}
                                >
                                  -
                                </button>
                              ) : (
                                <button
                                  className="btn"
                                  onClick={() =>
                                    setProductQuantity(productQuantity - 1)
                                  }
                                  disabled={productQuantity === 1}
                                >
                                  -
                                </button>
                              )}

                              <input
                                className="form-control"
                                type="text"
                                name="productQuantity"
                                onChange={(e) => setProductQuantity(e.target)}
                                value={productQuantity}
                                min={1}
                                disabled
                              />
                              <button
                                className="btn"
                                onClick={() =>
                                  setProductQuantity(productQuantity + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <></>
                          )} */}
                          {/* <div className="add_cart align-items-center d-flex">
                            {Dealer ? (
                              <>
                                <div>
                                  <button
                                    className="btn btn-outline-dark"
                                    onClick={() => addToDealerWishList(product)}
                                  >
                                    {DealerWishlistItems?.find(
                                      (item) => item?.id === product?.id
                                    )
                                      ? "Wishlisted"
                                      : "Wishlist"}
                                  </button>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </div> */}
                          <div className="add_cart align-items-center d-flex">
                            {Phone ? (
                              <>
                                {cartItems &&
                                cartItems?.find(
                                  (item) => item.design_id === product?.id
                                ) ? (
                                  <>
                                    <Link
                                      className="btn btn-outline-dark"
                                      to="/cart"
                                    >
                                      <BsCartDash className="me-2" /> Go To Cart
                                    </Link>
                                  </>
                                ) : (
                                  <>
                                    <div>
                                      <button
                                        className="btn btn-outline-dark"
                                        onClick={() => handleAddToCart(product)}
                                      >
                                        <BsHandbagFill className="me-2" />
                                        Add To Cart
                                      </button>
                                    </div>
                                    <div>
                                      <button
                                        className="btn btn-outline-dark align-items-center"
                                        onClick={() =>
                                          addToUserWishList(product)
                                        }
                                      >
                                        {UserWishlistItems?.find(
                                          (item) => item?.id === product?.id
                                        ) ? (
                                          <div className="btn-success">
                                            <FaHeart className="me-2" />
                                            WISHLISTED
                                          </div>
                                        ) : (
                                          <div className="btn-success">
                                            <FaRegHeart className="me-2" />
                                            WISHLIST
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
                                  <div class="buttons pt-4 d-flex">
                                    <Link to="/login">
                                      <div class="add_cart align-items-center d-flex">
                                        <div>
                                          <button class="btn btn-outline-dark">
                                            <BsHandbagFill className="me-2" />
                                            Add To Cart
                                          </button>
                                        </div>
                                        <div>
                                          <button class="btn btn-outline-dark align-items-center">
                                            <FaRegHeart className="me-2" />
                                            Wishlist
                                          </button>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ShopDetails;
