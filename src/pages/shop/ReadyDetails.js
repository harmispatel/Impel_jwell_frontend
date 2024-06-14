import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/common/BreadCrumb";
import Loader from "../../components/common/Loader";
import axios from "axios";
import profileService from "../../services/Home";

const ReadyDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");

  // const getFilters = () => {
  //   profileService
  //     .GetProductsAPI({
  //       PageNo: 1,
  //       PageSize: 100,
  //       DeviceID: 0,
  //       SortBy: "",
  //       SearchText: "",
  //       TranType: "",
  //       CommaSeperate_ItemGroupID: "",
  //       CommaSeperate_ItemID: "",
  //       CommaSeperate_StyleID: "",
  //       CommaSeperate_ProductID: "",
  //       CommaSeperate_SubItemID: "",
  //       CommaSeperate_AppItemCategoryID: "",
  //       CommaSeperate_ItemSubID: "",
  //       CommaSeperate_KarigarID: "",
  //       CommaSeperate_BranchID: "",
  //       CommaSeperate_Size: "",
  //       CommaSeperate_CounterID: "",
  //       MaxNetWt: 0,
  //       MinNetWt: 0,
  //       OnlyCartItem: false,
  //       OnlyWishlistItem: false,
  //       StockStatus: "",
  //       DoNotShowInClientApp: 0,
  //       HasTagImage: 0,
  //     })
  //     .then((res) => {
  //       console.log(res?.Tags?.filter((tagNo) => tagNo?.TagNo == details?.TagNo), "oyyyeeeee");
  //       // console.log(res?.Tags);
  //       setImage(res?.Tags);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    const getDetails = () => {
      axios
        .post(`https://api.indianjewelcast.com/api/Tag/GetInfo?TagNo=${id}`)
        .then((res) => {
          setDetails(res?.data?.lstTagInfo[0]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };
    getDetails();
  }, []);

  return (
    <>
      <section className="shop_details">
        <div className="container">
          <div className="Shop_product">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <BreadCrumb
                  firstName="Home"
                  firstUrl="/"
                  secondName="Ready to dispatch"
                  secondUrl="/ready-to-dispatch"
                  thirdName={id}
                />
                {isLoading ? (
                  <div className="animation-loading">
                    <Loader />
                  </div>
                ) : (
                  <>
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <div id="imageMagnifyer">
                            <img
                              src="https://api.indianjewelcast.com//TagImage/913801737234.jpg"
                              alt=""
                              className="w-100"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <h4>{details?.GroupName}</h4>
                          <h5 className="mb-3">
                            Tag no : <strong>{details?.TagNo}</strong>
                          </h5>
                          <h5 className="mb-3">
                            Design code : <strong>{details?.DesignCode}</strong>
                          </h5>
                          <h5 className="mb-3">
                            Price : <strong>{details?.MRP}</strong>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReadyDetails;
