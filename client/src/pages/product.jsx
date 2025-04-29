import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";

// Mock product database
const Products = [
  {
    id: 1,
    name: "Tomato",
    category: "Vegetable",
    price: 199.00,
    negotiable: true,
    minPrice: 149.00, // Minimum price seller will accept
    discount: "30% off",
    rating: 4.8,
    description: "Fresh tomatoes from local farms",
    sizes: [ "1 kg", "5 kg", "5 kg"],
    images: [
      "/images/Tomato.png"
    ],
    thumbnails: []
  },
  // Other products...
  {
    id: 2,
    name: "Cabbage",
    category: "Vegetable",
    price: 199.00,
    negotiable: true,
    minPrice: 159.00,
    discount: "30% off",
    rating: 4.8,
    description: "Fresh Cabbage from local farms",
    sizes: [ "1 kg", "5 kg", "5 kg"],
    images: [
      "/images/Cabbage.png"
    ],
    thumbnails: []
  },
  // Rest of products...
];

export default function Product() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  
  // Negotiation states
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [negotiationStatus, setNegotiationStatus] = useState(null);
  const [counterOffer, setCounterOffer] = useState(null);
  
  useEffect(() => {
    // Find product by ID
    const foundProduct = Products.find(p => p.id === parseInt(productId)) || Products[0];
    setProduct(foundProduct);
    
    // Set initial offer price as 80% of the listed price
    if (foundProduct) {
      setOfferPrice((foundProduct.price * 0.8).toFixed(2));
    }
  }, [productId]);

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const startNegotiation = () => {
    setIsNegotiating(true);
    setNegotiationStatus(null);
    setCounterOffer(null);
  };
  
  const cancelNegotiation = () => {
    setIsNegotiating(false);
    setNegotiationStatus(null);
    setCounterOffer(null);
    setOfferPrice((product.price * 0.8).toFixed(2));
  };
  
  const handleOfferChange = (e) => {
    // Only allow numbers and decimals
    const value = e.target.value.replace(/[^\d.]/g, '');
    setOfferPrice(value);
  };
  
  const submitOffer = () => {
    const offerValue = parseFloat(offerPrice);
    
    // Validate offer
    if (isNaN(offerValue) || offerValue <= 0) {
      setNegotiationStatus("invalid");
      return;
    }
    
    // Simulate seller response
    if (offerValue >= product.minPrice) {
      // Offer accepted
      setNegotiationStatus("accepted");
      setCounterOffer(null);
    } else if (offerValue < product.minPrice * 0.7) {
      // Offer too low - rejected
      setNegotiationStatus("rejected");
      setCounterOffer(null);
    } else {
      // Counter offer
      const counterValue = ((product.minPrice + offerValue) / 2).toFixed(2);
      setNegotiationStatus("counter");
      setCounterOffer(counterValue);
    }
  };
  
  const acceptCounterOffer = () => {
    setNegotiationStatus("accepted");
    setOfferPrice(counterOffer);
  };

  return (
    <>
      <style jsx>{`
        .nav-for-slider .swiper-slide {
          height: auto;
          width: auto;
          cursor: pointer;
        }
        .swiper-wrapper {
          height: auto;
        }
        .nav-for-slider .swiper-slide img {
          border: 2px solid transparent;
          border-radius: 10px;
        }
        .nav-for-slider .swiper-slide-thumb-active img {
          border-color: rgb(79 70 229);
        }
      `}</style>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="flex items-center text-2xl font-semibold text-gray-900">
            <img className="w-40 h-12 mr-2" src="/heroicon.png" alt="logo" />
          </Link>
          <div className="flex space-x-4">
            <button className="text-gray-600 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="slider-box w-full h-full max-lg:mx-auto mx-0">
              <div className="swiper main-slide-carousel swiper-container relative mb-6">
                <Swiper
                  slidesPerView={1}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[Thumbs]}
                >
                  {product.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="block">
                        <img
                          src={image}
                          alt={`${product.name} image ${index + 1}`}
                          className="max-lg:mx-auto rounded-2xl object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="nav-for-slider">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={30}
                  slidesPerView={5}
                  loop={true}
                  watchSlidesProgress={true}
                >
                  {product.thumbnails.map((thumbnail, index) => (
                    <SwiperSlide key={index} className="thumbs-slide">
                      <img
                        src={thumbnail}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="cursor-pointer rounded-xl transition-all duration-500 border hover:border-indigo-600 object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="pro-detail w-full max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mx-auto max-lg:mt-8">
                <div className="flex items-center justify-between gap-6 mb-6">
                  <div className="text">
                    <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2">
                      {product.name}
                    </h2>
                    <p className="font-normal text-base text-gray-500">{product.category}</p>
                  </div>
                  <button className="group transition-all duration-500 p-0.5">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="fill-indigo-50 transition-all duration-500 group-hover:fill-indigo-100"
                        cx="30"
                        cy="30"
                        r="30"
                      />
                      <path
                        className="stroke-indigo-600 transition-all duration-500 group-hover:stroke-indigo-700"
                        d="M21.4709 31.3196L30.0282 39.7501L38.96 30.9506M30.0035 22.0789C32.4787 19.6404 36.5008 19.6404 38.976 22.0789C41.4512 24.5254 41.4512 28.4799 38.9842 30.9265M29.9956 22.0789C27.5205 19.6404 23.4983 19.6404 21.0231 22.0789C18.548 24.5174 18.548 28.4799 21.0231 30.9184M21.0231 30.9184L21.0441 30.939M21.0231 30.9184L21.4628 31.3115"
                        strokeWidth="1.6"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-6 gap-y-3">
                  <div className="flex items-center">
                    <h5 className="font-manrope font-semibold text-2xl leading-9 text-gray-900">
                      $ {negotiationStatus === "accepted" ? offerPrice : product.price.toFixed(2)}
                    </h5>
                    {negotiationStatus !== "accepted" && (
                      <span className="ml-3 font-semibold text-lg text-indigo-600">
                        {product.discount}
                      </span>
                    )}
                    {negotiationStatus === "accepted" && (
                      <span className="ml-3 font-semibold text-lg text-green-600">
                        Negotiated
                      </span>
                    )}
                  </div>
                  <svg
                    className="mx-5 max-[400px]:hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    width="2"
                    height="36"
                    viewBox="0 0 2 36"
                    fill="none"
                  >
                    <path d="M1 0V36" stroke="#E5E7EB" />
                  </svg>
                  <button className="flex items-center gap-1 rounded-lg bg-amber-400 py-1.5 px-2.5 w-max">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_12657_16865)">
                        <path
                          d="M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_12657_16865">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-base font-medium text-white">{product.rating}</span>
                  </button>
                </div>
                
                {/* Price Negotiation System */}
                {product.negotiable && !isNegotiating && negotiationStatus !== "accepted" && (
                  <div className="mb-6">
                    <button 
                      onClick={startNegotiation} 
                      className="text-center w-full px-5 py-3 rounded-lg bg-green-600 flex items-center justify-center font-semibold text-base text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-green-700 hover:shadow-green-300"
                    >
                      <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L20 16L16 20M20 12L16 8M20 8L16 4M8 12L4 16L8 20M4 12L8 8M4 8L8 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Negotiate Price
                    </button>
                  </div>
                )}
                
                {/* Negotiation UI */}
                {isNegotiating && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">Make an Offer</h3>
                    <div className="flex items-center mb-4">
                      <span className="text-gray-600 mr-2">$</span>
                      <input
                        type="text"
                        value={offerPrice}
                        onChange={handleOfferChange}
                        className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your offer"
                      />
                    </div>
                    
                    {negotiationStatus === "invalid" && (
                      <p className="text-red-600 mb-3">Please enter a valid price.</p>
                    )}
                    
                    {negotiationStatus === "rejected" && (
                      <p className="text-red-600 mb-3">Your offer was too low. Please try again.</p>
                    )}
                    
                    {negotiationStatus === "counter" && (
                      <div className="mb-3">
                        <p className="text-gray-700">Seller counter-offers: <span className="font-semibold">${counterOffer}</span></p>
                        <div className="flex space-x-2 mt-2">
                          <button 
                            onClick={acceptCounterOffer}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={cancelNegotiation}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={submitOffer}
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        Submit Offer
                      </button>
                      <button 
                        onClick={cancelNegotiation}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Success message */}
                {negotiationStatus === "accepted" && !isNegotiating && (
                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-700 font-medium flex items-center">
                      <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="rgb(21, 128, 61)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Price negotiation successful! Your price: ${offerPrice}
                    </p>
                  </div>
                )}

                <p className="font-medium text-lg text-gray-900 mb-2">Size (KG)</p>
                <div className="grid grid-cols-2 min-[400px]:grid-cols-4 gap-3 mb-3 min-[400px]:mb-8">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      className="border border-gray-200 whitespace-nowrap text-gray-900 text-sm leading-6 py-2.5 rounded-full px-5 text-center w-full font-semibold shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300"
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <div className="flex items-center flex-col min-[400px]:flex-row gap-3 mb-3 min-[400px]:mb-8">
                  <div className="flex items-center justify-center border border-gray-400 rounded-full">
                    <button
                      onClick={decreaseQuantity}
                      className="group py-[14px] px-3 w-full border-r border-gray-400 rounded-l-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300"
                    >
                      <svg
                        className="stroke-black group-hover:stroke-black"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 11H5.5"
                          stroke=""
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="font-semibold text-gray-900 text-lg py-3 px-2 w-full min-[400px]:min-w-[75px] h-full bg-transparent placeholder:text-gray-900 text-center hover:text-indigo-600 outline-0 hover:placeholder:text-indigo-600"
                    />
                    <button
                      onClick={increaseQuantity}
                      className="group py-[14px] px-3 w-full border-l border-gray-400 rounded-r-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300"
                    >
                      <svg
                        className="stroke-black group-hover:stroke-black"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 5.5V16.5M16.5 11H5.5"
                          stroke="#9CA3AF"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <button className="group py-3 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-indigo-300 hover:bg-indigo-100">
                    <svg
                      className="stroke-indigo-600 transition-all duration-500 group-hover:stroke-indigo-600"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                        stroke=""
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
                {/* <Link 
                  to={`/checkout/${product.id}`} 
                  className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-300"
                >
                  Buy Now
                </Link> */}

              <Link 
                    to={`/checkout/${product.id}${negotiationStatus === "accepted" ? `?negotiatedPrice=${offerPrice}` : ''}`} 
                    className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-300"
              >
                     Buy Now
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}