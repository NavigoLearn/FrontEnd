import React from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { motion, AnimatePresence } from 'framer-motion';

type IProps = {
  width: number;
  height: number;
  x: number;
  y: number;
  selected: boolean;
  defaultState: boolean;
};

const ResourceNodeM = ({
  x,
  y,
  width,
  height,
  selected,
  defaultState,
}: IProps) => {
  let opacityProps = selected ? 'opacity-100' : 'opacity-50';
  if (defaultState) opacityProps = 'opacity-100';

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${x}px`,
        top: `${y}px`,
        position: 'absolute',
      }}
      className=''
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        className={`relative z-10 bg-white text-sm shadow-md font-roboto-text text-placeholder rounded-sm  flex justify-center items-start pt-2 ${opacityProps}  ${tailwindTransitionClass}`}
      >
        Big node
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className='absolute w-full bottom-2'
            >
              <div className='flex justify-center w-full gap-3'>
                <div className='pt-3 h-20 px-2 font-light bg-[#ECEFF2]'>
                  Subnode 1
                </div>
                <div className='pt-3 h-20 px-2 font-light bg-[#ECEFF2]'>
                  Subnode 2
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className='w-full h-full bg-[#F4F4F5] absolute z-0 left-0 top-0' />
    </div>
  );
};

export default ResourceNodeM;
