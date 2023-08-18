import React, { useEffect, useState } from 'react';
import likeButton from '@assets/heart.svg';
import likeButtonFilled from '@assets/heartfill.svg';
import { CardType } from '@type/explore/card';
import RedirectToProfile from '@components/shared/RedirectToProfile';
import {
  likeCardFetch,
  unlikeCardFetch,
} from 'src/api-wrapper/explore/roadmap-likes';
import userStatus from '@store/user/user-status';

const Card = ({ cardStore }: { cardStore: CardType }) => {
  const { name, author, description, likes, id, authorId } = cardStore;
  const [isLoaded, setIsLoaded] = useState(false);
  const [likeCount, setLikeCount] = useState(Number(likes));
  const [heartClicked, setHeartClicked] = useState(false);
  const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

  useEffect(() => {
    setHeartClicked(cardStore.isLiked);
    setIsLoaded(true);
  }, []);

  async function like(bool: boolean) {
    if (!isLoaded) return;

    if (!userStatus.get().isLogged) {
      // redirect to login
      location.href = '/login';
      const a = 2;
      return;
    }

    if (bool) {
      setHeartClicked(true);
      setLikeCount((prev) => prev + 1);
      const result = await likeCardFetch(id);

      if (!result) {
        setHeartClicked(false);
        setLikeCount((prev) => prev - 1);
      }
    } else {
      setHeartClicked(false);
      setLikeCount((prev) => prev - 1);
      const result = await unlikeCardFetch(id);

      if (!result) {
        setHeartClicked(true);
        setLikeCount((prev) => prev + 1);
      }
    }
  }

  function abbreviateNumber(number: number): string | number {
    // handle 0 specifically
    if (number === 0) return 0;
    // what tier? (determines SI symbol)
    const tier = Math.floor(Math.log10(Math.abs(number)) / 3);
    // if zero, we don't need a suffix
    if (tier === 0) return number;
    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier];
    const scale = 10 ** (tier * 3);
    // scale the number
    const scaled = number / scale;
    // format number and add suffix
    return scaled.toFixed(1) + suffix;
  }

  return (
    <div className='bg-white w-72 sm:w-96 h-40 sm:h-52 relative shadow-standard rounded-lg 2xl:w-[460px] 2xl:h-64'>
      <div className='flex justify-start mt-3'>
        <h1 className='font-kanit-text sm:text-2xl 2xl:text-3xl text-lg ml-6 w-44 sm:w-64 2xl:w-[320px] truncate'>
          {name}
        </h1>
        <div className='font-roboto'>
          <div className='absolute top-3 right-1 text-[9px] sm:text-xs sm:pl-[83px] flex flex-col justify-center items-center text-placeholder 2xl:text-sm 2xl:pl-[102px]'>
            <div>made by</div>
            <RedirectToProfile redirectUserId={authorId}>
              <div className='text-blue-400  hover:text-blue-600 transition-all w-24 sm:w-28 2xl:w-[120px] truncate text-center'>
                {author}
              </div>
            </RedirectToProfile>
          </div>
        </div>
      </div>
      <div className='box-border h-[85px] w-full px-6 py-5 text-xs text-start sm:h-[120px] sm:text-sm sm:p-8 font-roboto-text text-secondary 2xl:h-36 2xl:text-base 2xl:py-10 2xl:px-9'>
        <p className='line-clamp-3'>{description}</p>
      </div>
      <div className='flex justify-center items-center relative 2xl:mt-3'>
        <a
          type='button'
          className='flex justify-center items-center bg-secondary w-20 h-7 text-white text-xs sm:w-24 sm:h-8 sm:text-sm rounded-lg font-roboto-text 2xl:text-base 2xl:w-28 2xl:h-9 select-none'
          href={`/roadmap/${id}`}
          rel='noreferrer'
        >
          Explore
        </a>
        <div className='absolute right-4 flex items-center justify-center flex-col -top-2'>
          <h1 className='text-[10px] sm:text-xs 2xl:text-sm'>
            {abbreviateNumber(likeCount)}
          </h1>
          <button
            type='button'
            className='select-none'
            onClick={() => like(!heartClicked)}
          >
            {heartClicked ? (
              <img
                draggable='false'
                src={likeButtonFilled}
                alt='heart'
                className='h-5 w-5 sm:h-6 sm:w-6 2xl:h-8 2xl:w-8'
              />
            ) : (
              <img
                draggable='false'
                src={likeButton}
                alt='heart'
                className='h-5 w-5 sm:h-6 sm:w-6 2xl:h-8 2xl:w-8'
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
