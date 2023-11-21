import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productDetail from "../../services/Shop";
import BreadCrumb from "../../components/common/BreadCrumb";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import toast from "react-hot-toast";
import { FcLike } from "react-icons/fc";
import { RxChevronLeft, RxChevronRight, RxCross1 } from "react-icons/rx";
import DealeCartService from "../../services/Dealer/Cart";
import UserCartService from "../../services/Cart";
import Userservice from "../../services/Auth";
import DealerWishlist from "../../services/Dealer/Collection";
import { Button, Modal } from "react-bootstrap";
import { BsCartDash, BsHandbagFill, BsHeart } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const data = { categoryId: product?.category_id?.id };
  const Dealer = localStorage.getItem("email");
  const Phone = localStorage.getItem("phone");
  const Verification = localStorage.getItem("verification");

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
        }, 500);
      })
      .catch((err) => {
        console.log(err);
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

  const handleAddToDealerCart = (product) => {
    const CartData = {
      email: Dealer,
      quantity: productQuantity,
      design_id: product.id,
      design_name: product.name,
    };

    DealeCartService.AddtoCart(CartData)
      .then((res) => {
        if (res.status === true) {
          // toast.success(res.message);
          toast(res.message, { icon: "✔️" });
          GetCarList();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addToDealerWishList = async (product) => {
    DealerWishlist.addtoWishlist({
      email: localStorage.getItem("email"),
      design_id: product.id,
    })
      .then((res) => {
        if (res.success === true) {
          setDealerWishlist(true);
          // toast.success(res.message);
          GetDealerWishList();
        } else {
          // toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToUserWishList = async (product) => {
    Userservice.addtoWishlist({
      phone: localStorage.getItem("phone"),
      design_id: product.id,
      quantity: productQuantity,
    })
      .then((res) => {
        if (res.success === true) {
          setUserWishlist(true);
          // toast.success(res.message);
          GetUserWishList();
        } else {
          // toast.error(res.message);
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
  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
  };

  const handleAddToCart = (product) => {
    if (Verification == 3) {
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
    } else {
      setShowEdit(true);
    }
  };
  const handleGoldTypeClick = (buttonId) => {
    setSelectedGoldType(buttonId);
  };
  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.id);
  };

  const goldrate = {
    gold_rate_24k: 6000,
    gold_rate_22k: 5220,
    gold_rate_20k: 5040,
    gold_rate_18k: 4560,
    gold_rate_14k: 3540,
  };
  const price22k = parseFloat(
    (product?.gross_weight_22k * goldrate.gold_rate_22k).toFixed(2)
  );
  const price20k = parseFloat(
    (product?.gross_weight_20k * goldrate.gold_rate_20k).toFixed(2)
  );
  const price18k = parseFloat(
    (product?.gross_weight_18k * goldrate.gold_rate_18k).toFixed(2)
  );
  const price14k = parseFloat(
    (product?.gross_weight_14k * goldrate.gold_rate_14k).toFixed(2)
  );

  const makinghcharge22k =
    ((goldrate.gold_rate_24k * 15) / 100) * product?.gross_weight_22k;
  const makinghcharge20k =
    ((goldrate.gold_rate_24k * 15) / 100) * product?.gross_weight_20k;
  const makinghcharge18k =
    ((goldrate.gold_rate_24k * 15) / 100) * product?.gross_weight_18k;
  const makinghcharge14k =
    ((goldrate.gold_rate_24k * 15) / 100) * product?.gross_weight_14k;

  const totalprice22k = price22k + makinghcharge22k;
  const totalprice20k = price20k + makinghcharge20k;
  const totalprice18k = price18k + makinghcharge18k;
  const totalprice14k = price14k + makinghcharge14k;
  return (
    <section className="shop_details">
      <div className="container">
        <div className="Shop_product">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <BreadCrumb
                firstName="Home"
                firstUrl="/"
                secondName="Shop"
                secondUrl="/shop"
                thirdName="Shopdetails"
              />
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
                              <img src={image} alt={`Product Image ${index}`} />
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
                    <p>
                      <strong>₹{product?.price}</strong>
                    </p>
                    <h5>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat
                      two.
                    </h5>

                    <div>
                      <div>
                        <button
                          className={`btn  yellow-gold ${
                            selectedGoldType === "yellow_gold" ? "active" : ""
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
                            selectedGoldType === "white_gold" ? "active" : ""
                          }`}
                          onClick={() => handleGoldTypeClick("white_gold")}
                        >
                          White Gold
                        </button>
                      </div>
                      {selectedGoldType === "yellow_gold" && (
                        <div className="mt-3">
                          <h5>Weight in Gram(Approx.)</h5>
                          <div className="prodcuts-weight">
                            <table className="table table-bordered text-center">
                              <thead>
                                <tr>
                                  <th>Title</th>
                                  <th>
                                    <div className="d-flex justify-content-space-between">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="22k"
                                        checked={selectedRadio === "22k"}
                                        onChange={handleRadioChange}
                                      />
                                      <label class="form-check-label" for="22k">
                                        22K / 76 Touch
                                      </label>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="d-flex justify-content-space-between">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="20k"
                                        checked={selectedRadio === "20k"}
                                        onChange={handleRadioChange}
                                      />
                                      <label class="form-check-label" for="20k">
                                        20K / 76 Touch
                                      </label>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="d-flex justify-content-space-between">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="18k"
                                        defaultChecked={selectedRadio === "18k"}
                                        onChange={handleRadioChange}
                                      />
                                      <label class="form-check-label" for="18k">
                                        18K / 76 Touch
                                      </label>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="d-flex justify-content-space-between">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="14k"
                                        checked={selectedRadio === "14k"}
                                        onChange={handleRadioChange}
                                      />
                                      <label class="form-check-label" for="14k">
                                        14K / 59 Touch
                                      </label>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Gross Weight</td>
                                  <td>
                                    {product?.gross_weight_22k} g.(Approx.)
                                  </td>
                                  <td>
                                    {product?.gross_weight_20k} g.(Approx.)
                                  </td>
                                  <td>
                                    {product?.gross_weight_18k} g.(Approx.)
                                  </td>
                                  <td>
                                    {product?.gross_weight_14k} g.(Approx.)
                                  </td>
                                </tr>
                                <tr>
                                  <td>Less Gems Stone</td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>0</td>
                                </tr>
                                <tr>
                                  <td>Less C.Z. Stone</td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>0</td>
                                </tr>
                                <tr>
                                  <th>Net Weight</th>
                                  <td>{product?.gross_weight_22k} g.</td>
                                  <td>{product?.gross_weight_20k} g.</td>
                                  <td>{product?.gross_weight_18k} g.</td>
                                  <td>{product?.gross_weight_14k} g.</td>
                                </tr>
                                <tr>
                                  <th>Price</th>
                                  <td>₹ {price22k}</td>
                                  <td>₹ {price20k}</td>
                                  <td>₹ {price18k}</td>
                                  <td>₹ {price14k}</td>
                                </tr>
                                <tr>
                                  <th>Making charge</th>
                                  <td>₹ {makinghcharge22k}</td>
                                  <td>₹ {makinghcharge20k}</td>
                                  <td>₹ {makinghcharge18k}</td>
                                  <td>₹ {makinghcharge14k}</td>
                                </tr>
                                <tr>
                                  <th>Total Amount</th>
                                  <td>₹ {totalprice22k}</td>
                                  <td>₹ {totalprice20k}</td>
                                  <td>₹ {totalprice18k}</td>
                                  <td>₹ {totalprice14k}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      {selectedGoldType === "rose_gold" && (
                        <div className="mt-3">
                          <h5>Weight in Gram(Approx.)</h5>
                          <div className="prodcuts-weight-18k">
                            <table className="table table-bordered text-center">
                              <thead>
                                <tr>
                                  <th>Title</th>
                                  <th>
                                    <div className="d-flex justify-content-space-between">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="18k"
                                        defaultChecked={selectedRadio === "18k"}
                                        onChange={handleRadioChange}
                                      />
                                      <label
                                        class="form-check-label ms-2"
                                        for="18k"
                                      >
                                        18K / 76 Touch
                                      </label>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="d-flex justify-content-space-between">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="14k"
                                        checked={selectedRadio === "14k"}
                                        onChange={handleRadioChange}
                                      />
                                      <label
                                        class="form-check-label ms-2"
                                        for="14k"
                                      >
                                        14K / 59 Touch
                                      </label>
                                    </div>
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                <tr>
                                  <td>Gross Weight</td>
                                  <td>
                                    {product?.gross_weight_18k} g.(Approx.)
                                  </td>
                                  <td>
                                    {product?.gross_weight_14k} g.(Approx.)
                                  </td>
                                </tr>
                                <tr>
                                  <td>Less Gems Stone</td>
                                  <td>0</td>
                                  <td>0</td>
                                </tr>
                                <tr>
                                  <td>Less C.Z. Stone</td>
                                  <td>0</td>
                                  <td>0</td>
                                </tr>
                                <tr>
                                  <th>Net Weight</th>
                                  <td>{product?.gross_weight_18k} g.</td>
                                  <td>{product?.gross_weight_14k} g.</td>
                                </tr>
                                <tr>
                                  <th>Price</th>
                                  <td>₹ {price18k}</td>
                                  <td>₹ {price14k}</td>
                                </tr>
                                <tr>
                                  <th>Making charge</th>
                                  <td>₹ {makinghcharge18k}</td>
                                  <td>₹ {makinghcharge14k}</td>
                                </tr>
                                <tr>
                                  <th>Total Amount</th>
                                  <td>₹ {totalprice18k}</td>
                                  <td>₹ {totalprice14k}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      {selectedGoldType === "white_gold" && (
                        <div className="mt-3">
                          <h5>Weight in Gram(Approx.)</h5>
                          <div className="prodcuts-weight-18k">
                            <table className="table table-bordered text-center">
                              <thead>
                                <tr>
                                  <th>Title</th>
                                  <th>
                                    <div className="d-flex justify-content-space-between">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="18k"
                                        defaultChecked={selectedRadio === "18k"}
                                        onChange={handleRadioChange}
                                      />
                                      <label
                                        class="form-check-label ms-2"
                                        for="18k"
                                      >
                                        18K / 76 Touch
                                      </label>
                                    </div>
                                  </th>
                                  <th>
                                    <div className="d-flex justify-content-space-between">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="14k"
                                        checked={selectedRadio === "14k"}
                                        onChange={handleRadioChange}
                                      />
                                      <label
                                        class="form-check-label ms-2"
                                        for="14k"
                                      >
                                        14K / 59 Touch
                                      </label>
                                    </div>
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                <tr>
                                  <td>Gross Weight</td>
                                  <td>
                                    {product?.gross_weight_18k} g.(Approx.)
                                  </td>
                                  <td>
                                    {product?.gross_weight_14k} g.(Approx.)
                                  </td>
                                </tr>
                                <tr>
                                  <td>Less Gems Stone</td>
                                  <td>0</td>
                                  <td>0</td>
                                </tr>
                                <tr>
                                  <td>Less C.Z. Stone</td>
                                  <td>0</td>
                                  <td>0</td>
                                </tr>
                                <tr>
                                  <th>Net Weight</th>
                                  <td>{product?.gross_weight_18k} g.</td>
                                  <td>{product?.gross_weight_14k} g.</td>
                                </tr>
                                <tr>
                                  <th>Price</th>
                                  <td>₹ {price18k}</td>
                                  <td>₹ {price14k}</td>
                                </tr>
                                <tr>
                                  <th>Making charge</th>
                                  <td>₹ {makinghcharge18k}</td>
                                  <td>₹ {makinghcharge14k}</td>
                                </tr>
                                <tr>
                                  <th>Total Amount</th>
                                  <td>₹ {totalprice18k}</td>
                                  <td>₹ {totalprice14k}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="buttons pt-4 d-flex justify-content-space-between">
                      {Phone ? (
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
                      )}
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
                              (item) => item.design_name === product?.name
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
                                    onClick={() => addToUserWishList(product)}
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
                      <Modal
                        className="form_intent"
                        centered
                        show={showEdit}
                        onHide={handleClose}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Registration</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <span>
                            Prior to place your order, you need to provide your
                            other information. Please update your profile, we
                            will validate your profile in next 48 hours and then
                            you can place your order.
                          </span>
                        </Modal.Body>
                        <div className="text-center pb-3">
                          <Button
                            variant="primary"
                            type="submit"
                            onClick={() => navigate("/profile")}
                          >
                            Registration
                          </Button>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopDetails;
