import React from 'react';
import { Mail, Phone, MapPin, Facebook, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-red-600 h-8 w-8 rounded-sm flex items-center justify-center mr-2">
                <span className="text-sm font-bold">E</span>
              </div>
              <h3 className="font-bold text-lg">E-JUST</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Egypt-Japan University of Science and Technology is a research-oriented 
              university established in collaboration between the Egyptian and Japanese governments.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-red-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Academics', 'Admission', 'Research', 'Careers', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4 border-b border-gray-700 pb-2">Resources</h3>
            <ul className="space-y-2">
              {['Library', 'Publications', 'Academic Calendar', 'Media Center', 'Events', 'Newsletter'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-red-500" />
                <p>New Borg El-Arab City, Alexandria, Egypt</p>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 text-red-500" />
                <p>+20 3 4599520</p>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2 text-red-500" />
                <p>info@ejust.edu.eg</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Egypt-Japan University of Science and Technology. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;