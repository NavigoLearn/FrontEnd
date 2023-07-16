import React from 'react';
import { IDisplayStyles } from '@store/roadmap-refactor/display/display-manager';

function getWrapperStyle(style: IDisplayStyles) {
  const rightWrapperStyle =
    'absolute md:shadow-standard top-0  md:top-2 md:mt-0  md:right-2 w-full h-full md:w-[500px] md:h-[97%] bg-white';
  const rightExtendedWrapperStyle =
    'absolute md:shadow-standard top-0 w-full h-full md:top-2 md:mt-0  md:right-2 md:w-1/2  md:left-1/2 md:h-[97%] bg-white';
  const fullScreenWrapperStyle =
    'absolute top-0 w-full h-[102%] md:h-full  bg-white';

  const displayStylesMapper = {
    right: rightWrapperStyle,
    rightExtended: rightExtendedWrapperStyle,
    fullScreen: fullScreenWrapperStyle,
  };
  return displayStylesMapper[style];
}

export function rightWrapper(Component) {
  const WrappedComponent = () => (
    <div className='absolute md:shadow-standard top-0  md:top-2 md:mt-0  md:right-2 w-full h-full md:w-[500px] md:h-[97%] bg-white'>
      <div className='h-full w-full'>
        <Component />
      </div>
    </div>
  );

  return WrappedComponent;
}
