import React, { useEffect, useState } from 'react';
import { LOUPE_SRC } from '@src/to-be-organized/svg-params';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { motion } from 'framer-motion';
import { setExploreQuery } from '@components/explore/stores/explore-query-store';

const SearchRoadmap = () => {
  const borderSrc = `border-2  rounded-md `;
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isExplorePage, setIsExplorePage] = useState(false);

  useEffect(() => {
    const isExplore = location.pathname.startsWith('/explore');
    setIsExplorePage(isExplore);

    if (!isExplore) return;
    try {
      setQuery(decodeURI(location.hash?.slice(1) || ''));
      setExploreQuery({ query });
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (isExplorePage) {
      setExploreQuery({ query });
    }
  }, [query]);

  const handleSubmit = () => {
    // if not on explore page, then redirect to explore page
    if (!isExplorePage) {
      location.href = `/explore#${encodeURI(query)}`;
    }
  };

  const handleBlur = () => {
    setIsOpen(false);
    setFocus(false);
  };

  // animation for the searchbox can be differt type, look at tailwindcss

  return (
    <motion.div className='w-[30vw] h-10 relative '>
      <motion.input
        animate={isOpen ? 'open' : 'closed'}
        onFocus={() => setFocus(true)}
        onBlur={handleBlur}
        onMouseDown={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
        className={`outline-none w-full h-full px-4 py-2 text-sm font-roboto-text bg-[#F4F4F5] text-darkBlue ${tailwindTransitionClass} ${
          query !== '' ? 'font-medium' : 'font-normal'
        }  ${borderSrc}  ${focus ? 'border-darkBlue ' : 'border-gray-200'}`}
        placeholder='Search for a roadmap'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <motion.button
        animate={isOpen ? 'open' : 'closed'}
        className={`w-10 bg-[#F4F4F5] h-full absolute -right-2 top-0 ${borderSrc} border-l-0 border-l-transparent rounded-l-none ${tailwindTransitionClass} flex justify-center items-center ${
          focus ? 'border-darkBlue ' : 'border-gray-200'
        }`}
        onClick={handleSubmit}
      >
        <motion.div className='w-5 h-5'>
          <motion.img
            className='w-full h-full '
            src={LOUPE_SRC}
            alt='search loupe'
          />
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default SearchRoadmap;
