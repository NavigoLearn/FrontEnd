import React from 'react';

type IButtonInsideGenericProps = {
  name: string;
  icon: string;
  onClick: () => void;
};

const ButtonInsideGeneric = ({
  name,
  icon,
  onClick,
}: IButtonInsideGenericProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        type='button'
        className='text-xl text-darkBlue font-medium font-roboto-text text-center flex justify-between items-center w-full h-full px-5'
      >
        {name}
        <img
          className='w-9 h-9'
          src={icon}
          alt='alt button for new components'
        />
      </button>
    </div>
  );
};

export default ButtonInsideGeneric;
