import { useCallback, useEffect, useRef } from 'react';
import useStateAndRef from '@hooks/useStateAndRef';
import { motion, useMotionValue } from 'framer-motion';

const Home = () => {
  const [state, setState, stateRef] = useStateAndRef({ x: 0, y: 0 });
  const divRef = useRef(null);

  const func = useCallback(() => {
    console.log('state', state);
  }, [state]);

  useEffect(() => {
    document.addEventListener('click', func);

    return () => {
      document.removeEventListener('click', func);
    };
  }, [func]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const offsetLeft = divRef.current?.offsetLeft || 0;
    const offsetTop = divRef.current?.offsetTop || 0;
    const x = (clientX - offsetLeft - 160) / 16; // Divide by 16 to convert to rem
    const y = (clientY - offsetTop - 160) / 16; // Divide by 16 to convert to rem
    setState({ x, y });
  };

  const calculateSpringConfig = (x, y) => {
    // Calculate distance from the target (0, 0)
    const distance = Math.sqrt(x * x + y * y);

    // Adjust damping and stiffness based on the distance
    const maxDistance = 10; // Adjust this value as needed
    const damping = 1 * (distance / maxDistance); // Increase damping as distance increases
    const stiffness = 1000 * (distance / maxDistance); // Increase stiffness as distance increases

    return { damping, stiffness };
  };

  const divWidth = divRef.current ? divRef.current.offsetWidth : 0;
  const divHeight = divRef.current ? divRef.current.offsetHeight : 0;

  // Create an array of objects with initial positions
  const numColumns = 7; // Adjust the number of columns as needed
  const numRows = 4; // Adjust the number of rows as needed
  const spacingX = 250; // Adjust the horizontal spacing between objects as needed
  const spacingY = 250; // Adjust the vertical spacing between objects as needed

  const objects = [];
  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
      const x = columnIndex * spacingX;
      const y = rowIndex * spacingY;
      objects.push({ x, y });
    }
  }

  // Create MotionValue instances for x and y for each object
  const xMotionValues = objects.map(() => useMotionValue(0));
  const yMotionValues = objects.map(() => useMotionValue(0));

  useEffect(() => {
    // Update MotionValue instances based on object positions and maintain position
    objects.forEach((object, index) => {
      xMotionValues[index].set(object.x + state.x);
      yMotionValues[index].set(object.y + state.y);
    });
  }, [objects, xMotionValues, yMotionValues, state]);

  return (
    <div
      onMouseMove={handleMouseMove}
      className='w-full h-96 bg-slate-300 items-center justify-center grid grid-cols-7 grid-rows-4'
      ref={divRef}
    >
      {objects.map((object, index) => {
        const springConfig = calculateSpringConfig(object.x, object.y);
        return (
          <motion.div
            key={index}
            initial={false}
            style={{
              width: '4rem',
              height: '4rem',
              x: xMotionValues[index],
              y: yMotionValues[index],
              position: 'absolute',
            }}
            animate={{
              x: xMotionValues[index],
              y: yMotionValues[index],
            }}
            transition={springConfig}
            className='bg-red-400 flex justify-center items-center'
          />
        );
      })}
    </div>
  );
};

export default Home;