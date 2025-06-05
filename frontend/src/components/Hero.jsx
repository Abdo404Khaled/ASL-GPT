import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Postgraduate Admission',
      subtitle: 'Fall 2025',
      buttonText: 'Apply Now!',
      backgroundUrl: 'https://www.ejust.edu.eg/ejust2023/img/Picture1.png'
    },
    {
      id: 2,
      title: 'International Research',
      subtitle: 'Partnerships',
      buttonText: 'Learn More',
      backgroundUrl: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      title: 'Science & Technology',
      subtitle: 'Innovation Center',
      buttonText: 'Discover',
      backgroundUrl: 'https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
  ];

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.backgroundUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex flex-col items-center justify-center h-full text-white text-center px-4">
            <div className="bg-red-600 h-16 w-16 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl font-bold">E</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">{slide.title}</h1>
            <p className="text-xl md:text-2xl mb-6">{slide.subtitle}</p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors duration-200">
              {slide.buttonText}
            </button>
          </div>
        </div>
      ))}

      <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white transition-all duration-200" aria-label="Previous slide">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-600 bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white transition-all duration-200" aria-label="Next slide">
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-red-600' : 'w-2 bg-white bg-opacity-60'}`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;