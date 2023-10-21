import axios from "axios";
const API_URL = "https://rorostorefinall.onrender.com/api/orders/mine";
const getOrder = async (_, Token) => {
  const config = {
    headers: {
      authorization: `Bearer ${Token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const orderServices = {
  getOrder,
};
