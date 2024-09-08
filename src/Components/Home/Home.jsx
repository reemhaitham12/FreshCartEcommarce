import axios from "axios";
import React, { useEffect, useState } from "react";
import RecentProduct from "../RecentProduct/RecentProduct";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderCategories from "../SliderCategories/SliderCategories";
import MainSlider from "../MainSlider/MainSlider";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Animation from "../Animation/Animation";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getRecentProducts() {
    try {
      setLoading(true);
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      setProducts(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getRecentProducts();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner></LoadingSpinner>
        </div>
      ) : (
        <>
          <Animation>
          <MainSlider />
          <SliderCategories />
          <div className="flex flex-wrap justify-center gap-4 py-3">
            {products.map((product, index) => (
              <RecentProduct key={index} product={product} />
            ))}
          </div>
          </Animation>
        </>
      )}
    </>
  );
}
