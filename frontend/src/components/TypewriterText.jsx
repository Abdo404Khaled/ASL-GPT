import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

function TypewriterText({ text, speed = 50, onComplete, scrollRef }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    setDisplayed('');
    setDone(false);

    function type() {
      if (cancelled) return;

      setDisplayed(text.slice(0, i + 1));

      if (scrollRef?.current) {
        const c = scrollRef.current;
        c.scrollTop = c.scrollHeight;
      }

      if (i < text.length - 1) {
        i++;
        setTimeout(type, speed);
      } else {
        setDone(true);
        onComplete?.();
      }
    }

    type();
    return () => { cancelled = true; };
  }, [text, speed, onComplete, scrollRef]);

  return (
    <motion.span
      initial={{ scale: 1 }}
      animate={done
        ? { scale: [1, 1.2, 1] }
        : { scale: 1 }
      }
      transition={done
        ? { duration: 0.4, ease: 'easeInOut' }
        : {}
      }
    >
      {displayed}
    </motion.span>
  );
}

export default TypewriterText;
