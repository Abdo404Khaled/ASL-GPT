// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const VideoProcessingDots = () => {
  const fadeTransition = {
    duration: 0.9,
    repeat: Infinity,
    ease: 'easeInOut',
  };

  return (
    <div className="flex items-center space-x-1 ml-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-red-500 rounded-full"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ ...fadeTransition, delay: i * 0.25 }}
        />
      ))}
    </div>
  );
};

export default VideoProcessingDots;