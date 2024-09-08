import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SliderCategories() {
  const [categories, setCategories] = useState([]);

  const settings = {
    arrows:false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7, // size screen big
    slidesToScroll: 5,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024, //size screen tablet
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // size screen mobile big
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // size screen mobile small
        settings: {
          speed: 300,
          dots:false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function getRecentCategories() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      setCategories(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRecentCategories();
  }, []);

  return (
    <div className="md:p-4 sm:p-2">
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div key={index} className="text-center p-2">
            <Link to={`/categories`}>
            <div className="rounded-lg overflow-hidden ">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[355px] sm:h-[200px] md:h-[250px] object-cover"
              />
            </div>
            <h2 className="mt-2 text-sm sm:text-base md:text-lg font-semibold">
              {category.name}
            </h2>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

