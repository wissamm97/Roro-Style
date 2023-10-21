import axios from "axios";

const API_URL = "/api/admin/search";
const searchProduct = async ({ query }) => {
  console.log(query);
  //   const response = await axios.get(API_URL + query);
};
export const SearchServices = {
  searchProduct,
};
