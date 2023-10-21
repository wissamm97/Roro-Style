import { Button, Container, Row } from "react-bootstrap";
import "swiper/swiper-bundle.min.css";
import { addTofavourite } from "../features/Favourites/Favourites";
import {  FaStar } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getproduct } from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { FaCartPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
SwiperCore.use([Navigation]);

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, categories } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const slideRefs = useRef([]);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  useEffect(() => {
    dispatch(getproduct());
    setActiveCategoryIndex(0);
  }, []);
  const handleAddToCart = (item) => {
    if (user) {
      dispatch(addToCart(item));
    } else {
      navigate("/login");
    }
  };
  const handleAddToFavorite = (item) => {
    if (user) {
      dispatch(addTofavourite(item));
    } else {
      navigate("/login");
    }
  };

  const handlePrev = () => {
    slideRefs.current[activeCategoryIndex]?.swiper?.slidePrev();
  };

  const handleNext = () => {
    slideRefs.current[activeCategoryIndex]?.swiper?.slideNext();
  };

  const onSlideChange = () => {
    const swiper = slideRefs.current[activeCategoryIndex]?.swiper;
    setIsFirst(swiper?.isBeginning);
    setIsLast(swiper?.isEnd);
  };

  const handleCategoryChange = (index) => {
    setActiveCategoryIndex(index);
  };
  return (
    <section className="p-5 products" style={{ backgroundColor: "#B8BEDD" }}>
      <h2
        className="text-center fw-bold"
        style={{
          fontSize: "4rem",
          textShadow: "0px 6px 7px #F0A6CA",
          color: "#fff",
        }}
      >
        Products
      </h2>
      {categories.map((item, index) => (
        <div key={item}>
          <div className="header-product">
            <div className="product-title">{item}</div>
          </div>
          <Swiper
            key={item}
            slidesPerView={2}
            spaceBetween={30}
            navigation={true}
            onSlideChange={onSlideChange}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Navigation]}
            className="mySwiper"
            ref={(swiper) => (slideRefs.current[index] = swiper)}
          >
            {products
              .filter((product) => product.category === item)
              .map((product) => (
                <SwiperSlide key={product._id} style={{ height: "auto" }}>
                  <div className="card-product" key={product._id}>
                    <div className="text-center">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="card-info" style={{ textAlign: "left" }}>
                      <strong>Name: {product.name}</strong>
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
                        onClick={() =>
                          navigate(`/product/details/${product._id}`)
                        }
                      >
                        <BiDetail />
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      ))}
    </section>
  );
}

export default Products;
