import React, { useState } from "react";
import { BsBehance, BsHeart } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/Cart";
import { useEffect } from "react";
import ReactLoading from "react-loading";
import toast from "react-hot-toast";
import { Button, Modal } from "react-bootstrap";
import { CgSpinner } from "react-icons/cg";

const Cart = () => {
  const navigate = useNavigate();
  const Phone = localStorage.getItem("phone");
  const Verification = localStorage.getItem("verification");
  const [Items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dealer_code, setDealerCode] = useState("");
  const [code, setCode] = useState("");
  const [isFormEmpty, setIsFormEmpty] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [removingItemId, setRemovingItemId] = useState(null);

  // const handlecountchange = (update_type, id) => {
  //   console.log(update_type);
  //   UserService.Updatecart({ id: id, update_type: update_type })
  //     .then((res) => {})
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const UserCartItems = () => {
    UserService.CartList({ phone: Phone })
      .then((res) => {
        setItems(res.data.cart_items);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const handlechange = (e) => {
    setDealerCode(e.target.value);
  };
  useEffect(() => {
    const savedDiscount = localStorage.getItem("savedDiscount");
    if (savedDiscount) {
      setCode(JSON.parse(savedDiscount));
      setShow(true);
    }
  }, []);

  const SubTotal = () => {
    let subTotal = 0;
    Items.forEach((data) => {
      const Pricekey = "total_price_" + data.gold_type;
      const price = parseFloat(data[Pricekey]);
      subTotal += price;
    });
    return subTotal;
  };
  const goldColor = {
    yellow_gold: "Yellow Gold",
    rose_gold: "Rose Gold",
    white_gold: "White Gold",
  };

  const Applycoupen = (e) => {
    e.preventDefault();
    UserService.DealerCode({ phone: Phone, dealer_code: dealer_code })
      .then((res) => {
        if (res.status === false) {
          setIsFormEmpty(res.message);
          setShow(false);
        } else {
          localStorage.setItem("savedDiscount", JSON.stringify(res.data));
          setShow(true);
          setCode(res.data);
          setIsFormEmpty("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Remove = (id) => {
    setRemovingItemId(id);
    UserService.RemovetoCart({ cart_id: id })
      .then((res) => {
        if (res.status === true) {
          UserCartItems();
          localStorage.setItem("total_quantity", res.data.total_quantity);
          toast.success("remove design from cart successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRemovingItemId(null);
      });
  };

  const Orderplacing = () => {
    if (Verification == 3) {
      navigate("/orders");
    } else {
      setShowEdit(true);
    }
  };
  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
  };

  useEffect(() => {
    UserCartItems();
  }, []);

  return (
    <section className="cart">
      <div className="container">
        <div className="row">
          {isLoading ? (
            <>
              <div className="h-100 d-flex justify-content-center">
                <ReactLoading
                  type={"spokes"}
                  color={"#053961"}
                  height={"20%"}
                  width={"10%"}
                  className="loader"
                />
              </div>
            </>
          ) : (
            <>
              {Items?.length ? (
                <>
                  <div className="col-md-9">
                    <div className="card border shadow-0">
                      <div className="m-4">
                        <h4 className="card-title mb-4">Your shopping cart</h4>
                        <div className="row gy-3 mb-4">
                          <>
                            <hr />
                            {Items?.map((data, index) => {
                              const Pricekey = "total_price_" + data.gold_type;
                              const price = parseFloat(data[Pricekey]);
                              return (
                                <>
                                  <div className="col-md-3">
                                    <div className="d-flex">
                                      <img
                                        src={data.image}
                                        className="border rounded me-3 w-100"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="">
                                      <Link
                                        to={`/shopdetails/${data.design_id}`}
                                        className="nav-link"
                                      >
                                        {data.design_name}
                                      </Link>
                                      <div className="">
                                        <p className="text-muted">
                                          <b>Gold Color : </b>
                                          {goldColor[data.gold_color]}
                                          &nbsp;
                                          {data.gold_type}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="">
                                      <text className="h6">
                                        ₹{price.toLocaleString("en-US")}{" "}
                                        {/* ₹ 100 (Approx prefix) */}
                                      </text>
                                      <br />
                                    </div>
                                  </div>
                                  {/* <div className="col-md-2">
                                <div className="quantity">
                                  <button
                                    className="btn"
                                    onClick={() => {
                                      const updatedItems = Items.map((item) => {
                                        if (
                                          item.id === data.id &&
                                          item.quantity > 1
                                        ) {
                                          return {
                                            ...item,
                                            quantity: item.quantity - 1,
                                          };
                                        }
                                        return item;
                                      });
                                      setItems(updatedItems);
                                      handlecountchange("decrement", data.id);
                                      // if (data.quantity > 1) {
                                      //   handlecountchange("decrement", data.id);
                                      // }
                                    }}
                                    disabled={data.quantity === 1}
                                  >
                                    -
                                  </button>
  
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={data.quantity}
                                    min={1}
                                    max={5}
                                    disabled
                                  />
                                  <button
                                    className="btn"
                                    onClick={() => {
                                      const updatedItems = Items.map((item) => {
                                        if (item.id === data.id) {
                                          return {
                                            ...item,
                                            quantity: item.quantity + 1,
                                          };
                                        }
                                        return item;
                                      });
                                      setItems(updatedItems);
                                      handlecountchange("increment", data.id);
                                    }}
                                    disabled={data.quantity >= 10}
                                  >
                                    +
                                  </button>
                                </div>
                              </div> */}

                                  <div className="col-md-3">
                                    <div className="float-md-end">
                                      {/* <Link to="#!" className="btn btn-light border px-2 icon-hover-primary me-2">
                                <BsHeart />
                              </Link> */}

                                      <Link
                                        to="#"
                                        className="btn btn-light border text-danger icon-hover-danger"
                                        onClick={() => Remove(data.id)}
                                      >
                                        {removingItemId === data.id && (
                                          <CgSpinner
                                            size={20}
                                            className="animate_spin me-2"
                                          />
                                        )}
                                        Remove
                                      </Link>
                                    </div>
                                  </div>
                                  <hr />
                                </>
                              );
                            })}
                          </>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    {!show && (
                      <div className="card mb-3 border shadow-0">
                        <div className="card-body">
                          <form>
                            {/* <div className="form-group">
                              <label className="form-label">Have coupon?</label>
                              <div className="input-group">
                                <input  
                                  type="text"
                                  className="form-control border"
                                  name=""
                                  placeholder="Coupon code"
                                />
                                <button className="btn btn-light border">
                                  Apply
                                </button>
                              </div>
                            </div> */}
                            <div className="form-group">
                              <label className="form-label">
                                Have a Dealer coupon?
                              </label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  name="dealer_code"
                                  className="form-control border"
                                  placeholder="Dealer coupon code"
                                  value={dealer_code}
                                  onChange={(e) => handlechange(e)}
                                />
                                <button
                                  className="btn btn-light border"
                                  onClick={(e) => Applycoupen(e)}
                                >
                                  Apply
                                </button>
                              </div>
                              {isFormEmpty ? (
                                <span className="text-danger">
                                  {isFormEmpty}
                                </span>
                              ) : (
                                <></>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                    <div className="card shadow-0 border">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Sub total :</p>
                          <p className="mb-2">
                            ₹{SubTotal().toLocaleString("en-US")}
                          </p>
                        </div>
                        {show && (
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">
                              Dealer discount
                              <code>({code.dealer_code})</code>:
                              <p>
                                {code.discount_type === "percentage" ? (
                                  <>(-{code.discount_value}%)</>
                                ) : (
                                  <></>
                                )}
                              </p>
                            </p>
                            <p className="mb-2 text-success">
                              {code.discount_type === "percentage"
                                ? `- ₹${(
                                    (SubTotal() * code.discount_value) /
                                    100
                                  ).toLocaleString("en-US")}`
                                : `- ₹${code.discount_value}`}
                            </p>
                          </div>
                        )}
                        <hr />
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total price:</p>
                          <p className="mb-2 fw-bold">
                            {code.discount_value ? (
                              <>
                                ₹
                                {(code.discount_type === "percentage"
                                  ? SubTotal() -
                                    (SubTotal() * code.discount_value) / 100
                                  : SubTotal() - code.discount_value
                                ).toLocaleString("en-US")}
                              </>
                            ) : (
                              <>₹{SubTotal().toLocaleString("en-US")}</>
                            )}
                          </p>
                        </div>
                        <div className="mt-3">
                          <button
                            className="btn btn-success w-100 shadow-0 mb-2"
                            onClick={Orderplacing}
                          >
                            Place Order
                          </button>
                          <Link
                            to="/shop"
                            className="btn btn-light w-100 border mt-2"
                          >
                            Back to shop
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="col-md-12">
                    <div className="card border shadow-0">
                      <div className="m-4">
                        <h4 className="card-title mb-4">Your shopping cart</h4>
                      </div>
                      <div>
                        <h6 className="text-center">
                          No items in your cart list.
                        </h6>
                      </div>
                      <div className="mt-3 mb-3 text-center">
                        <Link to="/shop" className="btn btn-light">
                          Back to shop
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          <Modal
            className="form_intent"
            centered
            show={showEdit}
            onHide={handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <span>
                Prior to place your order, you need to provide your other
                information.
              </span>
            </Modal.Body>
            <div className="text-center pb-3">
              <Button
                variant="primary"
                type="submit"
                onClick={() => navigate("/profile")}
              >
                Registration
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default Cart;
