import React, { useRef } from 'react';
import { motion } from 'framer-motion';

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

const HeroAnimation = ({ parallaxNodes, viewCoords }: HeroAnimationProps) => {
  const divRef = useRef(null);
  return (
    <motion.svg
      viewBox='0 0 1920 1080'
      className='bg-white z-[-1] absolute top-0 mx-auto w-screen max-w-[1920px] h-screen max-h-[1080px] overflow-x-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      ref={divRef}
    >
      <defs>
        <radialGradient
          id='fadeout'
          cx='50%'
          cy='50%'
          r='65%'
          fx='50%'
          fy='50%'
          spreadMethod='pad'
        >
          <stop offset='0%' style={{ stopColor: 'white', stopOpacity: 1 }} />
          <stop offset='90%' style={{ stopColor: 'white', stopOpacity: 1 }} />
          <stop offset='100%' style={{ stopColor: 'black', stopOpacity: 1 }} />
        </radialGradient>
        <linearGradient
          id='left-to-middle-to-right'
          x1='0%'
          y1='0%'
          x2='100%'
          y2='0%'
        >
          <stop offset='0%' style={{ stopColor: 'black', stopOpacity: 1 }} />
          <stop offset='15%' style={{ stopColor: 'black', stopOpacity: 0 }} />
          <stop offset='85%' style={{ stopColor: 'black', stopOpacity: 0 }} />
          <stop offset='100%' style={{ stopColor: 'black', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient
          id='top-to-middle-to-bottom'
          x1='0%'
          y1='0%'
          x2='0%'
          y2='100%'
        >
          <stop offset='0%' style={{ stopColor: 'black', stopOpacity: 1 }} />
          <stop offset='15%' style={{ stopColor: 'black', stopOpacity: 0 }} />
          <stop offset='85%' style={{ stopColor: 'black', stopOpacity: 0 }} />
          <stop offset='100%' style={{ stopColor: 'black', stopOpacity: 1 }} />
        </linearGradient>
        <mask id='mask'>
          <rect width='100%' height='100%' fill='white' />
          <rect width='100%' height='100%' fill='url(#fadeout)' />

          <rect
            width='100%'
            height='100%'
            fill='url(#left-to-middle-to-right)'
          />

          <rect
            width='100%'
            height='100%'
            fill='url(#top-to-middle-to-bottom)'
          />
        </mask>
      </defs>
      {/* debugging mask */}
      {/* <rect mask='url(#mask)' x='0' y='0' width='100%' height='100%' /> */}
      <motion.g
        mask='url(#mask)'
        x='0'
        y='0'
        style={{
          translateX: viewCoords.current.x,
          translateY: viewCoords.current.y,
        }}
        animate={{ transition: { duration: 0.2 } }}
        width='100%'
        height='100%'
      >
        {parallaxNodes.map((nodes, i) => {
          return (
            <rect
              key={i}
              x={nodes.targetX}
              y={nodes.targetY}
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

HeroAnimation.defaultProps = defaultProps;

export default HeroAnimation;
