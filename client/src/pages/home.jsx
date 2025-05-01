import React from 'react';
import { Link } from 'react-router-dom';

const productData = [
  {
    id: 1,
    name: "Tomato",
    description: "Freshly plucked oranges",
    image: "/images/Tomato.png" ,
    price: 199.00
  },
  {
    id: 2,
    name: "Cabbage",
    description: "",
    image: " /images/Cabbage.png",
    price: 249.00
  },
  {
    id: 3,
    name: "Carrots",
    description: "",
    image:  "/images/Carrots.png",
    price: 179.00
  },
  {
    id: 4,
    name: "Orange",
    description: "",
    image: "/images/orange.png",
    price: 229.00
  },
  {
    id: 5,
    name: "Potato",
    description: "",
    image:  "/images/potato.png",
    price: 159.00
  },
  {
    id: 6,
    name: "Spinach",
    description: "",
    image:  "/images/spinach.jpg",
    price: 139.00
  }
];

const freshProducts = [
  {
    id: 7,
    name: "Spinach",
    description: "",
    image:  "/images/spinach.jpg",
    price: 119.00
  },
  {
    id: 8,
    name: "Potato",
    description: "",
    image:  "/images/potato.png",
    price: 289.00
  },
  {
    id: 9,
    name: "Tomato",
    description: "",
    image: "/images/Tomato.png" ,
    price: 99.00
  },
  {
    id: 10,
    name: "Orange",
    description: "",
    image: "/images/orange.png",
    price: 149.00
  },
  {
    id: 11,
    name: "Carrots",
    description: "",
    image:  "/images/Carrots.png",
    price: 189.00
  }
];

const ProductCard = ({ product }) => {
  return (
    <Link
      key={product.id}
      to={`/product/${product.id}`}
      className="
        inline-block w-64 h-auto
        bg-white rounded-xl
        shadow-md hover:shadow-xl
        transition-all duration-300 ease-in-out
        transform hover:-translate-y-1
        cursor-pointer
        overflow-hidden
        border border-gray-100
      "
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
        />
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h2>
        <p className="text-gray-600 mb-3 text-sm h-10 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-indigo-600 font-bold text-lg">
            ${product.price.toFixed(2)}
          </p>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
            View
          </span>
        </div>
      </div>
    </Link>
  );
};

const SectionTitle = ({ title }) => (
  <div className="flex items-center mb-6">
    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    <div className="ml-4 flex-grow h-0.5 bg-gradient-to-r from-indigo-500 to-transparent"></div>
  </div>
);

const ProductRow = ({ products }) => (
  <div className="overflow-x-auto py-6 px-2 -mx-4 scrollbar-hide">
    <div className="flex space-x-6 px-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center my-8">
          <Link to="/" className="flex items-center mb-6 text-3xl font-bold text-indigo-600">
            <img className="w-250 h-100 mr-2" src="/heroicon.png" alt="logo" />
          </Link>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
            <div className="mb-10">
              <SectionTitle title="Best Seller" />
              <ProductRow products={productData} />
            </div>
            
            <div>
              <SectionTitle title="Fresh Products" />
              <ProductRow products={freshProducts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;