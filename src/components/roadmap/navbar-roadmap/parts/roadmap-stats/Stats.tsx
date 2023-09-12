import React from 'react';
import { useStore } from '@nanostores/react';
import roadmapStatistics, {
  getRoadmapLikes,
  getRoadmapViews,
  setRoadmapStatisticsDownvote,
  setRoadmapStatisticsLikes,
  setRoadmapStatisticsRemoveLike,
  setRoadmapStatisticsUpvote,
  setRoadmapStatisticsVoteState,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-statistics';
import { getRoadmapId } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';
import UpvoteDownvoteUI from '@components/roadmap/navbar-roadmap/parts/roadmap-stats/UpvoteDownvoteUI';
import {
  fetchDislikeCard,
  fetchLikeCard,
  fetchRemoveLike,
} from '@src/api-wrapper/explore/roadmap-likes';

const Stats = () => {
  const { loaded, isLiked } = useStore(roadmapStatistics);
  const id = getRoadmapId();
  const views = getRoadmapViews();

  type voteState = 'upvote' | 'downvote' | 'none';
  const matcher: Record<-1 | 0 | 1, voteState> = {
    '-1': 'downvote',
    '0': 'none',
    '1': 'upvote',
  };
  const voteState = matcher[isLiked];
  const intId = parseInt(id, 10);

  return (
    <div className='flex gap-6 items-center'>
      <section className='flex items-center gap-2'>
        <h3 className='font-roboto-text text-placeholder text-sm'>Views</h3>
        <h2 className='font-roboto-text text-placeholder font-medium text-sm'>
          {loaded ? views : '...'}
        </h2>
      </section>
      <section className='flex items-center gap-2'>
        {loaded ? (
          <UpvoteDownvoteUI
            upvotes={getRoadmapLikes()}
            downvoteCallback={() => {
              fetchDislikeCard(intId);
              setRoadmapStatisticsDownvote();
              setRoadmapStatisticsVoteState(-1);
            }}
            upvoteCallback={() => {
              // upvote post
              fetchLikeCard(intId);
              setRoadmapStatisticsUpvote();
              setRoadmapStatisticsVoteState(1);
            }}
            removeVoteCallback={() => {
              // remove vote
              fetchRemoveLike(intId);
              setRoadmapStatisticsRemoveLike();
              setRoadmapStatisticsVoteState(0);
            }}
            voteState={voteState}
          />
        ) : (
          '...'
        )}
      </section>
    </div>
  );
};

export default Stats;
