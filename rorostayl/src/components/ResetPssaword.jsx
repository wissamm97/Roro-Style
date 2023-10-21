import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdPassword } from "react-icons/md";
import { resetMyPassword ,reset} from "../features/user/userSlice";
import { toast } from "react-toastify";
function ResetPssaword() {
  const dispatch = useDispatch();
  const [formdata, setData] = useState({
    email: "",
  });
  const { email } = formdata;
  const { isSuccess } = useSelector((state) => state.user);
  useEffect(() => {
    if (isSuccess) {
      toast.success("The link has been sent to your mailbox. Please visit your mailbox to change your password");
    }
    dispatch(reset())
  }, [isSuccess]);
  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
    };
    dispatch(resetMyPassword(userData));
  };
  return (
    <div
      className="register text-center"
      style={{ backgroundColor: "#9d00ff" }}
    >
      <section className="heading">
        <h1>Forgot your password</h1>
        <p>Please enter your email address</p>
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
          <div className="login-box">
            <a className="anim" onClick={onSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              send
            </a>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ResetPssaword;
