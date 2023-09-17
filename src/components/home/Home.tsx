import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';
import ScrollingElement from './ScrollingElement';

// Define a lerp function
const lerp = (current: number, target: number, speed: number): number => {
  return current + speed * (target - current);
};

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [pointerEvents, setPointerEvents] = useState('pointer-events-none');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollY > 1800) {
      setPointerEvents('pointer-events-auto');
    } else {
      setPointerEvents('pointer-events-none');
    }
  }, [scrollY]);

  const divRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // both necessary to not overlap the objects
  const SPACING_X = 150;
  const SPACING_Y = 150;

  const X_MIN = -200; // buffer area of 200px
  const Y_MIN = -200;
  const X_MAX = 2120; // 1920 + 200
  const Y_MAX = 1280; // 1080 + 200
  const RANDOM_OFFSET = 0.5;

  // create an array of objects with x and y coordinates
  const objects = [] as {
    targetX: number;
    targetY: number;
    sinOffset: number;
    cosOffset: number;
  }[];
  for (let x = X_MIN; x < X_MAX; x += SPACING_X) {
    for (let y = Y_MIN; y < Y_MAX; y += SPACING_Y) {
      const targetX = x + Math.random() * RANDOM_OFFSET * SPACING_X;
      const targetY = y + Math.random() * RANDOM_OFFSET * SPACING_Y;
      const sinOffset = Math.random() * Math.PI * 2; // Offset between 0 and 2π
      const cosOffset = Math.random() * Math.PI * 2;
      objects.push({ targetX, targetY, sinOffset, cosOffset });
    }
  }

  const xMotionValues = objects.map(() => useMotionValue(0));
  const yMotionValues = objects.map(() => useMotionValue(0));

  useEffect(() => {
    let animationFrameId = null;
    let TIME = 0;

    const animate = () => {
      // Calculate the distance from the center of the screen
      const SCREEN_CENTER_X = 1920 / 2;
      const SCREEN_CENTER_Y = 1080 / 2;

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
  const handleMouseMove = (e) => {
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
            r='50%'
            fx='50%'
            fy='50%'
          >
            <stop offset='60%' style={{ stopColor: 'white', stopOpacity: 1 }} />
            <stop
              offset='100%'
              style={{ stopColor: 'black', stopOpacity: 1 }}
            />
          </radialGradient>
          <mask id='mask'>
            <rect
              width='1920'
              height='1080'
              fill='url(#fadeout)'
              rx='200'
              ry='200'
            />
          </mask>
        </defs>

        {/* <rect mask='url(#mask)' x='0' y='0' width='100%' height='100%' />  debugging shit */}

        <g mask='url(#mask)' x='0' y='0' width='1920px' height='1080px'>
          {objects.map((object, index) => {
            return (
              <motion.rect
                key={index}
                x={xMotionValues[index]}
                y={yMotionValues[index]}
                style={{
                  width: '2rem',
                  height: '2rem',
                  x: xMotionValues[index],
                  y: yMotionValues[index],
                  rx: 4,
                  ry: 4,
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
        {scrollY > 800 && (
          <div className={`${pointerEvents}`}>
            <ScrollingElement />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
