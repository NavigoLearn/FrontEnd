import React, { useCallback, useEffect, useRef } from 'react';
import useStateAndRef from '@hooks/useStateAndRef';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Home = () => {
  const [state, setState, stateRef] = useStateAndRef({ x: 0, y: 0 });
  const divRef = useRef(null);

  const func = useCallback(() => {
    console.log('state', state);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { offsetLeft, offsetTop } = divRef.current;
    const x = (clientX - offsetLeft - 160) / 16; // Divide by 16 to convert to rem
    const y = (clientY - offsetTop - 160) / 16; // Divide by 16 to convert to rem
    setState({ x, y });
  };

  useEffect(() => {
    document.addEventListener('click', func);
  }, [state]);

  const calculateSpringConfig = (x, y) => {
    // Calculate distance from the target (0, 0)
    const distance = Math.sqrt(x * x + y * y);

    // Adjust damping and stiffness based on the distance
    const maxDistance = 10; // Adjust this value as needed
    const damping = 5 + 10 * (distance / maxDistance); // Increase damping as distance increases
    const stiffness = 500 + 1000 * (distance / maxDistance); // Increase stiffness as distance increases

    return { damping, stiffness };
  };

  // Create MotionValue instances for x and y
  const xMotionValue = useMotionValue(0);
  const yMotionValue = useMotionValue(0);

  // Update MotionValue instances based on state
  useEffect(() => {
    xMotionValue.set(state.x);
    yMotionValue.set(state.y);
  }, [state, xMotionValue, yMotionValue]);

  // Calculate spring config based on distance from the target
  const springConfig = calculateSpringConfig(state.x, state.y);

  return (
    <div
      onMouseMove={handleMouseMove}
      className='w-full h-screen bg-slate-300 items-center justify-center grid grid-cols-7'
    >
      <motion.div
        initial={{ x: 0, y: 0 }}
        style={{
          width: '4rem',
          height: '4rem',
          x: xMotionValue,
          y: yMotionValue,
        }}
        ref={divRef}
        animate={{
          x: state.x,
          y: state.y,
        }}
        transition={springConfig}
        className='bg-red-400 flex justify-center items-center'
        onClick={() => {
          setState((prev) => ({ ...prev, x: prev.x + 1 }));
        }}
      />
      <motion.div
        initial={{ x: 0, y: 0 }}
        style={{
          width: '4rem',
          height: '4rem',
          x: xMotionValue,
          y: yMotionValue,
        }}
        ref={divRef}
        animate={{
          x: state.x,
          y: state.y,
        }}
        transition={springConfig}
        className='bg-red-400 flex justify-center items-center'
        onClick={() => {
          setState((prev) => ({ ...prev, x: prev.x + 1 }));
        }}
      />
      <motion.div
        initial={{ x: 0, y: 0 }}
        style={{
          width: '4rem',
          height: '4rem',
          x: xMotionValue,
          y: yMotionValue,
        }}
        ref={divRef}
        animate={{
          x: state.x,
          y: state.y,
        }}
        transition={springConfig}
        className='bg-red-400 flex justify-center items-center'
        onClick={() => {
          setState((prev) => ({ ...prev, x: prev.x + 1 }));
        }}
      />
      <motion.div
        initial={{ x: 0, y: 0 }}
        style={{
          width: '4rem',
          height: '4rem',
          x: xMotionValue,
          y: yMotionValue,
        }}
        ref={divRef}
        animate={{
          x: state.x,
          y: state.y,
        }}
        transition={springConfig}
        className='bg-red-400 flex justify-center items-center'
        onClick={() => {
          setState((prev) => ({ ...prev, x: prev.x + 1 }));
        }}
      />
      <motion.div
        initial={{ x: 0, y: 0 }}
        style={{
          width: '4rem',
          height: '4rem',
          x: xMotionValue,
          y: yMotionValue,
        }}
        ref={divRef}
        animate={{
          x: state.x,
          y: state.y,
        }}
        transition={springConfig}
        className='bg-red-400 flex justify-center items-center'
        onClick={() => {
          setState((prev) => ({ ...prev, x: prev.x + 1 }));
        }}
      />
      <motion.div
        initial={{ x: 0, y: 0 }}
        style={{
          width: '4rem',
          height: '4rem',
          x: xMotionValue,
          y: yMotionValue,
        }}
        ref={divRef}
        animate={{
          x: state.x,
          y: state.y,
        }}
        transition={springConfig}
        className='bg-red-400 flex justify-center items-center'
        onClick={() => {
          setState((prev) => ({ ...prev, x: prev.x + 1 }));
        }}
      />
    </div>
  );
};

export default Home;
