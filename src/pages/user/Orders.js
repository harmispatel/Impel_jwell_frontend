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
import { useParams } from "react-router-dom";
const Orders = () => {
  const id = useParams();
  const [Items, setItems] = useState([]);
  const [product, setProduct] = useState([]);

  const GetUserOrders = async () => {
    Userservice.Orderdetails({ order_id: id.id })
      .then((res) => {
        setItems(res.data);
        setProduct(res.data?.order_items);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    GetUserOrders();
  }, []);

  console.log(product?.map((datas) => datas?.design_name));

  return (
    <>
      <section className="my_orders">
        <div className="container">
          <div className="row mb-4">
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h4 class="header-title mb-3">Order Information</h4>
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="col">Order No.:</th>
                        <td>#{Items?.order_id}</td>
                      </tr>
                      <tr>
                        <th scope="col">Order Status:</th>
                        {Items?.order_status == "pending" ? (
                          <td>
                            <span className="badge bg-warning">Pending</span>
                          </td>
                        ) : (
                          <td>
                            <span className="badge bg-info">Accepted</span>
                          </td>
                        )}
                      </tr>
                      <tr>
                        <th scope="col">Order Date:</th>
                        <td>{Items?.order_date}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h4 class="header-title mb-3">Customer Information</h4>
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="col">Name:</th>
                        <td>{Items?.customer}</td>
                      </tr>
                      <tr>
                        <th scope="col">Email:</th>
                        <td>{Items?.customer_email}</td>
                      </tr>
                      <tr>
                        <th scope="col">Phone:</th>
                        <td>{Items?.customer_phone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h4 class="header-title mb-3">Shipping Information</h4>
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="col">Address:</th>
                        <td>{Items?.address}</td>
                      </tr>
                      <tr>
                        <th scope="col">City:</th>
                        <td>{Items?.city}</td>
                      </tr>
                      <tr>
                        <th scope="col">State:</th>
                        <td>{Items?.state}</td>
                      </tr>
                      <tr>
                        <th scope="col">Pin-Code:</th>
                        <td>{Items?.pincode}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="card">
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
                                <img
                                  src={datas?.design_image}
                                  alt=""
                                  style={{ width: "100px" }}
                                />
                              </td>
                              <td>
                                <span>{datas?.design_name}</span>
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
                                <span>₹ {datas?.item_sub_total}</span>
                              </td>
                              <td>
                                <span>₹ {datas?.item_total}</span>
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

            {/* <div className="col-lg-3 col-md-3">
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title mb-3">Order Summary</h4>

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
                          <td>Grand Total :</td>
                          <td>$1641</td>
                        </tr>
                        <tr>
                          <td>Shipping Charge :</td>
                          <td>$23</td>
                        </tr>
                        <tr>
                          <td>Estimated Tax : </td>
                          <td>$19.22</td>
                        </tr>
                        <tr>
                          <th>Total :</th>
                          <th>$1683.22</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Orders;
