import React from 'react';
import ProfilePicAndNameM from '@src/components/profile/UI/parts-mobile/profile-preview/components/ProfilePicAndNameM';
import ButtonsM from './ButtonsM';

const ButtonsManagerM = ({ isLogged }: { isLogged: boolean }) => {
  return (
    <div className='flex flex-col ml-6 gap-4 mt-12'>
      {isLogged && <ProfilePicAndNameM />}
      <ButtonsM />
    </div>
  );
};

export default ButtonsManagerM;
