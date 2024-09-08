import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { userContext } from "../../Context/UserContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function AllOrders() {
  const [latestCheckout, setLatestCheckout] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAllOrder } = useContext(CartContext);
  const { UserId } = useContext(userContext);

  async function fetchOrders() {
    try {
      setLoading(true);
      if (UserId) {
        const response = await getAllOrder(UserId);
        console.log("Response from API:", response);
        if (response && Array.isArray(response)) {
          const sortedOrders = response.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          console.log("Sorted Orders:", sortedOrders);
          if (sortedOrders.length > 0) {
            const oldestOrder = sortedOrders[sortedOrders.length - 1];
            console.log("Oldest Order:", oldestOrder);
            setLatestCheckout(oldestOrder.cartItems || []);
          } else {
            console.log("No orders found");
            setLatestCheckout([]);
          }
        } else {
          console.log("Invalid response format");
          setLatestCheckout([]);
        }
      } else {
        console.log("No UserId available");
        setLatestCheckout([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLatestCheckout([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (UserId) {
      fetchOrders();
    } else {
      console.log("Waiting for UserId to be available");
    }
  }, [UserId]);

  return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-900">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Oldest Checkout
            </h5>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {latestCheckout.length > 0 ? (
                latestCheckout.map((item) => (
                  <li key={item._id} className="py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="w-16 h-16 rounded-md"
                          src={item.product.imageCover}
                          alt={item.product.title || "Product image"}
                        />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {item.product.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          Price: ${item.price}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          Quantity: {item.count}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-3 sm:py-4 text-gray-500">
                  No recent checkout items available.
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};