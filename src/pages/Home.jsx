import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Faq from '../components/Faq';
import Service from './Services';
import Testimonials from '../components/Testimonials';


const Home = () => {
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <>
      <section className="py-12 ">
        <div className='md:px-20 px-4   lg:h-screen'>
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            {/* Left Side */}
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight lg:italic font-serif">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 md:text-4xl lg:text-5xl">
                Your
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 md:text-4xl lg:text-5xl">
                One-Stop-Shop
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 md:text-4xl lg:text-5xl">
                For Memorable Events
              </span>
            </h1>
            </div>

            {/* Right Side */}
            <div className="md:w-1/2 text-center md:text-left px-2">
              <h2 className="text-2xl md:text:-3xl font-bold text-gray-800 mb-4 font-serif">
                Find Everything You Need Here
              </h2>
              <p className="text-gray-700 mb-6 font-bold text-justify font-serif">
                We aim to simplify the entire event planning process for customers and event planners
                by providing a platform that helps them with everything they need for an event,
                including event space or venue, catering, event dress decoration, and budget planning.
              </p>
              <Link to="/services" className=" font-semibold px-6 py-3 rounded hover:bg-cyan-700 bg-cyan-600 text-white">
                Get Started
              </Link>
            </div>
          </div>
          {/* Live Video */}
          <div className="container mx-auto mt-8 text-center p-4 ">
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full ">
                <source src="https://event-expert.vercel.app/static/media/coverr-family-waving-sparklers-around-4496-1080p.b287eb18870e011583b9.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <style>
                {`
                  video::-webkit-media-controls { display: none !important; }
                  video::-webkit-media-controls-enclosure { display: none !important; }
                  video::-webkit-media-controls-play-button { display: none !important; }
                `}import ComponentName from './../components/ComponentName';

              </style>
            </div>
          </div>
        </div>
        {/* Carousel Section */}
        <div className="container mx-auto  md:px-24 lg:mt-96 md:mt-12">
          <h2 className="text-4xl lg:text-5xl font-semibold text-center  text-green-700 italic font-serif">Featured Brands</h2>
          <Slider {...carouselSettings} className='lg:mt-16 md:mt-16'>
            <div className="brand-item">
              <img src="/images/bata_logo.png" alt="Bata" className="mx-auto mb-2 w-24 h-24 object-contain  hover:scale-150 transition-transform duration-300 ease-in-out" />
              <p className="text-center font-semibold">Bata</p>
            </div>
            <div className="brand-item">
              <img src="/images/zara_logo.png" alt="Zara" className="mx-auto mb-2 w-24 h-24 object-contain hover:scale-150 transition-transform duration-300 ease-in-out" />
              <p className="text-center font-semibold">Zara</p>
            </div>
            <div className="brand-item">
              <img src="/images/images.png" alt="Dior" className="mx-auto mb-2 w-24 h-24 object-contain hover:scale-150 transition-transform duration-300 ease-in-out" />
              <p className="text-center font-semibold">Dior</p>
            </div>
            <div className="brand-item">
              <img src="/images/chanel_logo.png" alt="Chanel" className="mx-auto mb-2 w-24 h-24 object-contain hover:scale-150 transition-transform duration-300 ease-in-out" />
              <p className="text-center font-semibold">Chanel</p>
            </div>
            <div className="brand-item">
              <img src="/images/gucci_logo.png" alt="Gucci" className="mx-auto mb-2 w-24 h-24 object-contain hover:scale-150 transition-transform duration-300 ease-in-out" />
              <p className="text-center font-semibold">Gucci</p>
            </div>
            <div className="brand-item">
              <img src="/images/prada_logo.png" alt="Prada" className="mx-auto mb-2 w-24 h-24 object-contain hover:scale-150 transition-transform duration-300 ease-in-out" />
              <p className="text-center font-semibold">Prada</p>
            </div>
            <div className="brand-item">
              <img src="/images/nike_logo.png" alt="Nike" className="mx-auto mb-2 w-24 h-24 object-contain hover:scale-150 transition-transform duration-300 ease-in-out" />
              <p className="text-center font-semibold">Nike</p>
            </div>
            <div className="brand-item">
              <img src="/images/adidas_logo.png" alt="Adidas" className="mx-auto mb-2 w-24 h-24 object-contain hover:scale-150 transition-transform duration-300 ease-in-out" />
              <p className="text-center font-semibold">Adidas</p>
            </div>
          </Slider>
          <h1 className='text-3xl text-center md:mt-16 italic text-blue-600 font-semibold font-serif'>About Connections </h1>
          <p className='text-justify mt-4 p-4 px-7 md:px-0 font-semibold font-serif'>
          Our Event Management System is a comprehensive web application designed to connect various companies, such as Bata, Dior, and others, under a unified platform for hosting and managing events. The platform allows businesses to list their services, manage bookings, and handle payments seamlessly. With features like user authentication, service listings, and integrated payment processing (Stripe), the system empowers companies to streamline their event management operations and reach a broader audience. Additionally, outside sellers can easily join and offer their services, enhancing the platform's versatility.
          </p>
        </div>
        {/* Grow Business Section */}
        <div className="container mt-6 mx-auto py-12 flex flex-col md:flex-row items-center relative  md:px-24">
        
          <div className="md:w-1/2 w-1/2 relative hover:scale-105 transition-transform duration-300 ease-in-out">
              <h1 className='text-center text-2xl p-4 text-blue-600 font-bold font-serif'>Know About Bussiness</h1>
              <img src="https://plus.unsplash.com/premium_photo-1676651178962-67cb1622b7ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Background Image" className="w-full h-auto object-cover rounded-md" />
              <img src="https://plus.unsplash.com/premium_photo-1661277666101-01fb123f2a4c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Overlay Image" className="absolute origin-bottom-right scale-50 md:scale-55 rounded-md -bottom-12 -right-7 object-cover transition-transform duration-300 hover:scale-60" />
          </div>
          <div className="md:w-1/2 px-16 mt-12 md:mt-0">
          <div className="text-4xl font-bold text-center md:text-left mb-4 text-blue-700 font-serif">
              Grow Your Business With Us
          </div>
          <p className="text-gray-700 mb-6 text-center md:text-left font-serif">
              We are not only solution providers but also providing opportunities for others to do business with us. They can be our solution sources for event venues, dressing costumes, food services, etc.
          </p>
          <p className="text-gray-700 text-center md:text-left">
              Over <span className="text-4xl font-bold">20+</span> Successful Events and counting.
          </p>
          </div>
        </div>
      </section>
      <Service/>
      <Testimonials/>
      <Faq/>
      
    </>
  );
}

export default Home;
