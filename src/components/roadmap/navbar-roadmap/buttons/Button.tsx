import React from 'react';

import { type INavbarRoadmapButton } from '@components/roadmap/navbar-roadmap/buttons/buttons-selector.ts';

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
