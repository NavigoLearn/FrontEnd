import React from 'react';

type IProps = {
  text: string;
  value: number;
};
const FollowersM = ({ text, value }: IProps) => {
  return (
    <div className='relative'>
      <div className='flex justify-center flex-col items-center gap-0 '>
        <div className='text-md font-roboto-text font-medium w-full text-center'>
          {value}
        </div>
        <div className='text-sm font-roboto-text text-placeholder w-full'>
          {text}
        </div>
      </div>
    </div>
  );
};

export default FollowersM;
