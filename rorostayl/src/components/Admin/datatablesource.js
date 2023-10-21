import { format } from "date-fns";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
export const userColumns = [
  { field: "id", headerName: "ID", width: 60 },
  {
    field: "user",
    headerName: "Username",
    width: 150,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.username}</div>;
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },
  {
    field: "join",
    headerName: "Join",
    width: 150,
    renderCell: (params) => {
      return (
        <div className={`cellWith11Join ${params.row.createdAt}`}>
          {formatDistanceToNow(new Date(params.row.createdAt), {
            addSuffix: true,
          })}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const productsColumns = [
  { field: "id", headerName: "ID", width: 60 },
  {
    field: "name",
    headerName: "ProductName",
    width: 150,
    renderCell: (params) => {
      console.log(params.row);
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "category",
    headerName: "Product Category",
    width: 150,
  },
  {
    field: "Price",
    headerName: "Product Price",
    width: 150,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.price}$</div>;
    },
  },
  {
    field: "Created",
    headerName: "Created",
    width: 150,
    renderCell: (params) => {
      return (
        <div className={`cellWith11Join ${params.row.createdAt}`}>
          {format(new Date(params.row.createdAt), "MM/dd/yyyy")}
        </div>
      );
    },
  },
];
export const ordersColumns = [
  { field: "id", headerName: "ID", width: 60 },
  {
    field: "Created",
    headerName: "Created",
    width: 150,
    renderCell: (params) => {
      return (
        <div className={`cellWith11Join ${params.row.createdAt}`}>
          {formatDistanceToNow(new Date(params.row.createdAt), {
            addSuffix: true,
          })}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 80,
    renderCell: (params) => {
      // console.log(params.row);
      return (
        <div
          className={`cellWithStatus ${
            params.row.isPaid ? "active" : "NotActive"
          }`}
        >
          {params.row.isPaid ? "Paid" : "notPaid"}
        </div>
      );
    },
  },
  {
    field: "Delivered",
    headerName: "Delivered",
    width: 160,
    renderCell: (params) => {
      return (
        <div
          className={`cellWithStatus ${
            params.row.isDelivered ? "active" : "NotActive"
          }`}
        >
          {params.row.isDelivered ? "Delivered" : "NotDelivered"}
        </div>
      );
    },
  },
  {
    field: "PaymentMethod",
    headerName: "PaymentMethod",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.paymentMethod}`}>
          {params.row.paymentMethod}
        </div>
      );
    },
  },
  {
    field: "TOTOAL",
    headerName: "TOTOAL",
    width: 160,
    renderCell: (params) => {
      const orderItems = params.row.orderItems;
      const itemLength = orderItems ? orderItems.length : 0;

      return (
        <div className={`cellWithStatus ${orderItems}`}>
          ${params.row.totalPrice} for {itemLength} item
        </div>
      );
    },
  },
];
