import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BreadCrumb from "../../components/common/BreadCrumb";
import Loader from "../../components/common/Loader";
import axios from "axios";
import { BsCartDash, BsHandbagFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const api = process.env.REACT_APP_READY_API_KEY;

const ReadyDetails = () => {
  const phone = localStorage.getItem("phone");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [spinner, setSpinner] = useState(false);

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
    GetUserCartList();
  }, []);

  const GetUserCartList = async () => {
    axios
      .post("http://192.168.1.177/admin_impel/api/ready/cart-list", {
        phone: phone,
      })
      .then((res) => {
        setCartItems(res.data.carts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToCart = () => {
    setSpinner(true);
    axios
      .post("http://192.168.1.177/admin_impel/api/ready/cart-store", {
        phone: phone,
        tag_no: details?.TagNo,
        group_name: details?.GroupName,
        name: "CP 18Y",
        price: details?.MRP || 0,
        size: details?.Size1,
        gross_weight: details?.GrossWt,
        net_weight: details?.NetWt,
        quantity: 1,
      })
      .then((res) => {
        if (res.status === true) {
          toast.success(res.message);
          GetUserCartList();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSpinner(false);
      });
  };

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN")?.format(Math?.round(value));

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
                              src={`https://api.indianjewelcast.com/TagImage/${details?.Barcode}.jpg`}
                              alt=""
                              className="w-100"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <h4>
                            <b>{details?.TagNo}</b>
                          </h4>
                          <h5 className="mb-3">
                            Metal : <strong>{details?.GroupName}</strong>
                          </h5>
                          {/* <h5 className="mb-3">
                            Design code : <strong>{details?.DesignCode}</strong>
                          </h5> */}
                          <h5 className="mb-3">
                            Size : <strong>{details?.Size1 || "---"}</strong>
                          </h5>
                          <h5 className="mb-3">
                            Gross Weight :{" "}
                            <strong>{details?.GrossWt} Gram(Approx.)</strong>
                          </h5>
                          <h5 className="mb-3">
                            Net Weight :{" "}
                            <strong>{details?.NetWt} Gram(Approx.)</strong>
                          </h5>
                          <h5 className="mb-3">
                            Price :{" "}
                            <strong>
                              ₹{numberFormat(details?.MRP || "1000")}
                            </strong>
                            {/* Price : <strong>₹1000</strong> */}
                          </h5>
                        </div>
                        {/* <div className="button d-flex pt-2">
                          <div className="add_cart align-items-center d-flex">
                            <>
                              <div>
                                <button
                                  className="btn btn-outline-dark"
                                  onClick={() => handleAddToCart()}
                                >
                                  <BsHandbagFill
                                    style={{
                                      fontSize: "26px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </button>
                              </div>
                            </>
                          </div>
                        </div> */}
                        <>
                          {cartItems &&
                          cartItems?.find(
                            (item) => item?.tag_no === details?.TagNo
                          ) ? (
                            <>
                              <Link className="btn btn-outline-dark" to="/cart">
                                <BsCartDash
                                  style={{
                                    fontSize: "26px",
                                    cursor: "pointer",
                                  }}
                                />
                              </Link>
                            </>
                          ) : (
                            <>
                              <div>
                                <button
                                  className="btn btn-outline-dark"
                                  onClick={() => handleAddToCart()}
                                  disabled={spinner}
                                >
                                  {spinner && (
                                    <CgSpinner
                                      size={20}
                                      className="animate_spin"
                                    />
                                  )}
                                  {!spinner && (
                                    <BsHandbagFill
                                      style={{
                                        fontSize: "26px",
                                        cursor: "pointer",
                                      }}
                                    />
                                  )}
                                </button>
                              </div>
                            </>
                          )}
                        </>
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
