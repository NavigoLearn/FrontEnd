import React from 'react';
import logoSrc from '@assets/logo.svg';

const Logo = () => {
  return (
    <a
      href='/explore'
      className='justify-start cursor-pointer flex left-0 absolute'
    >
      <img
        draggable='false'
        className='w-20 ml-8 select-none '
        src={logoSrc.src}
        alt='navbar-logo'
      />
    </a>
  );
};

export default Logo;
