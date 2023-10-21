import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiMessageAdd } from "react-icons/bi";
import { sendMessage } from "../features/user/userSlice";
function Contact() {
  const {user} = useSelector((state) => state.user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });
  const { name, email, title, message } = formData;
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

    const messageData = {
      name,
      email,
      title,
      message,
    };
    dispatch(sendMessage(messageData));
  };
  return (
    <div
      className="register text-center"
      style={{ backgroundColor: "#9d00ff" }}
    >
      <section className="heading">
        <h1>
          <BiMessageAdd /> Contact US
        </h1>
        <p>Please create Message</p>
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
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Title Message"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              id="message"
              value={message}
              onChange={onChange}
              placeholder="You Message"
            ></textarea>
          </div>
          <div className="login-box">
            <a className="anim" onClick={onSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Send
            </a>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Contact;
