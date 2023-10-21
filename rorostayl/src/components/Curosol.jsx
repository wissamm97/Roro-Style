import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./Curosol.css";

// import required modules
import { Pagination, Autoplay } from "swiper";

function Curosol() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide style={{ height: "calc(100vh - 150px)" }}>
          <img src="./imgs/bags1.jpg" alt="..." />
        </SwiperSlide>
        <SwiperSlide style={{ height: "calc(100vh - 150px)" }}>
          <img src="./imgs/bracelets1.jpg" alt="..." />
        </SwiperSlide>
        <SwiperSlide style={{ height: "calc(100vh - 150px)" }}>
          <img src="./imgs/Jackt1.jpg" alt="..." />
        </SwiperSlide>
        <SwiperSlide style={{ height: "calc(100vh - 150px)" }}>
          <img src="./imgs/shoes1.jpg" alt="..." />
        </SwiperSlide>
        <SwiperSlide style={{ height: "calc(100vh - 150px)" }}>
          <img src="./imgs/watches1.jpg" alt="..." />
        </SwiperSlide>
        <SwiperSlide style={{ height: "calc(100vh - 150px)" }}>
          <img src="./imgs/bags2.jpg" alt="..." />
        </SwiperSlide>
        <SwiperSlide style={{ height: "calc(100vh - 150px)" }}>
          <img src="./imgs/bracelets2.jpg" alt="..." />
        </SwiperSlide>
        <SwiperSlide style={{ height: "calc(100vh - 150px)" }}>
          <img src="./imgs/Jackt2.jpg" alt="..." />
        </SwiperSlide>
        <SwiperSlide style={{ height: "calc(100vh - 150px)" }}>
          <img src="./imgs/shoes2.jpg" alt="..." />
        </SwiperSlide>
        <SwiperSlide style={{ height: "calc(100vh - 150px)" }}>
          <img src="./imgs/watches2.jpg" alt="..." />
        </SwiperSlide>
        <SwiperSlide style={{ height: "calc(100vh - 150px)" }}>
          <img src="./imgs/bags3.jpg" alt="..." />
        </SwiperSlide>
        <SwiperSlide style={{ height: "calc(100vh - 150px)" }}>
          <img src="./imgs/bracelets3.jpg" alt="..." />
        </SwiperSlide>
        <SwiperSlide style={{ height: "calc(100vh - 150px)" }}>
          <img src="./imgs/Jackt3.jpg" alt="..." />
        </SwiperSlide>
        <SwiperSlide style={{ height: "calc(100vh - 150px)" }}>
          <img src="./imgs/shoes3.jpg" alt="..." />
        </SwiperSlide>
        <SwiperSlide style={{ height: "calc(100vh - 150px)" }}>
          <img src="./imgs/watches3.jpg" alt="..." />
        </SwiperSlide>
      </Swiper>
      <div class="spikes"></div>
    </>
  );
}

export default Curosol;
