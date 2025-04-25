import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Mock product database - same as used in Product.jsx
const Products = [
  {
    id: 1,
    name: "Tomato",
    category: "ABS LUGGAGE",
    price: 199.00,
    discount: "30% off",
    rating: 4.8,
    description: "Premium ABS luggage for your summer travels",
    colors: [

      { name: "Beige", image: "https://pagedone.io/asset/uploads/1700472529.png" }
    ],
    sizes: ["Full Set", "10 kg", "25 kg", "35 kg"],
    images: [

      <img src="/images/Tomato.png" alt="Tomato" />

    ],
    thumbnails: [

    ]
  },
  {
    id: 2,
    name: "Cabbage",
    category: "ABS LUGGAGE",
    price: 249.00,
    discount: "20% off",
    rating: 4.7,
    description: "Durable luggage for cold weather trips",
    colors: [
      
       { name: "Beige", image: "https://pagedone.io/asset/uploads/1700472529.png" }
    ],
    sizes: ["Full Set", "10 kg", "25 kg", "35 kg"],
    images: [

    ],
    thumbnails: [

    ]
  }
];

export default function Checkout() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeStep, setActiveStep] = useState("shipping");
  const [formData, setFormData] = useState({
    shipping: {
      fullName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: ""
    },
    payment: {
      cardName: "",
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvv: ""
    }
  });
  const { productId } = useParams();

  // Shipping methods
  const shippingMethods = [
    { id: 1, name: "Standard Shipping", price: 10.00, days: "5-7 business days" },
    { id: 2, name: "Express Shipping", price: 25.00, days: "2-3 business days" },
    { id: 3, name: "Next Day Delivery", price: 35.00, days: "Next business day" }
  ];
  
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(shippingMethods[0]);

  useEffect(() => {
    // Find product by ID
    const foundProduct = Products.find(p => p.id === parseInt(productId)) || Products[0];
    setProduct(foundProduct);
  }, [productId]);

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Calculate prices
  const subtotal = product.price * quantity;
  const discount = subtotal * 0.3; // Assuming 30% discount
  const shipping = selectedShippingMethod.price;
  const total = subtotal - discount + shipping;

  const handleInputChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    });
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the order
    console.log("Order submitted:", { product, quantity, formData, shipping: selectedShippingMethod });
    alert("Order placed successfully!");
  };

  return (
    <>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Checkout Steps */}
            <div className="lg:col-span-2">
              {/* Checkout Steps */}
              <div className="flex justify-between mb-6">
                <button 
                  className={`flex items-center ${activeStep === "shipping" ? "text-indigo-600 font-semibold" : "text-gray-500"}`}
                  onClick={() => handleStepChange("shipping")}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${activeStep === "shipping" ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"}`}>
                    1
                  </div>
                  Shipping
                </button>
                <div className="border-t-2 border-gray-200 w-16 self-center"></div>
                <button 
                  className={`flex items-center ${activeStep === "payment" ? "text-indigo-600 font-semibold" : "text-gray-500"}`}
                  onClick={() => handleStepChange("payment")}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${activeStep === "payment" ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"}`}>
                    2
                  </div>
                  Payment
                </button>
                <div className="border-t-2 border-gray-200 w-16 self-center"></div>
                <button 
                  className={`flex items-center ${activeStep === "confirmation" ? "text-indigo-600 font-semibold" : "text-gray-500"}`}
                  onClick={() => handleStepChange("confirmation")}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${activeStep === "confirmation" ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"}`}>
                    3
                  </div>
                  Confirmation
                </button>
              </div>

              {/* Shipping Form */}
              {activeStep === "shipping" && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={formData.shipping.fullName}
                          onChange={(e) => handleInputChange("shipping", "fullName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={formData.shipping.phone}
                          onChange={(e) => handleInputChange("shipping", "phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Address</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.shipping.address}
                        onChange={(e) => handleInputChange("shipping", "address", e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">City</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={formData.shipping.city}
                          onChange={(e) => handleInputChange("shipping", "city", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">State</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={formData.shipping.state}
                          onChange={(e) => handleInputChange("shipping", "state", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">ZIP Code</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={formData.shipping.zipCode}
                          onChange={(e) => handleInputChange("shipping", "zipCode", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Country</label>
                      <select 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.shipping.country}
                        onChange={(e) => handleInputChange("shipping", "country", e.target.value)}
                        required
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="IN">India</option>
                      </select>
                    </div>
                  </form>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Shipping Method</h3>
                    <div className="space-y-4">
                      {shippingMethods.map((method) => (
                        <div 
                          key={method.id}
                          className={`border ${selectedShippingMethod.id === method.id ? 'border-indigo-600' : 'border-gray-200'} rounded-lg p-4 cursor-pointer hover:border-indigo-600 transition-all`}
                          onClick={() => setSelectedShippingMethod(method)}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className={`w-5 h-5 rounded-full border ${selectedShippingMethod.id === method.id ? 'border-indigo-600' : 'border-gray-400'} flex items-center justify-center mr-3`}>
                                {selectedShippingMethod.id === method.id && (
                                  <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{method.name}</h4>
                                <p className="text-sm text-gray-500">{method.days}</p>
                              </div>
                            </div>
                            <p className="font-semibold text-gray-900">${method.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <button 
                      className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all"
                      onClick={() => setActiveStep("payment")}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Form */}
              {activeStep === "payment" && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                  <form>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Name on Card</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={formData.payment.cardName}
                        onChange={(e) => handleInputChange("payment", "cardName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Card Number</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="1234 5678 9012 3456"
                        value={formData.payment.cardNumber}
                        onChange={(e) => handleInputChange("payment", "cardNumber", e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Exp. Month</label>
                        <select 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={formData.payment.expMonth}
                          onChange={(e) => handleInputChange("payment", "expMonth", e.target.value)}
                          required
                        >
                          <option value="">MM</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{`${i + 1}`.padStart(2, '0')}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Exp. Year</label>
                        <select 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={formData.payment.expYear}
                          onChange={(e) => handleInputChange("payment", "expYear", e.target.value)}
                          required
                        >
                          <option value="">YYYY</option>
                          {[...Array(10)].map((_, i) => (
                            <option key={i} value={2025 + i}>{2025 + i}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">CVV</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="123"
                          value={formData.payment.cvv}
                          onChange={(e) => handleInputChange("payment", "cvv", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:justify-between mt-8 gap-4">
                      <button 
                        className="py-3 px-4 border border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition-all"
                        onClick={() => setActiveStep("shipping")}
                        type="button"
                      >
                        Back to Shipping
                      </button>
                      <button 
                        className="py-3 px-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all"
                        onClick={() => setActiveStep("confirmation")}
                        type="button"
                      >
                        Review Order
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Confirmation */}
              {activeStep === "confirmation" && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Order Review</h2>
                  
                  <div className="border-b pb-4 mb-4">
                    <h3 className="font-medium text-gray-700 mb-2">Shipping Address</h3>
                    <p>{formData.shipping.fullName}</p>
                    <p>{formData.shipping.address}</p>
                    <p>{formData.shipping.city}, {formData.shipping.state} {formData.shipping.zipCode}</p>
                    <p>{formData.shipping.country}</p>
                    <p>{formData.shipping.phone}</p>
                  </div>
                  
                  <div className="border-b pb-4 mb-4">
                    <h3 className="font-medium text-gray-700 mb-2">Shipping Method</h3>
                    <p>{selectedShippingMethod.name} (${selectedShippingMethod.price.toFixed(2)})</p>
                    <p className="text-sm text-gray-500">{selectedShippingMethod.days}</p>
                  </div>
                  
                  <div className="border-b pb-4 mb-4">
                    <h3 className="font-medium text-gray-700 mb-2">Payment Method</h3>
                    <p>Credit Card ending in {formData.payment.cardNumber.slice(-4)}</p>
                    <p>Exp: {formData.payment.expMonth}/{formData.payment.expYear}</p>
                  </div>

                  <div className="flex flex-col md:flex-row md:justify-between mt-8 gap-4">
                    <button 
                      className="py-3 px-4 border border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition-all"
                      onClick={() => setActiveStep("payment")}
                      type="button"
                    >
                      Back to Payment
                    </button>
                    <button 
                      className="py-3 px-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all"
                      onClick={handleSubmit}
                      type="button"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="flex items-center border-b border-gray-200 pb-4 mb-4">
                  {/* <img src={product.thumbnails[0]} alt={product.name} className="w-16 h-16 object-cover rounded-lg" /> */}
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">{product.name}</h3>
                    <p className="text-gray-500 text-sm">Quantity: {quantity}</p>
                    <p className="text-gray-500 text-sm">Size: {product.sizes[0]}</p>
                    <p className="text-gray-500 text-sm">Color: {product.colors[0].name}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter promo code"
                    />
                    <button className="absolute right-0 top-0 h-full px-4 text-indigo-600 font-medium">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}