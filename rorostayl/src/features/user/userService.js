import axios from "axios";
const API_URL_Verify =
  "https://rorostyle.onrender.com/api/user/verifyEmail";
const API_URL_CONFIRM = "https://rorostyle.onrender.com/api/user/confirm";
const API_URL = "https://rorostyle.onrender.com/api/user/register";
const API_LOGINGOOGLE_URL = "https://rorostyle.onrender.com/auth/google/";
const API_MESSAGE = "https://rorostyle.onrender.com/api/user/contact";
const API_URL_Login = "https://rorostyle.onrender.com/api/user/login";
const API_URL_ADDRESS = "https://rorostyle.onrender.com/api/user/adress";
const API_URL_MEADDRESS = "https://rorostyle.onrender.com/api/user/getme";
const API_URL_UPDATE = "https://rorostyle.onrender.com/api/user/profile";
const API_URL_RESET_PASSWORD =
  "https://rorostyle.onrender.com/api/user/reset-password";
const API_URL_CHANGE_PASSWORD =
  "https://rorostyle.onrender.com/api/user/change-password";
// Register
const register = async (user) => {
  const response = await axios.post(API_URL, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
// accountconfirm
const accountconfirm = async (id) => {
  const response = await axios.get(`${API_URL_CONFIRM}/${id}`);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
// VeriFyEmail

const verifyEmail = async (emailToken) => {
  const response = await axios.post(API_URL_Verify, { emailToken: emailToken });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
// Reset Password
const resetPassword = async (email) => {
  const response = await axios.post(API_URL_RESET_PASSWORD, email);

  return response.data;
};
// changePassword
const changePassword = async (data) => {
  const response = axios.post(API_URL_CHANGE_PASSWORD, data);
  return (await response).data;
};
// Login With Google
const loginGoogle = async () => {
  window.open(API_LOGINGOOGLE_URL, "_self");
};

const getUser = async () => {
  const response = await axios.get(
    "https://rorostyle.onrender.com/auth/login/success",
    { withCredentials: true }
  );
  console.log(response.data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login
const login = async (user) => {
  const response = await axios.post(API_URL_Login, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
// Send Message
const sendMessage = async (data, Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.post(API_MESSAGE, data, config);
  return response.data;
};
// Update User Info
const updateInfo = async (userdata, Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.put(API_URL_UPDATE, userdata, config);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
// set Address User
const setAddress = async (data, Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.post(API_URL_ADDRESS, data, config);
  if (response.data) {
    localStorage.setItem("ShipingAddress", JSON.stringify(response.data));
  }
  console.log(response.data);
  return response.data;
};
// get Address User
const getAddress = async (Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.get(API_URL_MEADDRESS, config);
  console.log(response.data);
  if (response.data) {
    localStorage.setItem("ShipingAddress", JSON.stringify(response.data));
  }
  return response.data;
};
const logout = async () => {
  // localStorage.removeItem("user");
  // localStorage.removeItem("ShipingAddress");
  // localStorage.removeItem("paymentMethod");
  // localStorage.removeItem("CartItem");
  // localStorage.removeItem("favouriteItem");
  // return await axios.get("https://rorostyle.onrender.com/auth/logout");
  window.open("https://rorostyle.onrender.com/auth/logout", "_self");
  localStorage.removeItem("user");
  localStorage.removeItem("ShipingAddress");
  localStorage.removeItem("paymentMethod");
  localStorage.removeItem("CartItem");
  localStorage.removeItem("favouriteItem");
};
const userService = {
  register,
  login,
  resetPassword,
  verifyEmail,
  accountconfirm,
  changePassword,
  loginGoogle,
  getUser,
  updateInfo,
  sendMessage,
  setAddress,
  getAddress,
  logout,
};

export default userService;
