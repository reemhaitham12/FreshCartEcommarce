import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className="py-4 px-8 bg-main-light relative bottom-0 left-0 right-0">
        <div className="container border-b-2">
          <h1 className='font-normal text-3xl py-5'>Get The FreshCart app</h1>
          <p className='py-3 text-lg font-light'>We will send a link, open it on your phone to download the app.</p>
          <div className="flex flex-col md:flex-row gap-4 py-6">
            <div className="w-full md:w-4/5">
              <input
                type="email"
                placeholder='Email ..'
                className='p-2 mt-2 w-full rounded-md border border-green-500 focus:ring-green-500 focus:border-green-500 block dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-300'
              />
            </div>
            <div className="w-full md:w-1/5">
              <button className="btn items-center bg-main text-white rounded p-2 mt-2 w-full hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-main-dark focus:ring-opacity-50 text-xs sm:text-sm md:text-base">
                Share App Link
              </button>
            </div>
          </div>
        </div>
        <div className="container border-b-2">
          <div className="flex flex-col md:flex-row justify-between gap-4 py-6">
            <h2 className='font-normal text-xl py-2'>Payment Partners</h2>
            <h2 className='font-normal text-xl py-2'>Get deliveries with Fresh Cart</h2>
          </div>
        </div>
      </footer>
    </>
  )
}
