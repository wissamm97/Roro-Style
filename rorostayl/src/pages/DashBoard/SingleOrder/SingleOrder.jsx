import "./SingleOrder.scss";
import Sidebar from "../../../components/Admin/sidebar/Sidebar";
import Navbar from "../../../components/Admin/navbar/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  orderDelivered,
  orderDetails,
  orderStatusChange,
} from "../../../features/Admin/AdminSlice";
import { FaUser, FaTruck } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { format } from "date-fns";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner/Spinner";

const SingleOrder = () => {
  const { order, isLoadingDetails, isSuccessgDetails } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    Swal.fire({
      title:
        "You changed the status of the Order changed to: " +
        newStatus +
        " Do you want to save that",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Save");
        dispatch(orderStatusChange({ id: id, data: newStatus }));
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    console.log(newStatus);
  };
  useEffect(() => {
    dispatch(orderDetails(id));
  }, [isSuccessgDetails]);
  if (isLoadingDetails) {
    return <Spinner />;
  }
  if (isSuccessgDetails && order && order.order) {
    const { orderItems } = order.order;
    return (
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
          <section className="content-main">
            <div className="content-header">
              <Link className="btn btn-dark text-white" to="/dashboard/orders">
                Back To Orders
              </Link>
            </div>
            <div className="card">
              <header
                className="card-header p-3 Header-green justify-content-space-around"
                style={{ height: "160px" }}
              >
                <div className="row align-items-center ">
                  <div className="col-lg-6 col-md-6 card-mobile">
                    <span>
                      <i className="far fa-calendar-alt mx-2"></i>
                      <b className="text-white">
                        {format(new Date(order.order.createdAt), "MM/dd/yyyy")}
                      </b>
                    </span>
                    <br />
                    <small className="text-white mx-3 ">
                      Order ID: {order.order && order.order._id}
                    </small>
                  </div>
                  <div className="col-lg-6 col-md-6  d-flex justify-content-end align-items-center">
                    <select
                      className="form-select d-inline-block"
                      style={{ maxWidth: "200px" }}
                      onChange={handleStatusChange}
                    >
                      <option value="Awaiting payment">Awaiting payment</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </header>
              <div className="card-body">
                <div className="row mb-5 order-info-wrap">
                  <div className="col-md-6 col-lg-4">
                    <article className="icontext align-items-start">
                      <span className="icon icon-sm rounded-circle alert-success">
                        <FaUser className="text-primary" />
                      </span>
                      <div className="text">
                        <h3 className="mb-1">Customer</h3>
                        <p className="mb-1">
                          {order.user && order.user.name} <br />
                          <a href="mailto:user@example.com">
                            {order.user.email}
                          </a>
                        </p>
                      </div>
                    </article>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <article className="icontext align-items-start">
                      <span className="icon icon-sm rounded-circle alert-success">
                        <FaTruck className="text-primary" />
                      </span>
                      <div className="text">
                        <h3 className="mb-1">Order info</h3>
                        <p className="mb-1">
                          Shipping:
                          {order.order.shippingAddress &&
                            order.order.shippingAddress.country}
                          <br /> Pay method: {order.order.paymentMethod}
                        </p>
                      </div>
                    </article>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <article className="icontext align-items-start">
                      <span className="icon icon-sm rounded-circle alert-success">
                        <IoLocationOutline className="text-primary" />
                      </span>
                      <div className="text">
                        <h3 className="mb-1">Deliver to</h3>
                        <p className="mb-1">
                          Address: {order.order.shippingAddress.address}
                          <br />
                          {order.order.shippingAddress.city}
                          <br /> Phone:{order.order.shippingAddress.phonenumber}
                        </p>
                      </div>
                    </article>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-9">
                    <div className="table-responsive">
                      <table className="table border table-lg">
                        <thead>
                          <tr>
                            <th style={{ width: "40%" }}>Product</th>
                            <th style={{ width: "20%" }}>Unit Price</th>
                            <th style={{ width: "20%" }}>Quantity</th>
                            <th className="text-end" style={{ width: "20%" }}>
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItems &&
                            orderItems.map((item) => (
                              <tr key={item._id}>
                                <td>
                                  <a className="itemside" href="/order">
                                    <div className="left">
                                      <img
                                        src={item.image}
                                        alt="product"
                                        className="img-xs"
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                        }}
                                      />
                                    </div>
                                    <div className="info">{item.title}</div>
                                  </a>
                                </td>
                                <td>${item.price}</td>
                                <td>{item.quantity}</td>
                                <td className="text-end">${item.price}</td>
                              </tr>
                            ))}
                          <tr>
                            <td colSpan="4">
                              <article className="float-end">
                                <dl className="dlist">
                                  <dt>ItemsPrice:</dt>
                                  <dd>${order.order.itemsPrice}</dd>
                                </dl>
                                <dl className="dlist">
                                  <dt>ShippingPrice:</dt>
                                  <dd>${order.order.shippingPrice}</dd>
                                </dl>
                                <dl className="dlist">
                                  <dt>TaxPrice:</dt>
                                  <dd>${order.order.taxPrice}</dd>
                                </dl>
                                <dl className="dlist">
                                  <dt>totalPrice</dt>
                                  <dd>
                                    <b className="h5">
                                      ${order.order.totalPrice}
                                    </b>
                                  </dd>
                                </dl>
                                <dl className="dlist">
                                  <dt className="text-muted">Status:</dt>

                                  <dd>
                                    <span
                                      className={
                                        order.order.isPaid
                                          ? "badge rounded-pill alert alert-success text-success"
                                          : "badge rounded-pill alert alert-danger text-notpaid"
                                      }
                                    >
                                      {order.order.isPaid
                                        ? "Payment done"
                                        : "Not Paid"}
                                    </span>
                                  </dd>
                                </dl>
                              </article>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="box shadow-sm bg-light">
                      <button
                        className="btn btn-dark col-12"
                        onClick={() => dispatch(orderDelivered(id))}
                      >
                        MARK AS DELIVERED
                      </button>
                      {/* <button onClick={handleBack}>Go Back</button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
};

export default SingleOrder;
