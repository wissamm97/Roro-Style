import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { UpdataUserInfo } from "../features/user/userSlice";
import { toast } from "react-toastify";
import {useDispatch} from 'react-redux'
function Profile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(UpdataUserInfo(userData));
      toast.success("User updated successfully");
    }
  };
  return (
    <div style={{ backgroundColor: "#9d00ff" }}>
      <div className="text-center container small-container register">
        <Helmet>
          <title>User Profile</title>
        </Helmet>
        <section className="heading">
          <h1 className="my-3">User Profile</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                placeholder="Enter You Email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">New Password :</label>
              <input
                type="password"
                placeholder="Enter You Password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">ConfirmPassword :</label>
              <input
                type="password"
                placeholder="Enter You Password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
              />
            </div>
            <div className="login-box">
              <a className="anim" onClick={onSubmit}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Update
              </a>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Profile;
