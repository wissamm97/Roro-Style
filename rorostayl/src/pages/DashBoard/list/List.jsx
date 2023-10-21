import "./List.scss";
import Sidebar from "../../../components/Admin/sidebar/Sidebar";
import Datatable from "../../../components/Admin/datatable/Datatable";
import Navbar from "../../../components/Admin/navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  AllUser,
  getAllOrder,
  getAllProducts,
} from "../../../features/Admin/AdminSlice";
const List = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message, Allusers, orders, products } =
    useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(AllUser());
    dispatch(getAllOrder());
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default List;
