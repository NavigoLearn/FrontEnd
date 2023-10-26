import React, { useRef } from 'react';

type IButtonProps = {
  name: string;
  callback: () => void;
  IconComponent: any;
};

const ButtonNavbarRoadmap = ({
  name,
  callback,
  IconComponent,
}: IButtonProps) => {
  const lineRef = useRef<HTMLDivElement | null>(null);

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <button
      onClick={() => {
        callback();
      }}
      className='flex pointer-events-auto items-center justify-center gap-2 hover:bg-gray-200 p-1'
    >
      <IconComponent size={22} />
      <span className='text-md font-medium font-roboto-text text-center inline-block transition-all '>
        {name}
      </span>
    </button>
  );
};

export default ButtonNavbarRoadmap;
