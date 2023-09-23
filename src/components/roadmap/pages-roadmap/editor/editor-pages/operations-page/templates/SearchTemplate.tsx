import React, { useState } from 'react';
import { LOUPE_SRC } from '@src/to-be-organized/svg-params';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import {
  getSearchQuery,
  setSearchQuery,
} from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/stores/operations-store';

const SearchTemplate = () => {
  const [focus, setFocus] = useState(false);
  const borderSrc = `border-2  rounded-md `;
  const value = getSearchQuery();

  return (
    <div className='w-60 h-10 relative '>
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`outline-none w-full h-full px-4 py-2 text-sm font-roboto-text text-darkBlue ${tailwindTransitionClass} ${
          value !== '' ? 'font-medium' : 'font-normal'
        }  ${borderSrc}  ${
          focus ? 'border-darkBlue ' : 'border-placeholderBlack'
        }`}
        placeholder='Search for a template'
        value={value}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div
        className={`w-10 bg-white h-full absolute -right-2 top-0 ${borderSrc} border-l-0 border-l-transparent rounded-l-none ${tailwindTransitionClass} flex justify-center items-center ${
          focus ? 'border-darkBlue ' : 'border-placeholderBlack'
        }`}
      >
        <div className='w-5 h-5'>
          <img
            className='w-full h-full '
            src={LOUPE_SRC.src}
            alt='search loupe'
          />
        </div>
      </div>
    </div>
  );
};

export default SearchTemplate;
