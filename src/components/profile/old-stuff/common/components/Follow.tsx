import React from 'react';
import followers from '@assets/followers.svg';

const Follow = ({
  followerCount,
  followingCount,
}: {
  followerCount: number;
  followingCount: number;
}) => {
  return (
    <div className='flex gap-10 mt-6'>
      <div className='text-md font-normal text-center flex font-roboto-text'>
        <img draggable="false"
          src={followers}
          className='flex mx-4 w-6 h-6 select-none'
          alt='followersicon'
        />
        {followerCount}
        <div className='flex text-md text-placeholder mx-2 font-roboto-text'>
          follower{followerCount === 1 ? '' : 's'}
        </div>
      </div>
      <div className='text-md font-normal text-center flex font-roboto-text'>
        <img draggable="false"
          src={followers}
          className='flex mx-4 w-6 h-6 select-none'
          alt='followingicon'
        />
        {followingCount}
        <div className='flex text-md text-placeholder mx-2 font-roboto-text'>
          following
        </div>
      </div>
    </div>
  );
};

export default Follow;
