import React from 'react';
import { useStore } from '@nanostores/react';
import roadmapStatistics from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-statistics';

const Stats = () => {
  const { loaded, views } = useStore(roadmapStatistics);
  const [likes, incrementLike] = useLike(() => {});

  return (
    <div className='flex gap-6 items-center'>
      <section className='flex items-center gap-2'>
        <h3 className='font-roboto-text text-placeholder text-sm'>Views</h3>
        <h2 className='font-roboto-text text-placeholder font-medium text-sm'>
          {loaded ? views : '...'}
        </h2>
      </section>
      <section className='flex items-center gap-2'>
        <h3 className='font-roboto-text text-placeholder text-sm'>Likes</h3>
        <h2 className='font-roboto-text text-secondary font-medium text-sm'>
          {loaded ? likes : '...'}
        </h2>
      </section>
    </div>
  );
};

export default Stats;
