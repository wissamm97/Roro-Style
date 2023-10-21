import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaUser,
  FaShoppingCart,
  FaUserCircle,
  FaRegAddressCard,
  FaRegHeart,
  FaHistory,
} from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { logout } from "../../features/user/userSlice";
import { AiOutlineLogout } from "react-icons/ai";
import "./Header.css";
import { NavDropdown } from "react-bootstrap";
import SearchBox from "../SearchBox";
import { useEffect } from "react";
import { getCategory } from "../../features/product/productSlice";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navRef = useRef();
  const { categories } = useSelector((state) => state.product);
  const { product } = useSelector((state) => state.cart);
  const { Favourite } = useSelector((state) => state.favourite);
  useEffect(() => {
    dispatch(getCategory());
  }, [user]);
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <header className="fixed-top">
      <Link to="/" className="logo">
        <img src="../../../logo.jpeg" alt="..." />
      </Link>
      <nav ref={navRef}>
        <Link to="/">Home</Link>
        <NavDropdown
          title="Product"
          className="dropdown"
          id="basic-nav-dropdown"
        >
          {categories.map((item) => (
            <Link key={item} to={`product/${item}`}>
              {item}
            </Link>
          ))}
        </NavDropdown>
        {user ? (
          <>
            <Link to="contact">Contact</Link>
          </>
        ) : (
          <></>
        )}
        {user && user.isAdmin ? (
          <Link to="dashboard">DashBoard</Link>
        ) : (
          <Link to="aboutme">About me</Link>
        )}

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
        <SearchBox />
      </nav>
      {user ? (
        <div className="icons">
          <Link to="cart" className="cart">
            <div className="icon-cart">
              <FaShoppingCart />
              <span>-{product.length}</span>
            </div>
          </Link>
          <Link to="favourite" className="favourite">
            <div className="icon-cart">
              <FaRegHeart />
              <span>-{Favourite.length}</span>
            </div>
          </Link>
          <NavDropdown
            title={<FaUserCircle style={{ cursor: "pointer" }} />}
            className="dropdown"
            id="basic-nav-dropdown"
          >
            <Link to="/profile">
              Profile
              <FaRegAddressCard />
            </Link>
            <Link to="/order/history">
              Order History
              <FaHistory />
            </Link>
            <Link to="/account-confirmation">
              Account Confirmation
              <GiConfirmed />
            </Link>
          </NavDropdown>

          <a style={{ cursor: "pointer" }} onClick={onLogout}>
            <AiOutlineLogout /> Logout
          </a>
        </div>
      ) : (
        <>
          {" "}
          <div className="icons">
            <Link to="Login">
              <FaSignInAlt /> Login
            </Link>
            <Link to="/Register">
              <FaUser /> Register
            </Link>
          </div>
        </>
      )}

      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Header;
