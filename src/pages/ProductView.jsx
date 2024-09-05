// src/pages/ProductView.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductView = () => {
  const location = useLocation();
  const { product } = location.state || {}; // Use optional chaining and default value

  if (!product) {
    return <div className="container mx-auto py-12 flex justify-center">No product details available.</div>;
  }

  return (
    <div className="container mx-auto py-12 flex justify-center bg-slate-400">
      <div className="max-w-4xl w-full px-6 py-8 bg-white rounded-lg shadow-md transition transform hover:-translate-y-1 hover:shadow-lg">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center text-indigo-700">Product Details</h1>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Uploaded Images</h2>
            <div className="flex flex-col space-y-4">
              {product.photo1 && (
                <div className="p-2 bg-gray-100 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105">
                  <img
                    src={URL.createObjectURL(product.photo1)}
                    alt="Event Photo"
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="text-center mt-2">{product.photo1.name}</p>
                </div>
              )}
              {product.photo2 && (
                <div className="p-2 bg-gray-100 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105">
                  <img
                    src={URL.createObjectURL(product.photo2)}
                    alt="Business License"
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="text-center mt-2">{product.photo2.name}</p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Uploaded Information</h2>
            <table className="min-w-full bg-white mb-6">
              <tbody>
                {[
                  ['NID', product.nid],
                  ['Agency Name', product.agencyName],
                  ['Agency Email', product.agencyEmail],
                  ['Phone Number', product.phoneNumber],
                  ['Services Category', product.servicesCategory],
                  ['Price Rating', product.priceRating],
                  ['Business Category', product.businessCategory],
                  ['Address', product.address]
                ].map(([label, value]) => (
                  <tr key={label} className="border-b transition hover:bg-gray-100 hover:shadow-md">
                    <td className="py-2 px-4 font-bold text-gray-700">{label}</td>
                    <td className="py-2 px-4">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-2xl font-bold mt-6 mb-4 text-cyan-400">Pricing Details</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 font-bold text-gray-700">Service</th>
                  <th className="py-2 px-4 font-bold text-gray-700">Price</th>
                  <th className="py-2 px-4 font-bold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b transition hover:bg-gray-100 hover:shadow-md">
                  <td className="py-2 px-4">Normal</td>
                  <td className="py-2 px-4">BDT : 10000</td>
                  <td className="py-2 px-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg transition hover:bg-blue-600 hover:shadow-lg focus:outline-none">
                      Pay
                    </button>
                  </td>
                </tr>
                <tr className="border-b transition hover:bg-gray-100 hover:shadow-md">
                  <td className="py-2 px-4">Premium</td>
                  <td className="py-2 px-4">BDT : 20000</td>
                  <td className="py-2 px-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg transition hover:bg-blue-600 hover:shadow-lg focus:outline-none">
                      Pay
                    </button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
