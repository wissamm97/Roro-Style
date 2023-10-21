import React, { useEffect, useLayoutEffect, useState } from "react";
import { Card, Container, Row, Button, ListGroup, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addOrder, reset } from "../features/cart/cartSlice";
import MessageBox from "./MessageBox";
function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Shipingaddress, user } = useSelector((state) => state.user);
  useLayoutEffect(() => {}, [user]);
  console.log(Shipingaddress, "user");
  const { paymentMethod, product, order } = useSelector((state) => state.cart);
  const [newObject, setNewObject] = useState({ product });
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  newObject.itemsPrice = round2(
    newObject.product.reduce((a, c) => a + +c.quantity * +c.price, 0)
  );
  newObject.shippingPrice = newObject.itemsPrice > 100 ? round2(0) : round2(10);
  newObject.taxPrice = round2(0.15 * newObject.itemsPrice);
  newObject.totalPrice =
    newObject.itemsPrice + newObject.shippingPrice + newObject.taxPrice;
  console.log(order.order, "order");
  const placeOrderHandler = async () => {
    const data = {
      orderItems: newObject.product,
      shippingAddress: Shipingaddress,
      paymentMethod: paymentMethod,
      itemsPrice: newObject.itemsPrice,
      shippingPrice: newObject.shippingPrice,
      taxPrice: newObject.taxPrice,
      totalPrice: newObject.totalPrice,
    };
    dispatch(addOrder(data));
  };
  useEffect(() => {
    if (order.order && order.order._id) {
      localStorage.removeItem("CartItem");
      dispatch(reset());
      navigate(`/order/${order.order._id}`);
    } else {
    }
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [Shipingaddress, order, newObject, user,dispatch]);
  return (
    <Container>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong> {Shipingaddress.fullName} <br />
                <strong>Address: </strong>
                {Shipingaddress.address} ,{Shipingaddress.city},
                {Shipingaddress.phonenumber},{Shipingaddress.country}
              </Card.Text>
              <Link style={{ color: "blue !important" }} to="/ShipingAddress">
                Edit
              </Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {product.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                        <Link to={`/product/${item.slug}`}>{item.title}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${newObject.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${newObject.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${newObject.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${newObject.totalPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={product.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Order;
