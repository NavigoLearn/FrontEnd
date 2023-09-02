import React, { useState } from 'react';
import UpvoteSvg from '@components/explore/UI/shared/cards/components/UpvoteSvg';

type IUpvoteDownvoteProps = {
  upvotes: number;
  voteState: 'upvote' | 'downvote' | 'none';
};
const UpvoteDownvote = ({ upvotes, voteState }: IUpvoteDownvoteProps) => {
  const [clickedRight, setClickedRight] = useState(false);
  const [clickedLeft, setClickedLeft] = useState(false);
  return (
    <div className='flex items-center'>
      <UpvoteSvg
        size={27}
        voted={clickedRight}
        upvote
        callback={(isUpvote) => {
          setClickedRight((prev) => !prev);
        }}
      />
      <UpvoteSvg
        size={27}
        voted={clickedLeft}
        upvote={false}
        callback={() => {
          setClickedLeft((prev) => !prev);
        }}
      />

      <span className='text-darkBlue font-semibold text-md font-roboto-text ml-2'>
        {upvotes}
      </span>
    </div>
  );
};

export default UpvoteDownvote;
