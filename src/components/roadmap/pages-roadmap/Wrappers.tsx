import React from 'react';
import { IDisplayStyles } from '@store/roadmap-refactor/display/display-manager';
import { motion } from 'framer-motion';

function getWrapperStyle(style: IDisplayStyles) {
  const rightWrapperStyle =
    'absolute md:shadow-standard top-0  md:top-2 md:mt-0  md:right-2 w-full h-full md:w-[500px] md:h-[97%] bg-white';
  const rightExtendedWrapperStyle =
    'absolute md:shadow-standard top-0 w-full h-full md:top-2 md:mt-0  md:right-2 md:w-1/2  md:left-1/2 md:h-[97%] bg-white';
  const fullScreenWrapperStyle =
    'absolute top-0 w-full h-[102%] md:h-full  bg-white';

  const displayStylesMapper = {
    right: rightWrapperStyle,
    rightExtended: rightExtendedWrapperStyle,
    fullScreen: fullScreenWrapperStyle,
  };
  return displayStylesMapper[style];
}

export function rightWrapper(Component) {
  const transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96], // Custom easing curve
  };
  const WrappedComponent = () => (
    <motion.div
      initial={{ opacity: 0, x: '100%', y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={transition}
      className='absolute md:shadow-standard top-0  md:top-2 md:mt-0  md:right-2 w-full h-full md:w-[500px] md:h-[97%] bg-white'
    >
      <div className='h-full w-full pointer-events-auto'>
        <Component />
      </div>
    </motion.div>
  );

  return WrappedComponent;
}

export function animationWrapperEditorPages(Component) {
  const transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96], // Custom easing curve
  };
  const WrappedComponent = (props) => (
    <motion.div
      initial={{ opacity: 0, x: '-25%', y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: '25%' }}
      transition={transition}
      className=''
    >
      <div key=''>
        <Component {...props} />
      </div>
    </motion.div>
  );

  return WrappedComponent;
}
