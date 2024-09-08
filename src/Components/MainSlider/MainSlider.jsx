import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slide1 from "../../assets/slider-image-3.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide4 from "../../assets/istockphoto-1.jpg";
import slide3 from "../../assets/pexels-photo-95589.webp";

export default function MainSlider() {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3, 
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2, 
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          dots:false,
          slidesToShow: 1, 
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-wrap ">
      <div className="w-full sm:w-3/4 lg:w-3/4">
        <Slider {...settings}>
          <div>
            <img src={slide1} alt="" className="w-full h-[400px] object-cover" />
          </div>
          <div>
            <img src={slide2} alt="" className="w-full h-[400px] object-cover" />
          </div>
        </Slider>
      </div>
      <div className="w-full sm:w-1/4 sm:mt-0">
        <div className="">
          <img src={slide4} alt="" className="w-full h-[200px] object-fill" />
        </div>
        <div>
          <img src={slide3} alt="" className="w-full h-[200px] object-fill" />
        </div>
      </div>
    </div>
  );
}
