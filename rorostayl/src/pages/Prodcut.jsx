import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getproduct } from "../features/product/productSlice";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { addTofavourite } from "../features/Favourites/Favourites";
import { addToCart } from "../features/cart/cartSlice";
function Prodcut() {
  const { category } = useParams();
  const dispatch = useDispatch();
  console.log(category);
  const { products } = useSelector((state) => state.product);
  console.log(products);
  useEffect(() => {
    dispatch(getproduct());
  }, []);

  return (
    <>
      <Container>
        <section>
          <h1 style={{ color: "#9C89B8" }} className="text-center mb-3 mt-3">
            {category}
          </h1>
        </section>
        <Row className="m-4">
          {products
            .filter((prodcut) => prodcut.category == category)
            .map((product) => (
              <Col
                className="d-flex justify-content-center"
                style={{ paddingRight: "0" }}
                key={product._id}
              >
                <div class="cardpro">
                  <div class="cardpro-header">
                    <h3>{product.title}</h3>
                  </div>

                  <div class="cardpro-img">
                    <img src={product.image} alt={product.title} />
                    <FaHeart
                      onClick={() => {
                        dispatch(addTofavourite(product));
                      }}
                    />
                  </div>

                  <div class="cardpro-details">
                    <div class="price">
                      <p>Price <strong>${product.price}</strong></p>
                      <Link className="link-to-details" to={`/product/details/${product._id}`}> MoreDetails...</Link>
                    </div>
                  </div>

                  <div class="cardpro-footer">
                    <Button
                      onClick={() => {
                        dispatch(addToCart(product));
                      }}
                    >
                      <FaCartPlus />
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default Prodcut;
