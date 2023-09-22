import React, { useState } from 'react';
import { LinkM } from '@components/navbar/mobile/parts/buttons/ButtonsM';
import ProfilePicAndNameM from '@src/components/profile/UI/parts-mobile/profile-preview/components/ProfilePicAndNameM';

const LoggedButtonsM = () => {
  return (
    <div className='flex flex-col gap-4 mt-12'>
      <ProfilePicAndNameM />
      <LinkM text='Explore' href='/roadmap/explore' imgsrc='explore' />
      <LinkM text='Home' href='/' imgsrc='home' />
    </div>
  );
};

export default LoggedButtonsM;
