// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const TypingDots = () => {
  const dotTransition = {
    duration: 0.8,
    repeat: Infinity,
    ease: 'easeInOut'
  };

  return (
    <div className="flex space-x-1 mt-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-blue-500 rounded-full"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ ...dotTransition, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
};

export default TypingDots;

