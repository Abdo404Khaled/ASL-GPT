import React, { useState, useEffect } from 'react';

const MainNavBar = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    'Home', 'About', 'Academics', 'Admission', 'Research',
    'Centers', 'Int. Cooperation', 'Careers', 'Sustainability',
    'Industry Cluster', 'Newsletter'
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`bg-white py-4 px-4 md:px-8 sticky top-0 z-40 shadow-sm transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
            <div className="flex space-x-6">
              {navItems.map(item => (
                <button
                  key={item}
                  className={`whitespace-nowrap font-medium text-sm md:text-base ${
                    activeItem === item
                      ? 'text-red-600 border-b-2 border-red-600'
                      : 'text-gray-700 hover:text-red-600 transition-colors duration-200'
                  }`}
                  onClick={() => setActiveItem(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-red-600 text-white px-6 py-2 rounded-full font-medium text-sm md:text-base mt-3 md:mt-0 hover:bg-red-700 transition-colors duration-200">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainNavBar;