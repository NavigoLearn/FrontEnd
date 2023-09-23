import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useHomeLogic from '@components/home/typescript/useHomeLogic';
import useHomeLogicMobile from '@components/home/mobile/sections/hero/hooks/useHomeLogicMobile';

type HeroAnimationProps = {
  parallaxNodes?: Array<{
    targetX: number;
    targetY: number;
  }>;
  viewCoords?: {
    current: {
      x: number;
      y: number;
    };
  };
};

// Define default props
const defaultProps: HeroAnimationProps = {
  parallaxNodes: [],
  viewCoords: { current: { x: 0, y: 0 } },
};

const HeroNodeAnimationM = () => {
  const { parallaxNodes } = useHomeLogicMobile();
  const divRef = useRef(null);
  return (
    <motion.svg
      viewBox='0 0 600 400'
      className='bgred-500  absolute top-0 left-0 w-screen h-[300px] '
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      ref={divRef}
    >
      <motion.g
        mask='url(#mask)'
        x='0'
        y='0'
        animate={{ transition: { duration: 0.2 } }}
        width='100%'
        height='100%'
      >
        {parallaxNodes.map((node, i) => {
          return (
            <rect
              key={node.id}
              x={node.targetX}
              y={node.targetY}
              rx='4'
              ry='4'
              width='6rem'
              height='2rem'
              className='fill-white border-gray-500 stroke-slate-400 border-[2px] flex rounded-lg justify-center items-center'
            />
          );
        })}
      </motion.g>
    </motion.svg>
  );
};

HeroNodeAnimationM.defaultProps = defaultProps;
export default HeroNodeAnimationM;
