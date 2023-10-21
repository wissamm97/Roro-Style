import { useEffect, useState } from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAddress, setAddress } from "../features/user/userSlice";
import Spinner from "./Spinner/Spinner";
function ShipingAddress() {
  const { Shipingaddress, user, isLoading, isSuccess } = useSelector(
    (state) => state.user
  );
  const [formData, setFormData] = useState({
    fullName: Shipingaddress?.fullName || "",
    address: Shipingaddress?.address || "",
    city: Shipingaddress?.city || "",
    country: Shipingaddress?.country || "",
    phonenumber: Shipingaddress?.phonenumber || "",
  });
  const { fullName, address, city, country, phonenumber } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (Shipingaddress) {
      navigate("/payment");
    }
    const addressData = {
      fullName,
      address,
      city,
      country,
      phonenumber,
    };
    dispatch(setAddress(addressData));
    navigate("/payment");
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getAddress());
  }, [user, navigate, dispatch, formData]);

  return (
    <>
      <div
        className="register text-center"
        style={{ backgroundColor: "#9d00ff" }}
      >
        <section className="heading">
          <h1>
            <FaRegAddressCard /> Your Address
          </h1>
          <p>Please Enter Your Adress</p>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Full Name"
                id="fullName"
                name="fullName"
                value={Shipingaddress?.fullName}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="address"
                id="address"
                name="address"
                value={Shipingaddress?.address}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter You City"
                id="city"
                name="city"
                value={Shipingaddress?.city}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter You Country"
                id="country"
                name="country"
                value={Shipingaddress?.country}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Please confirm your phoneNumber"
                id="phonenumber"
                name="phonenumber"
                value={Shipingaddress?.phonenumber}
                onChange={onChange}
              />
            </div>
            <div className="login-box">
              <a className="anim" onClick={onSubmit}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {Shipingaddress ? "Continue" : "Save And Continue"}
              </a>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default ShipingAddress;
