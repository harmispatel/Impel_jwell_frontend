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
  const [showbox, setShowbox] = useState(false);

  const handlecountchange = (update_type, id) => {
    console.log(update_type);
    UserService.Updatecart({ id: id, update_type: update_type })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

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

    UserCartItems();
  }, []);

  const SubTotal = () => {
    let subTotal = 0;
    Items.forEach((data) => {
      const gold_type = "gold_rate_" + data.gold_type;
      const grossWeight = "gross_weight_" + data.gold_type;
      const price =
        parseFloat(data[grossWeight] * goldrate[gold_type]) +
        ((goldrate.gold_rate_24k * 15) / 100) * data[grossWeight];
      subTotal += price * data.quantity;
    });
    return subTotal;
  };
  const goldColor = {
    yellow_gold: "Yellow Gold",
    rose_gold: "Rose Gold",
    white_gold: "White Gold",
  };
  const goldrate = {
    gold_rate_24k: 6000,
    gold_rate_22k: 5220,
    gold_rate_20k: 5040,
    gold_rate_18k: 4560,
    gold_rate_14k: 3540,
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
                        const gold_type = "gold_rate_" + data.gold_type;
                        const grossWeight = "gross_weight_" + data.gold_type;
                        const price = parseFloat(
                          data[grossWeight] * goldrate[gold_type]
                        );
                        const makinghcharge =
                          ((goldrate.gold_rate_24k * 15) / 100) *
                          data[grossWeight];
                        const totalprice = price + makinghcharge;
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
                                  ₹{totalprice.toLocaleString("en-US")}
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
                                    handlecountchange("decrement", data.id);
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
                                    handlecountchange("increment", data.id);
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
            {showbox ? (
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
                      <label className="form-label">
                        Have a Dealer coupon?
                      </label>
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
            ) : (
              <>
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
                        <label className="form-label">
                          Have a Dealer coupon?
                        </label>
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
              </>
            )}

            <div className="card shadow-0 border">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Sub total :</p>
                  <p className="mb-2">{SubTotal().toLocaleString("en-IN")}₹</p>
                </div>
                {show && (
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">
                      Dealer Discount<code>({code.dealer_code})</code>:
                    </p>
                    <p className="mb-2 text-success">
                      {code.discount_type === "percentage"
                        ? `-${(
                            (SubTotal() * code.discount_value) /
                            100
                          ).toFixed(2)}`
                        : `₹${code.discount_value}`}
                    </p>
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Total price:</p>
                  <p className="mb-2 fw-bold">
                    {SubTotal().toLocaleString("en-IN")}₹
                  </p>
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
