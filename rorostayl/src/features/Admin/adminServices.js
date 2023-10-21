import axios from "axios";
const API_URL_LOGIN = "https://rorostorefinall.onrender.com/api/admin/login";
const API_URL = "https://rorostorefinall.onrender.com/api/admin/alluser";
const API_URL_ORDERS = "https://rorostorefinall.onrender.com/api/admin/allorders";
const API_URL_PRODUCTS = "https://rorostorefinall.onrender.com/api/admin/allproduts";
const API_URL_USER = "https://rorostorefinall.onrender.com/api/admin/user";
const API_URL_USER_DETIALS = "https://rorostorefinall.onrender.com/api/admin/user/detials";
const API_URL_ORDER = "https://rorostorefinall.onrender.com/api/admin/order";
const API_URL_ORDER_DELIVERED = "https://rorostorefinall.onrender.com/api/admin/order/delivered/";
const API_URL_PRODUCT = "https://rorostorefinall.onrender.com/api/admin/product";
const API_URL_PRODUCT_DELETE = "https://rorostorefinall.onrender.com/api/admin/product";
const API_URL_PRODUCT_CREATE = "https://rorostorefinall.onrender.com/api/admin/createproduct";
// login Admin
const login = async (adminData) => {
  const response = await axios.post(API_URL_LOGIN, adminData);
  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));
  }
  return response.data;
};

// LogOut Admin
const logout = () => {
  localStorage.removeItem("admin");
};
// get All user For Admin
const getAlluser = async (Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};
const getAllOrders = async (Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.get(API_URL_ORDERS, config);
  return response.data;
};
const getAllProducts = async (Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.get(API_URL_PRODUCTS, config);
  return response.data;
};
// Create Product

const createproduct = async (data,Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.post(API_URL_PRODUCT_CREATE, data, config);
  if (response.data) {
    const id = response.data._id;
    window.location.href = `http://localhost:3000/dashboard/products/${id}`;
  }
  return response.data;
};
// Details
const getUserDetails = async (id,Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.get(`${API_URL_USER_DETIALS}/${id}`,config);
  console.log(response);
  return response.data;
};
const getOrderDetails = async (id,Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.get(`${API_URL_ORDER}/${id}`, config);
  return response.data;
};

const orderStatusChange = async (id, data,Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.put(
    `${API_URL_ORDER}/${id}`,
    { data: data },
    config
  );
  console.log(response.data);
  return response.data;
};
const orderDelivered = async (id,Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.get(`${API_URL_ORDER_DELIVERED}/${id}`, config);
  return response.data;
};
const getproductdetails = async (id,Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.get(`${API_URL_PRODUCT}/${id}`, config);
  return response.data;
};
const deletproduct = async (id,Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.delete(
    `${API_URL_PRODUCT_DELETE}/${id}`,
    config
  );
  console.log(response.data);
  return response.data;
};
const deletuser = async (id,Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.delete(
    `${API_URL_USER}/${id}`,
    config
  );
  console.log(response.data);
  return response.data;
};
const deletorder = async (id,Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.delete(
    `${API_URL_ORDER}/${id}`,
    config
  );
  console.log(response.data);
  return response.data;
};
export const adminservice = {
  login,
  logout,
  getAlluser,
  getAllOrders,
  getAllProducts,
  getUserDetails,
  getOrderDetails,
  getproductdetails,
  deletproduct,
  deletuser,
  deletorder,
  createproduct,
  orderStatusChange,
  orderDelivered,
};
