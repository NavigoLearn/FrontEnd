import React from 'react';
import BackArrow from '@components/roadmap/navbar-roadmap/parts/BackArrow';
import Title from '@components/roadmap/navbar-roadmap/parts/Title';

const NavbarRoadmap = () => {
  return (
    <div className='hidden md:block sticky top-0 z-[20]'>
      <nav className='bg-transparent relative flex w-full h-16 z-10  items-center transition-all  duration-300 select-none'>
        <BackArrow />
        <hr className='h-1/2 bg-gray-300 w-[1.5px] ml-3' />
        <Title />
      </nav>
    </div>
  );
};

export default NavbarRoadmap;
