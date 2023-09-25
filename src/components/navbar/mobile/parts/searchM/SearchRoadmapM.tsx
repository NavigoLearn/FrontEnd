import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useStore } from '@nanostores/react';
import dropclose from '@assets/cross.svg';
import { searchLogicStore, actions } from './searchHooks/search-logic-store';
import AnimLoupe from '../animsvg/AnimLoupe';

const SearchRoadmapM = () => {
  const { focus, query, inputExpanded } = useStore(searchLogicStore);

  const controls = useAnimation();

  useEffect(() => {
    actions.setControls(controls);
  }, [controls, actions.setControls]);

  const handleBlur = () => {
    actions.setFocus(false);
  };

  const handleClearSearch = () => {
    actions.setQuery('');
  };

  const handleSubmit = () => {
    if (typeof window !== 'undefined') {
      const isExplorePage = window.location.href.includes('/explore');
      console.log(isExplorePage);
      actions.handleSubmit(isExplorePage, query);
    }
  };

  return (
    <div className='search-container'>
      <div className='relative flex flex-row gap-2 items-center mr-2'>
        <motion.input
          onFocus={() => actions.setFocus(true)}
          onBlur={handleBlur}
          type='text'
          value={query}
          placeholder='Search for a roadmap'
          className={`bg-slate-200 rounded-sm font-roboto-text transition-all duration-200 outline-none ${
            inputExpanded ? 'w-44' : 'w-0'
          } ${focus ? 'border-darkBlue' : 'border-slate-200'} ${
            query
              ? 'text-darkBlue font-medium'
              : 'text-placeholderBlack font-normal'
          }`}
          animate={controls}
          onSubmit={handleSubmit}
          onChange={(e) => {
            actions.setQuery(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        {inputExpanded && query && (
          <button
            type='button'
            className='absolute right-10 text-slate-600 font-normal font-roboto-text text-md text-center'
            onClick={handleClearSearch}
          >
            <img src={dropclose.src} alt='close' className='w-3 h-3' />
          </button>
        )}
        <AnimLoupe handleLoupeClick={() => actions.handleLoupeClick()} />
      </div>
    </div>
  );
};

export default SearchRoadmapM;
