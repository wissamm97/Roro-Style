import "./Login.css";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { login } from "../../features/Admin/AdminSlice";
function Login() {
  const [formdata, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = formdata;
  const { admin, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.admin
  );
  useEffect(() => {
    // if (isError) {
    //   toast.error(message);
    // }
    if (isSuccess && admin) {
      navigate("/");
    }
  }, [admin]);
  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const adminData = {
      email,
      password,
    };
    dispatch(login(adminData));
  };

  return (
    <>
      <Container className="p-3">
        <section className="heading p-3">
          <h1>
            <FaSignInAlt /> Login
          </h1>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Enter Your email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter Your password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Submit
              </button>
            </div>
          </form>
        </section>
      </Container>
    </>
  );
}

export default Login;
