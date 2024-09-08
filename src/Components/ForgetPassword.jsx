import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { auth } from '../Context/AuthContext';
import { jwtDecode } from 'jwt-decode';
export default function ForgetPassword() {



  let navigate = useNavigate()



    let [msg, setMsg] = useState('')
    let [loading, setLoading] = useState(false)
    let [flag,setFlag] = useState(false)
    async function handleForgetPassword(values) {
        try {
            setLoading(true)
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
            if (data.statusMsg === 'success') {
                setLoading(false)
                setMsg('')
                setFlag(true)
            }
        } catch (err) {
            setLoading(false)
            setMsg(err?.response?.data?.message)

        }
    }
    let validationSchema = Yup.object({
        email: Yup.string().email().required('email is required'),
    })

    let formik = useFormik({
        initialValues: {
            email: '',

        },
        validationSchema,
        onSubmit: handleForgetPassword
    })


    ////////////////////////////reset code//////////////////////////////////

    async function handleResetPassword(values) {
        try {
            setLoading(true)
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
           console.log(data);
           if(data.status=="Success")
           {
            navigate('/reset')
           }
        } catch (err) {
            setLoading(false)
            setMsg(err?.response?.data?.message)

        }
    }
   

    let formik2 = useFormik({
        initialValues: {
            resetCode: '',

        },
        
        onSubmit: handleResetPassword
    })



    if(flag)
    return (
        <div>
            <h2 className='text-2xl my-3 underline'>reset code:</h2>
            {msg ? <div className=" p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{msg}</span>
            </div> : ''}
            <form className="max-w-md mx-auto" onSubmit={formik2.handleSubmit}>


                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" onBlur={formik2.handleBlur} onChange={formik2.handleChange} value={formik2.values.resetCode} id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">reset code</label>
                </div>

                {/* alert */}

                {formik2.errors.resetCode && formik2.touched.resetCode ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{formik2.errors.resetCode}</span>
                </div> : ''}





                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {loading ? <i className='fas fa-spin fa-spinner text-white'></i> : 'ResetCode'}
                </button>
            </form>

        </div>
    )

    if(!flag)
        
    return (
        <div>
            <h2 className='text-2xl my-3 underline'>ForgetPassword Now:</h2>
            {msg ? <div className=" p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">{msg}</span>
            </div> : ''}
            <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>


                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">forgt password</label>
                </div>

                {/* alert */}

                {formik.errors.resetCode && formik.touched.resetCode ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">{formik.errors.resetCode}</span>
                </div> : ''}





                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {loading ? <i className='fas fa-spin fa-spinner text-white'></i> : 'ResetCode'}
                </button>
            </form>

        </div>
    )
}


//state managent
//context api
//redux toolkit
//react query