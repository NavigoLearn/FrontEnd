import React, { useState } from 'react';
import { handleLogout } from '@components/auth/socialAuth';
import { motion } from 'framer-motion';

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -100 },
};

const ProfileDropdown = ({
  profilePictureUrl,
}: {
  profilePictureUrl: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleAnimation() {
    setIsOpen(!isOpen);
    console.log('isOpen?', isOpen);
  }

  return (
    <li className='flex relative group/wrapper w-12 h-12 mr-2'>
      <div className=' absolute top-0 flex group/wrapper w-10 h-20'>
        {/* <a className='' href='/profile'> */}
        <svg
          onClick={handleAnimation}
          className='w-10 h-10'
          viewBox='0 0 200 100'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          fill='#000000'
          stroke='#000000'
        >
          <g strokeWidth='0' />
          <g
            strokeLinecap='round'
            strokeLinejoin='round'
            stroke='#000000'
            strokeWidth='0.738'
          />
          <g>
            <g fill='none' fillRule='evenodd' id='Page-1' strokeWidth='0.00123'>
              <g fillRule='nonzero' id='iconprofile'>
                <path
                  d='M61.3,65.6 C79.3,65.6 93.9,51 93.9,33 C93.9,15 79.3,0.5 61.3,0.5 C43.3,0.5 28.7,15.1 28.7,33 C28.7,50.9 43.3,65.6 61.3,65.6 Z M61.3,9 C74.5,9 85.3,19.8 85.3,33 C85.3,46.2 74.5,57 61.3,57 C48.1,57 37.3,46.2 37.3,33 C37.3,19.8 48.1,9 61.3,9 Z'
                  fill='#000000'
                  id='body'
                />
                <path
                  d='M4.9,116.5 L118.1,116.5 C120.5,116.5 122.4,114.6 122.4,112.2 C122.4,89.7 104.1,71.3 81.5,71.3 L41.5,71.3 C19,71.3 0.6,89.6 0.6,112.2 C0.6,114.6 2.5,116.5 4.9,116.5 Z M41.5,79.9 L81.5,79.9 C97.9,79.9 111.4,92.1 113.5,107.9 L9.5,107.9 C11.6,92.2 25.1,79.9 41.5,79.9 Z'
                  fill='#000000'
                  id='head'
                />
              </g>
            </g>
          </g>
          <motion.line
            animate={isOpen ? 'open' : 'closed'}
            variants={variants}
            x1='110'
            y1='30'
            x2='200'
            y2='30'
            stroke='black'
            strokeWidth='10'
          />
          <motion.line
            animate={isOpen ? 'open' : 'closed'}
            variants={variants}
            x1='100'
            y1='60'
            x2='200'
            y2='60'
            stroke='black'
            strokeWidth='10'
          />
          <motion.line
            animate={isOpen ? 'open' : 'closed'}
            variants={variants}
            x1='130'
            y1='90'
            x2='200'
            y2='90'
            stroke='black'
            strokeWidth='10'
          />
        </svg>
        {/* <img
            draggable='false'
            src={profilePictureUrl}
            alt='icon'
            className='w-10 h-10 rounded-full flex m-1'
          /> */}
        {/* </a> */}
      </div>
    </li>
  );
};

export default ProfileDropdown;
