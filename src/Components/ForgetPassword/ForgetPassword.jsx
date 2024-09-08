import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  async function handleForgetPassword(values) {
    try {
      setLoading(true);
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
      if (data.statusMsg === 'success') {
        setLoading(false);
        setMsg('');
        setFlag(true);
      }
    } catch (err) {
      setLoading(false);
      setMsg(err?.response?.data?.message);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: handleForgetPassword,
  });

  async function handleResetPassword(values) {
    try {
      setLoading(true);
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
      if (data.status === 'Success') {
        navigate('/reset');
      }
    } catch (err) {
      setLoading(false);
      setMsg(err?.response?.data?.message);
    }
  }

  const formik2 = useFormik({
    initialValues: { resetCode: '' },
    onSubmit: handleResetPassword,
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {flag ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">Reset Code</h2>
            {msg && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">{msg}</span>
              </div>
            )}
            <form onSubmit={formik2.handleSubmit}>
              <div className="relative mb-5">
                <input
                  type="text"
                  id="resetCode"
                  onBlur={formik2.handleBlur}
                  onChange={formik2.handleChange}
                  value={formik2.values.resetCode}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder=" "
                />
                <label htmlFor="resetCode" className="absolute top-2 left-3 text-gray-500 text-sm transition-transform duration-300 transform -translate-y-4 scale-75 origin-top-left">
                  Reset Code
                </label>
                {formik2.errors.resetCode && formik2.touched.resetCode && (
                  <div className="text-red-600 text-sm mt-2">{formik2.errors.resetCode}</div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Reset Code'}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
            {msg && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">{msg}</span>
              </div>
            )}
            <form onSubmit={formik.handleSubmit}>
              <div className="relative mb-5">
                <input
                  type="email"
                  id="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder=" "
                />
                <label htmlFor="email" className="absolute top-2 left-3 text-gray-500 text-sm transition-transform duration-300 transform -translate-y-4 scale-75 origin-top-left">
                  Email
                </label>
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-600 text-sm mt-2">{formik.errors.email}</div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Submit'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
