import React from 'react';
import {
  setToggleToolTip,
  getToggleToolTip,
  toggleToolTip,
} from '@src/to-be-organized/node-rendering-stuff/store-tooltip.ts';
import { useStore } from '@nanostores/react';

const TooltipToggle = () => {
  useStore(toggleToolTip);
  const tooltip = getToggleToolTip();

  return (
    <button
      type='button'
      className={`w-24 mt-1 text-start font-roboto-text text-md pointer-events-auto hover:text-primary ${
        tooltip ? 'text-green-700' : 'text-secondary'
      }`}
      onClick={() => {
        setToggleToolTip(!tooltip);
      }}
    >
      tooltip {tooltip ? 'on' : 'off'}
    </button>
  );
};

export default TooltipToggle;
