import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { FaBars, FaCartPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { lightMode, darkMode } from "../../features/DarkModeSlice";
import { useNavigate } from "react-router-dom";
// import { logout, reset } from "../../features/Admin/AdminSlice";
const Sidebar = () => {
  const dispatch = useDispatch();
  const navgiate = useNavigate();
  const removeshow = () => {
    const sid = document.querySelector(".sidebar").classList.toggle("show");
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="logo">RoroAdmin</span>
        </Link>
        <button
          onClick={() => removeshow()}
          style={{ border: "0", backgroundColor: "transparent" }}
          className="logo"
        >
          <FaBars />
        </button>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navgiate("/dashboard")}
            >
              Dashboard
            </span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/dashboard/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/dashboard/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link
            to="/dashboard/products/create"
            style={{ textDecoration: "none" }}
          >
            <li>
              <FaCartPlus className="icon" />
              <span>Add Product</span>
            </li>
          </Link>
          <Link to="/dashboard/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
