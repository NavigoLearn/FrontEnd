import React from 'react';
import ProfilePicAndNamePlaceholderM from '../temptesting/ProfilePicAndNamePlaceholderM';
import ButtonsM from './ButtonsM';

const ButtonsManagerM = ({ isLogged }: { isLogged: boolean }) => {
  return (
    <div className='flex flex-col ml-6 gap-4 mt-12'>
      {isLogged && <ProfilePicAndNamePlaceholderM />}
      <ButtonsM />
    </div>
  );
};

export default ButtonsManagerM;
