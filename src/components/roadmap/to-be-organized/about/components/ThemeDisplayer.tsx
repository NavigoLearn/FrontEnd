import React, { useState } from 'react';
import theme1 from '@assets/theme1.svg';
import theme2 from '@assets/theme2.svg';
import theme3 from '@assets/theme3.svg';
import theme4 from '@assets/theme4.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { setStoreAboutTempTheme } from '@components/roadmap/to-be-organized/about/stores/store-about-temp';
import { type IColorThemesOptions } from '@type/roadmap/node/colors-types';

type IThemeDisplayerProps = {
  isSelectible: boolean;
  initialTheme: IColorThemesOptions;
};
const ThemeDisplayer = ({
  isSelectible,
  initialTheme,
}: IThemeDisplayerProps) => {
  const themes = [
    { id: 0, name: theme1 },
    { id: 1, name: theme2 },
    { id: 2, name: theme3 },
    { id: 3, name: theme4 },
  ];
  const themeMappings: Record<IColorThemesOptions, number> = {
    winterTheme: 0,
    autumnTheme: 1,
    summerTheme: 2,
    springTheme: 3,
  };

  const mappedInitialTheme = themeMappings[initialTheme];
  const [selection, setSelection] = useState(mappedInitialTheme);

  const colorThemeSelector = (index: number) => {
    switch (index) {
      case 0:
        return setStoreAboutTempTheme('winterTheme');
      case 1:
        return setStoreAboutTempTheme('autumnTheme');
      case 2:
        return setStoreAboutTempTheme('summerTheme');
      case 3:
        return setStoreAboutTempTheme('springTheme');
      default:
        return setStoreAboutTempTheme('winterTheme');
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
            <div className='grid grid-cols-4 gap-3 mt-1'>
              {themes.map((theme) => {
                const isSelected = theme.id === selection;
                if (!isSelectible && !isSelected) return null;
                return (
                  <motion.button
                    key={theme.id}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 360,
                      damping: 40,
                      delay: (theme.id - 0.8) * 0.1,
                    }}
                    className={`h-32 w-28 border-2 rounded-md relative ${
                      isSelected
                        ? 'border-black border-2 shadow-xl'
                        : 'border-[#D9D9D9]'
                    } ${isSelectible ? 'cursor-pointer' : 'cursor-default'} `}
                    onClick={() => {
                      setSelection(theme.id);
                      colorThemeSelector(theme.id);
                    }}
                  >
                    <img
                      src={theme.name.src}
                      alt={`theme${theme.id + 1}`}
                      className='ml-5'
                    />
                    {selection === theme.id && (
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
                    {selection !== theme.id && (
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
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThemeDisplayer;
