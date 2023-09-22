import React from 'react';

import { type INavbarRoadmapButton } from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-selector';

type IButtonProps = {
  button: INavbarRoadmapButton;
};

const Button = ({ button }: IButtonProps) => {
  const { name, callback } = button;

  return (
    <div>
      <button
        type='button'
        onClick={() => {
          console.log('clicked', callback);
          callback();
        }}
        className='font-medium font-roboto-text text-darkBlue'
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
