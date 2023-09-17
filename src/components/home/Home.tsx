import React, { MouseEvent, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import {
  generateObjects,
  lerp,
  screenCenter,
} from '@components/home/typescript/helpers';
import { v4 as uuidv4 } from 'uuid';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';
import ScrollingElement from './ScrollingElement';

const Home = () => {
  const divRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // create an array of objects with x and y coordinates
  const objects = generateObjects();

  const xMotionValues = objects.map(() => useMotionValue(0));
  const yMotionValues = objects.map(() => useMotionValue(0));

  useEffect(() => {
    let animationFrameId = null;
    let TIME = 0;

    if (mousePosition.current.x === 0 && mousePosition.current.y === 0) {
      const [x, y] = screenCenter();
      mousePosition.current = {
        x,
        y,
      };
    }

    const animate = () => {
      // Calculate the distance from the center of the screen
      const [SCREEN_CENTER_X, SCREEN_CENTER_Y] = screenCenter();

      const { x, y } = mousePosition.current;
      const DISTANCE_X = x - SCREEN_CENTER_X;
      const DISTANCE_Y = y - SCREEN_CENTER_Y;

      objects.forEach((object, index) => {
        const floatingEffect = 20;
        const targetX = DISTANCE_X / 6 + object.targetX;
        const targetY =
          DISTANCE_Y / 6 +
          object.targetY +
          Math.sin(object.sinOffset + TIME) * floatingEffect;

        const newX = lerp(xMotionValues[index].get(), targetX, 0.1);
        const newY = lerp(yMotionValues[index].get(), targetY, 0.1);

        xMotionValues[index].set(newX);
        yMotionValues[index].set(newY);
      });

      TIME += 0.01;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // animation logic - update the mouse position
  const handleMouseMove = (e: MouseEvent) => {
    mousePosition.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  useEffect(() => {
    objects.forEach((object, index) => {
      xMotionValues[index].set(object.targetX);
      yMotionValues[index].set(object.targetY);
    });

    objects.forEach((object, index) => {
      setTimeout(() => {
        xMotionValues[index].set(object.targetX);
        yMotionValues[index].set(object.targetY);
      }, index * 100);
    });
  }, [objects, xMotionValues, yMotionValues]);

  return (
    <div
      onMouseMove={handleMouseMove}
      className='overflow-x-hidden relative flex items-center justify-center'
    >
      <svg
        viewBox='0 0 1920 1080'
        className='bg-white z-[-1] absolute top-0 mx-auto w-screen max-w-[1920px] h-screen max-h-[1080px] overflow-x-hidden'
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
            <stop
              offset='100%'
              style={{ stopColor: 'black', stopOpacity: 1 }}
            />
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
            <stop
              offset='100%'
              style={{ stopColor: 'black', stopOpacity: 1 }}
            />
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
            <stop
              offset='100%'
              style={{ stopColor: 'black', stopOpacity: 1 }}
            />
          </linearGradient>
          <mask id='mask'>
            <rect width='1920' height='1080' fill='white' />
            <rect width='1920' height='1080' fill='url(#fadeout)' />

            <rect
              width='1920'
              height='1080'
              fill='url(#left-to-middle-to-right)'
            />

            <rect
              width='1920'
              height='1080'
              fill='url(#top-to-middle-to-bottom)'
            />
          </mask>
        </defs>
        {/* debugging mask */}
        {/* <rect mask='url(#mask)' x='0' y='0' width='100%' height='100%' /> */}
        <g mask='url(#mask)' x='0' y='0' width='1920px' height='1080px'>
          {objects.map((_, index) => {
            return (
              <motion.rect
                key={uuidv4()}
                x={xMotionValues[index]}
                y={yMotionValues[index]}
                rx='4'
                ry='4'
                style={{
                  width: '2rem',
                  height: '2rem',
                  x: xMotionValues[index],
                  y: yMotionValues[index],
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='fill-white stroke-slate-200 border-[1px] flex rounded-lg justify-center drop-shadow-md items-center'
              />
            );
          })}
        </g>
      </svg>

      <div className='flex-col mt-28 justify-center items-center w-full'>
        <h1 className='mx-auto rounded-lg border-b-2 border-darkBlue bg-background p-1 text-center items-center w-[650px] xl:w-[650px] 2xl:w-[850px] font-roboto-text text-5xl font-semibold justify-center text-darkBlue'>
          Start learning now with free community-made roadmaps
        </h1>
        <h2 className='mx-auto mt-4 text-center items-center w-[400px] xl:w-[500px] xl:text-2xl 2xl:w-[600px] 2xl:text-3xl text-secondary text-xl font-roboto-text font-normal'>
          Stop the confusing search and get an instant and clear curriculum for
          a specific topic
        </h2>
        <div className='mt-2 w-[500px] mx-auto gap-2 flex flex-row'>
          <motion.a
            type='button'
            href='/roadmaps/create'
            className='mx-auto mt-8 px-5 py-2 text-darkBlue bg-transparent rounded-lg shadow-md text-xl font-roboto-text font-semibold border-2 border-darkBlue'
            whileHover={{
              backgroundColor: '#1A1B50',
              color: '#fff',
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          >
            Create a roadmap
          </motion.a>
          <motion.a
            type='button'
            href='/explore'
            className='mx-auto mt-8 px-5 py-2 text-white bg-primary rounded-lg shadow-md text-xl font-roboto-text font-medium'
            whileHover={{
              backgroundColor: '#1A1B50',
              color: '#fff',
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          >
            Explore roadmaps
          </motion.a>
        </div>
        <MiddleSection />
        <BottomSection />
        <ScrollingElement />
      </div>
    </div>
  );
};

export default Home;
