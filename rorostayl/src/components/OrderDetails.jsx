import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getorder, resetAddOrder } from "../features/cart/cartSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner/Spinner";
import MessageBox from "./MessageBox";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { ApproveOrder, resetPay } from "../features/Paypal/PaypalSlice";

function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, isLodaing, isError, paymentMethod } = useSelector(
    (state) => state.cart
  );
  const { user, Shipingaddress } = useSelector((state) => state.user);
  const { data_url } = useSelector((state) => state.stripe);
  const navigate = useNavigate();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { loadingPay, successPay } = useSelector((state) => state.paypal);

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: orderDetails.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  const onApprove = async (data, action) => {
    const order = await action.order.capture();
    handleApprove(id, order);
  };
  const handleApprove = (id, order) => {
    dispatch(ApproveOrder({ id, order }));
  };
  const handlePay = async () => {
    const stripePromise = await loadStripe(
      "pk_test_51NHuFsCNIpndj93qcz6gk7waXHcyjOcxVF5DeIxepy9itFEdoCG1yk1rur6kT8plWFaasfVWMDASq1drAbc8TFcc00OZQ0FZZK"
    );
    const config = {
      headers: {
        Authorization: `Bearer ${user.Token}`,
      },
    };
    const response = await axios.post(
      "https://rorostorefinall.onrender.com/api/payment/checkout",
      orderDetails,
      config
    );
    console.log(response, "Hello PAy");
    const data = await response.data;
    stripePromise.redirectToCheckout({ sessionId: data });
  };
  useEffect(() => {
    dispatch(getorder(id));

    dispatch(resetAddOrder());
    if (!user) {
      navigate("/login");
    }
    if (successPay) {
      dispatch(resetPay());
    }
    const LoadPaypalScript = async () => {
      const { data: clientId } = await axios.get("https://rorostorefinall.onrender.com/api/Keys/paypal", {
        headers: { Authorization: `Bearer ${user.Token}` },
      });
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": clientId,
          currency: "USD",
        },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    };
    LoadPaypalScript();
  }, [navigate, paypalDispatch, user, successPay, data_url]);

  return isLodaing || !orderDetails || !orderDetails.shippingAddress ? (
    <Spinner></Spinner>
  ) : (
    <>
      <Container>
        <Row>
          <h1 className="my-3">Order {id}</h1>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Shipping</Card.Title>
                <Card.Text>
                  <strong>Name: </strong>{" "}
                  {orderDetails.shippingAddress.fullName} <br />
                  <strong>Address: </strong>
                  {orderDetails.shippingAddress.address} ,
                  {orderDetails.shippingAddress.city},
                  {orderDetails.shippingAddress.phonenumber},
                  {orderDetails.shippingAddress.country}
                </Card.Text>
                {orderDetails.isDelivered ? (
                  <MessageBox variant="success">
                    {" "}
                    Delivered at {orderDetails.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <strong>Method:</strong> {orderDetails.paymentMethod}
                </Card.Text>
                {orderDetails.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {orderDetails.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Items</Card.Title>
                <ListGroup variant="flush">
                  {orderDetails.orderItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="img-fluid rounded img-thumbnail"
                          ></img>{" "}
                        </Col>
                        <Col md={3}>
                          <span>{item.quantity}</span>
                        </Col>
                        <Col md={3}>${item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-2">
              <Card.Body >
                <Card.Title>Order Summary</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${orderDetails.itemsPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${orderDetails.shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${orderDetails.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong> Order Total</strong>
                      </Col>
                      <Col>
                        <strong>${orderDetails.totalPrice.toFixed(2)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {user&& user.isVerified ? (
                    <>
                      {!orderDetails.isPaid && (
                        <ListGroup.Item>
                          {isPending ? (
                            <Spinner />
                          ) : (
                            <div>
                              {orderDetails.paymentMethod === "PayPal" ? (
                                <PayPalButtons
                                  createOrder={createOrder}
                                  onApprove={onApprove}
                                  // onError={onError}
                                ></PayPalButtons>
                              ) : (
                                <Button
                                  onClick={() => {
                                    handlePay(orderDetails);
                                  }}
                                >
                                  Pay
                                </Button>
                              )}
                            </div>
                          )}
                          {loadingPay && <Spinner></Spinner>}
                        </ListGroup.Item>
                      )}
                    </>
                  ) : (
                    <MessageBox variant="danger">
                      Please confirm the account in order to be able to complete
                      the purchase
                    </MessageBox>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OrderDetails;
