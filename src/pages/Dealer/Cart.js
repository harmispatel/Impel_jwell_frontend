import React from "react";
import { useState } from "react";
import BreadCrumb from "../../components/common/BreadCrumb";
import DealerService from "../../services/Dealer/Cart";
import { useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DealerCart = () => {
  const Dealer = localStorage.getItem("email");
  const navigate = useNavigate()
  const [Items, setItems] = useState([]);

  const DealerCartItems = () => {
    DealerService.CartList({ email: Dealer })
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RemoveCartItems = (product) => {
    DealerService.RemovetoCart({ cart_id: product })
      .then((res) => {
        if (res.status === true) {
          // toast.success(res.message);
          DealerCartItems();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const placeOrder = () => {
    const orderData = {
      userId: Dealer,
      items: Items,
    };

    DealerService.PlaceOrder(orderData)
      .then((res) => {
        if (res.status === true) {
          // toast.success(res.message);
          navigate('/dealer_orders')
          setItems([]); 
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    DealerCartItems();
    RemoveCartItems();
  }, []);

  return (
    <section className="cart">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card border shadow-0">
              <div className="d-flex justify-content-between align-items-center m-4">
                <h4 className="card-title">Your shopping cart</h4>
                <BreadCrumb
                  firstName="Home"
                  firstUrl="/"
                  thirdName="My Orders"
                />
              </div>
            </div>

            <div className="card border shadow-0 my-3">
              <div className="row">
                {Items.length > 0 && (
                  <>
                    {Items.map((product) => {
                      return (
                        <>
                          <div className="col-md-4">
                            <div className="cart_product_img">
                              <img src={product.image} className="w-100" alt=""/>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="cart_product_info">
                              <div className="cart_product_name">
                                <h3>{product.design_name}</h3>
                                <p>Design No. : 45749874</p>
                              </div>
                              <div className="product_gender">
                                <span>Gender : Female</span>
                              </div>
                              <div className="product_quantity">
                                <h3>No. of Qunty. : </h3>
                                <div class="quantity">
                                  {/* <button class="btn">-</button> */}
                                  <input
                                    class="form-control"
                                    type="text"
                                    min="1"
                                    value={product.quantity}
                                  />
                                  {/* <button class="btn">+</button> */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="cart_product_extra_info">
                              <div className="form-group">
                                <div className="row align-items-center">
                                  <div className="col-md-4">
                                    <label>Carat</label>
                                  </div>
                                  <div className="col-md-8">
                                    <div className="product_extra_info_box">
                                      <input
                                        className="form-control"
                                        placeholder="24 K"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <div className="row align-items-center">
                                  <div className="col-md-4">
                                    <label>Size Range</label>
                                  </div>
                                  <div className="col-md-8">
                                    <div className="product_extra_info_box">
                                      <button className="btn btn-primary">
                                        Ring Sizer
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <div className="row align-items-center">
                                  <div className="col-md-4">
                                    <label>Notes</label>
                                  </div>
                                  <div className="col-md-8">
                                    <div className="product_extra_info_box">
                                      <textarea
                                        className="form-control"
                                        rows={3}
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-end">
                                <Button
                                  className="btn btn-dark"
                                  onClick={() => RemoveCartItems(product.id)}
                                >
                                  <BsFillTrashFill />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={placeOrder}
                  >
                    Place Your Order
                  </button>
                </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealerCart;
