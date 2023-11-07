import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productDetail from "../../services/Shop";
import BreadCrumb from "../../components/common/BreadCrumb";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import Magnifier from "react-image-magnify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import toast from "react-hot-toast";
import {
  BsFillBagPlusFill,
  BsFillEyeFill,
  BsHeart,
  BsStar,
} from "react-icons/bs";
import { RxChevronLeft, RxChevronRight, RxCross1 } from "react-icons/rx";
import DealeCartService from "../../services/Dealer/Cart";
import UserCartService from "../../services/Cart";
import Userservice from "../../services/Auth";
import DealerWishlist from "../../services/Dealer/Collection";
import { Button, Modal } from "react-bootstrap";

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

  const [DealerWishlistItems, setDealerWishlistItems] = useState([]);
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
        setCartItems(res.data);
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
        console.log(res);
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

  const handleAddToCart = (product) => {
    if (Verification === 3) {
      const CartData = {
        phone: Phone,
        design_name: product.name,
        design_id: product.id,
        quantity: productQuantity,
      };

      UserCartService.AddtoCart(CartData)
        .then((res) => {
          if (res.status === true) {
            GetUserCartList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Please verify your information to access");
      setShowEdit(true);
    }
  };

  const handleAddToDealerCart = (product) => {
    const CartData = {
      email: Dealer,
      quantity: productQuantity,
      design_id: product.id,
      design_name: product.name,
    };

    DealeCartService.AddtoCart(CartData)
      .then((res) => {
        console.log(res);
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

  const addToUserWishList = async (product) => {
    Userservice.addtoWishlist({
      phone: localStorage.getItem("phone"),
      design_id: product.id,
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
                <div className="col-md-7">
                  <div>
                    {productImages.length === 0 ? (
                      <img src={img} alt="" className="w-100" />
                    ) : (
                      <div className="detalis_slider">
                        <Carousel
                          infiniteLoop
                          useKeyboardArrows
                          autoPlay
                          interval={3000}
                        >
                          {productImages.map((image, index) => (
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
                <div className="col-md-5">
                  <div>
                    <h3>{product?.name}</h3>
                    <p>{product?.category}</p>
                    <p>
                      <strong>₹{product?.price.toLocaleString("en-US")}</strong>
                    </p>
                    <h5>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat
                      two.
                    </h5>
                    <div className="buttons pt-4 d-flex">
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

                      <div className="add_cart align-items-center d-flex">
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
                      </div>
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
                                  Go To Cart
                                </Link>
                              </>
                            ) : (
                              <>
                                <div>
                                  <button
                                    className="btn btn-outline-dark"
                                    onClick={() => handleAddToCart(product)}
                                  >
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
                                    )
                                      ? "Wishlisted"
                                      : "Wishlist"}
                                  </button>
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <div class="buttons pt-4 d-flex">
                              <Link to="/login">
                                <div class="add_cart align-items-center d-flex">
                                  <div>
                                    <button class="btn btn-outline-dark">
                                      Add To Cart
                                    </button>
                                  </div>
                                  <div>
                                    <button class="btn btn-outline-dark align-items-center">
                                      Wishlist
                                    </button>
                                  </div>
                                </div>
                              </Link>
                            </div>
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
