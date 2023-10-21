import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import { getdetalis } from "../features/product/productSlice";
import { FaMinusCircle, FaPlusCircle, FaRegHeart } from "react-icons/fa";
import { minusquntity, plusquntity } from "../features/cart/cartSlice";
function Productdetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { details } = useSelector((state) => state.product);
  console.log(id);
  console.log(details);
  useEffect(() => {
    dispatch(getdetalis(id));
  }, []);
  return (
    <Container className="m-3 p-2 ">
      <h2 className="text-center">{details.title}</h2>
      <Row className="d-flex justify-conten-center m-auto mt-3">
        <Col className="text-center">
          <img src={details.image} alt={details.title} />
        </Col>
        <Col style={{ padding: "0" }}>
          <div className="info-detalis">
            <h4>{details.title}</h4>
            <p className="description">Description: {details.description}</p>
            <p>Category: {details.category}</p>
            <p>
              Price: <span className="price">{details.price}</span>{" "}
            </p>
            <div className="button-details">
              <div className="button-add">
                <Button
                  style={{
                    backgroundColor: "#9C89B8",
                    border: "none",
                    borderRadius: "0",
                  }}
                >
                  ADD TO CART
                </Button>
                <Button
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "1px solid #9C89B8",
                    // borderRadius: "0",
                  }}
                >
                  <FaRegHeart />
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Productdetails;
