import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { AnimatePresence, motion } from 'framer-motion';
import { initialRoadmapProtocolAfterLoad } from '@src/components/roadmap/Roadmap';
import { afterEventLoop } from '@src/typescript/utils/misc';
import roadmapAbout, {
  setRoadmapAboutName,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';

interface ThemeSelectorProps {
  onNext: () => void;
  handleExit: () => void;
}

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-red-600 font-roboto-text mt-1 absolute'
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
};

const TitleSelector = ({ onNext, handleExit }: ThemeSelectorProps) => {
  const { name: value } = useStore(roadmapAbout);
  const [showError, setShowError] = useState(false);
  const finishButtonRef = useRef(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showError) {
      timeout = setTimeout(() => {
        setShowError(false);
      }, 2000); // Adjust the duration here (in milliseconds)
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [showError]);

  const handleTilteInput = () => {
    if (value !== '') {
      setRoadmapAboutName(value);
      afterEventLoop(() => {
        initialRoadmapProtocolAfterLoad();
      });
      handleExit();
    } else {
      setShowError(true);
    }
  };

  function setValue(newValue: string) {
    setRoadmapAboutName(newValue);
  }

  return (
    <div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col items-center'
        >
          <div className='text-3xl font-kanit-text text-darkBlue'>
            Give it a title
          </div>
          <input
            autoFocus
            value={value}
            className='border-2 border-[#D9D9D9] rounded-lg w-96 placeholder:text-[#D9D9D9] placeholder:font-roboto-text px-3 py-2 mt-5 text-darkBlue outline-none'
            placeholder='Write here an awesome title'
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                finishButtonRef.current.click();
              }
            }}
          />
        </motion.div>
      </AnimatePresence>
      <div className='relative flex justify-center'>
        {showError && <ErrorDisplay message='Please input a valid title' />}
      </div>
      <div className='flex flex-col items-center mt-28 text-base font-roboto-text'>
        <AnimatePresence>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            type='button'
            className='bg-[#3361D8] text-white px-4 py-1 rounded-md w-72'
            ref={finishButtonRef}
            onClick={() => {
              handleTilteInput();
            }}
          >
            Finish
          </motion.button>
        </AnimatePresence>
        <AnimatePresence>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            type='button'
            className='mt-1'
            onClick={() => {
              handleExit();
              initialRoadmapProtocolAfterLoad();
            }}
          >
            I&rsquo;ll do it later
          </motion.button>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TitleSelector;
