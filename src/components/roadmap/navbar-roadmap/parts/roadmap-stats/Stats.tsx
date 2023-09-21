import React from 'react';
import { useStore } from '@nanostores/react';
import roadmapStatistics, {
  getRoadmapLikes,
  getRoadmapViews,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-statistics';
import { getRoadmapId } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';
import UpvoteDownvote, {
  type VoteState,
} from '@components/explore/UI/shared/cards/components/UpvoteDownvote';

const VoteToVoteType = (vote: number) => {
  if (vote === 1) {
    return 'upvote';
  }
  if (vote === -1) {
    return 'downvote';
  }
  return 'none';
};

const Stats = () => {
  const { loaded, isLiked } = useStore(roadmapStatistics);
  const id = getRoadmapId();
  const views = getRoadmapViews();

  const voteState: VoteState = VoteToVoteType(isLiked);
  const intId = parseInt(id, 10);

  return (
    <div className='flex gap-6 items-center'>
      <section className='items-center gap-2 md:flex hidden'>
        <h3 className='font-roboto-text text-placeholder text-sm'>Views</h3>
        <h2 className='font-roboto-text text-placeholder font-medium text-sm'>
          {loaded ? views : '...'}
        </h2>
      </section>
      <section className='flex items-center gap-2'>
        {loaded ? (
          <UpvoteDownvote
            upvotes={getRoadmapLikes() - isLiked}
            voteState={voteState}
            roadmapId={intId}
          />
        ) : (
          '...'
        )}
      </section>
    </div>
  );
};

export default Stats;
