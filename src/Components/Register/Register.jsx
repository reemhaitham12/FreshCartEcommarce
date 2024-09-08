import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

export default function Register() {
  let { setUserData } = useContext(userContext);
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
      setUserData(data.token);
      setLoading(false);
    } catch (err) {
      setApiError(err.response.data.message);
      setLoading(false);
    }
  }

  // Password visibility toggle
  const [show, setShow] = useState(false);
  function handleClick() {
    setShow(!show);
  }

  // Validation schema
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
      "password and rePassword do not match"
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
    <div className="mx-auto w-full max-w-md md:max-w-lg px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold  text-center">Register Now</h2>
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {apiError && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{apiError}</span>
          </div>
        )}
        <div className="mb-5 relative">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name :
          </label>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="name"
            className="bg-gray-50 border border-green-500 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder=" "
          />
          {formik.errors.name && formik.touched.name && (
            <div
              className="text-red-600 text-sm mt-2"
            >
              <span className="font-medium">{formik.errors.name}</span>
            </div>
          )}
        </div>
        <div className="mb-5 relative">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email :
          </label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            id="email"
            className="bg-gray-50 border border-green-500 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder=" "
          />
          {formik.errors.email && formik.touched.email && (
            <div
              className="text-red-600 text-sm mt-2"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          )}
        </div>
        <div className="mb-5 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password :
          </label>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type={!show ? "password" : "text"}
            id="password"
            className="bg-gray-50 border border-green-500 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder=" "
          />
          <span
            onClick={() => handleClick()}
            className="absolute inset-y-0 right-4 top-12 transform -translate-y-1/2 text-lg cursor-pointer"
          >
            {!show ? (
              <AiFillEye className="text-gray-900 hover:text-green-500" />
            ) : (
              <AiFillEyeInvisible className="text-gray-900 hover:text-green-500" />
            )}
          </span>
          {formik.errors.password && formik.touched.password && (
            <div
              className="text-red-600 text-sm mt-2"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          )}
        </div>
        <div className="mb-5 relative">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            RePassword :
          </label>
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            id="rePassword"
            className="bg-gray-50 border border-green-500 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder=" "
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div
              className="text-red-600 text-sm mt-2"
            >
              <span className="font-medium">{formik.errors.rePassword}</span>
            </div>
          )}
        </div>
        <div className="mb-5 relative">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Phone :
          </label>
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            id="phone"
            className="bg-gray-50 border border-green-500 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder=" "
          />
          {formik.errors.phone && formik.touched.phone && (
            <div
              className="text-red-600 text-sm mt-2"
            >
              <span className="font-medium">{formik.errors.phone}</span>
            </div>
          )}
        </div>
        <p className="mt-4 text-center text-sm text-gray-600 py-2">
          If you have an account?{" "}
          <a
            href="/login"
            className="text-green-500 hover:underline font-bold"
          >
            Login
          </a>
        </p>
        <button
          type="submit"
          className={`w-full py-2.5 text-center text-sm font-medium rounded-lg ${loading ? 'bg-green-700' : 'bg-green-500'} hover:${loading ? 'bg-green-800' : 'bg-green-600'} focus:ring-4 focus:outline-none focus:ring-green-300`}
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin-pulse"></i>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}
