import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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
  const originalParallaxNodes = generateObjects();
  const [parallaxNodes, setParallaxNodes] = useState(originalParallaxNodes);
  const viewCoords = useRef({ x: 0, y: 0 });

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
      setParallaxNodes(
        parallaxNodes.map((node) => {
          const floatingEffect = 25;

          const targetY =
            node.targetY + Math.sin(node.sinOffset + TIME) * floatingEffect;

          return {
            ...node,
            targetY,
          };
        })
      );

      TIME += 0.02;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    let animationFrameId = null;

    function animate() {
      // Calculate the distance from the center of the screen
      const [SCREEN_CENTER_X, SCREEN_CENTER_Y] = screenCenter();

      const { x, y } = mousePosition.current;
      const DISTANCE_X = ((x - SCREEN_CENTER_X) / SCREEN_CENTER_X) * 1920;
      const DISTANCE_Y = ((y - SCREEN_CENTER_Y) / SCREEN_CENTER_Y) * 1080;

      viewCoords.current = {
        x: lerp(viewCoords.current.x, DISTANCE_X / 10, 0.2),
        y: lerp(viewCoords.current.y, DISTANCE_Y / 10, 0.2),
      };

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [viewCoords]);

  // animation logic - update the mouse position
  const handleMouseMove = (e: MouseEvent) => {
    mousePosition.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className='overflow-x-hidden relative flex items-center justify-center'
    >
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
          {parallaxNodes.map((nodes) => {
            return (
              <rect
                key={uuidv4()}
                x={nodes.targetX}
                y={nodes.targetY}
                rx='4'
                ry='4'
                width='6rem'
                height='2rem'
                className='fill-white stroke-slate-200 border-[1px] flex rounded-lg justify-center drop-shadow-md items-center'
              />
            );
          })}
        </motion.g>
      </motion.svg>

      <div className='flex-col mt-28 justify-center items-center w-full'>
        <h1
          className='mx-auto bg-background p-1 rounded-xl text-center items-center w-[650px] xl:w-[650px] 2xl:w-[650px] font-roboto-text text-5xl font-semibold justify-center text-darkBlue'
          style={{
            boxShadow: '0px 0px 64px rgba(255, 255, 255, 1)',
          }}
        >
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
