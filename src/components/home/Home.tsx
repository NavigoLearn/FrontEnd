/* eslint-disable react/no-array-index-key */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';
import ScrollingElement from './ScrollingElement';

// Define a lerp function
const lerp = (current: number, target: number, speed: number): number => {
  return current + speed * (target - current);
};

const Home = () => {
  const divRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  // Calculate offsets based on screen dimensions
  const offsetX = screenWidth >= 1200 ? 50 : 200; // Adjust these values as needed
  const offsetY = screenHeight >= 800 ? -500 : -400; // Adjust these values as needed

  // actual animation "feel"
  const calculateSpringConfig = (x, y) => {
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 10;
    const damping = 0.2 * (distance / maxDistance);
    const stiffness = 1000 * (distance / maxDistance);

    return { damping, stiffness };
  };

  const numColumns = 20;
  const numRows = 9;
  // both necessary to not overlap the objects
  const spacingX = 200;
  const spacingY = 200;

  // create an array of objects with x and y coordinates
  const objects = [];
  for (let rowIndex = 0; rowIndex < numRows; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < numColumns; columnIndex += 1) {
      const x =
        columnIndex * spacingX + offsetX + (Math.random() - 0.5) * 100 - 400;
      const y =
        rowIndex * spacingY + offsetY + (Math.random() - 0.5) * 100 - 500;
      const sinOffset = Math.random() * Math.PI * 2; // Offset between 0 and 2π
      const cosOffset = Math.random() * Math.PI * 2;
      objects.push({ x, y, sinOffset, cosOffset });
    }
  }

  const xMotionValues = objects.map(() => useMotionValue(0));
  const yMotionValues = objects.map(() => useMotionValue(0));

  useEffect(() => {
    let animationFrameId = null;
    let time = 0;

    const animate = () => {
      // Calculate the distance from the center of the screen
      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;

      const { x, y } = mousePosition.current;
      const distanceX = x - screenCenterX;
      const distanceY = y - screenCenterY;

      objects.forEach((object, index) => {
        const floatingEffect = 20;
        const targetX = distanceX / 6 + object.x;
        const targetY =
          distanceY / 6 +
          object.y +
          Math.sin(object.sinOffset + time) * floatingEffect;

        const newx = lerp(xMotionValues[index].get(), targetX, 0.1);
        const newy = lerp(yMotionValues[index].get(), targetY, 0.1);

        xMotionValues[index].set(newx);
        yMotionValues[index].set(newy);
      });

      time += 0.01;
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

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      // Update screen dimensions when the window is resized
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
      };

      // Initial screen size
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []); // Empty dependency array to run this effect only once on mount

  useEffect(() => {
    objects.forEach((object, index) => {
      xMotionValues[index].set(object.x);
      yMotionValues[index].set(object.y);
    });

    // After the initial render, set the opacity to 1 for all objects
    objects.forEach((object, index) => {
      setTimeout(() => {
        xMotionValues[index].set(object.x);
        yMotionValues[index].set(object.y);
      }, index * 100); // You can adjust the delay duration as needed
    });
  }, [objects, xMotionValues, yMotionValues]);

  return (
    <div
      onMouseMove={handleMouseMove}
      className='max-w-screen h-full overflow-x-hidden flex relative'
    >
      <div
        className='bg-white items-center justify-center grid overflow-x-hidden h-[100vh] z-[-1] max-w-screen'
        ref={divRef}
      >
        {objects.map((object, index) => {
          const springConfig = calculateSpringConfig(object.x, object.y);
          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: xMotionValues[index],
                y: yMotionValues[index],
              }}
              animate={{
                opacity: 1,
                x: xMotionValues[index],
                y: yMotionValues[index],
              }}
              transition={{
                opacity: { duration: 0.5 },
                x: springConfig,
                y: springConfig,
              }}
              style={{
                width: '2rem',
                height: '2rem',
                x: xMotionValues[index],
                y: yMotionValues[index],
                position: 'absolute',
              }}
              className='bg-white border-[1px] border-gray-200 flex rounded-lg justify-center drop-shadow-md items-center opacity-10'
            />
          );
        })}
      </div>
      <div className='flex-col mt-28 justify-center items-center w-full'>
        <h1 className='mx-auto rounded-lg border-b-2 border-darkBlue bg-background p-1 text-center items-center w-[650px] xl:w-[650px] 2xl:w-[950px] font-roboto-text text-5xl 2xl:text-7xl font-semibold justify-center text-darkBlue'>
          Start learning now with free community-made roadmaps
        </h1>
        <h2 className='mx-auto mt-4 text-center items-center w-[400px] xl:w-[500px] xl:text-2xl 2xl:w-[600px] 2xl:text-3xl text-secondary text-xl font-roboto-text font-normal'>
          Stop the confusing search and get an instant and clear curriculum for
          a specific topic
        </h2>
        <div className='mt-2 w-[500px] mx-auto gap-2 flex flex-row'>
          <a
            type='button'
            href='/roadmaps/create'
            className='mx-auto mt-8 px-6 py-3 text-darkBlue bg-transparent rounded-lg shadow-md text-xl font-roboto-text font-semibold border-2 border-darkBlue'
          >
            Create a roadmap
          </a>
          <a
            type='button'
            href='/explore'
            className='mx-auto mt-8 px-6 py-3 text-white bg-primary rounded-lg shadow-md text-xl font-roboto-text font-medium'
          >
            Explore roadmaps
          </a>
        </div>
        <MiddleSection />
        <BottomSection />
        <ScrollingElement />
      </div>
    </div>
  );
};

export default Home;
