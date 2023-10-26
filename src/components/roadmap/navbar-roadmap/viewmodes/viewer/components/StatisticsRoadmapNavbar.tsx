import React from 'react';
import UpvoteDownvote from '@components/explore/UI/shared/cards/components/UpvoteDownvote.tsx';
import roadmapStatistics, {
  getRoadmapViews,
  getRoadmapLikes,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-statistics.ts';
import { useStore } from '@nanostores/react';
import { getRoadmapId } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about.ts';

export type VoteState = 'upvote' | 'downvote' | 'none';

const VoteToVoteType = (vote: number) => {
  if (vote === 1) {
    return 'upvote';
  }
  if (vote === -1) {
    return 'downvote';
  }
  return 'none';
};

const StatisticsRoadmapNavbar = () => {
  const { loaded, isLiked } = useStore(roadmapStatistics);
  const id = getRoadmapId();
  const views = getRoadmapViews();

  const voteState: VoteState = VoteToVoteType(isLiked);
  const intId = parseInt(id, 10);
  return (
    <div className='px-2 py-1 flex items-center -translate-y-1 bg-white justify-center gap-3 border-2 border-gray-200'>
      <div className='flex items-center gap-1'>
        <span className='text-placeholder text-xs font-roboto-text'>
          Contributors
        </span>
        <div className='text-secondary font-roboto-text text-xs '>1</div>
      </div>
      <div className='flex items-center gap-1'>
        <span className='text-placeholder text-xs font-roboto-text'>Views</span>
        <div className='text-secondary font-roboto-text text-xs '>{views}</div>
      </div>
      <div className='flex items-center gap-1'>
        {loaded ? (
          <UpvoteDownvote
            upvotes={getRoadmapLikes() - isLiked}
            voteState={voteState}
            roadmapId={intId}
            size={18}
          />
        ) : (
          '...'
        )}
      </div>
    </div>
  );
};

export default StatisticsRoadmapNavbar;
