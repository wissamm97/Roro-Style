import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword,reset } from "../features/user/userSlice";
import { toast } from "react-toastify";
function Changepassword() {
  const dispatch = useDispatch();
  const [serachParams, setSerachParams] = useSearchParams();
  const emailToken = serachParams.get("emailToken");
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });
  const { password, password2 } = formData;
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("The password has been changed successfully");
    }
    dispatch(reset())
  }, [isError, isSuccess, message]);
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
        password,
        emailToken
      };

      dispatch(changePassword(userData));
    }
  };
  return (
    <div
      className="register text-center"
      style={{ backgroundColor: "#9d00ff" }}
    >
      <section className="heading">
        <h1>
           Changepassword
        </h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
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
            <input
              type="password"
              placeholder="Please confirm your password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
            />
          </div>
          <div className="login-box">
            <a className="anim" onClick={onSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              changePassword
            </a>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Changepassword;
