import React, { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import UserService from "../../services/Cart";
import { useEffect } from "react";
import ReactLoading from "react-loading";
import toast from "react-hot-toast";

const Cart = () => {
  const Phone = localStorage.getItem("phone");
  const [Items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dealer_code, setDealerCode] = useState("");
  const [code, setCode] = useState("");
  const [productQuantity, setProductQuantity] = useState();
  const [isFormEmpty, setIsFormEmpty] = useState("");
  const [show, setShow] = useState(false);

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

  const TotalPrice = () => {
    let totalPrice = 0;
    Items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };
  const Applycoupen = (e) => {
    e.preventDefault();
    UserService.DealerCode({ phone: Phone, dealer_code: dealer_code })
      .then((res) => {
        if (res.status === false) {
          setIsFormEmpty(res.message);
          // toast.error(res.message);
        } else {
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
    UserService.RemovetoCart({ cart_id: id })
      .then((res) => {
        if (res.status === true) {
          UserCartItems();
          localStorage.setItem("total_quantity", res.data.total_quantity);
          console.log(res.data.total_quantity);
          toast.success("remove design from cart successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    UserCartItems();
  }, []);

  return (
    <section className="cart">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="card border shadow-0">
              <div className="m-4">
                <h4 className="card-title mb-4">Your shopping cart</h4>
                <div className="row gy-3 mb-4">
                  {isLoading ? (
                    <div className="h-100 d-flex justify-content-center">
                      <ReactLoading
                        type={"spokes"}
                        color={"#053961"}
                        delay={"2"}
                        height={"20%"}
                        width={"10%"}
                        className="loader"
                      />
                    </div>
                  ) : (
                    <>
                      {Items?.map((data, index) => {
                        // const dataPrice = data.price.toLocaleString("en-US");
                        const quantity = data.quantity;
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
                                <Link to="#" className="nav-link">
                                  {data.design_name}
                                </Link>
                                <p className="text-muted">
                                  {data.category} - {data.metal}
                                </p>
                              </div>
                              <div className="">
                                <text className="h6">
                                  ₹{data.price.toLocaleString("en-US")}
                                </text>{" "}
                                <br />
                              </div>
                            </div>
                            <div className="col-md-2">
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
                                  }}
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
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>

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
                                  Remove
                                </Link>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
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
                      <button className="btn btn-light border">Apply</button>
                    </div>
                  </div> */}
                  <div className="form-group">
                    <label className="form-label">Have a Dealer coupon?</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="dealer_code"
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
                      <span className="text-danger">{isFormEmpty}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="card shadow-0 border">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Sub total :</p>
                  <p className="mb-2">{TotalPrice().toFixed(2)}₹</p>
                </div>
                {show && (
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">
                      Dealer Discount<code>({code.dealer_code})</code>:
                    </p>
                    <p className="mb-2 text-success"></p>
                  </div>
                )}
                {/* <div className="d-flex justify-content-between">
                  <p className="mb-2">TAX (18%) :</p>
                  <p className="mb-2">
                    ₹{((TotalPrice() / 100) * 18).toFixed(2)}
                  </p>
                </div> */}
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Total price:</p>
                  <p className="mb-2 fw-bold">{TotalPrice().toFixed(2)}₹</p>
                </div>
                <div className="mt-3">
                  <a href="#" className="btn btn-success w-100 shadow-0 mb-2">
                    Place Order
                  </a>
                  <Link to="/shop" className="btn btn-light w-100 border mt-2">
                    Back to shop
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
