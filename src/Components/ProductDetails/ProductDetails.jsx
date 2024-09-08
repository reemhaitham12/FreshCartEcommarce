import axios from "axios";
import React , { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion } from "framer-motion";
import RecentProduct from "../RecentProduct/RecentProduct";
import { CartContext } from "../../Context/CartContext";
import Animation from "../Animation/Animation";
const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export default function ProductDetails() {
  let { id, categoryId } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  let { addToCart } = useContext(CartContext);

  function ChangeSrc(e) {
    setImgSrc(e.target.src);
  }

  const settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: productDetails?.images?.length === 1 ? 1 : 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: productDetails?.images?.length === 1 ? 1 : 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: productDetails?.images?.length === 1 ? 1 : 3,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: productDetails?.images?.length === 1 ? 1 : 4,
        },
      },
    ],
  };

  async function getProductDetails(id) {
    try {
      setLoading(true);
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
      setImgSrc(data.data.imageCover);
      setLoading(false);
    } catch (err) {
      console.log(err?.message);
      setLoading(false);
    }
  }

  const [relatedProduct, setRelatedProduct] = useState([]);
  async function getProductCategory(categoryId) {
    try {
      setLoading(true);
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
      );
      setRelatedProduct(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err?.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails(id, categoryId);
    getProductCategory(categoryId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, categoryId]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <Animation>
          <div className="flex flex-col md:flex-row items-start gap-4 p-4">
            <div className="w-full md:w-1/3 p-3">
              <img
                src={imgSrc}
                className="w-[350px] h-auto object-cover rounded m-auto"
                alt={productDetails.title}
              />
              <Slider
                {...settings}
                className={`py-3 ${
                  productDetails?.images?.length === 1
                    ? "flex justify-center items-center"
                    : ""
                }`}
              >
                {productDetails?.images?.map((img, index) => (
                  <motion.div
                    whileTap="tap"
                    whileHover="hover"
                    variants={buttonVariants}
                    key={index}
                    className="w-full h-auto px-2"
                  >
                    <img
                      onClick={ChangeSrc}
                      src={img}
                      alt={productDetails?.title}
                      className={`w-full h-auto object-cover rounded m-auto cursor-pointer focus:outline-none focus:border-none ${
                        productDetails?.images?.length === 1 ? "w-40" : ""
                      }`}
                    />
                  </motion.div>
                ))}
              </Slider>
            </div>

            {/* Product Info Section */}
            <div className="w-full md:w-2/3 space-y-4 md:mt-16">
              <h2 className="text-main text-sm md:text-lg">
                {productDetails?.category?.name}
              </h2>
              <h2 className="font-thin text-main text-sm md:text-lg">
                {productDetails?.brand?.name}
              </h2>
              <h2 className="font-medium text-sm md:text-lg">
                {productDetails?.title}
              </h2>
              <h2 className="font-light text-sm md:text-lg">
                {productDetails?.description}
              </h2>
              <div className="flex flex-col md:flex-row items-start md:items-center mt-2">
                {/* Price and Rating Section */}
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                    {productDetails?.price} EGP
                  </h3>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold flex items-center">
                    <i className="fas fa-star rating-color mr-1"></i>
                    {productDetails?.ratingsAverage}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => addToCart(productDetails.id)}
                className="btn w-full bg-main text-white rounded py-2 mt-2 hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-main-dark focus:ring-opacity-50 text-xs sm:text-sm md:text-base"
              >
                Add To Cart
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 py-3">
            {relatedProduct?.map((product, index) => (
              <RecentProduct key={index} product={product} />
            ))}
          </div>
          </Animation>
        </>
      )}
    </>
  );
}
