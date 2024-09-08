import React from 'react'
import notFound from '../../assets/error.svg'
import { useNavigate } from 'react-router-dom'
export default function NotFound() {
  let navigate=useNavigate();
  function GoHome(){
    navigate('/')
  }
  return (
    <div className='m-auto text-center py-5'>
      <h2 className="text-6xl font-bold">404</h2>
      <p className='text-lg'>Page not found</p>
      <img src={notFound} alt="" srcset="" className='m-auto pb-3'/>
      <button onClick={()=>GoHome()} className='bg-green-500 p-2 border rounded-lg'>Back to Home</button>
    </div>
  )
}
