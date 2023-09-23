import React from 'react';

type IProfilePageButtonProps = {
  name: string;
  callback: () => void;
  selected: boolean;
};
const ProfileButtonD = ({
  name,
  callback,
  selected,
}: IProfilePageButtonProps) => {
  return (
    <button
      type='button'
      onClick={() => {
        callback();
      }}
      className={`w-full pl-2 pr-6 py-1 monitor:pr-8 monitor:py-1.5 monitor:pl-2.5 monitor:text-lg relative font-roboto-text text-start bg-background ${
        selected
          ? 'font-medium bg-gray-100 text-darkBlue'
          : 'text-secondaryDarkBlue  hover:text-darkBlue'
      }`}
    >
      {name}
      {selected && (
        <hr className='h-full absolute right-0 w-[3px] bg-black top-0' />
      )}
    </button>
  );
};

export default ProfileButtonD;
