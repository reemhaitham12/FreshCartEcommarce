import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function RecentProduct({ product }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, deleteProduct } = useContext(WishListContext);
  const [isInWishList, setIsInWishList] = useState(false);

  async function handleHeart() {
    if (isInWishList) {
      await deleteProduct(product.id);
      setIsInWishList(false);
    } else {
      await addToWishlist(product.id);
      setIsInWishList(true);
    }
  }
  const productDetailsPath = `/productdetails/${product.id}/${product.category._id}`;

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 product p-4 mx-2 my-2 rounded-lg shadow-md">
      <div onClick={() => handleHeart()}>
        <i
          className={`fa-heart ${
            isInWishList ? "fas text-green-600" : "far"
          } text-2xl cursor-pointer`}
        >
        </i>
      </div>
      <Link
        to={productDetailsPath}
        className="rounded-lg overflow-hidden block"
      >
        {product?.imageCover ? (
          <img src={product.imageCover} alt={product.title} width={900} />
        ) : (
          <p>No Image Available</p>
        )}
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
      </Link>
      <button onClick={() => addToCart(product.id)}
        className="btn w-full bg-main text-white rounded py-2 mt-2 hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-main-dark focus:ring-opacity-50 text-xs sm:text-sm md:text-base">
        Add To Cart
      </button>
    </div>
  );
}
