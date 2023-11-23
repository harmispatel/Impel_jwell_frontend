import React from "react";
import Userservice from "../../services/Auth";
import { useState } from "react";
import { useEffect } from "react";
import noWishlist from "../../assets/images/wishlist.png";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { CgSpinner } from "react-icons/cg";

const WishList = () => {
  const [DealercartItems, setDealerCartItems] = useState([]);
  const [removingItemId, setRemovingItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const phone = localStorage.getItem("phone");

  const GetCarList = async () => {
    Userservice.userWishlist({ phone: phone })
      .then((res) => {
        setDealerCartItems(res.data);
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
              {DealercartItems.length ? (
                <>
                  <div className="product_washlist">
                    {DealercartItems.map((product) => {
                      return (
                        <div className="wishlist_card">
                          <div className="wishlist_img">
                            <img src={product.image} className="w-100" alt="" />
                          </div>
                          <div className="wishlist_info">
                            <Link
                              to={`/shopdetails/${product.id}`}
                              className="product_data"
                            >
                              <h3>{product.name}</h3>
                            </Link>
                            {/* <p>
                          ${product.price}
                          <span>$449</span>
                          <label>(50% OFF)</label>
                        </p> */}
                          </div>
                          <div className="move_bag_btn d-flex">
                            <button
                              className="btn w-100"
                              onClick={() => removeFromWishList(product.id)}
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
