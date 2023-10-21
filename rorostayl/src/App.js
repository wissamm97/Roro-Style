import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react"
import { useSearchParams } from "react-router-dom";
import { updateUser } from "./features/user/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
const Prodcut = lazy(()=> import("./pages/Prodcut"))
const Spinner = lazy(() => import("./components/Spinner/Spinner"))
const SingleProduct = lazy(() => import("./pages/DashBoard/SingleProduct/SingleProduct"));
const SingleUser = lazy(() => import("./pages/DashBoard/SingleUser/SingleUser"));
const List = lazy(() => import("./pages/DashBoard/list/List"));
const DashBoard = lazy(() => import("./pages/DashBoard/DashBoard"));
const AccountConfirmation = lazy(() => import("./pages/AccountConfirmation"));
const Changepassword = lazy(() => import("./components/Changepassword"));
const ResetPssaword = lazy(() => import("./components/ResetPssaword"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const SingleOrder = lazy(() => import("./pages/DashBoard/SingleOrder/SingleOrder"));
const Exchangeandreturnpolicy = lazy(() => import("./components/Exchangeandreturnpolicy"));
const AddProduct = lazy(() => import("./components/Admin/AddProduct/AddProduct"));
const Privacypolicy = lazy(() => import("./components/Privacypolicy"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Storeadvantages = lazy(() => import("./components/Storeadvantages/Storeadvantages"));
const PaymentsSuccess = lazy(() => import("./components/PaymentsSuccess"));
const Login = lazy(() => import("./components/Login/Login"));
const Header = lazy(() => import("./components/Header/Header"));
const Products = lazy(() => import("./pages/Products"));
const Curosol = lazy(() => import("./components/Curosol"));
const Register = lazy(() => import("./components/Register/Register"));
const Cart = lazy(() => import("./pages/Cart"));
const Contact = lazy(() => import("./components/Contact"));
const Aboutme = lazy(() => import("./components/Aboutme"));
const ShipingAddress = lazy(() => import("./components/ShipingAddress"));
const PaymentMethode = lazy(() => import("./components/PaymentMethode"));
const Order = lazy(() => import("./components/Order"));
const Productdetails = lazy(() => import("./pages/Productdetails"));
const Welcome = lazy(() => import("./components/Welcome/Welcome"));
const Favourites = lazy(() => import("./pages/Favourites"));
const Profile = lazy(() => import("./components/Profile"));
const OrderHistory = lazy(() => import("./components/Order"));
const OrderDetails = lazy(() => import("./components/OrderDetails"));
const Search = lazy(() => import("./pages/Search"));
function App() {
  const disapatch = useDispatch();
  let [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const emailToken = searchParams.get("emailToken");
  const isVerified = searchParams.get("Verified");
  const Token = searchParams.get("Token");
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (id && name && email && Token && emailToken && isVerified) {
      const userData = {
        id,
        name,
        email,
        Token,
        emailToken,
        isVerified: JSON.parse(isVerified),
      };
      localStorage.setItem("user", JSON.stringify(userData));
      console.log(userData);
      disapatch(updateUser(userData));
    }
  }, []);
  useEffect(() => {
    const elementOne = document.querySelector(".scroll-to-product");
    const elementTwo = document.querySelector(".all-product");
    if (elementOne && elementTwo) {
      elementOne.addEventListener("click", () => {
        elementTwo.scrollIntoView({ behavior: "smooth" });
      });
    }
    const button = document.querySelector(".scroll-to-top");
    const displayButton = () => {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 1000) {
          button.style.display = "block";
        } else {
          button.style.display = "none";
        }
      });
    };

    const scrollToTop = () => {
      button.addEventListener("click", () => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      });
    };

    displayButton();
    scrollToTop();
  }, []);
  return (
    <>
      <button className="scroll-to-top">top</button>
      <Suspense fallback={<h1><Spinner /></h1>}>
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Welcome />
                <Curosol />
                <Products />
                <Storeadvantages />
              </>
            }
          />

          <Route path="/Login" element={<Login />} />
          <Route path="/product/:category" element={<Prodcut />} />
          <Route path="/product/details/:id" element={<Productdetails />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPssaword />} />
          <Route path="/change-password" element={<Changepassword />} />
          <Route path="/verified-email" element={<VerifyEmail />} />
          <Route path="/account-confirmation" element={<AccountConfirmation />} />
          <Route path="/privacypolicy" element={<Privacypolicy />} />
          <Route
            path="/exchangeandreturnpolicy"
            element={<Exchangeandreturnpolicy />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favourite" element={<Favourites />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutme" element={<Aboutme />} />
          <Route path="/ShipingAddress" element={<ShipingAddress />} />
          <Route path="/payment" element={<PaymentMethode />} />
          <Route path="/PlaceOrder" element={<Order />} />
          <Route
            path="/order/:id/payment/success"
            element={<PaymentsSuccess />}
          />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/order/history" element={<OrderHistory />} />
          {user && user.isAdmin ? (
            <>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/dashboard/users" element={<List />} />
              <Route path="/dashboard/users/:id" element={<SingleUser />} />
              <Route path="/dashboard/products" element={<List />} />
              <Route path="/dashboard/products/:id" element={<SingleProduct />} />
              <Route path="/dashboard/products/create" element={<AddProduct />} />
              <Route path="/dashboard/orders" element={<List />} />
              <Route path="/dashboard/orders/:id" element={<SingleOrder />} />
            </>
          ) : (
            <Route path="/" />
          )}
        </Routes>
        <Footer />
        <ToastContainer />
      </Suspense>
    </>
  );
}

export default App;
