import React, { useState } from 'react';
import theme1 from '@assets/theme1.svg';
import theme2 from '@assets/theme2.svg';
import theme3 from '@assets/theme3.svg';
import theme4 from '@assets/theme4.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { setRoadmapColorTheme } from '../theme-controler';
import {
  saveRoadmapChanges,
  type ISetupScreenControlers,
} from '../roadmap-funtions';

const ThemeSelector = ({ onNext }: ISetupScreenControlers) => {
  const themes = [
    { id: 0, name: theme1 },
    { id: 1, name: theme2 },
    { id: 2, name: theme3 },
    { id: 3, name: theme4 },
  ];
  const [isSelected, setIsSelected] = useState(0);

  const colorThemeSelector = (index: number) => {
    switch (index) {
      case 0:
        return setRoadmapColorTheme('winterTheme');
      case 1:
        return setRoadmapColorTheme('autumnTheme');
      case 2:
        return setRoadmapColorTheme('summerTheme');
      case 3:
        return setRoadmapColorTheme('springTheme');
      default:
        return setRoadmapColorTheme('winterTheme');
    }
  };

  const [fadeOut, setFadeOut] = useState(false);

  return (
    <div className='flex justify-center items-center'>
      <div className='flex flex-col items-center'>
        <AnimatePresence>
          <motion.div
            initial={{ x: 0, opacity: 0 }} // Start from opacity 0
            animate={{ x: fadeOut ? -10 : 0, opacity: fadeOut ? 0 : 1 }} // Slide in from the left
            exit={{ x: -100, opacity: 0 }} // Slide out to the left
            transition={{ duration: 0.4 }}
            className='flex flex-col items-center text-3xl font-kanit-text text-darkBlue'
          >
            <div>Select a roadmap</div>
            <div>theme</div>
            <div className='grid grid-cols-4 gap-3 mt-2'>
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  initial={{ scale: 0, rotate: 330 }}
                  animate={{ scale: 1, rotate: 360 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: theme.id * 0.2,
                  }}
                  className={`h-32 w-28 border-2 rounded-md relative ${
                    isSelected === theme.id
                      ? 'border-black border-2 shadow-xl'
                      : 'border-[#D9D9D9]'
                  }`}
                  onClick={() => {
                    setIsSelected(theme.id);
                    colorThemeSelector(theme.id);
                  }}
                >
                  <img
                    src={theme.name.src}
                    alt={`theme${theme.id + 1}`}
                    className='ml-5'
                  />
                  {isSelected === theme.id && (
                    <svg
                      className='absolute top-1 right-1'
                      width='22'
                      height='22'
                      viewBox='0 0 60 60'
                      fill='#3361D8'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      {/* Blue circle */}
                      <motion.circle
                        cx='30'
                        cy='30'
                        r='25'
                        stroke='none'
                        strokeWidth='6'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Check mark */}
                      <motion.path
                        d='M13.5 30L24.75 41.25L45 18.75'
                        stroke='#fff'
                        strokeWidth='6'
                        strokeLinecap='round'
                        fill='none'
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1, scale: 0.8 }}
                        transition={{ duration: 0.35 }}
                      />
                    </svg>
                  )}
                  {isSelected !== theme.id && (
                    <svg
                      className='absolute top-1 right-1'
                      width='22'
                      height='22'
                      viewBox='0 0 60 60'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle
                        cx='30'
                        cy='30'
                        r='25'
                        stroke='#D9D9D9'
                        strokeWidth='3'
                        fill='transparent'
                      />
                    </svg>
                  )}
                  <div className='w-28 flex items-center justify-center absolute'>
                    <div className='text-base mt-4'>
                      {theme.id === 0 && 'Winter'}
                      {theme.id === 1 && 'Autumn'}
                      {theme.id === 2 && 'Summer'}
                      {theme.id === 3 && 'Spring'}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            initial={{ x: 0, opacity: 0 }} // Start from opacity 0
            animate={{ y: fadeOut ? 7 : 0, opacity: fadeOut ? 0 : 1 }} // Slide in from the left
            exit={{ x: -100, opacity: 0 }} // Slide out to the left
            transition={{ duration: 0.4 }}
          >
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5, delay: themes.length * 0.2 }}
              className='bg-[#3361D8] text-white px-4 py-1 rounded-md text-base w-72 font-roboto-text mt-12'
              onClick={() => {
                saveRoadmapChanges();
                setFadeOut(true); // Start fade out animation
                setTimeout(() => {
                  onNext(); // Call onNext after animation
                }, 350); // Adjust the delay to match the animation duration
              }}
            >
              Next
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThemeSelector;
