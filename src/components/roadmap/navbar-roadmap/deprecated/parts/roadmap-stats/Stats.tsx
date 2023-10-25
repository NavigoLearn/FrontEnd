import React from 'react';
import { useStore } from '@nanostores/react';
import roadmapStatistics, {
  getRoadmapLikes,
  getRoadmapViews,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-statistics.ts';
import { getRoadmapId } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about.ts';
import UpvoteDownvote, {
  type VoteState,
} from '@components/explore/UI/shared/cards/components/UpvoteDownvote.tsx';

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
    <div className='flex gap-4 items-center'>
      <section className='items-center gap-2 md:flex hidden'>
        <h3 className='font-roboto-text text-placeholder text-sm'>Views</h3>
        <h2 className='font-roboto-text text-placeholder font-medium text-sm'>
          {loaded ? views : '...'}
        </h2>
      </section>
      <section className='flex items-center gap-2' />
    </div>
  );
};

export default Stats;
