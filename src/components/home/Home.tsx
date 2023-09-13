/* eslint-disable react/no-array-index-key */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const Home = () => {
  const divRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  // Calculate offsets based on screen dimensions
  const offsetX = screenWidth >= 1200 ? 50 : 200; // Adjust these values as needed
  const offsetY = screenHeight >= 800 ? -500 : -400; // Adjust these values as needed

  console.log(screenWidth, screenHeight);
  console.log(offsetX, offsetY);

  // actual animation "feel"
  const calculateSpringConfig = (x, y) => {
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 10;
    const damping = 0.2 * (distance / maxDistance);
    const stiffness = 1000 * (distance / maxDistance);

    return { damping, stiffness };
  };

  const numColumns = 8;
  const numRows = 4;
  // both necessary to not overlap the objects
  const spacingX = 250;
  const spacingY = 250;

  // create an array of objects with x and y coordinates
  const objects = [];
  for (let rowIndex = 0; rowIndex < numRows; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < numColumns; columnIndex += 1) {
      const x = columnIndex * spacingX + offsetX + (Math.random() - 0.5) * 100;
      const y = rowIndex * spacingY + offsetY + (Math.random() - 0.5) * 100; // - value to start from the top
      objects.push({ x, y });
    }
  }

  const xMotionValues = objects.map(() => useMotionValue(0));
  const yMotionValues = objects.map(() => useMotionValue(0));

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

      console.log(
        'this are screen values initially',
        screenWidth,
        screenHeight
      );

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

  // animation logic
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const offsetLeft = divRef.current?.offsetLeft || 0;
    const offsetTop = divRef.current?.offsetTop || 0;

    objects.forEach((object, index) => {
      // divide by 16 to get rem values *better for screens with different sizes*
      const x = (clientX - offsetLeft - 160) / 16 + object.x;
      const y = (clientY - offsetTop - 160) / 16 + object.y;
      xMotionValues[index].set(x);
      yMotionValues[index].set(y);
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className='w-full h-[100vh] bg-white items-center justify-center grid grid-cols-7 grid-rows-4'
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
            className='bg-white border-2 border-gray-200 flex rounded-lg justify-center shadow-md items-center opacity-10'
          />
        );
      })}
    </div>
  );
};

export default Home;
