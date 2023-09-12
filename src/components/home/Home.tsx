import { useCallback, useEffect, useRef } from 'react';
import useStateAndRef from '@hooks/useStateAndRef';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Home = () => {
  const [state, setState, stateRef] = useStateAndRef({ x: 0, y: 0 });
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const offsetLeft = divRef.current?.offsetLeft || 0;
    const offsetTop = divRef.current?.offsetTop || 0;

    objects.forEach((object, index) => {
      const x = (clientX - offsetLeft - 160) / 16 + object.x;
      const y = (clientY - offsetTop - 160) / 16 + object.y;
      xMotionValues[index].set(x);
      yMotionValues[index].set(y);
    });
  };

  const calculateSpringConfig = (x, y) => {
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 10;
    const damping = 1 * (distance / maxDistance);
    const stiffness = 1000 * (distance / maxDistance);

    return { damping, stiffness };
  };

  const divWidth = divRef.current ? divRef.current.offsetWidth : 0;
  const divHeight = divRef.current ? divRef.current.offsetHeight : 0;

  const numColumns = 7;
  const numRows = 4;
  const spacingX = 250;
  const spacingY = 250;

  const objects = [];
  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
      const x = columnIndex * spacingX + (Math.random() - 0.5) * 100;
      const y = rowIndex * spacingY + (Math.random() - 0.5) * 100;
      objects.push({ x, y });
    }
  }

  const xMotionValues = objects.map(() => useMotionValue(0));
  const yMotionValues = objects.map(() => useMotionValue(0));

  useEffect(() => {
    objects.forEach((object, index) => {
      xMotionValues[index].set(object.x);
      yMotionValues[index].set(object.y);
    });
  }, [objects, xMotionValues, yMotionValues]);

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
