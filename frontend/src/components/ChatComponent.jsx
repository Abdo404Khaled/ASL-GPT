import React, { useRef, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { BiUser, BiVideo, BiBot, BiSend } from 'react-icons/bi';
import useProcessVideo from '../hooks/useProcessVideo';
import TypingDots from './TypingDots';
import TypewriterText from './TypewriterText';
import useAnswerQuery from '../hooks/useAnswerQuery';
import VideoProcessingDots from '../components/VideoProcessingDots'

function ChatComponent({
  messages,
  setMessages,
  currentTitle,
  setCurrentTitle,
  currentChatId,
  setCurrentChatId,
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef(null);
  const lastUserIndexRef = useRef(null);
  const generateId = () => Math.random().toString(36).substring(2, 10);

  const { mutate: answerQuery, isPending } = useAnswerQuery({
    onSuccess: (response) => {
      if (response.blob) {
        const pdfUrl = URL.createObjectURL(response.blob);
        addMessage({
          role: 'assistant',
          content: (
            <iframe
              src={pdfUrl}
              width="100%"
              height="400px"
              title="Document Preview"
              className="rounded-lg border"
            />
          ),
          typed: true,
        });
      } else if (response.answer) {
        addMessage({ role: 'assistant', content: response.answer, typed: false });
      }
      setIsProcessing(false);
    },
    onError: () => {
      addMessage({ role: 'assistant', content: 'Failed to get a response.', typed: true });
      setIsProcessing(false);
    },
  });

  const { mutate: processVideo } = useProcessVideo({
    onSuccess: (response) => {
      const { prediction } = response;
      updateUserMessage(prediction);
      answerQuery(prediction);
      setIsProcessing(false);
    },
    onError: () => {
      updateUserMessage('Failed to process the video.');
      setIsProcessing(false);
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const submitHandler = (data) => {
    if (!data.text || isProcessing) return;
    const firstMessage = data.text.trim();
    if (!firstMessage) return;

    const newTitle = currentTitle || firstMessage.substring(0, 30).trim() || 'New Chat';
    const newChatId = currentChatId || generateId();
    if (!currentChatId) {
      setCurrentTitle(newTitle);
      setCurrentChatId(newChatId);
    }

    setIsProcessing(true);
    setMessages((prev) => {
      const updated = [...prev, { role: 'user', content: firstMessage, typed: true }];
      lastUserIndexRef.current = updated.length - 1;
      return updated;
    });
    reset();
    answerQuery(firstMessage);
  };

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  const updateUserMessage = (newContent) => {
    if (lastUserIndexRef.current == null) return;
    setMessages((prev) => {
      const updated = [...prev];
      updated[lastUserIndexRef.current] = {
        ...updated[lastUserIndexRef.current],
        content: newContent,
      };
      return updated;
    });
  };

  const markTyped = (index) => {
    setMessages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], typed: true };
      return updated;
    });
  };

  useEffect(() => {
    const last = scrollRef.current?.lastElementChild;
    if (last) last.scrollIntoView({ behavior: 'instant' });
  }, [messages]);

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, scale: 0.9 },
  };
  const headerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: 'spring' } },
  };

  return (
    <div className="bg-white text-gray-800 h-full w-full flex flex-col justify-between rounded-2xl">
      <section className="flex flex-col h-full justify-between items-stretch p-4">
        <motion.div
          className="text-center pb-3 border-b border-gray-200"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-xl font-bold text-red-600">E-Just Assistant</h1>
          {!currentTitle && (
            <p className="text-sm text-gray-500 mt-1">How can I help you today?</p>
          )}
        </motion.div>

        <div className="flex-1 overflow-y-auto px-2 space-y-3 scroll-smooth mt-4" ref={scrollRef}>
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className={`flex items-start gap-2 ${
                  msg.role === 'assistant' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'user' && <BiUser size={24} className="text-red-500 mt-1" />}
                {msg.role === 'assistant' && <BiBot size={24} className="text-blue-600 mt-1" />}

                <div
                  className={`max-w-[75%] px-4 py-2 rounded-lg text-sm leading-relaxed shadow break-words whitespace-pre-wrap ${
                    msg.role === 'assistant'
                      ? 'bg-blue-100 text-gray-800 rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="mb-1 font-semibold">
                    {msg.role === 'user' ? 'You' : 'ASL-GPT'}
                  </p>
                  {typeof msg.content === 'string' ? (
                    msg.role === 'assistant' && !msg.typed ? (
                      <TypewriterText
                        text={msg.content}
                        speed={30}
                        scrollRef={scrollRef}
                        onComplete={() => markTyped(idx)}
                      />
                    ) : (
                      <div className="markdown">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    )
                  ) : (
                    msg.content
                  )}
                </div>
              </motion.div>
            ))}

            {isPending && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={messageVariants}
                className="flex justify-end items-start gap-2"
              >
                <BiBot size={24} className="text-blue-600 mt-1" />
                <div className="bg-blue-100 text-gray-800 max-w-[75%] px-4 py-2 rounded-lg text-sm leading-relaxed shadow rounded-br-none">
                  <p className="mb-1 font-semibold">ASL-GPT</p>
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="h-6" />
        </div>

        <form
          className="flex items-center gap-2 mt-3 px-3 py-2 bg-red-50 border border-red-200 rounded-xl"
          onSubmit={handleSubmit(submitHandler)}
        >
          <input
            type="text"
            placeholder="Type your message"
            spellCheck="false"
            {...register('text')}
            disabled={isProcessing}
            className="flex-1 h-10 bg-transparent outline-none text-sm placeholder-red-400"
          />
                    <label htmlFor="video-upload" className="cursor-pointer text-red-500 hover:text-red-700">
            <BiVideo size={22} />
          </label>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={(e) => {
              const videoFile = e.target.files[0];
              if (videoFile && !isProcessing) {
                const initial = 'Video sent';
                const title = currentTitle || initial.substring(0, 30).trim();
                const id = currentChatId || generateId();
                if (!currentChatId) {
                  setCurrentTitle(title);
                  setCurrentChatId(id);
                }
                setIsProcessing(true);
                setMessages((prev) => {
                  const updated = [...prev, { role: 'user', content: initial, typed: true }];
                  lastUserIndexRef.current = updated.length - 1;
                  return updated;
                });
                setTimeout(() => {
                  updateUserMessage(
                    <div className="flex items-center">
                      <p className="mr-2">Processing the video</p>
                      <VideoProcessingDots />
                    </div>
                  );
                }, 300);
                processVideo(videoFile);
              }
            }}
            className="hidden"
            disabled={isProcessing}
          />
          <button type="submit" disabled={isProcessing} className="text-red-500 hover:text-red-700">
            <BiSend size={22} />
          </button>
        </form>
      </section>
    </div>
  );
}

export default ChatComponent;
