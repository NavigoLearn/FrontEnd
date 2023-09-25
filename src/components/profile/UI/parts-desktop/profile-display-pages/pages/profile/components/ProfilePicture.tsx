import React from 'react';
import { EDIT_SRC } from '@src/to-be-organized/svg-params';

type IProfilePictureProps = {
  src: string;
};

const ProfilePicture = ({ src }: IProfilePictureProps) => {
  return (
    <section className='flex flex-col gap-1'>
      <span className='text-secondaryDarkBlue font-roboto-text text-lg'>
        Profile picture
      </span>
      <div className='w-28 h-28 relative'>
        <img
          alt='profile picture'
          className='w-full h-full rounded-full'
          src={src}
        />
        {/* <button
          type='button'
          onClick={() => {
            console.log('clicked edit profile picture button');
          }}
          className='absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex justify-center items-center border-[1.5px] border-placeholderBlack'
        >
          <img
            alt='edit profile picture button'
            className='w-7/12 h-7/12 '
            src={EDIT_SRC.src}
          />
        </button> */}
      </div>
    </section>
  );
};

export default ProfilePicture;
