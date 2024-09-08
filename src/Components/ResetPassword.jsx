import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ResetPassword() {
   
    let navigate = useNavigate()
    let [msg, setMsg] = useState('')
    let [loading, setLoading] = useState(false)

    async function handlePassword(values) {
        try {
            setLoading(true)
            let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
            if (data.token) {
                setLoading(false)
                setMsg('')
                navigate('/login')
            }

        } catch (err) {
            setLoading(false)
            setMsg(err?.response?.data?.message)
        }
    }
    let validationSchema = Yup.object({
        email: Yup.string().email().required('email is required'),
        newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/).required('password is required'),
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        },
        validationSchema,
        onSubmit: handlePassword
    })

    //id == > e.target

    return (
        <div>
            <h2 className='text-2xl my-3 underline'>Login Now:</h2>
            {msg ? <div className=" p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{msg}</span>
            </div> : ''}
            <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>


                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>

                {/* alert */}

                {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{formik.errors.email}</span>
                </div> : ''}

                <div className="relative z-0 w-full mb-5 group">
                    <input onBlur={formik.handleBlur} type="password" value={formik.values.newPassword} onChange={formik.handleChange} id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">newPassword</label>
                </div>


                {/* alert */}

                {formik.errors.newPassword && formik.touched.newPassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{formik.errors.newPassword}</span>
                </div> : ''}


                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {loading ? <i className='fas fa-spin fa-spinner text-white'></i> : 'Login'}
                </button>
            </form>


        </div>
    )
}


//state managent
//context api
//redux toolkit
//react query