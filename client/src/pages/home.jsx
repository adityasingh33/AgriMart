import React from 'react'

const Home = () => {
  return (

    <div className="container mx-auto px-4">


      <div className='flex justify-center items-center my-8'>

        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-2000 h-100 mr-2 " src="/icon.png" alt="logo" />
        </a>

      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-8">Best Seller</h1>

      <div className="overflow-x-auto whitespace-nowrap py-4 px-2">
        <div className="flex space-x-4">
          {[1, 2, 3, 4, 5, 6].map((product) => (
            <div
              key={product}
              className="
              inline-block w-64 h-40 
              bg-white shadow-lg rounded-lg 
              p-4 hover:shadow-xl 
              transition-shadow duration-300
              cursor-pointer
            "
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Product {product}
              </h2>
              <p className="text-gray-600">
                Product description goes here...
              </p>
            </div>
          ))}
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-8">Fresh Products</h1>

      <div className="overflow-x-auto whitespace-nowrap py-4 px-2">
        <div className="flex space-x-4">
          {[1, 2, 3, 4, 5].map((product) => (
            <div
              key={product}
              className="
              inline-block w-64 h-40 
              bg-white shadow-lg rounded-lg 
              p-4 hover:shadow-xl 
              transition-shadow duration-300
              cursor-pointer
            "
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Product {product}
              </h2>
              <p className="text-gray-600">
                Product description goes here...
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>


  )
}

export default Home
