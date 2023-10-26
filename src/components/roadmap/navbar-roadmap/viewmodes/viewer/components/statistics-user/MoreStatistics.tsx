import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils.ts';
import StatisticsDropdown from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/statistics-user/StatisticsDropdown.tsx';
import { AnimatePresence, motion } from 'framer-motion';

const MoreStatistics = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div className='relative'>
      <button
        type='button'
        className='flex items-center gap-1 p-1 hover:bg-gray-200'
        onClick={() => {
          setOpened((prev) => !prev);
        }}
      >
        <span className='font-roboto-text font-medium'>More statistics</span>
        <ChevronDown
          size={22}
          className={` ${
            !opened ? 'rotate-0' : 'rotate-180'
          } ${tailwindTransitionClass} translate-y-[1px]`}
        />
      </button>
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              x: '-50%',
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: '-50%', // this is done to center the absolute div
            }}
            exit={{
              opacity: 0,
              y: -10,
              x: '-50%',
            }}
            className='absolute left-1/2 top-14'
          >
            <StatisticsDropdown />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoreStatistics;
