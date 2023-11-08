import React from "react";
import Userservice from "../../services/Auth";
import { useState } from "react";
import { useEffect } from "react";
import noWishlist from "../../assets/images/wishlist.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WishList = () => {
  const [DealercartItems, setDealerCartItems] = useState([]);
  const phone = localStorage.getItem("phone");

  const GetCarList = async () => {
    Userservice.userWishlist({ phone: phone })
      .then((res) => {
        console.log(res.data);
        setDealerCartItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromWishList = (product) => {
    Userservice.removetoWishlist({ phone: phone, design_id: product })
      .then((res) => {
        console.log(res);
        if (res.success === true) {
          GetCarList();
        }
      })
      .catch((err) => {
        console.log(err);
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
          {DealercartItems.length ? (
            <>
              <div className="product_washlist">
                {DealercartItems.map((product) => {
                  //  const ProductsPrice = product.price.toLocaleString("en-US");
                  return (
                    <div className="wishlist_card">
                      <div className="wishlist_img">
                        <img src={product.image} className="w-100" />
                      </div>
                      <div className="wishlist_info">
                        <h3>{product.name}</h3>
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
        </div>
      </div>
    </section>
  );
};

export default WishList;
