import axios from "axios";
const API_URL = "https://rorostorefinall.onrender.com/api/user/";
const API_URL_Oreder = "https://rorostorefinall.onrender.com/api/orders/";
// get ORder for user
const getOrder = async (id, Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.get(API_URL_Oreder + id, config);
  return response.data;
};

// Add Order
const addOrder = async (data, Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.post(API_URL_Oreder, data, config);
  return response.data;
};

// const addtoproduct = async (productData, Token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${Token}`,
//     },
//   };
//   const response = await axios.post(API_URL + "addtocart", productData, config);
//   return response.data;
// };
// Get
// const getproduct = async (_, Token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${Token}`,
//     },
//   };
//   const response = await axios.get(API_URL + "getcart", config);
//   return response.data;
// };
export const cartservice = {
  addOrder,
  getOrder,
};
