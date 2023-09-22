import React from 'react';
import ProfilePicAndNameNavM from '@src/components/navbar/mobile/parts/profileDataM/ProfilePicAndNameNavM';
import ButtonsM from './ButtonsM';

const ButtonsManagerM = ({ isLogged }: { isLogged: boolean }) => {
  return (
    <div className='flex flex-col ml-6 gap-4 mt-12'>
      {isLogged && <ProfilePicAndNameNavM />}
      <ButtonsM isLogged={isLogged} />
    </div>
  );
};

export default ButtonsManagerM;
