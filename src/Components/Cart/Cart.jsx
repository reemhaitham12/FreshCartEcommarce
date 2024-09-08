import React, { useEffect, useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import cartShopping from "../../assets/empty-shopping-cart.jpg";
import { Link } from "react-router-dom";
import Animation from "../Animation/Animation";

export default function Cart() {
  const [CartShow, setCartShow] = useState([]);
  const { getCartItems, UpdateProductCount, deleteCartProduct } =
    useContext(CartContext);
  const [Loading, setLoading] = useState(false);

  async function getCart() {
    setLoading(true);
    let response = await getCartItems();
    setCartShow(response.data);
    setLoading(false);
  }

  async function updateCart(productId, count) {
    if (count >= 1) {
      let response = await UpdateProductCount(productId, count);
      setCartShow(response.data);
    } else {
      deleteCartItems(productId);
    }
  }

  async function deleteCartItems(productId) {
    let response = await deleteCartProduct(productId);
    setCartShow(response.data);
  }

  useEffect(() => {
    getCart();
  }, []);

  if (Loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Animation>
      {CartShow?.products?.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <img
            src={cartShopping}
            alt="NOT Shopping"
            className="w-full max-w-sm md:max-w-lg lg:max-w-xl"
          />
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-5 sm:w-full mx-auto md:w-3/4">
          {/* Mobile view */}
          <div className="block md:hidden">
            {CartShow?.products?.map((product) => (
              <div
                key={product.product._id}
                className="border-b border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex items-center">
                  <img
                    src={product.product.imageCover}
                    className="w-16 h-16 object-cover mr-4"
                    alt={product.product.title}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {product.price}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          updateCart(product.product._id, product.count - 1)
                        }
                        className="p-1 me-2 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <span className="text-green-700 font-bold">
                        {product.count}
                      </span>
                      <button
                        onClick={() =>
                          updateCart(product.product.id, product.count + 1)
                        }
                        className="p-1 ms-2 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => deleteCartItems(product.product.id)}
                      className="mt-2 text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <table className="hidden md:table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {CartShow?.products?.map((product) => (
                <tr
                  key={product.product._id}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateCart(product.product._id, product.count - 1)
                        }
                        className="inline-flex items-center justify-center p-1 me-2 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                      >
                        <span className="sr-only">Decrease quantity</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span className="text-green-700 font-bold text-lg">
                          {product.count}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          updateCart(product.product.id, product.count + 1)
                        }
                        className="inline-flex items-center justify-center p-1 ms-2 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                      >
                        <span className="sr-only">Increase quantity</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteCartItems(product.product.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between py-2 px-8">
            <span className="mt-5 mx-5 font-bold text-lg">
              {CartShow.totalCartPrice}
              <span className="text-green-600"> EGP</span>
            </span>
            <Link to={'/checkout'}>
            <button className="btn items-center bg-main text-white rounded p-2 mt-2 hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-main-dark focus:ring-opacity-50 text-xs sm:text-sm md:text-base">
              Check Out
            </button>
            </Link>
          </div>
        </div>
      )}
      </Animation>
    </>
  );
}




