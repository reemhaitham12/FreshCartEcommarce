import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Animation from "../Animation/Animation";

export default function AllOrders() {
  let { CheckOutSession, CartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  let [OnLinePay, setOnLinePay] = useState(false);
  let navigate = useNavigate();

  async function handelOrder(values) {
    setLoading(true);
    let url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartItems.data._id}?url=http://localhost:5173`;
    if (!OnLinePay) {
      url = `https://ecommerce.routemisr.com/api/v1/orders/${CartItems.data._id}`;
    }
    try {
      let response = await CheckOutSession({ ...values, url });
      console.log(response);

      if (response.status === "success") {
        if (OnLinePay) {
          window.location.href = response.session.url;
        }
        else{ //if (!OnLinePay)
          toast.success('Done CheckOut');
          navigate('/cart')
        }
      }
      else {
        console.error("Order checkout failed:", response.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handelOrder,
  });

  return (
    <Animation>
      <div className="mx-auto w-full max-w-screen-sm md:w-1/2 pt-8">
      <h2 className="text-3xl font-semibold pb-8">Check Now</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5 group z-0 w-full relative">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            City :
          </label>
          <input
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="city"
            className="bg-gray-50 border border-green-500 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-300"
          />
        </div>
        <div className="mb-5 group z-0 w-full relative">
          <label
            htmlFor="details"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Details :
          </label>
          <input
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="details"
            className="bg-gray-50 border border-green-500 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-300"
          />
        </div>
        <div className="mb-5 group z-0 w-full relative">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone :
          </label>
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            id="phone"
            className="bg-gray-50 border border-green-500 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-300"
          />
        </div>
        <div className="mb-5 group z-0 w-full relative flex items-center">
          <input
            onChange={() => setOnLinePay(!OnLinePay)}
            type="checkbox"
            id="onLinePay"
            className="bg-gray-50 border border-green-500 text-green-500 focus:ring-green-500 focus:border-green-500 p-2.5 dark:bg-green-700 dark:border-green-600 dark:focus:ring-green-500 dark:focus:border-green-300 mr-2"
          />
          <label
            htmlFor="onLinePay"
            className="text-sm font-medium text-gray-900 dark:text-white"
          >
            Pay Online
          </label>
        </div>

        {loading ? (
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {OnLinePay ? "Pay OnLine" : "Cash Order Delivery"}
          </button>
        )}
      </form>
    </div>
    </Animation>
  );
}
