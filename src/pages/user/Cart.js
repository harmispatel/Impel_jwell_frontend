import React, { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import UserService from "../../services/Cart"
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Cart = () => {
  const Phone = localStorage.getItem('phone')
  const [Items, setItems] = useState([]);
  const [productQuantity, setProductQuantity] = useState();
  
  const UserCartItems = () => {
    UserService.CartList({ phone: Phone })
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Remove = (id) => {
    UserService.RemovetoCart({cart_id : id})
      .then(res=>{
        if (res.status === true) {
          toast.success(res.message);
          UserCartItems();
        }
      })
      .catch(err=>{
        console.log(err);
      })
  };

  useEffect(()=>{
    UserCartItems()
  },[])

  return (
    <section className="cart">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="card border shadow-0">
              <div className="m-4">
                <h4 className="card-title mb-4">Your shopping cart</h4>
                <div className="row gy-3 mb-4">
                  {Items?.map((data,index) => {
                    const dataPrice = data.price.toLocaleString("en-US")
                    const quantity = data.quantity
                    return (
                      <>
                        <div className="col-md-3">
                          <div className="d-flex">
                            <img src={data.image} className="border rounded me-3 w-100"/>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="">
                            <Link to="#" className="nav-link">{data.design_name}</Link>
                            <p className="text-muted">{data.category} - {data.metal}</p>
                          </div>
                          <div className="">
                            <text className="h6">₹{dataPrice}</text> <br />
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="quantity">
                            <button className="btn" disabled={data.quantity === 0} >
                              -
                            </button>
                            <input className="form-control" type="text" value={data.quantity} min={1}/>
                            <button className="btn" disabled>
                              +
                            </button>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="float-md-end">
                            {/* <Link to="#!" className="btn btn-light border px-2 icon-hover-primary me-2">
                              <BsHeart />
                            </Link> */}
                            <Link to="#" className="btn btn-light border text-danger icon-hover-danger" onClick={() => Remove(data.id)}>
                              Remove
                            </Link>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card mb-3 border shadow-0">
              <div className="card-body">
                <form>
                  <div className="form-group">
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
                  </div>
                </form>
              </div>
            </div>
            <div className="card shadow-0 border">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Total price:{}</p>
                  <p className="mb-2">₹</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Discount:</p>
                  <p className="mb-2 text-success">-₹60.00</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">TAX:</p>
                  <p className="mb-2">₹14.00</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Total price:</p>
                  <p className="mb-2 fw-bold">₹</p>
                </div>
                <div className="mt-3">
                  <a href="#" className="btn btn-success w-100 shadow-0 mb-2">Make Purchase</a>
                  <Link to="/shop" className="btn btn-light w-100 border mt-2">Back to shop</Link>
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
