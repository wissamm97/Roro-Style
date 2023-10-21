import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

import "./Register.css";
function Register() {
  const [showPasswored, setShowPassword] = useState(false);
  const [showPasswored2, setShowPassword2] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [isPassword2Focused, setPassword2Focused] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
    if (isSuccess) {
      toast.success("Your registration has been successful");
      if (!user.isVerified) {
        toast.warning("Please visit your mailbox to activate the account", {
          autoClose: 10000,
        });
      }
      navigate(`/`);
    }
  }, [
    user,
    isError,
    isSuccess,
    message,
    navigate,
    dispatch,
    showPasswored,
    isPasswordFocused,
    showPasswored2,
  ]);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };
  return (
    <div
      className="register text-center"
      style={{ backgroundColor: "#9d00ff" }}
    >
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>

        <form onSubmit={onSubmit}>
          <div className="form-group">
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
            <input
              type="email"
              placeholder="Enter You Email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group" style={{ position: "relative" }}>
            <input
              type={showPasswored ? "text" : "password"}
              placeholder="Enter You Password"
              id="password"
              name="password"
              onChange={onChange}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            {isPasswordFocused ? (
              <p className="Tooltip">
                Password must be at least 8 characters long, including uppercase
                and lowercase letters And numbers.
              </p>
            ) : (
              ""
            )}
            <span className="toggal-show-password">
              {showPasswored ? (
                <FaEyeSlash onClick={() => setShowPassword(false)} />
              ) : (
                <FaEye onClick={() => setShowPassword(true)} />
              )}
            </span>
          </div>
          <div className="form-group" style={{ position: "relative" }}>
            <input
              style={{ appearance: "none" }}
              type={showPasswored ? "text" : "password"}
              placeholder="Please confirm your password"
              id="password2"
              name="password2"
              onChange={onChange}
              onFocus={() => setPassword2Focused(true)}
              onBlur={() => setPassword2Focused(false)}
            />
            {isPassword2Focused ? (
              <p className="Tooltip">
                Password must be at least 8 characters long, including uppercase
                and lowercase letters And numbers.
              </p>
            ) : (
              ""
            )}
            <span className="toggal-show-password">
              {showPasswored2 ? (
                <FaEyeSlash onClick={() => setShowPassword2(false)} />
              ) : (
                <FaEye onClick={() => setShowPassword2(true)} />
              )}
            </span>
          </div>
          <div className="login-box">
            <a className="anim" onClick={onSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Register
            </a>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Register;
