import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { login, loginGoogle, reset } from "../../features/user/userSlice";
import { FaGooglePlusG } from "react-icons/fa";
function Login() {
  const [showPasswored, setShowPassword] = useState(false);
  const [formdata, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = formdata;
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.user
  );
console.log(showPasswored);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/");
      toast.success("You have successfully logged in");
    }
    if (user) {
      navigate("/");
    }
  }, [user, message, isError, isSuccess, navigate, dispatch,showPasswored]);
  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(user);
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };
  const googleAuth = () => {
    dispatch(loginGoogle());
  };
  return (
    <div
      className="register text-center"
      style={{ backgroundColor: "#9d00ff" }}
    >
      <section className="heading">
        <h1>
          <FaUser /> Login
        </h1>
        <p>Login</p>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter You Email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group" style={{ position: "relative" }}>
            <input
              type={showPasswored ? "text" : "password"}
              placeholder="Enter You Password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
            />
            <span className="toggal-show-password">
              {showPasswored ? (
                <FaEyeSlash onClick={() => setShowPassword(false)} />
              ) : (
                <FaEye onClick={() => setShowPassword(true)} />
              )}
            </span>
          </div>
          <div className="login-box">
            <a className="anim" onClick={googleAuth}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <FaGooglePlusG className="google" /> Login With Google
            </a>
          </div>
          <div className="login-box">
            <a className="anim" onClick={onSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Login
            </a>
          </div>
          <Link to="/reset-password" style={{ alignSelf: "end" }}>
            Forgot password?
          </Link>
        </form>
      </section>
    </div>
  );
}

export default Login;
