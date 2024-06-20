import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../../components/common/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import emptycart from "../../assets/images/empty-cart.png";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import toast from "react-hot-toast";
import { ReadyDesignCartSystem } from "../../context/ReadyDesignCartContext";
import UserService from "../../services/Cart";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const api = process.env.REACT_APP_READY_API_KEY;

const options = ["Cash on delivery", "PhonePay"];

const ReadyDesignCart = () => {
  const user_id = localStorage.getItem("user_id");
  const location = useLocation();
  const navigate = useNavigate();
  const phone = localStorage.getItem("phone");
  const { dispatch: removeFromCartDispatch } = useContext(
    ReadyDesignCartSystem
  );

  const [isLoading, setIsLoading] = useState(true);
  const [Items, setItems] = useState([]);
  const [removingItemId, setRemovingItemId] = useState(null);

  const [selectPaymentMethod, setSelectPaymentMethod] =
    useState("Cash on delivery");

  const { dispatch: resetcartcount } = useContext(ReadyDesignCartSystem);

  const handleSelectPayment = (selectedOption) => {
    setSelectPaymentMethod(selectedOption?.value);
  };

  const GetUserCartList = async () => {
    axios
      .post(api + "ready/cart-list", {
        phone: phone,
      })
      .then((res) => {
        setItems(res?.data?.data?.carts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const Remove = (id) => {
    setRemovingItemId(id);
    const payload = id;
    axios
      .post(api + "ready/cart-remove", {
        cart_id: id,
      })
      .then((res) => {
        if (res?.data?.status === true) {
          GetUserCartList();
          toast.success(res?.data?.message);
          removeFromCartDispatch({
            type: "REMOVE_FROM_CART",
            payload,
          });
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
    GetUserCartList();
  }, [selectPaymentMethod]);

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN")?.format(Math?.round(value));

  const SubAmount = () => {
    let subTotal = 0;

    Items.forEach((data) => {
      const price = parseFloat(data.price);
      subTotal += price;
    });

    return subTotal;
  };

  const SubGST = () => {
    let subGst = 0;
    Items.forEach((data) => {
      const price = parseFloat(data.price);
      subGst += price;
    });
    const gstAmount = subGst * 0.03;
    return gstAmount;
  };

  const handlePhonepeClick = () => {
    UserService.PayByPhonepeAPI({
      user_id: user_id,
      total_amount: (SubAmount() + SubGST()).toFixed(),
    })
      .then((res) => {
        if (res?.success === false) {
          toast.error(res?.message);
        } else {
          window.location.href =
            res?.data?.instrumentResponse?.redirectInfo?.url;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCashClick = () => {
    axios
      .post(api + "ready/purchase-order", {
        user_id: user_id,
        payment_method: "cash",
        cart_items: Items?.map((item) => item?.id),
        sub_total: SubAmount(),
        gst_amount: SubGST().toFixed(),
        total: (SubAmount() + SubGST()).toFixed(),
      })
      .then((res) => {
        navigate(`/ready-order-details/${res?.data?.data}`);
        resetcartcount({ type: "RESET_CART" });
        toast.success(res.data.message);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (location.pathname == "/processing-order") {
      const queryParams = new URLSearchParams(location.search);
      const transaction_id = queryParams.get("transaction_id") || "";
      axios
        .post(api + "ready/purchase-order", {
          user_id: user_id,
          payment_method: "phonepe",
          cart_items: Items?.map((item) => item?.id),
          sub_total: SubAmount(),
          gst_amount: SubGST().toFixed(),
          total: (SubAmount() + SubGST()).toFixed(),
          transaction_id: transaction_id ? transaction_id : "",
        })
        .then((res) => {
          navigate(`/ready-order-details/${res?.data?.data}`);
          resetcartcount({ type: "RESET_CART" });
          toast.success(res.data.message);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [location, Items]);

  return (
    <>
      <Helmet>
        <title>Impel Store - Ready products cart</title>
      </Helmet>

      {location.pathname == "/processing-order" ? (
        <div className="animation-loading">
          <Loader />
        </div>
      ) : (
        <>
          <section className="cart">
            <div className="container">
              {isLoading ? (
                <>
                  <div className="animation-loading">
                    <Loader />
                  </div>
                </>
              ) : (
                <>
                  {Items?.length ? (
                    <>
                      <div className="row">
                        <div className="col-md-9">
                          <div className="card border shadow-0">
                            <div className="m-4">
                              <h4 className="card-title mb-4">
                                Your shopping cart
                              </h4>
                              <div className="row gy-3">
                                <>
                                  <div className="col-md-12">
                                    <hr className="mt-0" />
                                  </div>
                                  {Items?.map((data, index) => {
                                    return (
                                      <>
                                        <div className="col-md-3" key={index}>
                                          <div className="d-flex">
                                            <Link
                                              to={`/ready-to-dispatch/${data.tag_no}`}
                                              className="nav-link"
                                            >
                                              <img
                                                src={`https://api.indianjewelcast.com/TagImage/${data?.barcode}.jpg`}
                                                onError={(e) => {
                                                  e.target.onerror = null;
                                                  e.target.src =
                                                    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
                                                }}
                                                className="border rounded me-3 w-100 p-2"
                                                alt=""
                                              />
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="cart_product_name">
                                            <Link
                                              to={`/ready-to-dispatch/${data?.tag_no}`}
                                              className="nav-link"
                                            >
                                              <b>{data?.tag_no}</b>
                                            </Link>
                                          </div>

                                          <div className="mt-md-2">
                                            <span>
                                              Gold Color : &nbsp;
                                              <b>{data?.group_name}</b>
                                            </span>
                                          </div>
                                          <div className="mt-3">
                                            <h6>
                                              ₹{numberFormat(data?.price)}
                                            </h6>
                                          </div>
                                        </div>

                                        <div className="col-md-5">
                                          <div className="text-md-end">
                                            <Link
                                              to="#"
                                              className="btn btn-light border text-danger icon-hover-danger text-end"
                                              onClick={() => Remove(data.id)}
                                            >
                                              {removingItemId === data.id && (
                                                <CgSpinner
                                                  size={20}
                                                  className="animate_spin"
                                                />
                                              )}
                                              {removingItemId === data.id ? (
                                                ""
                                              ) : (
                                                <MdDelete />
                                              )}
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <hr className="mt-0" />
                                        </div>
                                      </>
                                    );
                                  })}
                                </>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 mt-3 mt-md-0">
                          <div className="card shadow-0 border">
                            <div className="card-body">
                              {/* Sub Total :*/}
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Sub total :</p>
                                <p className="mb-2 fw-bold">
                                  ₹{numberFormat(SubAmount())}
                                </p>
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">GST (3%)</p>
                                <p className="mb-2 fw-bold">
                                  ₹{numberFormat(SubGST()?.toFixed())}
                                </p>
                              </div>
                              <hr />

                              {/* Total price :*/}
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Total price :</p>
                                <p className="mb-2 fw-bold">
                                  ₹{numberFormat(SubAmount() + SubGST())}
                                </p>
                              </div>
                              <hr />
                              <div className="mt-2">
                                <label htmlFor="Payment Method">
                                  Payment Method :
                                </label>
                                <Dropdown
                                  options={options}
                                  placeholder="Select.."
                                  value={selectPaymentMethod}
                                  onChange={handleSelectPayment}
                                  className="mt-1 w-100"
                                />
                              </div>

                              <div className="pt-2">
                                {selectPaymentMethod === "Cash on delivery" ? (
                                  <button
                                    className="btn btn-success w-100 shadow-0 mb-2"
                                    onClick={(e) => {
                                      handleCashClick();
                                    }}
                                  >
                                    Proceed to pay
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-success w-100 shadow-0 mb-2"
                                    onClick={(e) => {
                                      handlePhonepeClick();
                                    }}
                                  >
                                    Proceed to pay
                                  </button>
                                )}

                                <button
                                  type="button"
                                  className="light-up-button w-100 rounded-2"
                                  onClick={() => navigate("/ready-to-dispatch")}
                                >
                                  Back to shop
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row justify-content-center">
                        <div className="col-lg-8">
                          <div className="card border shadow-sm p-4">
                            <div className="text-center mb-4">
                              <h2 className="card-title mb-0">
                                Your Shopping Cart
                              </h2>
                            </div>

                            <div className="text-center my-4">
                              <img
                                src={emptycart}
                                alt="Empty Cart Illustration"
                                className="img-fluid mb-3"
                                style={{ maxWidth: "200px" }}
                              />
                              <h5 className="text-muted mb-3">
                                Oops! Your cart is empty.
                              </h5>
                              <p className="text-muted">
                                Explore our collection and add items to your
                                cart.
                              </p>
                            </div>

                            <div className="text-center">
                              <Link
                                to="/ready-to-dispatch"
                                className="view_all_btn px-4 py-2"
                                style={{ borderRadius: "8px" }}
                              >
                                <FaLongArrowAltLeft className="mr-2" />{" "}
                                &nbsp;Back to Shop
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* <Modal
                className="form_intent profile_model"
                centered
                show={showEdit}
              >
                <Modal.Header>
                  <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form onSubmit={(e) => handleUpdateProfile(e, selectedData)}>
                    <div className="row edit-user-form">
                      <div className="col-md-6">
                        <Form.Group
                          as={Col}
                          className="mb-2"
                          controlId="formGridState"
                        >
                          <Form.Label>
                            Name
                            <span className="text-danger">
                              <b>*</b>
                            </span>
                          </Form.Label>
                          <Form.Control
                            name="name"
                            defaultValue={selectedData.name}
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter Your Name"
                          />
                          {error.nameErr && (
                            <span className="text-danger">{error.nameErr}</span>
                          )}
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group
                          as={Col}
                          className="mb-2"
                          controlId="formGridState"
                        >
                          <Form.Label>
                            Email<span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            name="email"
                            defaultValue={selectedData.email}
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter Your Email"
                          />
                          <span className="text-danger">{error.emailErr}</span>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group
                          as={Col}
                          className="mb-2"
                          controlId="formGridState"
                        >
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            defaultValue={profileData?.phone?.replace(
                              "+91",
                              ""
                            )}
                            disabled
                          />
                        </Form.Group>
                      </div>

                      <div className="col-md-6 mb-3">
                        <Form.Group
                          className="mb-2"
                          controlId="formGridAddress1"
                        >
                          <Form.Label>
                            Pan-card
                            {valid ? (
                              <span className="text-danger">*</span>
                            ) : (
                              ""
                            )}
                          </Form.Label>
                          <Form.Control
                            name="pan_no"
                            defaultValue={selectedData.pan_no}
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter Your Pancard number"
                          />
                          {valid && (
                            <span className="text-danger">{valid}</span>
                          )}
                        </Form.Group>
                      </div>

                      <div className="col-md-12">
                        <hr className="mt-0" />
                      </div>
                      <div className="col-md-6">
                        <Form.Group
                          as={Col}
                          className="mb-2"
                          controlId="formGridZip"
                        >
                          <Form.Label>
                            Billing Address
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <textarea
                            name="address"
                            className="form-control"
                            defaultValue={selectedData.address}
                            rows={4}
                            style={{ resize: "none", height: "auto" }}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            placeholder="Enter Your Address"
                          />
                          {error.addressErr && (
                            <span className="text-danger">
                              {error.addressErr}
                            </span>
                          )}
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group
                          className="mb-2"
                          controlId="formGridAddress1"
                        >
                          <Form.Label>
                            State<span className="text-danger">*</span>
                          </Form.Label>
                          <select
                            className="form-control"
                            name="state"
                            onChange={(e) => {
                              handleChange(e);
                              fetchCity(e.target.value);
                            }}
                            value={userData.state}
                          >
                            <option value="">--state select--</option>
                            {profileData?.states?.map((userstate, index) => (
                              <option key={index} value={userstate.id}>
                                {userstate.name}
                              </option>
                            ))}
                          </select>
                          <span className="text-danger">{error.stateErr}</span>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group
                          className="mb-2"
                          controlId="formGridAddress1"
                        >
                          <Form.Label>
                            City<span className="text-danger">*</span>
                          </Form.Label>
                          <select
                            className="form-control"
                            name="city"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={userData.city}
                          >
                            <option value="">--city select--</option>
                            {city?.map((usercity, index) => (
                              <option key={index} value={usercity?.id}>
                                {usercity?.name}
                              </option>
                            ))}
                          </select>
                          <span className="text-danger">{error.cityErr}</span>
                        </Form.Group>
                      </div>
                      <div className="col-md-6 mb-3">
                        <Form.Group
                          className="mb-2"
                          controlId="formGridAddress1"
                        >
                          <Form.Label>
                            Pincode<span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            name="pincode"
                            defaultValue={selectedData.pincode}
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter Your Pincode"
                            maxLength={6}
                          />
                          <span className="text-danger">
                            {error.pincodeErr}
                          </span>
                        </Form.Group>
                      </div>
                      <div className="address-checkbox-btn">
                        <input
                          type="checkbox"
                          id="checkbox"
                          name="address_same_as_company"
                          className="address-checkbox"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                          style={{ cursor: "pointer" }}
                        />
                        <label
                          htmlFor="checkbox"
                          className="ms-1 address-check-text"
                          style={{ cursor: "pointer" }}
                        >
                          Shipping Address is as same above then check this box
                        </label>
                      </div>
                      <div className="col-md-12">
                        <hr className="mt-3" />
                      </div>
                      <div className="col-md-6">
                        <Form.Group
                          as={Col}
                          className="mb-2"
                          controlId="formGridZip"
                        >
                          <Form.Label>
                            Shipping Address
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <textarea
                            name="shipping_address"
                            className="form-control"
                            value={userData.shipping_address}
                            rows={4}
                            style={{ resize: "none", height: "auto" }}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            placeholder="Enter Your Address"
                          />
                          <span className="text-danger">
                            {error.shipping_address_err}
                          </span>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group
                          className="mb-2"
                          controlId="formGridAddress1"
                        >
                          <Form.Label>
                            Shipping State<span className="text-danger">*</span>
                          </Form.Label>
                          <select
                            className="form-control"
                            name="shipping_state"
                            onChange={(e) => {
                              handleChange(e);
                              fetchShippingCity(e.target.value);
                            }}
                            value={userData.shipping_state}
                          >
                            <option value="">--shipping state select--</option>
                            {profileData?.states?.map((userstate, index) => (
                              <option key={index} value={userstate.id}>
                                {userstate.name}
                              </option>
                            ))}
                          </select>
                          <span className="text-danger">
                            {error.shipping_state_err}
                          </span>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group
                          className="mb-2"
                          controlId="formGridAddress1"
                        >
                          <Form.Label>
                            Shipping City<span className="text-danger">*</span>
                          </Form.Label>
                          <select
                            className="form-control"
                            name="shipping_city"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={userData.shipping_city}
                          >
                            <option value="">--shipping City select--</option>
                            {shipping_city?.map((usercity, index) => (
                              <option key={index} value={usercity?.id}>
                                {usercity?.name}
                              </option>
                            ))}
                          </select>
                          <span className="text-danger">
                            {error.shipping_city_err}
                          </span>
                        </Form.Group>
                      </div>
                      <div className="col-md-6 mb-3">
                        <Form.Group
                          className="mb-2"
                          controlId="formGridAddress1"
                        >
                          <Form.Label>
                            Shipping Pincode
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            name="shipping_pincode"
                            value={userData.shipping_pincode}
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter Your Pincode"
                            maxLength={6}
                          />
                          <span className="text-danger">
                            {error.shipping_pincode_err}
                          </span>
                        </Form.Group>
                      </div>
                    </div>

                    <div className="text-center">
                      <button className="update_order_btn">
                        {spinner && (
                          <CgSpinner size={20} className="animate_spin mx-3" />
                        )}
                        {spinner ? "" : "Update"}
                      </button>
                    </div>
                  </Form>
                </Modal.Body>
              </Modal> */}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ReadyDesignCart;
