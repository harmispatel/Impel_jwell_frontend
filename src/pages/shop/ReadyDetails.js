import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../components/common/BreadCrumb";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { BsCartDash, BsHandbagFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { ReadyDesignCartSystem } from "../../context/ReadyDesignCartContext";
import noImage from "../../assets/images/No_Image_Available.jpg";
import profileService from "../../services/Home";
import { Accordion } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FaArrowLeftLong } from "react-icons/fa6";
import { motion } from "framer-motion";

const api = process.env.REACT_APP_API_KEY;

const ReadyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phone = localStorage.getItem("phone");
  const { id } = useParams();
  const user_id = localStorage.getItem("user_id");

  const { dispatch: addtocartDispatch } = useContext(ReadyDesignCartSystem);

  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [allPrices, setAllPrices] = useState([]);
  const [accordionOpen, setAccordionOpen] = useState(true);

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  useEffect(() => {
    const getDetails = () => {
      fetch("https://api.indianjewelcast.com/api/Tag/GetAll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PageNo: 1,
          PageSize: 100,
          DeviceID: 0,
          SearchText: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setDetails(data?.Tags[0]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };

    getDetails();
    GetUserCartList();
  }, [id]);

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
    {
      show_estimate: allPrices?.show_estimate,
    },
  ];

  const sales_wastage_of_category =
    details && finalPrice[1]?.sales_wastage
      ? finalPrice[1].sales_wastage[details.SubItemID] || 0
      : 0;

  const sales_wastage_discount_of_category =
    details && finalPrice[2]?.sales_wastage_discount
      ? finalPrice[2].sales_wastage_discount[details.SubItemID] || 0
      : 0;

  const is_estimate =
    details && finalPrice[3]?.show_estimate
      ? finalPrice[3].show_estimate[details.SubItemID] || 0
      : 0;

  var metal_value =
    details && finalPrice[0]?.price_24k
      ? finalPrice[0].price_24k[details.SubItemID] *
          (details?.Touch / 100) *
          details?.NetWt || 0
      : 0;

  var labour_charge =
    details && finalPrice[0]?.price_24k
      ? (finalPrice[0].price_24k[details.SubItemID] *
          sales_wastage_of_category) /
          100 || 0
      : 0;

  if (labour_charge > 0) {
    labour_charge = labour_charge * details?.NetWt || 0;
  }

  if (sales_wastage_discount_of_category > 0) {
    var labour_charge_discount =
      labour_charge -
      (labour_charge * sales_wastage_discount_of_category) / 100;
  } else {
    var labour_charge_discount = 0;
  }

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN")?.format(Math?.round(value));

  const handleAddToCart = (product) => {
    const payload = { id: product?.TagNo };
    setSpinner(true);
    axios
      .post(api + "ready/cart-store", {
        phone: phone,
        tag_no: details?.TagNo,
        group_name: details?.GroupName,
        name: id,
        size: details?.Size1,
        gross_weight: details?.GrossWt,
        net_weight: details?.NetWt,
        item_group_id: details?.ItemGroupID,
        item_id: details?.ItemID,
        sub_item_id: details?.SubItemID,
        style_id: details?.StyleID,
        quantity: 1,
        barcode: details?.Barcode,
        company_id: 4,
        metal_value: metal_value || 0,
        making_charge: labour_charge || 0,
        making_charge_discount: labour_charge_discount || 0,
        total_amount:
          labour_charge_discount > 0
            ? metal_value + labour_charge_discount
            : metal_value + labour_charge || 0,
      })
      .then((res) => {
        if (res?.data?.status === true) {
          toast.success(res?.data?.message);
          GetUserCartList();
          addtocartDispatch({
            type: "ADD_TO_CART",
            payload,
          });
        } else {
          toast.error(res?.data?.message);
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

  const UserLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("redirectPath", location.pathname);
    navigate("/login");
  };

  return (
    <>
      <Helmet>
        <title>
          Impel Store - {details?.GroupName ? `(${details.GroupName})` : ""}
        </title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <section className="shop_details">
        <div className="container">
          <div className="Shop_product">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="breadcumb-section-btn mb-4">
                  <BreadCrumb
                    firstName="Home"
                    firstUrl="/"
                    secondName="Ready to dispatch"
                    secondUrl="/ready-to-dispatch"
                  />
                  <button
                    className="btn btn-outline-dark d-flex align-items-center text-center"
                    onClick={() => navigate(-1)}
                  >
                    <FaArrowLeftLong />
                  </button>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div id="imageMagnifyer">
                      {isLoading ? (
                        <Skeleton style={{ height: "526px" }} width="100%" />
                      ) : (
                        <motion.img
                          // src={`${imageURL}${details?.Barcode}.jpg`}
                          src={`https://api.indianjewelcast.com/TagImage/${details?.Barcode}.jpg`}
                          alt=""
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              noImage?.No_Image_Available ||
                              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
                          }}
                          className="w-100"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    {isLoading ? (
                      <>
                        <Skeleton height={30} width="60%" />
                        <Skeleton height={20} width="40%" className="my-2" />
                        <Skeleton height={20} width="50%" className="my-2" />
                        <Skeleton height={20} width="70%" className="my-2" />
                        <Skeleton height={150} width="100%" className="mt-3" />
                        <Skeleton height={30} width="100%" className="mt-3" />
                      </>
                    ) : (
                      <>
                        <div>
                          <h4>
                            <b>{details?.TagNo}</b>
                          </h4>
                          <h5 className="mb-3">
                            Metal : <strong>{details?.GroupName}</strong>
                          </h5>

                          <h5 className="mb-3">
                            Size : <strong>{details?.Size1 || "-"}</strong>
                          </h5>
                          {is_estimate == 1 ? (
                            <>
                              <div className="mt-3">
                                <Accordion className="accordian">
                                  <Accordion.Item eventKey="3" className="my-2">
                                    <Accordion.Header onClick={toggleAccordion}>
                                      Approximate - Estimate
                                    </Accordion.Header>
                                    <Accordion.Body className="p-0">
                                      <table className="table table-bordered mb-0">
                                        <tbody>
                                          <tr>
                                            <th>Gross Weight</th>
                                            <td>
                                              {details?.GrossWt} g. (Approx.)
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Net Weight</th>
                                            <td>
                                              {details?.NetWt} g. (Approx.)
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Metal value</th>
                                            <td>
                                              ₹{numberFormat(metal_value)}
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>Making charge</th>
                                            {labour_charge_discount > 0 &&
                                            user_id ? (
                                              <td>
                                                <del>
                                                  ₹{numberFormat(labour_charge)}
                                                </del>{" "}
                                                &nbsp;{" "}
                                                <strong>
                                                  ₹
                                                  {numberFormat(
                                                    labour_charge_discount
                                                  )}
                                                </strong>
                                              </td>
                                            ) : (
                                              <td>
                                                <>
                                                  <strong>
                                                    ₹
                                                    {numberFormat(
                                                      labour_charge
                                                    )}
                                                  </strong>
                                                </>
                                              </td>
                                            )}
                                          </tr>
                                          <tr>
                                            <th>Total Amount</th>
                                            {labour_charge_discount > 0 &&
                                            user_id ? (
                                              <td>
                                                <strong className="text-success">
                                                  ₹
                                                  {numberFormat(
                                                    metal_value +
                                                      labour_charge_discount
                                                  )}
                                                </strong>
                                              </td>
                                            ) : (
                                              <td>
                                                <>
                                                  <strong className="text-success">
                                                    ₹
                                                    {numberFormat(
                                                      metal_value +
                                                        labour_charge
                                                    )}
                                                  </strong>
                                                </>
                                              </td>
                                            )}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Accordion>
                                {accordionOpen && (
                                  <div className="mt-3">
                                    <table className="table table-bordered">
                                      <tbody>
                                        <tr>
                                          <th>Total Amount</th>
                                          {labour_charge_discount > 0 &&
                                          user_id ? (
                                            <td>
                                              <del>
                                                ₹
                                                {numberFormat(
                                                  labour_charge + metal_value
                                                )}
                                              </del>{" "}
                                              &nbsp;{" "}
                                              <strong className="text-success">
                                                ₹
                                                {numberFormat(
                                                  labour_charge_discount +
                                                    metal_value
                                                )}
                                              </strong>
                                            </td>
                                          ) : (
                                            <td>
                                              <>
                                                <strong className="text-success">
                                                  ₹
                                                  {numberFormat(
                                                    metal_value + labour_charge
                                                  )}
                                                </strong>
                                              </>
                                            </td>
                                          )}
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              {accordionOpen && (
                                <div className="mt-3">
                                  <table className="table table-bordered">
                                    <tbody>
                                      <tr>
                                        <th>Total Amount</th>
                                        {labour_charge_discount > 0 &&
                                        user_id ? (
                                          <td>
                                            <del>
                                              ₹
                                              {numberFormat(
                                                labour_charge + metal_value
                                              )}
                                            </del>{" "}
                                            &nbsp;{" "}
                                            <strong className="text-success">
                                              ₹
                                              {numberFormat(
                                                labour_charge_discount +
                                                  metal_value
                                              )}
                                            </strong>
                                          </td>
                                        ) : (
                                          <td>
                                            <>
                                              <strong className="text-success">
                                                ₹
                                                {numberFormat(
                                                  metal_value + labour_charge
                                                )}
                                              </strong>
                                            </>
                                          </td>
                                        )}
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </>
                          )}
                        </div>
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
                            {phone ? (
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
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                        {phone && (
                          <>
                            {cartItems &&
                            cartItems?.find(
                              (item) => item?.tag_no === details?.TagNo
                            ) ? (
                              ""
                            ) : (
                              <div className="discount-info">
                                <span>
                                  To get Maximum Discount apply coupon code in
                                  cart.
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReadyDetails;
