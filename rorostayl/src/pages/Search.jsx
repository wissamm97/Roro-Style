import { useEffect, useState, useRef } from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getproduct } from "../features/product/productSlice";
import {
  FaCartPlus,
  FaStar,
  FaArrowRight,
  FaArrowLeft,
  FaBars,
} from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];
function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories, products } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  const pricss = products.map((pro) => {
    return pro.price;
  });
  const largestNumber = Math.max(...pricss);
  const smallestNumber = Math.min(...pricss);
  const [price, setPrice] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("all");
  const minPrice = parseInt(price.split("-")[0]);
  const maxPrice = parseInt(price.split("-")[1]);
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getproduct());
  }, [price, category]);

  function handleActive(ev) {
    // Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    // Add Active Class On Self
    ev.target.classList.add("active");
  }
  const filteredItems = products.filter((product) => {
    const categoryMatch =
      category.toLowerCase() === "all" ||
      product.category.toLowerCase() === category.toLowerCase();
    const priceMatch =
      price === "all" ||
      (product.price >= minPrice && product.price <= maxPrice);
    return categoryMatch && priceMatch;
  });
  // Pagination
  const Page_Size = 3;
  const pages = Math.ceil(filteredItems.length / Page_Size);
  const generatePages = [];
  for (let i = 1; i <= pages; i++) {
    generatePages.push(i);
  }
  const startIndex = (currentPage - 1) * Page_Size;
  const lastIndex = currentPage * Page_Size;
  const orderedProduct = filteredItems.slice(startIndex, lastIndex);
  const handleAddToCart = (item) => {
    if (user) {
      dispatch(addToCart(item));
    } else {
      navigate("/login");
    }
  };
  const handleAddToFavorite = (item) => {
    if (user) {
      dispatch(addToCart(item));
    } else {
      navigate("/login");
    }
  };
  const handleShowSidBarSearch = () => {
    const sidbarSearch = document
      .querySelector(".sidbar-category")
      .classList.toggle("show");
  };
  return (
    <div className="container-fluid mt-2">
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row className="mobile-res">
        <Col xs lg="2" className="sidbar-category">
          <div className="show-search">
            <FaBars onClick={handleShowSidBarSearch} />
          </div>
          <h3>Category</h3>
          <ul>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => setCategory("all")}
            >
              All
            </li>
            {categories.map((c) => (
              <li
                value={c}
                style={{ cursor: "pointer" }}
                key={c}
                onClick={() => setCategory(c)}
              >
                {c}
              </li>
            ))}
          </ul>

          <h3>Price</h3>
          <ul>
            <li
              onClick={() =>
                setPrice(
                  `${parseInt(smallestNumber)}-${parseInt(largestNumber)}`
                )
              }
              value="all"
              style={{ cursor: "pointer" }}
            >
              All
            </li>
            {prices.map((c) => (
              <li
                onClick={() => setPrice(c.value)}
                value={c.value}
                style={{ cursor: "pointer" }}
                key={c.value}
              >
                {c.name}
              </li>
            ))}
          </ul>
        </Col>
        <Col
          className="col-8  d-flex search-item"
          style={{
            flexWrap: "wrap",
            padding: "0",
            margin: "auto",
          }}
        >
          <Row
            style={{
              width: "100%",
              margin: "0",
              "--bs-gutter-x": "0",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {orderedProduct.map((product) => (
              <div className="card-product search" key={product._id}>
                <div className="text-center">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="card-info">
                  <strong>Name: {product.title}</strong>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Description:</Accordion.Header>
                      <Accordion.Body>{product.description}</Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <p className="cate">Category: {product.category}</p>
                  <p className="price">Price: {product.price}$</p>
                </div>
                <div className="icon">
                  <span onClick={() => handleAddToCart(product)}>
                    <FaCartPlus />
                  </span>
                  <span onClick={() => handleAddToFavorite(product)}>
                    <FaStar />
                  </span>
                  <span
                    onClick={() => navigate(`/product/details/${product._id}`)}
                  >
                    <BiDetail />
                  </span>
                </div>
              </div>
            ))}
          </Row>

          <Row style={{ width: "100%", margin: "0" }}>
            <div style={{ width: "100%" }} className="pagination-continar">
              <ul className="pagination">
                <Button
                  className="btn-next"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  <FaArrowLeft />
                </Button>
                {generatePages.map((pageIndex) => (
                  <li
                    className={currentPage === pageIndex ? "active" : "page"}
                    style={{ userSelect: "none" }}
                    key={pageIndex}
                    onClick={(e) => {
                      setCurrentPage(pageIndex);
                       handleActive(e);
                    }}
                  >
                    {pageIndex}
                  </li>
                ))}
                <Button
                  className="btn-prev"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === pages}
                >
                  <FaArrowRight />
                </Button>
              </ul>
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Search;
