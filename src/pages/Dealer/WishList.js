import React, { useEffect, useState } from "react";
import noWishlist from "../../assets/images/wishlist.png";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import DealerWishlist from "../../services/Dealer/Collection";

const DealerWishList = () => {
  const DealerEmail = localStorage.getItem("email");
  const [checkList, setCheckList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingItemId, setRemovingItemId] = useState(null);

  const collectionCheck = () => {
    DealerWishlist.ListCollection({ email: DealerEmail })
      .then((res) => {
        setIsLoading(false);
        setCheckList(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const removeFromWishList = (product) => {
    setRemovingItemId(product);
    DealerWishlist.removetoWishlist({ email: DealerEmail, design_id: product })
      .then((res) => {
        if (res.success === true) {
          toast.success(res.message);
          collectionCheck();
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
    collectionCheck();
  }, []);

  return (
    <section className="wishlist">
      <div className="container">
        <h2>My Selections</h2>
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
            {checkList?.length ? (
              <>
                <div className="product_washlist">
                  {checkList?.map((product) => {
                    return (
                      <div className="wishlist_card">
                        <div className="wishlist_img">
                          <img src={product?.image} className="w-100" />
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
                            {removingItemId === product?.id && (
                              <CgSpinner
                                size={20}
                                className="animate_spin me-2"
                              />
                            )}
                            Remove
                          </button>
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
    </section>
  );
};

export default DealerWishList;
