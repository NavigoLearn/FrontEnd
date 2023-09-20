import React, { useEffect } from 'react';

const useScreenLock = () => {
  useEffect(() => {
    // Function to handle the scroll event and prevent default behavior

    document.body.classList.add('h-screen');
    document.body.classList.add('overflow-y-clip');

    // Remove the event listener when the component unmounts
    return () => {
      document.body.classList.remove('h-screen');
      document.body.classList.add('overflow-y-clip');
    };
  }, []);
};

export default useScreenLock;
