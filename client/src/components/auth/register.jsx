import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

 const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
    remember: false,
    terms:false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log('Form submitted:', formData);
    if(!formData.name || !formData.email  || !formData.password){
        console.error("All fields are required");
        return;
       }

    try {

      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
    };

    console.log('Sending data to server:', userData);


        const res = await axios.post("https://agrimart-backend.onrender.com/api/auth/register", formData);
        console.log("User Registered:", res.data);
        localStorage.setItem('token', res.data.token);
        // Navigate to login page after successful registration
        navigate('/login');
    } catch (error) {
      if (error.response) {
        console.error("Error Registering User:", error.response.data);
      } else {
        console.error("Error Registering User:", error.message);
      }
    }

  };

  
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="/icon.png" alt="logo"/>
          AgriMart   
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} action="#">


                 <div>
                      <label htmlFor="name" className="block mb-2 text-sm  bg-amber-50 font-medium text-gray-900 dark:text-white">Name</label>
                      <input type="text" name="name" id="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>


                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm bg-amber-50 font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm bg-amber-50 font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" value={formData.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                 
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" name='terms' aria-describedby="terms" type="checkbox" checked = {formData.terms} onChange={handleChange} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Register