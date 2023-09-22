import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  exploreQueryStore,
  setExploreQuery,
} from '@src/components/explore/stores/explore-query-store';
import { useStore } from '@nanostores/react';
import { useTriggerRerender } from '@src/hooks/useTriggerRerender';
import dropclose from '@assets/cross.svg';
import AnimLoupe from '../animsvg/AnimLoupe';

const SearchRoadmapM = ({
  handleSearchClick,
}: {
  handleSearchClick: () => void;
}) => {
  const [inputExpanded, setInputExpanded] = useState(false);
  const controls = useAnimation();
  const [isExplorePage, setIsExplorePage] = useState(false);
  const { params } = useStore(exploreQueryStore);
  const { query } = params;

  const handleLoupeClick = (e) => {
    const LOUPE_WIDTH = 80;
    handleSearchClick();
    e.stopPropagation();
    setInputExpanded((prev) => !prev);
    if (inputExpanded) {
      controls.start({
        width: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        paddingBottom: '0px',
      });
    } else {
      // Expand the input to fill the remaining screen width minus loupe width
      const SCREEN_WIDTH = window.innerWidth;
      const NEW_WIDTH = `${SCREEN_WIDTH - LOUPE_WIDTH}px`;

      controls.start({
        width: NEW_WIDTH,
        paddingLeft: '8px',
        paddingRight: '28px', // Adjust for the 'x' button
        paddingTop: '2px',
        paddingBottom: '2px',
      });
    }
  };

  const rerender = useTriggerRerender();

  const handleClearSearch = (e) => {
    e.stopPropagation();
    setExploreQuery({ query: '' });
    rerender();
  };

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const isExplore = location.pathname.startsWith('/explore');
    setIsExplorePage(isExplore);

    if (!isExplore) return;
    try {
      // @ts-ignore
      // eslint-disable-next-line no-restricted-globals
      setExploreQuery(decodeURI(location.hash?.slice(1) || ''));
      setExploreQuery({ query });
      rerender();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSubmit = () => {
    // if not on explore page, then redirect to explore page
    if (!isExplorePage) {
      // eslint-disable-next-line no-restricted-globals
      location.href = `/explore#${encodeURI(query)}`;
    }
  };

  return (
    <div className='search-container'>
      <div className='relative flex flex-row gap-2 items-center mr-2'>
        <motion.input
          type='text'
          value={query}
          placeholder='Search for a roadmap'
          className={`bg-slate-200 rounded-md text-placeholderBlack font-roboto-text font-normal ${
            inputExpanded ? 'w-44' : 'w-0'
          }`}
          animate={controls}
          onSubmit={handleSubmit}
          onChange={(e) => {
            setExploreQuery({
              query: e.target.value,
            });
            rerender();
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        {inputExpanded &&
          query && ( // Show 'x' button only when input is expanded and there's a search query
            <button
              type='button'
              className='absolute right-12 text-slate-600 font-normal font-roboto-text text-md text-center'
              onClick={handleClearSearch}
            >
              <img src={dropclose.src} alt='close' className='w-3 h-3' />
            </button>
          )}
        <AnimLoupe
          clicked={inputExpanded}
          handleLoupeClick={handleLoupeClick}
        />
      </div>
    </div>
  );
};

export default SearchRoadmapM;
