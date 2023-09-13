import React, { useEffect, useState } from "react";
import { useWishList } from "../../context/WishListContext";
import noWishlist from "../../assets/images/wishlist.png";
import DealerWishlist from "../../services/Dealer/Collection"

const WishList = () => {
  const { dispatch } = useWishList();
  const [checkList,setCheckList] = useState([])

  const DealerEmail = localStorage.getItem("email");

  const removeFromWishList = (product) => {
    console.log(product);
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product});

    const userData = {
      design_id: product,
      email: DealerEmail,
    };
  
    DealerWishlist.collectionData(userData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const collectionCheck = () =>{
    DealerWishlist.ListCollection({email:DealerEmail})
    .then(res=>{
      setCheckList(res.data)
    }).catch(err=>{
      console.log(err);
    })
  }

  useEffect(() => {
    collectionCheck()
  }, [removeFromWishList]);

  return (
    <section className="wishlist">
      <div className="container">
        <h2>My Wishlist</h2>
        {checkList.length ? (
          <>
            <div className="product_washlist">
              {checkList.map((product) => {
                return (
                  <div className="wishlist_card">
                    <div className="wishlist_img">
                      <img src={product.image} className="w-100" />
                    </div>
                    <div className="wishlist_info">
                      <h3>Product Name</h3>
                      <p>
                        $399<span>$449</span>
                        <label>(50% OFF)</label>
                      </p>
                    </div>
                    <div className="move_bag_btn d-flex">
                      <button
                        className="btn w-100"
                        onClick={() => removeFromWishList(product.id)}
                      >
                        Remove
                      </button>
                      <button className="btn w-100">Move To Bag</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div class="row justify-content-center">
            <div class="col-md-4 text-center">
                <img src={noWishlist} alt="" class="text-center align-items-center" height="350px" width="350px" />      
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishList;
