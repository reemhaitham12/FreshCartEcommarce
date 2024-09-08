import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ResetPassword() {
    let navigate = useNavigate();
    let [msg, setMsg] = useState('');
    let [loading, setLoading] = useState(false);

    async function handlePassword(values) {
        try {
            setLoading(true);
            let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
            if (data.token) {
                setLoading(false);
                setMsg('');
                navigate('/login');
            }
        } catch (err) {
            setLoading(false);
            setMsg(err?.response?.data?.message);
        }
    }

    let validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        newPassword: Yup.string()
            .matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with a capital letter and include letters and numbers')
            .required('Password is required'),
    });

    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        },
        validationSchema,
        onSubmit: handlePassword,
    });

    return (
        <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
            <h2 className='text-2xl font-semibold mb-6 text-center'>Reset Password</h2>
            {msg && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    <span className="font-medium">{msg}</span>
                </div>
            )}
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="relative">
                    <input
                        type="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        placeholder=" "
                    />
                    <label
                        htmlFor="email"
                        className="absolute top-2 left-3 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 origin-top-left peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-green-600"
                    >
                        Email Address
                    </label>
                </div>
                {formik.errors.email && formik.touched.email && (
                    <div className="p-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                        <span className="font-medium">{formik.errors.email}</span>
                    </div>
                )}
                <div className="relative">
                    <input
                        type="password"
                        id="newPassword"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                        placeholder=" "
                    />
                    <label
                        htmlFor="newPassword"
                        className="absolute top-2 left-3 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 origin-top-left peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-green-600"
                    >
                        New Password
                    </label>
                </div>
                {formik.errors.newPassword && formik.touched.newPassword && (
                    <div className="p-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                        <span className="font-medium">{formik.errors.newPassword}</span>
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium"
                >
                    {loading ? <i className='fas fa-spin fa-spinner'></i> : 'Reset Password'}
                </button>
            </form>
        </div>
    );
}
