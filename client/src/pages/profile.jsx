import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
function Profile() {
    const navigate = useNavigate();

    const {  user, isAuthenticated } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        gender: "",
        age: ""
    });

    const [error, setError] = useState("");

    useEffect(() => {
        // setFormData({
        //   name: "",
        //   email: "",
        //   address: "",
        //   gender: "",
        //   age: ""
        // })

        if (user) {
          setFormData({
              name: user.name || "",
              email: user.email || "",
              address: user.address || "",
              gender: user.gender || "",
              age: user.age || ""
          });
      }
    }, [user]);

    useEffect(() => {
      if (!isAuthenticated) {
          navigate('/login');
      }
  }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

         // Convert form data to proper types before sending
    const cleanedFormData = {
        name: formData.name.trim(),
        email: Number(formData.email.trim()),
        address: Number(formData.address.trim()),
        gender: formData.gender.trim(),
        age: Number(formData.age.trim())
    };


        console.log("Submitting formdata", cleanedFormData);



        try {

            const token = localStorage.getItem('token');
            if (!token) {
                setError("Please login first");
                navigate('/login');
                return;
            }
    
            // Make API request with token in headers
            const res = await axios.put(
                "http://localhost:5000/api/profile", 
                cleanedFormData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            console.log("Profile updated:", res.data);
            setError("");

        } catch (error) {
            console.error("Error filling the data: ", error.response?.data || "Something went wrong ");


             // Handle token expiration
        if (error.response?.data?.error === 'jwt expired') {
            localStorage.removeItem('token'); // Clear expired token
            setError("Session expired. Please login again");
            navigate('/login');
            return;
        }


            setError(error.response?.data?.message || "Invalid Credentials");
        }
    };

    return (

       



        <section className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
  <div className="container mx-auto max-w-2xl">
    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        
        {/* Left side with profile picture */}
        <div className="bg-gradient-to-b from-indigo-600 to-indigo-400 flex flex-col items-center justify-center p-8 md:w-1/3">
          <img
            src="/profile.png"
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="text-white text-center bg-transparent border-b-2 border-white placeholder-white focus:outline-none mb-4"
          />
          <i className="far fa-edit text-white text-xl"></i>
        </div>

        {/* Right side with form fields */}
        <div className="p-8 md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Personal Details</h2>
          <hr className="mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600 font-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="form-input mt-1 w-full border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-600 font-semibold">email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="emailt"
                className="form-input mt-1 w-full border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Age</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="form-input mt-1 w-full border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-select mt-1 w-full border-gray-300 rounded-md"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Save Profile
          </button>

          <div className="flex justify-center space-x-6 mt-6">
            <a href="#!" className="text-indigo-600 hover:text-indigo-800">
              <i className="fab fa-facebook-f fa-lg"></i>
            </a>
            <a href="#!" className="text-indigo-600 hover:text-indigo-800">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#!" className="text-indigo-600 hover:text-indigo-800">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </form>
  </div>
</section>


    );
}

export default Profile;