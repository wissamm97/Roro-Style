import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MdDeleteForever } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { addToCart } from "../features/cart/cartSlice";
import { deleteFromfavourite } from "../features/Favourites/Favourites";
import Empty from "../components/Empty/Empty";

function Favourites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Favourite } = useSelector((state) => state.favourite);
  const handleDelete = (itemId) => {
    dispatch(deleteFromfavourite(itemId));
  };
  console.log(Favourite);
  if (Favourite.length == 0) {
    return <Empty content="Favourite" />;
  }
  return (
    <>
      <Helmet>
        <title>Favourites</title>
      </Helmet>
      <Container>
        <section>
          <h3 style={{ color: "#9C89B8" }} className="text-center mb-3 mt-3">
            Favourites
          </h3>
        </section>
        <Row>
          <Col>
            {Favourite.map((product) => (
              <div className="card-fav" key={product._id}>
                <div className="image">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="info">
                  <h2>Name: {product.title}</h2>
                  <div className="descript">
                    <p className="description">
                      description: {product.description}
                    </p>
                  </div>
                  <div className="descript">
                    <p className="description">Category: {product.category}</p>
                  </div>
                  <div className="button">
                    <Button
                      className="to-shop"
                      style={{ backgroundColor: "#9C89B8", border: "none" }}
                      onClick={() => {
                        navigate("/cart");
                        dispatch(addToCart(product));
                      }}
                      variant="primary"
                    >
                      <FaCartPlus />
                    </Button>
                    <Button
                      className="to-shop"
                      onClick={() => handleDelete(product._id)}
                      style={{ backgroundColor: "#9C89B8", border: "none" }}
                    >
                      <MdDeleteForever />
                    </Button>
                    <span className="price">Price: {product.price}$</span>
                  </div>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Favourites;
