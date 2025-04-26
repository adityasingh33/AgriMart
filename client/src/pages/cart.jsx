import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function Cart() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Tomato",
      price: 200,
      quantity: 1,

    },
    {
      id: 2,
      name: "Cabbage",
      price: 99.00,
      quantity: 1,

    },
    {
      id: 3,
      name: "Carrot",
      price: 129.00,
      quantity: 1,
 
    },
    {
      id: 4,
      name: "Potato",
      price: 379.00,
      quantity: 1,

    }
  ]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = 0;
  const shipping = 10;
  const total = subtotal + tax + shipping;

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        <span className="text-gray-600">{items.length} Items in cart</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center sm:items-start border-b border-gray-200 py-6 gap-4">
            
              
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                {/* <p className="text-gray-500">{item.color}</p> */}
               </div> 
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative">
                  <select 
                    className="appearance-none border border-gray-300 rounded-md py-2 pl-3 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-16"
                    value={item.quantity}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                
                <div className="font-semibold text-lg text-gray-800 w-24 text-center">
                  ${item.price.toFixed(2)}
                </div>
                
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-80 bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">${shipping.toFixed(2)}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-800">Total</span>
                <span className="text-lg font-bold text-gray-800">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-black text-white font-medium py-3 rounded-lg mt-8 hover:bg-gray-800 transition-colors">
            Confirm payment
          </button>
          
          <button className="w-full border border-gray-300 bg-white text-gray-800 font-medium py-3 rounded-lg mt-4 hover:bg-gray-50 transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}