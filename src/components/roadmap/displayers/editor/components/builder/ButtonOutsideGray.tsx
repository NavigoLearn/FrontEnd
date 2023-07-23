import React from 'react';

type IButtonOutsideGrayProps = {
  children: React.ReactNode;
};
const ButtonOutsideGray = ({ children }: IButtonOutsideGrayProps) => {
  return (
    <div className='relative w-full h-16 rounded-lg bg-gray-200'>
      {children}
    </div>
  );
};

export default ButtonOutsideGray;
