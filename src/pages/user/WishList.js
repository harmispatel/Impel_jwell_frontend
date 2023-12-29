import React, { useContext, useState, useEffect } from "react";
import Userservice from "../../services/Auth";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { CgSpinner } from "react-icons/cg";
import { WishlistSystem } from "../../context/WishListContext";
import noWishlist from "../../assets/images/wishlist.png";
import NoImage from "../../assets/images/NoImage.jpeg";
import UserCartService from "../../services/Cart";
import toast from "react-hot-toast";
import { BsHandbagFill } from "react-icons/bs";
import { Helmet } from "react-helmet-async";

const WishList = () => {
  const phone = localStorage.getItem("phone");
  const { dispatch } = useContext(WishlistSystem);
  const [items, setItems] = useState([]);
  const [removingItemId, setRemovingItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [productQuantity, setProductQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [removeCartItems, setRemoveCartItems] = useState(null);

  const GetUserWishlist = async () => {
    Userservice.userWishlist({ phone: phone })
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const GetUserCartList = async () => {
    UserCartService.CartList({ phone: phone })
      .then((res) => {
        setCartItems(res.data.cart_items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromWishList = (product) => {
    setRemovingItemId(product);
    Userservice.removetoWishlist({ phone: phone, design_id: product })
      .then((res) => {
        if (res.success === true) {
          GetUserWishlist();
          setIsLoading(true);
          dispatch({
            type: "REMOVE_FROM_WISHLIST",
            payload: { id: product.id },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRemovingItemId(null);
      });
  };

  const handleAddToCart = (product) => {
    setRemoveCartItems(product);
    const CartData = {
      phone: phone,
      design_name: product.name,
      design_id: product.id,
      quantity: productQuantity,
      gold_color: product?.gold_color,
      gold_type: product?.gold_type,
    };

    UserCartService.AddtoCart(CartData)
      .then((res) => {
        if (res.status === true) {
          GetUserCartList();
          toast.success(res.message);
          GetUserWishlist();
          setIsLoading(true);
        } else {
          toast.error(res.message);
          GetUserWishlist();
          setIsLoading(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRemoveCartItems(null);
      });
  };

  useEffect(() => {
    GetUserWishlist();
    GetUserCartList();
  }, []);

  return (
    <>
      <Helmet>
        <title>Impel Store - Wishlist</title>
      </Helmet>
      <section className="wishlist">
        <div className="container">
          <h2>My Wishlist</h2>
          <div>
            {isLoading ? (
              <div className="h-100 d-flex justify-content-center">
                <ReactLoading
                  type={"spin"}
                  color={"#053961"}
                  height={"20%"}
                  width={"10%"}
                  className="loader"
                />
              </div>
            ) : (
              <>
                {items?.length ? (
                  <>
                    <div className="product_washlist">
                      {items?.map((product) => {
                        return (
                          <div className="wishlist_card">
                            <div className="wishlist_img">
                              {product?.image ? (
                                <img
                                  src={product.image}
                                  className="w-100"
                                  alt={product.name}
                                />
                              ) : (
                                <img src={NoImage} className="w-100" alt="" />
                              )}
                            </div>
                            <div className="wishlist_info">
                              <Link
                                to={`/shopdetails/${product?.id}`}
                                className="product_data"
                              >
                                <h3>
                                  <b>{product?.name}</b>
                                </h3>

                                <div className="d-flex justify-content-around align-items-center">
                                  <span>{product?.gold_color}</span>
                                  <span>{product?.gold_type}</span>
                                </div>
                              </Link>
                            </div>
                            <div className="move_bag_btn d-flex">
                              <button
                                className="btn w-100"
                                onClick={() => removeFromWishList(product?.id)}
                              >
                                {removingItemId === product.id && (
                                  <CgSpinner
                                    size={20}
                                    className="animate_spin me-2"
                                  />
                                )}
                                Remove
                              </button>
                              <button
                                className="btn w-100"
                                onClick={() => handleAddToCart(product)}
                              >
                                {removeCartItems === product && (
                                  <CgSpinner
                                    size={20}
                                    className="animate_spin me-2"
                                  />
                                )}
                                {!removeCartItems === product && (
                                  <BsHandbagFill className="me-2" />
                                )}
                                Move To Cart
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                      <img
                        src={noWishlist}
                        alt=""
                        className="text-center align-items-center"
                        height="350px"
                        width="350px"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default WishList;
