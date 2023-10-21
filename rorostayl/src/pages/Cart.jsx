import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  Container,
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa";
import { deleteFromCart, minusquntity, plusquntity } from "../features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import Empty from "../components/Empty/Empty";
function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = useSelector((state) => state.cart);
  const totalPrice =
    product &&
    product.reduce((acc, produce) => {
      acc += +produce.price * +produce.quantity;
      return acc;
    }, 0);
  const handleDelete = (itemId) => {
    dispatch(deleteFromCart(itemId));
  };
  console.log(product);
  useEffect(() => {}, [product]);
  if (product.length == 0) {
    return <Empty content="Cart" />;
  }
  return (
    <>
      <Container className="p-3">
        <Helmet>
          <title>Shopping Cart</title>
        </Helmet>
        <h1 className="text-center">Shopping Cart</h1>

        <Row className="mt-3">
          <Col md={8}>
            <ListGroup>
              {product &&
                product.map((item) => (
                  <ListGroupItem key={item._id}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        />
                      </Col>
                      <Col md={3}>
                        <Button
                          onClick={() => dispatch(minusquntity(item))}
                          variant="light"
                          disabled={item.quantity === 1}
                        >
                          <FaMinusCircle />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          onClick={() => dispatch(plusquntity(item))}
                          variant="light"
                          disabled={item.quantity === item.countInStock}
                        >
                          <FaPlusCircle />
                        </Button>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                      <Col md={2}>
                        <Button
                          onClick={() => handleDelete(item._id)}
                          variant="light"
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <p>
                    Total Price 
                       {product && product.reduce((a, c) => a + c.quantity, 0)}
                       items :$
                      {product &&
                        product.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </p>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div className="d-grid">
                      <Button
                        type="button"
                        style={{
                          backgroundColor: "#9C89B8",
                          border: "none",
                        }}
                        disabled={product && product.length === 0}
                        onClick={() => {
                          navigate("/ShipingAddress");
                        }}
                      >
                        Proceed To CheckOut
                      </Button>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Cart;
