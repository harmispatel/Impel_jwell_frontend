import React, { useContext, useState, useEffect } from "react";
import Userservice from "../../services/Auth";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { CgSpinner } from "react-icons/cg";
import { WishlistSystem } from "../../context/WishListContext";
import noWishlist from "../../assets/images/wishlist.png";
import NoImage from "../../assets/images/NoImage.jpeg";

const WishList = () => {
  const phone = localStorage.getItem("phone");
  const { dispatch } = useContext(WishlistSystem);
  const [items, setItems] = useState([]);
  const [removingItemId, setRemovingItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const GetCarList = async () => {
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

  const removeFromWishList = (product) => {
    setRemovingItemId(product);
    Userservice.removetoWishlist({ phone: phone, design_id: product })
      .then((res) => {
        if (res.success === true) {
          GetCarList();
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

  useEffect(() => {
    GetCarList();
  }, []);

  return (
    <section className="wishlist">
      <div className="container">
        <h2>My Wishlist</h2>
        <div>
          {isLoading ? (
            <div className="h-100 d-flex justify-content-center">
              <ReactLoading
                type={"spokes"}
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
                                src={NoImage}
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
                              <h3>{product?.name}</h3>
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
                            <button className="btn w-100">Move To Cart</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div class="row justify-content-center">
                  <div class="col-md-4 text-center">
                    <img
                      src={noWishlist}
                      alt=""
                      class="text-center align-items-center"
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
  );
};

export default WishList;
