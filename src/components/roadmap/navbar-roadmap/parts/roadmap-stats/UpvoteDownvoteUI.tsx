import React from 'react';
import UpvoteSvg from '@components/explore/UI/shared/cards/components/UpvoteSvg';

type IUpvoteDownvoteUIProps = {
  upvotes: number;
  voteState: 'upvote' | 'downvote' | 'none';
  upvoteCallback: () => void;
  downvoteCallback: () => void;
  removeVoteCallback: () => void;
};

const UpvoteDownvoteUI = ({
  upvotes,
  voteState,
  upvoteCallback,
  downvoteCallback,
  removeVoteCallback,
}: IUpvoteDownvoteUIProps) => {
  const upvote = voteState === 'upvote';
  const downvote = voteState === 'downvote';

  console.log('upvote', upvote);
  console.log('downvote', downvote);

  return (
    <div className='flex items-center'>
      <UpvoteSvg
        size={20}
        voted={upvote}
        upvote
        callback={() => {
          if (upvote) {
            removeVoteCallback();
          } else {
            upvoteCallback();
          }
        }}
      />
      <UpvoteSvg
        size={20}
        voted={downvote}
        upvote={false}
        callback={() => {
          if (downvote) {
            removeVoteCallback();
          } else {
            downvoteCallback();
          }
        }}
      />

      <span className='text-darkBlue text-sm font-roboto-text ml-2'>
        {upvotes}
      </span>
    </div>
  );
};

export default UpvoteDownvoteUI;
