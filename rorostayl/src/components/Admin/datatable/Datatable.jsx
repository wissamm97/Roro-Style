import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import {
  userColumns,
  productsColumns,
  ordersColumns,
} from "../datatablesource";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AllUser,
  deletorder,
  deletproduct,
  deletuser,
  getAllProducts,
  reset,
} from "../../../features/Admin/AdminSlice";
import { useEffect, useState } from "react";

const Datatable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    Allusers,
    orders,
    products,
    SuccessDelelte,
  } = useSelector((state) => state.admin);
  const pathname = window.location.pathname;
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    if(pathname.includes("/users")){
      dispatch(deletuser(id))
    }
    if(pathname.includes("/products")){
      dispatch(deletproduct(id));
    }
    if(pathname.includes("/orders")){
      dispatch(deletorder(id))
    }

  };
console.log(pathname);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`${pathname}/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  let columns = [];
  if (pathname.includes("/users")) {
    columns = userColumns;
  } else if (pathname.includes("/products")) {
    columns = productsColumns;
  } else if (pathname.includes("/orders")) {
    columns = ordersColumns;
  }

  useEffect(() => {
    dispatch(AllUser());
    if (pathname === "/products") {
      dispatch(getAllProducts());
    }
  }, [dispatch, pathname]);

  useEffect(() => {
    if (SuccessDelelte) {
      dispatch(getAllProducts());
      dispatch(reset());
    }
  }, [dispatch, SuccessDelelte]);

  useEffect(() => {
    if (pathname === "/dashboard/users") {
      const mappedUsers = Allusers.map((user, index) => ({
        ...user,
        id: index + 1,
        username: user.name,
        status: user.isVerified ? "active" : "NotActive",
      }));
      setData(mappedUsers);
    } else if (pathname === "/dashboard/products") {
      const mappedProducts = products.map((product, index) => ({
        ...product,
        id: index + 1,
        ProductName: product.name,
      }));
      setData(mappedProducts);
    } else if (pathname === "/dashboard/orders") {
      const mappedOrders = orders.map((order, index) => ({
        ...order,
        id: index + 1,
        Status: order.isPaid ? "Paid" : "Not Paid",
      }));
      setData(mappedOrders);
    }
  }, [pathname, Allusers, products, orders]);

  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Datatable;
