import React, { useState } from 'react';
import TopNavbar from '../components/TopNavbar';
import MainNavbar from '../components/MainNavbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { BiChat } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react';
import ChatComponent from '../components/ChatComponent.jsx';

const Home = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null);

  return (
    <div className="min-h-screen flex flex-col relative bg-gray-50">
      <TopNavbar />
      <MainNavbar />
      <Hero />

      <section className="py-12 px-4 bg-gray-50">
      </section>

      <section className="py-12 px-4">
      </section>

      <section className="py-16 px-4 bg-red-600 text-white">
      </section>

      <Footer />

      <AnimatePresence>
        {showChat && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-10 w-[40vw] max-w-sm h-[60vh] bg-white shadow-2xl border border-gray-100 rounded-2xl"
          >
            <button
              onClick={() => setShowChat(false)}
              className="absolute -top-4 right-2 bg-red-500 text-white hover:bg-red-600 shadow-lg rounded-full w-10 h-10 flex items-center justify-center z-10 cursor-pointer"
            >
              <IoClose size={30} />
            </button>

            <ChatComponent
              messages={messages}
              setMessages={setMessages}
              currentTitle={currentTitle}
              setCurrentTitle={setCurrentTitle}
              currentChatId={currentChatId}
              setCurrentChatId={setCurrentChatId}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bg-red-500 h-11 w-11 text-white rounded-full shadow-lg hover:bg-red-600 bottom-10 right-10 grid place-items-center cursor-pointer"
        >
          <BiChat size={30} />
        </button>
      )}
    </div>
  );
};

export default Home;