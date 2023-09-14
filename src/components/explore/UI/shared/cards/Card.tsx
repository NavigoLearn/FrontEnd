import React from 'react';
import UpvoteDownvote from '@components/explore/UI/shared/cards/components/UpvoteDownvote';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { CardRoadmapTypeApi } from '@type/explore/card';

type ICardProps = {
  data: CardRoadmapTypeApi;
};

// Usage
const Card = ({ data }: ICardProps) => {
  return (
    <div
      className={`w-80 h-48 border-2 border-black hover:border-primary hover:border-opacity-30 border-opacity-10 rounded-md relative${tailwindTransitionClass}`}
      style={{
        boxShadow: '0 4px 6px 0 rgba(0, 0, 255, 0.1)',
      }}
    >
      <section className='flex mt-3 items-center justify-between px-4'>
        <h1 className='text-lg font-roboto-text font-medium'>{data.name}</h1>
        <button
          type='button'
          onClick={() => {
            console.log('clicked and went to profile');
            location.href = `/profile/${data.userId}`;
          }}
          className=' flex gap-2 items-center'
        >
          <img
            alt='profilePicture'
            className='w-6 h-6 rounded-full'
            src={
              data.userAvatar ||
              'https://media.istockphoto.com/id/470100848/ro/vector/pictograma-profilului-masculin-alb%C4%83-pe-fundal-albastru.jpg?s=612x612&w=0&k=20&c=-We-8zY-Oj7MMSuKwpOEkm7QUX8Gnc4Bk0KcBIO8lYY='
            }
          />
        </button>
      </section>
      <span className='absolute top-14 w-full text-xs  pl-4 pr-2 text-secondary font-roboto-text'>
        {data.description}
      </span>

      <div className='absolute bottom-2 flex justify-between px-4 w-full pr-3'>
        <UpvoteDownvote
          upvotes={data.likeCount - data.isLiked}
          voteState={
            data.isLiked == -1
              ? 'downvote'
              : data.isLiked == 1
              ? 'upvote'
              : 'none'
          }
          roadmapId={data.id}
        />
        <button
          type='button'
          onClick={() => {
            const link = `/roadmap/${data.name
              .replace(/\s+/g, '-')
              .toLowerCase()
              .slice(0, 32)}-${data.id}`;

            console.log('clicked and went to roadmap ', link);
            location.href = link;
          }}
          className={`font-roboto-text text-primary px-3 py-1 rounded-sm text-sm font-medium bg-transparent hover:bg-primary hover:text-white ${tailwindTransitionClass}`}
        >
          Learn
        </button>
      </div>
    </div>
  );
};

export default Card;
