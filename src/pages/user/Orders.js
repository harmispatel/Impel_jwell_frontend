import React, { useRef } from "react";
import { IoMdPrint } from "react-icons/io";
import { useReactToPrint } from "react-to-print";

const Orders = () => {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  return (
    <section className="my_orders">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <div className="text-end">
              <button
                style={{ fontSize: "30px", border: "none" }}
                onClick={handlePrint}
              >
                <IoMdPrint />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center" ref={printRef}>
          <div className="col-md-9">
            <div className="receipt-main">
              <div className="row">
                <div className="col-xs-4 col-sm-4 col-md-4 text-left">
                  <div className="receipt-header receipt-header-mid">
                    <div className="receipt-right">
                      <h5>Customer Name </h5>
                      <p>
                        <b>Mobile :</b> +1 12345-4569
                      </p>
                      <p>
                        <b>Email :</b> customer@gmail.com
                      </p>
                      <p>
                        <b>Address :</b> New York, USA
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4">
                  <div className="receipt-left">
                    <h3>INVOICE # 102</h3>
                  </div>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 text-end">
                  <div className="receipt-right">
                    <h5>Company Name</h5>
                    <p>
                      +1 3649-6589 <i className="fa fa-phone"></i>
                    </p>
                    <p>
                      company@gmail.com <i className="fa fa-envelope-o"></i>
                    </p>
                    <p>
                      USA <i className="fa fa-location-arrow"></i>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="col-md-9">Payment for August 2016</td>
                      <td className="col-md-3">
                        <i className="fa fa-inr"></i> 15,000/-
                      </td>
                    </tr>
                    <tr>
                      <td className="col-md-9">Payment for June 2016</td>
                      <td className="col-md-3">
                        <i className="fa fa-inr"></i> 6,00/-
                      </td>
                    </tr>
                    <tr>
                      <td className="col-md-9">Payment for May 2016</td>
                      <td className="col-md-3">
                        <i className="fa fa-inr"></i> 35,00/-
                      </td>
                    </tr>
                    <tr>
                      <td className="text-right">
                        <p>
                          <strong>Total Amount: </strong>
                        </p>
                        <p>
                          <strong>Dealer Discount: </strong>
                        </p>
                      </td>
                      <td>
                        <p>
                          <strong>
                            <i className="fa fa-inr"></i> 65,500/-
                          </strong>
                        </p>
                        <p>
                          <strong>
                            <i className="fa fa-inr"></i> 500/-
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-right">
                        <h2>
                          <strong>Total: </strong>
                        </h2>
                      </td>
                      <td className="text-left text-danger">
                        <h2>
                          <strong>
                            <i className="fa fa-inr"></i> 31.566/-
                          </strong>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row">
                <div className="col-xs-8 col-sm-8 col-md-8 text-left">
                  <div className="receipt-header receipt-header-mid receipt-footer">
                    <div className="receipt-right">
                      <p>
                        <b>Date :</b> {date}
                      </p>
                      <h5 style={{ color: "rgb(140, 140, 140)" }}>
                        Thanks for shopping.!
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4">
                  <div className="receipt-left">
                    <h1>Stamp</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Orders;
