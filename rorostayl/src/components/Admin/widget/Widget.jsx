import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const Widget = ({ type }) => {
  const { Allusers, orders, products } = useSelector((state) => state.admin);
  const paidOrders = orders.filter((order) => order.isPaid === true);
useEffect(()=>{},[products])
  // Calculate the total price of paid orders
  const totalPriceOfPaidOrders = paidOrders.reduce(
    (total, order) => total + order.totalPrice,
    0
  );
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        to:"users",
        isMoney: false,
        count: Allusers.length,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        to:"orders",
        isMoney: false,
        count: orders.length,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "products":
      data = {
        title: "TOTOAL PRODUCTS",
        to:"products",
        isMoney: true,
        count: products.length,
        link: "View All Products",
        icon: (
          <LocalMallIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "sales":
      data = {
        title: "TOTOALSALES",
        isMoney: true,
        count: `${totalPriceOfPaidOrders}$`,
        icon: (
          <PaidIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.count}</span>
        <Link className="link" to={data.to} style={{ textDecoration: "none",color:"#000" , fontWeight:"bold" }}>
          {data.link}
        </Link>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
