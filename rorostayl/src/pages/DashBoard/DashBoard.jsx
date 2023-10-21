import Home from "./home/Home";
import {
  AllUser,
  getAllOrder,
  getAllProducts,
} from "../../features/Admin/AdminSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
function DashBoard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllUser());
    dispatch(getAllOrder());
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <>
      <Home />
    </>
  );
}

export default DashBoard;
