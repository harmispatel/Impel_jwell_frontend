// import React, { useRef } from "react";
// import { IoMdPrint } from "react-icons/io";
// import { useReactToPrint } from "react-to-print";

// const Orders = () => {
//   // const current = new Date();
//   // const date = `${current.getDate()}/${
//   //   current.getMonth() + 1
//   // }/${current.getFullYear()}`;

//   // const printRef = useRef();

//   // const handlePrint = useReactToPrint({
//   //   content: () => printRef.current,
//   // });
//   return (
//     <section className="my_orders">
//       {/* <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-9">
//             <div className="text-end">
//               <button
//                 style={{ fontSize: "30px", border: "none" }}
//                 onClick={handlePrint}
//               >
//                 <IoMdPrint />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="container">
//         <div className="row justify-content-center" ref={printRef}>
//           <div className="col-md-9">
//             <div className="receipt-main">
//               <div className="row">
//                 <div className="col-xs-4 col-sm-4 col-md-4 text-left">
//                   <div className="receipt-header receipt-header-mid">
//                     <div className="receipt-right">
//                       <h5>Customer Name </h5>
//                       <p>
//                         <b>Mobile :</b> +1 12345-4569
//                       </p>
//                       <p>
//                         <b>Email :</b> customer@gmail.com
//                       </p>
//                       <p>
//                         <b>Address :</b> New York, USA
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-xs-4 col-sm-4 col-md-4">
//                   <div className="receipt-left">
//                     <h3>INVOICE # 102</h3>
//                   </div>
//                 </div>
//                 <div className="col-xs-4 col-sm-4 col-md-4 text-end">
//                   <div className="receipt-right">
//                     <h5>Company Name</h5>
//                     <p>
//                       +1 3649-6589 <i className="fa fa-phone"></i>
//                     </p>
//                     <p>
//                       company@gmail.com <i className="fa fa-envelope-o"></i>
//                     </p>
//                     <p>
//                       USA <i className="fa fa-location-arrow"></i>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr>
//                       <th>Description</th>
//                       <th>Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td className="col-md-9">Payment for August 2016</td>
//                       <td className="col-md-3">
//                         <i className="fa fa-inr"></i> 15,000/-
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="col-md-9">Payment for June 2016</td>
//                       <td className="col-md-3">
//                         <i className="fa fa-inr"></i> 6,00/-
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="col-md-9">Payment for May 2016</td>
//                       <td className="col-md-3">
//                         <i className="fa fa-inr"></i> 35,00/-
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="text-right">
//                         <p>
//                           <strong>Total Amount: </strong>
//                         </p>
//                         <p>
//                           <strong>Dealer Discount: </strong>
//                         </p>
//                       </td>
//                       <td>
//                         <p>
//                           <strong>
//                             <i className="fa fa-inr"></i> 65,500/-
//                           </strong>
//                         </p>
//                         <p>
//                           <strong>
//                             <i className="fa fa-inr"></i> 500/-
//                           </strong>
//                         </p>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="text-right">
//                         <h2>
//                           <strong>Total: </strong>
//                         </h2>
//                       </td>
//                       <td className="text-left text-danger">
//                         <h2>
//                           <strong>
//                             <i className="fa fa-inr"></i> 31.566/-
//                           </strong>
//                         </h2>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               <div className="row">
//                 <div className="col-xs-8 col-sm-8 col-md-8 text-left">
//                   <div className="receipt-header receipt-header-mid receipt-footer">
//                     <div className="receipt-right">
//                       <p>
//                         <b>Date :</b> {date}
//                       </p>
//                       <h5 style={{ color: "rgb(140, 140, 140)" }}>
//                         Thanks for shopping.!
//                       </h5>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-xs-4 col-sm-4 col-md-4">
//                   <div className="receipt-left">
//                     <h1>Stamp</h1>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> */}
//     </section>
//   );
// };
// export default Orders;

