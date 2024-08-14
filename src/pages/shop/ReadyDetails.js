import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../components/common/BreadCrumb";
import Loader from "../../components/common/Loader";
import axios from "axios";
import { BsCartDash, BsHandbagFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { ReadyDesignCartSystem } from "../../context/ReadyDesignCartContext";
import noImage from "../../assets/images/No_Image_Available.jpg";
import profileService from "../../services/Home";

const api = process.env.REACT_APP_API_KEY;
const imageURL = process.env.REACT_APP_API_KEY_IMAGE;

const ReadyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phone = localStorage.getItem("phone");
  const { id, ids } = useParams();

  const { dispatch: addtocartDispatch } = useContext(ReadyDesignCartSystem);

  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [allPrices, setAllPrices] = useState([]);

  useEffect(() => {
    const getDetails = () => {
      profileService
        .GetProductsAPI({
          PageNo: 1,
          PageSize: 100,
          DeviceID: 0,
          SearchText: id,
        })
        .then((res) => {
          setDetails(res?.Tags[0]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };

    getDetails();
    GetUserCartList();
  }, [ids]);

  const GetUserCartList = async () => {
    axios
      .post(api + "ready/cart-list", {
        phone: phone,
      })
      .then((res) => {
        setCartItems(res?.data?.data?.carts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToCart = (product) => {
    const payload = { id: product?.TagNo };
    setSpinner(true);
    axios
      .post(api + "ready/cart-store", {
        phone: phone,
        tag_no: details?.TagNo,
        group_name: details?.GroupName,
        name: id,
        price: details?.MRP || 0,
        size: details?.Size1,
        gross_weight: details?.GrossWt,
        net_weight: details?.NetWt,
        quantity: 1,
        barcode: details?.Barcode,
        gold_id: ids == 1 ? 1 : 3,
      })
      .then((res) => {
        if (res?.data?.status === true) {
          toast.success(res?.data?.message);
          GetUserCartList();
          addtocartDispatch({
            type: "ADD_TO_CART",
            payload,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSpinner(false);
      });
  };

  useEffect(() => {
    profileService
      .GetProductsPrices()
      .then((res) => {
        setAllPrices(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN")?.format(Math?.round(value));

  const UserLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("redirectPath", location.pathname);
    navigate("/login");
  };

  var finalPrice = [
    {
      price_24k: allPrices?.price_24k,
    },
    {
      sales_wastage: allPrices?.sales_wastage_rtd,
    },
    {
      sales_wastage_discount: allPrices?.sales_wastage_discount_rtd,
    },
  ];

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
                  secondUrl={`/ready-to-dispatch/${ids}`}
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
                              src={`${imageURL}${details?.Barcode}.jpg`}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  noImage?.No_Image_Available ||
                                  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
                              }}
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
                        <>
                          {phone ? (
                            <>
                              {cartItems &&
                              cartItems?.find(
                                (item) => item?.tag_no === details?.TagNo
                              ) ? (
                                <>
                                  <Link
                                    className="btn btn-outline-dark"
                                    to="/ready-design-cart"
                                  >
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
                                      onClick={() => handleAddToCart(details)}
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
                          ) : (
                            <>
                              <button
                                className="btn btn-outline-dark"
                                onClick={(e) => UserLogin(e)}
                              >
                                <BsHandbagFill
                                  style={{
                                    fontSize: "26px",
                                    cursor: "pointer",
                                  }}
                                />
                              </button>
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
