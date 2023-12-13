import React from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BreadCrumb from "../../components/common/BreadCrumb";
import OrderService from "../../services/Dealer/Cart";
import { useEffect } from "react";
import { FaEye } from "react-icons/fa";

const DealerOrders = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orders, setOrders] = useState([]);
  const Dealer = localStorage.getItem("email");

  const OrderList = () => {
    OrderService.OrderList({ email: Dealer })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    OrderList();
  }, []);

  return (
    <section className="my_orders">
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">My Order List</h4>
            <BreadCrumb firstName="Home" firstUrl="/" thirdName="My Orders" />
          </div>
          <div className="col-md-3">
            <div className="Date_select">
              <div className="start_date mb-3">
                <p className="mb-0">From Date</p>
                <DatePicker
                  className="form-select form-control w-100"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Start Date"
                />
              </div>
              <div className="end_date">
                <p className="mb-0">End Date</p>
                <DatePicker
                  className="form-select form-control w-100"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsStart
                  startDate={endDate}
                  endDate={endDate}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="End Date"
                />
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order Date</th>
                  <th>Design Number</th>
                  <th>Design Name</th>
                  <th>Customer Name</th>
                  <th>Order Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders?.length > 0 ? (
                  <>
                    {orders?.map((data) => {
                      return (
                        <tr>
                          <td>1</td>
                          <td>12323</td>
                          <td>vansh</td>
                          <td>vansh</td>
                          <td>pending</td>
                          <td>
                            <FaEye />
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div className="mt-3 text-center">
                      <h3>Currently no orders</h3>
                    </div>
                  </>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DealerOrders;
