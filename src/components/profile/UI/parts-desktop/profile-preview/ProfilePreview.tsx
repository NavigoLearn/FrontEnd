import React from 'react';
import HumanSvg from '@components/profile/UI/parts-desktop/profile-preview/components/HumanSvg';

const ProfilePreview = () => {
  return (
    <div className='relative flex items-center gap-3'>
      <section>
        <img />
        <div className='rounded-full w-8 h-8 monitor:w-10 monitor:h-10 bg-gray-300' />
      </section>
      <span className='font-kanit-text text-lg monitor:text-xl'>
        Erupturatis
      </span>
      <HumanSvg size={18} opacity={0.7} />
      <hr className='h-6 bg-gray-300 w-[1px]' />
      <span className='font-roboto-text text-placeholder monitor:text-lg ml-2'>
        Followers
      </span>
      <span className='font-roboto-text text-darkBlue monitor:text-lg  font-medium'>
        220
      </span>
      <span className='font-roboto-text text-placeholder monitor:text-lg  ml-4'>
        Following
      </span>
      <span className='font-roboto-text text-darkBlue monitor:text-lg  font-medium'>
        321
      </span>
    </div>
  );
};

export default ProfilePreview;
