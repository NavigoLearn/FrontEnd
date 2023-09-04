import React from 'react';
import ProfileDisplay from '@components/profile/old-stuff/mobile/ProfileDisplay';
import CardDisplay from '@components/profile/old-stuff/common/CardDisplay';

const MobileProfile = ({ id }: { id: string }) => {
  return (
    <div className='flex flex-col w-full h-full items-center my-24 text-center'>
      <ProfileDisplay id={id} />
      <div className='mt-20 w-full'>
        <CardDisplay />
      </div>
    </div>
  );
};

export default MobileProfile;
