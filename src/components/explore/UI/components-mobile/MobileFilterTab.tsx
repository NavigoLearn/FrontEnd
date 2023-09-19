import React, { useEffect } from 'react';

type Props = {
  toggleFilter: () => void;
};

const MobileFilterTab = ({ toggleFilter }: Props) => {
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

  return (
    <div className='bg-[#1A1B504D] top-0 left-0 z-50 flex justify-center items-center w-screen h-screen fixed'>
      dog
    </div>
  );
};

export default MobileFilterTab;