import React, { useEffect, useState } from "react";
import Userservice from "../../services/Cart";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import BreadCrumb from "../../components/common/BreadCrumb";

const Orders = () => {
  const id = useParams();
  const user_id = localStorage.getItem("user_id");
  const user_type = localStorage.getItem("user_type");
  const [Items, setItems] = useState([]);
  const [status, setStatus] = useState();
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const GetUserOrders = async () => {
    Userservice.Orderdetails({
      order_id: id.id,
      user_id: user_id,
      user_type: user_type,
    })
      .then((res) => {
        setItems(res.data);
        setProduct(res.data?.order_items);
        setStatus(res?.status);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    GetUserOrders();
  }, []);

  return (
    <>
      <section className="my_orders">
        {isLoading ? (
          <div className="h-100 d-flex justify-content-center">
            <ReactLoading
              type={"spin"}
              color={"#053961"}
              height={"10%"}
              width={"10%"}
              className="loader"
            />
          </div>
        ) : (
          <>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <BreadCrumb
                    firstName="Home"
                    firstUrl="/"
                    secondName="My Orders"
                    secondUrl="/my_orders"
                    thirdName="Order Details"
                  />
                </div>
              </div>
            </div>

            {status === false ? (
              <div className="container">
                <div className="row justify-content-center text-center">
                  <div className="col-md-12">
                    <div class="order-error-section">
                      <h1 class="order-error">404</h1>
                      <div class="page">
                        Ooops!!! The Order you are looking for is not found
                      </div>
                      <Link to="/" class="back-home">
                        Back to home
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container">
                {/* Order Details */}
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div
                      className="card"
                      style={{ border: "none", boxShadow: "2px 2px 2px  #ccc" }}
                    >
                      <div className="card-body">
                        <h4 className="header-title">Order Information</h4>
                        <table className="table">
                          <tbody>
                            <tr>
                              <th scope="col">Order No :</th>
                              <td>#{Items?.order_id}</td>
                            </tr>
                            <tr>
                              <th scope="col">Order Status :</th>
                              {Items?.order_status == "pending" && (
                                <td>
                                  <span className="badge bg-warning">
                                    Pending
                                  </span>
                                </td>
                              )}
                              {Items?.order_status == "accepted" && (
                                <td>
                                  <span className="badge bg-info">
                                    Accepted
                                  </span>
                                </td>
                              )}
                              {Items?.order_status == "processing" && (
                                <td>
                                  <span className="badge bg-primary">
                                    Processing
                                  </span>
                                </td>
                              )}
                              {Items?.order_status == "completed" && (
                                <td>
                                  <span className="badge bg-success">
                                    Completed
                                  </span>
                                </td>
                              )}
                            </tr>
                            <tr>
                              <th scope="col">Order Date :</th>
                              <td>{Items?.order_date}</td>
                            </tr>
                            <tr>
                              <th scope="col">Order Time :</th>
                              <td>{Items?.order_time}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div
                      className="card"
                      style={{ border: "none", boxShadow: "2px 2px 2px  #ccc" }}
                    >
                      <div className="card-body">
                        <h4 className="header-title">Customer Information</h4>
                        <table className="table">
                          <tbody>
                            <tr>
                              <th scope="col">Name :</th>
                              <td>{Items?.customer}</td>
                            </tr>
                            <tr>
                              <th scope="col">Email :</th>
                              <td>{Items?.customer_email}</td>
                            </tr>
                            <tr>
                              <th scope="col">Phone :</th>
                              <td>{Items?.customer_phone}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div
                      className="card"
                      style={{ border: "none", boxShadow: "2px 2px 2px  #ccc" }}
                    >
                      <div className="card-body">
                        <h4 className="header-title">Shipping Information</h4>
                        <table className="table">
                          <tbody>
                            <tr>
                              <th scope="col">Address :</th>
                              <td>{Items?.address}</td>
                            </tr>
                            <tr>
                              <th scope="col">City :</th>
                              <td>{Items?.city}</td>
                            </tr>
                            <tr>
                              <th scope="col">State :</th>
                              <td>{Items?.state}</td>
                            </tr>
                            <tr>
                              <th scope="col">Pin-Code :</th>
                              <td>{Items?.pincode}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Products */}
                <div className="row mb-3">
                  <div className="col-lg-12 col-md-12">
                    <div
                      className="card"
                      style={{ border: "none", boxShadow: "2px 2px 2px  #ccc" }}
                    >
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Quantity</th>
                                <th>Gold Type</th>
                                <th>Gold Color</th>

                                <th>Net Weight</th>
                                <th>Metal Price</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {product?.map((datas) => (
                                <>
                                  <tr>
                                    <td>
                                      <Link
                                        to={`/shopdetails/${datas?.design_id}`}
                                        className="nav-link"
                                        target="_blank"
                                      >
                                        <img
                                          src={datas?.design_image}
                                          alt=""
                                          style={{ width: "100px" }}
                                        />
                                      </Link>
                                    </td>
                                    <td>
                                      <Link
                                        to={`/shopdetails/${datas?.design_id}`}
                                        className="nav-link"
                                        target="_blank"
                                      >
                                        <span>{datas?.design_name}</span>
                                      </Link>
                                    </td>
                                    <td>
                                      <span>{datas?.design_code}</span>
                                    </td>
                                    <td>
                                      <span>{datas?.quantity}</span>
                                    </td>
                                    <td>
                                      <span>{datas?.gold_type}</span>
                                    </td>
                                    <td>
                                      <span>{datas?.gold_color}</span>
                                    </td>
                                    <td>
                                      <span> {datas?.net_weight} g.</span>
                                    </td>
                                    <td>
                                      <span>
                                        ₹
                                        {datas?.item_sub_total?.toLocaleString(
                                          "en-US"
                                        )}
                                      </span>
                                    </td>
                                    <td>
                                      <span>
                                        ₹{" "}
                                        {datas?.item_total?.toLocaleString(
                                          "en-US"
                                        )}
                                      </span>
                                    </td>
                                  </tr>
                                </>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Payments */}
                <div className="row justify-content-end">
                  <div className="col-lg-4 col-md-4">
                    <div
                      className="card"
                      style={{ border: "none", boxShadow: "2px 2px 2px  #ccc" }}
                    >
                      <div className="card-body">
                        <h4 className="header-title">Order Summary</h4>
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Description</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Metal Price :</td>
                                <td>
                                  ₹{Items?.sub_total?.toLocaleString("en-US")}
                                </td>
                              </tr>
                              <tr>
                                <td>Charges :</td>
                                <td>
                                  ₹{Items?.charges?.toLocaleString("en-US")}
                                </td>
                              </tr>
                              {Items?.dealer_code &&
                                Items?.dealer_discount_type &&
                                Items?.dealer_discount_value && (
                                  <tr>
                                    <td>
                                      Dealer Discount <br />
                                      <code>({Items?.dealer_code})</code>&nbsp;
                                      <span>
                                        {Items?.dealer_discount_type ===
                                        "percentage" ? (
                                          <>
                                            (-{Items?.dealer_discount_value}%)
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </span>
                                      &nbsp;:
                                    </td>
                                    <td>
                                      <p className="m-0">
                                        {Items?.dealer_discount_type ===
                                        "percentage"
                                          ? `- ₹${(
                                              (Items?.charges *
                                                Items?.dealer_discount_value) /
                                              100
                                            )?.toLocaleString("en-US")}`
                                          : `- ₹${Items?.dealer_discount_value}`}
                                      </p>
                                    </td>
                                  </tr>
                                )}

                              <tr>
                                <th>Total Amount (Approx) :</th>
                                <th>
                                  ₹{Items?.total?.toLocaleString("en-US")}
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Orders;
