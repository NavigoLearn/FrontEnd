import React from 'react';

const Stats = () => {
  const likes = 324;
  const views = 2033;
  return (
    <div className='flex gap-6 items-center'>
      <section className='flex items-center gap-2'>
        <h3 className='font-roboto-text text-placeholder text-sm'>Likes</h3>
        <h2 className='font-roboto-text text-secondary font-medium text-sm'>
          {likes}
        </h2>
      </section>
      <section className='flex items-center gap-2'>
        <h3 className='font-roboto-text text-placeholder text-sm'>Views</h3>
        <h2 className='font-roboto-text text-secondary font-medium text-sm '>
          {views}
        </h2>
      </section>
    </div>
  );
};

export default Stats;
