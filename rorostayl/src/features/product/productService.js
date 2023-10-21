import axios from "axios";
const URL_API = "https://rorostyle.onrender.com/api/admin/";
const API_URL_DETAILS = "https://rorostyle.onrender.com/api/admin/product/details/";
// Get All Prodcut
const getallproduct = async () => {
  const response = await axios.get(URL_API + "allproduct");
  return response.data;
};
const getCategory = async () => {
  const response = await axios.get(URL_API + "category");
  return response.data;
};
// Get DetailsProduct
const getDeltails = async (id) => {
  const response = await axios.post(API_URL_DETAILS, { id: id });
  return response.data;
};
export const productservice = {
  getallproduct,
  getCategory,
  getDeltails,
};
