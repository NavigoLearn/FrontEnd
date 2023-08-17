import React from 'react';
// import Coords from '@reusable-components-page/roadmap/top-bar/Coords';
import Name from '@components/roadmap/top-bar/Name';
// import Error from '@reusable-components-page/roadmap/top-bar/Error';
// import Recenter from '@reusable-components-page/roadmap/top-bar/Recenter';

const TopBarRoadmap = () => {
  // !!! DO NOT TOUCH THE 40PX HEIGHT !!!
  return (
    <div className='w-full h-[40px] md:h-6 relative bg-blue-100 flex justify-center'>
      <div className='absolute md:left-0 w-full justify-center  h-full pl-2 '>
        {/* <Coords /> */}
      </div>
      <div className=' w-72  flex justify-center '>
        <Name />
        {/* <Recenter /> */}
      </div>
    </div>
  );
};

export default TopBarRoadmap;
