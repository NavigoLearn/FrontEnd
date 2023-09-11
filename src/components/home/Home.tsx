import React, { useCallback, useEffect, useRef } from 'react';
import useStateAndRef from '@hooks/useStateAndRef';

const Home = () => {
  const [state, setState, stateRef] = useStateAndRef(0);
  const divRef = useRef(null);

  const func = useCallback(() => {
    console.log('state', state);
  }, []);

  useEffect(() => {
    document.addEventListener('click', func);
  }, [state]);

  return (
    <div>
      <div
        ref={divRef}
        className='w-32 h-32 bg-red-400 '
        onClick={() => {
          setState((prev) => prev + 1);
        }}
      />
      home page
    </div>
  );
};

export default Home;
