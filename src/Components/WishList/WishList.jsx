import React, { useContext, useEffect, useState } from "react";
import imageWish from "../../../src/assets/wishlistEmpty.png";
import { WishListContext } from "../../Context/WishListContext";
import { Link } from "react-router-dom";
import Animation from "../Animation/Animation";
import { CartContext } from "../../Context/CartContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function WishList() {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getWishListItems, deleteProduct } = useContext(WishListContext);
  const { addToCart } = useContext(CartContext);

  async function getWishList() {
    try {
      setLoading(true);
      const response = await getWishListItems();
      setWishList(response.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteItems(productId) {
    try {
      await deleteProduct(productId);
      await getWishList(); 
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <Animation>
      {loading && !wishList.length ? ( 
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner />
        </div>
      ) : wishList.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <img
            src={imageWish}
            alt="Empty Wishlist"
            className="w-full max-w-sm md:max-w-lg lg:max-w-xl"
          />
        </div>
      ) : (
        <div className="container mx-auto px-10 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishList.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg overflow-hidden product"
              >
                <Link
                  to={`/productdetails/${product._id}/${product.category._id}`}
                  className="block"
                >
                  {product?.imageCover ? (
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="object-cover h-80 w-full py-1"
                    />
                  ) : (
                    <div className="w-full h-50 bg-gray-200 flex items-center justify-center">
                      <p>No Image Available</p>
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="text-main text-sm md:text-lg">
                      {product.category.name}
                    </h2>
                    <h2 className="font-medium text-sm md:text-lg">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                    <div className="flex justify-between items-center mt-2">
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                        {product.price} EGP
                      </h3>
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                        <i className="fas fa-star rating-color"></i>{" "}
                        {product.ratingsAverage}
                      </h3>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-between p-4 border-t border-gray-200">
                  <button
                    onClick={() => deleteItems(product._id)}
                    className="btn bg-red-500 text-white rounded py-1 px-2 text-xs sm:text-sm md:text-base hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="btn bg-main text-white rounded py-1 px-2 text-xs sm:text-sm md:text-base hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-main-dark focus:ring-opacity-50"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Animation>
  );
  



}
