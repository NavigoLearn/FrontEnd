import React, { useState } from 'react';
import { LinkM } from '@components/navbar/mobile/parts/buttons/ButtonsM';
import ProfilePicAndNameNavM from '../profileDataM/ProfilePicAndNameNavM';

const LoggedButtonsM = () => {
  return (
    <div className='flex flex-col gap-4 mt-6'>
      <ProfilePicAndNameNavM />
      <LinkM text='Explore' href='/roadmap/explore' imgsrc='explore' />
      <LinkM text='Home' href='/' imgsrc='home' />
    </div>
  );
};

export default LoggedButtonsM;
