import React, { useState } from "react";
import { useWishList } from "../../context/WishListContext";

const WishList = () => {
  const { wishList,dispatch  } = useWishList();

  const removeFromWishList = (product) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
  };

  console.log(wishList);

  return (
    <section className="wishlist">
      <div className="container">
        <h2>My Wishlist</h2>
        <div className="product_washlist">
        {wishList.map(product=>{
          return(
          <div className="wishlist_card">
              <div className="wishlist_img">
                <img src={product.image} className="w-100"/>
              </div>
              <div className="wishlist_info">
                <h3>Product Name</h3>
                <p>$399<span>$449</span><label>(50% OFF)</label></p>
              </div>
              <div className="move_bag_btn d-flex">
                <button className="btn w-100" onClick={() => removeFromWishList(product)}>Remove</button>
                <button className="btn w-100">Move To Bag</button>
              </div>
          </div>
          )
        })
        }
        </div>
      </div>
    </section>
  );
};

export default WishList;