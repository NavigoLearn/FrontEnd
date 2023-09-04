import React, { useState } from 'react';
import { handleLogout } from '@components/auth/socialAuth';
import { motion } from 'framer-motion';

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
    <motion.nav>
      <motion.button
        whileTap={{
          scale: 0.9,
        }}
        onClick={handleAnimation}
      >
        <img
          draggable='false'
          src={profilePictureUrl}
          alt='icon'
          className='w-10 h-10 rounded-full flex m-1'
        />
      </motion.button>
    </motion.nav>
  );
};

export default ProfileDropdown;
