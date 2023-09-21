import React from 'react';
import { LOUPE_SRC } from '@src/to-be-organized/svg-params';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import AnimLoupe from '../animsvg/AnimLoupe';

const defaultProps = {
  clicked: false,
};

const SearchRoadmapM = ({ clicked }: { clicked?: boolean }) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='w-8 h-8 flex justify-center items-center my-auto'>
        <AnimLoupe clicked={clicked} />
      </div>
    </div>
  );
};

SearchRoadmapM.defaultProps = defaultProps;

export default SearchRoadmapM;
