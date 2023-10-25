import React from 'react';
import { useStore } from '@nanostores/react';
import storeRoadmapAbout, {
  getRoadmapId,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about.ts';
import roadmapStatistics, {
  getRoadmapViews,
  getRoadmapLikes,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-statistics.ts';
import UpvoteDownvote from '@components/explore/UI/shared/cards/components/UpvoteDownvote.tsx';

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

const TitleAndStatsRoadmap = () => {
  const { loaded, isLiked } = useStore(roadmapStatistics);
  const id = getRoadmapId();
  const views = getRoadmapViews();

  const voteState: VoteState = VoteToVoteType(isLiked);
  const intId = parseInt(id, 10);

  const { name } = useStore(storeRoadmapAbout);
  return (
    <div className='relative'>
      <div className='pb-0.5 text-lg font-semibold text-darkBlue font-roboto-text'>
        {name} {name}
      </div>
      <div className='absolute left-1/2 -translate-x-1/2 bg-white px-2 py-1 -bottom-9 flex justify-center items-center gap-3 border-2 border-gray-200'>
        <div className='flex items-center gap-1'>
          <span className='text-placeholder text-xs font-roboto-text'>
            Views
          </span>
          <div className='text-secondary font-roboto-text text-xs '>
            {views}
          </div>
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
    </div>
  );
};

export default TitleAndStatsRoadmap;
