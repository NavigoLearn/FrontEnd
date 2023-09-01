import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import loupe from '@assets/loupe.svg';
// import warn from '@assets/warningErr.webp';
import chevroleftduo from '@assets/chevron-left-duo.svg';
import chevronrightduo from '@assets/chevron-right-duo.svg';
import chevronleft from '@assets/chevron-left.svg';
import chevronright from '@assets/chevron-right.svg';
import cardsFromApi, {
  setRoadmapCardsFromApiExplore,
} from '@store/explore/card_store_explore';
// import FilterAugD from './filterhoc/FilterAugD';
import EmptyCard from '@components/explore/old-shit/EmptyCard';
import erase from '@assets/cross.svg';
import Card from '../Card';

const ExploreDesktop = () => {
  const [query, setQuery] = useState('');
  const [render, setRender] = useState(false);
  const [pageNr, setPageNr] = useState(1);
  const [isSafari, setIsSafari] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const { cards, ids } = cardsFromApi.get();
  const cardCount = ids.length;
  const disabledRight = pageNr >= maxPage;
  const disabledLeft = pageNr <= 1;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setRoadmapCardsFromApiExplore(query, 1).then(({ pageCount }) => {
      setRender((prev) => !prev);
      setMaxPage(pageCount);
    });
  };

  useEffect(() => {
    setIsSafari(
      navigator.userAgent.indexOf('Safari') !== -1 &&
        navigator.userAgent.indexOf('Chrome') === -1
    );

    setRoadmapCardsFromApiExplore('', 1).then(({ pageCount }) => {
      setRender((prev) => !prev);
      setMaxPage(pageCount);
      setLoaded(true);
    });
  }, []);
  // const CompFilter = AugmentComp(UIButton, UIDropdown);

  useEffect(() => {
    if (loaded) {
      setRoadmapCardsFromApiExplore(query, pageNr).then(({ pageCount }) => {
        setRender((prev) => !prev);
        setMaxPage(pageCount);
      });
    }
  }, [pageNr]);

  return (
    <div>
      <form
        action='submit'
        className={`flex justify-center ${
          isSafari ? 'mt-44' : 'mt-24'
        } select-none`}
        onSubmit={handleSubmit}
      >
        <div className={`relative ${isSafari ? 'mt-32' : ''}`}>
          <input
            value={query}
            onChange={({ target }) => setQuery(target.value)}
            type='text'
            placeholder='Search for a roadmap'
            className='h-[75px] w-[765px] bg-white z-10 rounded-full shadow-standard pl-20 text-2xl placeholder:font-roboto-text pb-[2px] focus:outline-none 2xl:w-[1000px]'
          />
          <img
            draggable='false'
            src={loupe}
            alt='LoupeSearch'
            className='absolute top-6 w-8 h-8 left-5'
          />
          {query && (
            <button
              type='button'
              className='absolute right-[3%] top-[33%] font-roboto-text'
              onClick={() => setQuery('')}
            >
              <img src={erase} alt='eraseButton' className='h-6 w-6' />
            </button>
          )}
        </div>
      </form>

      <div className='flex justify-center items-center mt-16 '>
        <ul className='grid grid-cols-2 gap-x-9 gap-y-11 xl:grid-cols-3'>
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
            onClick={() => {
              setPageNr(1);
            }}
            disabled={disabledLeft}
          >
            <img
              draggable='false'
              src={chevroleftduo}
              alt='doubleArrowLeft'
              className='w-8 h-8 2xl:w-9 2xl:h-9'
            />
          </button>
          <button
            type='button'
            className='disabled:opacity-50'
            onClick={() => {
              setPageNr((prev) => prev - 1);
            }}
            disabled={disabledLeft}
          >
            <img
              draggable='false'
              src={chevronleft}
              alt='ArrowLeft'
              className='w-9 h-9 2xl:w-11 2xl:h-11'
            />
          </button>
          <span className='text-xl 2xl:text-2xl select-auto'>{pageNr}</span>
          <button
            type='button'
            className='disabled:opacity-50'
            onClick={() => {
              setPageNr((prev) => prev + 1);
            }}
            disabled={disabledRight}
          >
            <img
              draggable='false'
              src={chevronright}
              alt='ArrowRight'
              className='w-9 h-9 2xl:w-11 2xl:h-11'
            />
          </button>
          <button
            type='button'
            className='disabled:opacity-50'
            onClick={() => {
              setPageNr(maxPage);
            }}
            disabled={disabledRight}
          >
            <img
              draggable='false'
              src={chevronrightduo}
              alt='doubleArrowRight'
              className='w-8 h-8 2xl:w-9 2xl:h-9'
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default ExploreDesktop;

{
  /* <FilterAugD />

      <div className='bg-background h-20 w-full -mt-20 opacity-75 relative flex justify-center items-center 2xl:h-24 2xl:-mt-24'>
        <div className='w-full bg-background h-7 2xl:h-8 flex justify-center items-center absolute'>
          <div className='bg-red-100 w-96 h-full flex justify-center items-center text-opacity-40 text-sm border-2 border-red-700 border-opacity-50 rounded-md relative 2xl:text-core 2xl:w-[420px]'>
            <img
              draggable='false'
              src={warn}
              alt='postBetWarning'
              className='w-5 h-5 absolute left-1 select-none '
            />
            Filters will be added post beta default: Likes.
          </div>
        </div>
      </div> */
}
