import React from 'react';
import { Search, Facebook, Linkedin, Youtube } from 'lucide-react';

const TopNavBar = () => {
  return (
    <div className="bg-black text-white py-2 px-4 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-2 md:mb-0">
          <div className="mr-3 flex items-center">
            <div className="bg-red-600 h-6 w-6 rounded-sm flex items-center justify-center mr-2">
              <span className="text-xs font-bold">E</span>
            </div>
            <span className="font-semibold text-sm md:text-base">Egypt-Japan University of Science and Technology</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-xs md:text-sm">
          <a href="#" className="hover:text-red-500 transition-colors duration-200">Apply</a>
          <a href="#" className="hover:text-red-500 transition-colors duration-200">Students</a>
          <a href="#" className="hover:text-red-500 transition-colors duration-200">Faculty and Staff</a>
          <a href="#" className="hover:text-red-500 transition-colors duration-200">Media</a>
          <a href="#" className="hover:text-red-500 transition-colors duration-200">Library</a>
          <div className="flex items-center ml-2 space-x-3">
            <Search size={16} className="cursor-pointer hover:text-red-500 transition-colors duration-200" />
            <Facebook size={16} className="cursor-pointer hover:text-red-500 transition-colors duration-200" />
            <Youtube size={16} className="cursor-pointer hover:text-red-500 transition-colors duration-200" />
            <Linkedin size={16} className="cursor-pointer hover:text-red-500 transition-colors(duration-200)" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNavBar;