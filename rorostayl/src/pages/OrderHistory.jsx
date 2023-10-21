import { Helmet } from "react-helmet-async";
import Spinner from "../components/Spinner/Spinner";
import MessageBox from "../components/MessageBox";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOrder } from "../features/Order/OrderSlice";
import { Button } from "react-bootstrap";
import Empty from "../components/Empty/Empty";
function OrderHistory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { data, loading, error } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getOrder());
  }, [user]);
  if(data.length ==0 ){
    return <Empty content = "You haven't Order anything"/>
  }
  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1>Order History</h1>
      {loading ? (
        <Spinner></Spinner>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;
