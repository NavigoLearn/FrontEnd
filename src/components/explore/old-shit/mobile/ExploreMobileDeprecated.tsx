import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import loupe from '@assets/loupe.svg';
import chevroleftduo from '@assets/chevron-left-duo.svg';
import chevronrightduo from '@assets/chevron-right-duo.svg';
import chevronleft from '@assets/chevron-left.svg';
import chevronright from '@assets/chevron-right.svg';
// import Cookies from '@reusable-components-page/explore/mobile/cookies/Cookies';
import cardsFromApi, {
  setRoadmapCardsFromApiExplore,
} from '@store/explore/card_store_explore';
import EmptyCard from '@components/explore/old-shit/EmptyCard';
import erase from '@assets/cross.svg';
import SortBy from './SortBy';
// import Filter from './Filter';
import FilterAug from './FilterManager';
import Card from '../Card';

const SearchMobile = () => {
  const [clickFilter, setClickFilter] = useState(false);
  const [clickSort, setClickSort] = useState(false);
  const [render, setRender] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [pageNr, setPageNr] = useState(1);
  const [query, setQuery] = useState('');
  const [maxPage, setMaxPage] = useState(1);
  const { cards, ids } = cardsFromApi.get();
  const cardCount = ids.length;
  const disabledRight = pageNr >= maxPage;

  const disabledLeft = pageNr <= 1;

  useEffect(() => {
    setRoadmapCardsFromApiExplore('', 1).then(({ pageCount }) => {
      setRender((prev) => !prev);
      setMaxPage(pageCount);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) {
      setRoadmapCardsFromApiExplore(query, pageNr).then(({ pageCount }) => {
        setRender((prev) => !prev);
        setMaxPage(pageCount);
      });
    }
  }, [pageNr]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setRoadmapCardsFromApiExplore(query, 1).then(({ pageCount }) => {
      setRender((prev) => !prev);
      setMaxPage(pageCount);
    });
  };

  const handleClick = (stateVar: 'sort' | 'filter') => {
    if (stateVar === 'sort') {
      setClickSort((prev) => !prev);
    } else if (stateVar === 'filter') {
      setClickFilter((prev) => !prev);
    }

    // const body = document.querySelector('body');
    // if (stateVar === 'filter' && clickFilter) {
    //   body.style.overflow = 'auto';
    // } else if (stateVar === 'sort' && clickSort) {
    //   body.style.overflow = 'auto';
    // } else {
    //   body.style.overflow = 'hidden';
    // }
  };

  return (
    <div>
      {/* <Cookies /> */}
      <div>{clickFilter && <FilterAug handleClick={handleClick} />}</div>
      <div>{clickSort && <SortBy handleClick={handleClick} />}</div>
      <form
        className='flex justify-center items-center mt-9 sm:mt-12 select-none'
        action='submit'
        onSubmit={handleSubmit}
      >
        <div className='relative'>
          <input
            value={query}
            onChange={({ target }) => setQuery(target.value)}
            type='text'
            className='rounded-full w-[273px] h-10 placeholder: text-[14px] pl-10 font-roboto-text outline-none shadow-standard sm:w-[375px] sm:h-12'
            placeholder='Search for a roadmap_static'
          />
          <img
            draggable='false'
            src={loupe}
            alt='searchIcon'
            className='absolute left-3 top-3 sm:top-[14px]'
          />
          {query && (
            <button
              type='button'
              className='absolute right-[5%] top-[30%] font-roboto-text'
              onClick={() => setQuery('')}
            >
              <img src={erase} alt='eraseButton' className='h-4 w-4' />
            </button>
          )}
        </div>
      </form>

      <div className='mt-10 sm:mt-12'>
        <ul className='flex flex-col gap-7 sm:gap-9'>
          {/* {loaded */}
          {/*  ? Object.keys(cardStore) */}
          {/*      .sort((a, b) => { */}
          {/*        return cardStore[b].likes - cardStore[a].likes; */}
          {/*      }) */}
          {/*      .map((card: string) => ( */}
          {/*        <div key={card} className='flex items-center justify-center'> */}
          {/*          <Card cardStore={cardStore[card]} /> */}
          {/*        </div> */}
          {/*      )) */}
          {/*  : new Array(12).fill(0).map((_, i) => ( */}
          {/*      <div className='flex items-center justify-center'> */}
          {/*        <EmptyCard /> */}
          {/*      </div> */}
          {/*    ))} */}

          {loaded &&
            ids.map((id) => {
              return (
                <div key={id} className='flex items-center justify-center'>
                  <Card cardStore={cards[id]} />
                </div>
              );
            })}

          {!loaded &&
            new Array(12).fill(0).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={uuidv4()} className='flex items-center justify-center'>
                <EmptyCard />
              </div>
            ))}
        </ul>
      </div>

      {cardCount === 0 && loaded ? (
        <div className='flex items-center justify-center text-center font-kanit-text text-3xl text-secondary'>
          Oops! Seems like someone ate all the roadmaps!
        </div>
      ) : (
        <div className='flex justify-center items-center my-8 select-none'>
          <button
            type='button'
            className='disabled:opacity-50'
            onClick={() => setPageNr(1)}
            disabled={disabledLeft}
          >
            <img
              draggable='false'
              src={chevroleftduo}
              alt='doubleArrowLeft'
              className='w-5 h-5 sm:w-7 sm:h-7'
            />
          </button>
          <button
            type='button'
            className='disabled:opacity-50'
            onClick={() => setPageNr((prev) => prev - 1)}
            disabled={disabledLeft}
          >
            <img
              draggable='false'
              src={chevronleft}
              alt='ArrowLeft'
              className='w-6 h-6 sm:w-8 sm:h-8'
            />
          </button>
          <span className='select-all'>{pageNr}</span>
          <button
            type='button'
            className='disabled:opacity-50'
            onClick={() => setPageNr((prev) => prev + 1)}
            disabled={disabledRight}
          >
            <img
              draggable='false'
              src={chevronright}
              alt='ArrowRight'
              className='w-6 h-6 sm:w-8 sm:h-8'
            />
          </button>
          <button
            type='button'
            className='disabled:opacity-50'
            onClick={() => setPageNr(maxPage)}
            disabled={disabledRight}
          >
            <img
              draggable='false'
              src={chevronrightduo}
              alt='doubleArrowRight'
              className='w-5 h-5 sm:w-8 sm:h-8'
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchMobile;

{
  /* <div className='flex justify-center items-center space-x-12 mt-7 sm:mt-9 select-none'>
        <button type='button' onClick={() => handleClick('filter')}>
          <div className='bg-primary flex justify-center items-center shadow-standard rounded-lg w-[90px] text-white h-[30px] sm:w-[122px] sm:h-[42px]'>
            <img
              draggable='false'
              src={filter}
              alt='filterButton'
              className='inline-block h-4 w-4 sm:h-5 sm:w-5'
            />
            <span className='font-roboto-text inline-block ml-[6px] text-[13px] sm:text-[16px] sm:ml-[8px]'>
              Filter
            </span>
          </div>
        </button>
        <button type='button' onClick={() => handleClick('sort')}>
          <div className='bg-primary flex justify-center items-center shadow-standard rounded-lg w-[90px] text-white h-[30px] sm:w-[122px] sm:h-[42px]'>
            <img
              draggable='false'
              src={sort}
              alt='filterButton'
              className='inline-block h-4 w-4'
            />
            <span className='font-roboto-text inline-block ml-[6px] text-[13px] sm:text-[16px] sm:ml-[8px]'>
              Sort By
            </span>
          </div>
        </button>
      </div>

      <div className='bg-background w-full h-10 justify-center flex items-center -mt-9 relative opacity-75 sm:h-12 sm:-mt-12'>
        <div className='w-full h-5 bg-red-100 text-xs flex justify-center items-center border border-red-700 sm:text-sm sm:h-6'>
          <img
            draggable='false'
            src={warn}
            alt='warnForMobile'
            className='h-4 w-4 mr-2 sm:h-5 sm:w-5 select-none'
          />
          Filters will be added post beta default: Likes.
        </div>
      </div> */
}
