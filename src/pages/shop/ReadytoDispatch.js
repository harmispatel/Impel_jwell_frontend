import axios from "axios";
import React, { useEffect, useState } from "react";
import profileService from "../../services/Home";
import { Link } from "react-router-dom";
import Loader from "../../components/common/Loader";

const ReadytoDispatch = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = () => {
    profileService
      .GetProductsAPI({
        PageNo: 1,
        PageSize: 100,
        DeviceID: 0,
        SortBy: "",
        SearchText: "",
        TranType: "",
        CommaSeperate_ItemGroupID: "",
        CommaSeperate_ItemID: "",
        CommaSeperate_StyleID: "",
        CommaSeperate_ProductID: "",
        CommaSeperate_SubItemID: "",
        CommaSeperate_AppItemCategoryID: "",
        CommaSeperate_ItemSubID: "",
        CommaSeperate_KarigarID: "",
        CommaSeperate_BranchID: "",
        CommaSeperate_Size: "",
        CommaSeperate_CounterID: "",
        MaxNetWt: 0,
        MinNetWt: 0,
        OnlyCartItem: false,
        OnlyWishlistItem: false,
        StockStatus: "",
        DoNotShowInClientApp: 0,
        HasTagImage: 0,
      })
      .then((res) => {
        setProducts(res?.Tags);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <section className="ready-to-dispatch">
        <div className="container">
          <div className="row">
            {isLoading ? (
              <div className="animation-loading">
                <Loader />
              </div>
            ) : (
              <>
                {products?.map((data) => {
                  return (
                    <div className="col-md-3 col-sm-4 col-xs-6">
                      <div className="item-product text-center">
                        <Link to={`/ready-to-dispatch/${data?.TagNo}`}>
                          <div className="product-thumb">
                            {data?.Images[0]?.ImageName ? (
                              <>
                                <img
                                  src={`https://api.indianjewelcast.com/${data?.Images[0]?.ImageName}`}
                                  alt={`https://api.indianjewelcast.com/${data?.Images[0]?.ImageName}`}
                                  className="w-100"
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                                  alt=""
                                  className="w-100"
                                />
                              </>
                            )}
                          </div>
                          <div className="product-info">
                            <label>₹{data?.MRP?.toLocaleString("en-US")}</label>
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ReadytoDispatch;