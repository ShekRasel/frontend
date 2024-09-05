import React, { useState, useContext,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";
import { decode } from 'jwt-js-decode';


const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];
    const emailDomain = email.split('@')[1];
    return emailRegex.test(email) && validDomains.includes(emailDomain);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setError('Email or Phone Number wrong');
      toast.error('Not a Valid Email');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto, profilePhoto.name);
      }

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { token, profilePhoto: responseProfilePhoto, /*userFirstName: responseUserFirstName, userLastName:responseUserLastName*/} = response.data;

      const decodedToken = decode(token);
      // console.log(response.data);
      const userEmail = decodedToken.payload.email;
      const userId = decodedToken.payload.id;
      
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem("token", token);
      localStorage.setItem('profilePhoto', response.data.profilePhoto);
      // localStorage.setItem('firstName', response.data.userFirstName);
      // localStorage.setItem('lastName', response.data.userLastName);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('email', userId);
      login(response.data.profilePhoto, userEmail, userId, /*response.data.userFirstName,response.data.userLastName*/);
      navigate('/');

       // Clear form fields after successful sign-up
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setProfilePhoto(null);

    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      console.error('Error signing up:', errorMessage);
      toast.error(`Error signing up: ${errorMessage}`);
    }
  };

  const handleProfilePhotoChange = (event) => {
    setProfilePhoto(event.target.files[0]);
  };

  const handleGoogleSignUp = () => {
    window.open('http://localhost:3000/auth/google', '_self');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="flex flex-col sm:flex-row w-full max-w-7xl lg:max-w-6xl  bg-slate-100 rounded-lg shadow-lg overflow-hidden">
        <div className="sm:w-1/2 flex items-center justify-center p-4 sm:p-8">
          <div className="relative w-full h-full">
            <img src="/images/signupPic.avif" alt="SignUp" className="h-64 sm:h-96 md:h-[750px] w-full object-cover rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 text-center text-white bg-black bg-opacity-5 py-4">
              <p className="font-bold text-3xl md:text-4xl lg:text-5xl">Join 35k+ web professionals &</p>
              <p className="font-bold  text-3xl md:text-4xl lg:text-5xl">build your website</p>
              <p className=" text-2xl md:text-4xl lg:text-5xl text-yellow-500">Commercial License</p>
              <p className="text-xl text-yellow-400">Unlimited Exports</p>
              <p className="text-xl text-yellow-500">120+ Coded Blocks</p>
              <p className="text-xl text-yellow-500">Design Files Included</p>
            </div>
          </div>
        </div>
        <div className="sm:w-1/2 flex items-center justify-center p-4 sm:p-8">
          <div className="max-w-lg w-full">
            <h2 className="text-3xl font-bold text-center mb-6">Sign up to Eventhive</h2>
            <p className="text-center font-bold text-gray-600 mb-4">Already have an account? <Link to="/signin" className="text-blue-500 font-bold">SignIn</Link></p>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full py-2 px-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 font-bold" required />
              </div>
              <div className="mb-4">
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full py-2 px-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 font-bold" required />
              </div>
              <div className="mb-4">
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full py-2 px-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 font-bold" required />
              </div>
              <div className="mb-4 relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full py-2 px-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 font-bold" 
                  required 
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Choose a photo from PC</label>
                <input type="file" accept="image/*" onChange={handleProfilePhotoChange} className="w-full py-2 px-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500" />
              </div>
              <button type="submit" className="w-full font-bold bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign Up</button>
            </form>
            <button 
              className="w-full font-bold bg-red-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-500 focus:outline-none focus:bg-red-600 flex items-center justify-center gap-2" 
              onClick={handleGoogleSignUp}
            >
              Sign Up with Google <FcGoogle className='w-7 h-7'/> 
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
