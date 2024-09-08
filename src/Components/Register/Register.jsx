import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";


// post the dataApi
export default function Register() {
  let {setUserData}=useContext(userContext);
  let navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handelRegister(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      localStorage.setItem("userToken", data.token);
      navigate("/login");
      setUserData(data.token)
      setLoading(false);
    } catch (err) {
      setApiError(err.response.data.message);
      setLoading(false);
    }
  }

  // password check
  const [show, setShow] = useState(false);
  function handleClick() {
    setShow(!show);
  }
  // using Yup (matches-->to write any regex) , (email is method in Yup)
  let validation = Yup.object().shape({
    name: Yup.string()
      .min(3, "min length is 3")
      .max(20, "max length is 20")
      .required("name is required"),
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z]\w{5,10}$/,
        "please enter capital letter , small letter and numbers"
      )
      .required("password is required"),
    rePassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "password and rePassword donot match"
    ),
    phone: Yup.string()
      .matches(/^(002)?01[0125][0-9]{8}$/, "")
      .required("phone is required"),
  });

  // useFormik
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validation,
    onSubmit: handelRegister,
  });

  return (
    <div className="mx-auto w-full max-w-screen-sm md:w-1/2 pt-8">
      <h2 className="text-3xl font-semibold pb-8">Register Now</h2>
      <form onSubmit={formik.handleSubmit}>
        {apiError && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{apiError}</span>
          </div>
        )}
        <div className="mb-5 group z-0 w-full relative">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name :
          </label>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="name"
            className="bg-gray-50 border border-green-500 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-300"
          />
        </div>
        {formik.errors.name && formik.touched.name && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.name}</span>
          </div>
        )}
        <div className="mb-5 group z-0 w-full relative">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email :
          </label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            id="email"
            className="bg-gray-50 border border-green-500 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-300"
          />
        </div>
        {formik.errors.email && formik.touched.email && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.email}</span>
          </div>
        )}
        <div className="mb-5 group z-0 w-full relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password :
          </label>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type={!show ? "password" : "text"}
            id="password"
            className="bg-gray-50 border border-green-500 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-300"
          />
          <span
            onClick={() => handleClick()}
            className="absolute inset-y-0 right-4 top-6 flex items-center py-3 text-lg cursor-pointer"
          >
            {!show ? (
              <AiFillEye className="text-gray-900 hover:text-green-500 dark:text-gray-400" />
            ) : (
              <AiFillEyeInvisible className="text-gray-900 hover:text-green-500 dark:text-gray-400" />
            )}
          </span>
        </div>
        {formik.errors.password && formik.touched.password && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.password}</span>
          </div>
        )}
        <div className="mb-5 group z-0 w-full relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            rePassword :
          </label>
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="rePassword"
            className="bg-gray-50 border border-green-500 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-300"
          />
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.rePassword}</span>
          </div>
        )}
        <div className="mb-5 group z-0 w-full relative">
          <label
            htmlFor="tel"
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
        {formik.errors.phone && formik.touched.phone && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.phone}</span>
          </div>
        )}
        {loading ? (
          <button
            type="button"
            className=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <i class="fa-solid fa-spinner fa-spin-pulse"></i>
          </button>
        ) : (
          <button
            type="submit"
            className=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
