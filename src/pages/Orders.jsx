import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';

const Orders = () => {
  const [services, setServices] = useState([]);
  const { profilePhoto, email, logout, firstName , lastName } = useContext(AuthContext);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/services`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (serviceId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/services/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setServices(prevServices => prevServices.filter(service => service._id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error.response.data.message);
    }
  };

  const makePayment = async (serviceId, amount) => {
    try {
      const stripe = await loadStripe("pk_test_51PAtfyP6UnHdutC2LTD4KkQZZSJCeCZzlNgViwthME8ERF8YmOl7cnty7QdpYYUAB7FnA0eS0IbYYkWZy0XvCPCA00eSGArlVS");
      amount = parseInt(amount.replace(' BDT', ''));
      const body = {
        serviceId,
        amount,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/create-checkout-session`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to create Stripe checkout session');
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error('Error redirecting to Stripe checkout:', result.error.message);
      }
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  const handleSignOut = () => {
    logout();
    // window.location.reload();
  };


  return (
    <div className="flex min-h-screen bg-gray-100 p-6 justify-center font-serif md:px-10">
      <div className="w-full max-w-6xl bg-white p-4 lg:p-6 rounded-lg shadow-lg flex flex-col lg:flex-row">
        {/* Left Section for User Info */}
        <div className="w-full lg:w-1/3 mb-6 lg:mb-0 lg:pr-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            {profilePhoto && (
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${profilePhoto}`}
                alt="Profile"
                className="w-44 h-44 mx-auto mb-4 hover:scale-105 transition-transform duration-300"
              />
            )}
            {email && (
              <p className="text-center font-bold text-green-600 text-lg mb-4 hover:text-red-600 transition-colors duration-300 italic">
                Email: {email}
              </p>
            )}
            {/* {firstName && (
              <p className="text-center font-bold text-green-600 text-lg mb-4 hover:text-red-600 transition-colors duration-300 italic">
                FirstName: {firstName}
              </p>
            )}
            {lastName && (
              <p className="text-center font-bold text-green-600 text-lg mb-4 hover:text-red-600 transition-colors duration-300 italic">
                SurName: {lastName}
              </p>
            )} */}
            <div className="text-center">
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white w-44 px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
        {/* Right Section for User's Services */}
        <div className="w-full lg:w-2/3 bg-slate-100">
          <h2 className="text-3xl lg:text-5xl bg-slate-200 p-2 font-bold text-center mb-4 text-green-600 font-serif italic">Your Booked Services</h2>
          {services.length === 0 ? (
            <p className="text-center text-3xl font-serif ">You have no booked services yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full lg:w-auto mx-auto divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-3 lg:px-6 text-left text-base font-semibold text-gray-500 uppercase tracking-wider">Event Name</th>
                    <th className="py-3 px-3 lg:px-6 text-left text-base font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="py-3 px-3 lg:px-6 text-left text-base font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr key={service._id} className="hover:bg-gray-200 transition-colors duration-300">
                      <td className="py-2 px-3 lg:px-6 whitespace-nowrap text-sm lg:text-base">{service.name}</td>
                      <td className="py-2 px-3 lg:px-6 whitespace-nowrap text-sm lg:text-base">${service.price}</td>
                      <td className="py-2 px-3 lg:px-6 whitespace-nowrap text-sm lg:text-base">
                        {service.paid ? (
                          <button className="bg-green-500 text-white px-5 py-1 rounded-sm mr-2 lg:px-4 lg:py-2 cursor-not-allowed">
                            Paid
                          </button>
                        ) : (
                          <button
                            onClick={() => makePayment(service._id, service.price)}
                            className="bg-green-500 text-white px-5 py-1 rounded-sm mr-2 lg:px-4 lg:py-2 hover:bg-green-600 transition-colors duration-300"
                          >
                            Pay
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded lg:px-4 lg:py-2 hover:bg-red-600 transition-colors duration-300"
                        >
                          <FaTimes />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
