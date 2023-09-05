import React from 'react';
import Statistic from '@components/profile/UI/parts-desktop/profile-display-pages/pages/activity/components/Statistic';

const ActivityPage = () => {
  const statistics = [
    {
      title: 'Total roadmaps Created',
      value: '4',
      showLine: true,
    },
    {
      title: 'Total Gained Views',
      value: '400',
      showLine: true,
    },
    {
      title: 'Total Gained Likes',
      value: '100',
    },
  ];
  return (
    <div className='ml-10 mt-5'>
      <h1 className='text-xl monitor:text-3xl text-darkBlue font-roboto-text font-medium'>
        Statistics
      </h1>
      <div className='flex justify-start gap-3 mt-4 '>
        {statistics.map((statistic) => {
          return (
            <div className='flex gap-3 items-center'>
              <Statistic title={statistic.title} value={statistic.value} />
              {statistic.showLine && (
                <hr className='h-10 w-[1px] bg-placeholderBlack' />
              )}
            </div>
          );
        })}
      </div>
      <h1 className='text-lg monitor:text-2xl text-darkBlue font-roboto-text font-medium mt-10'>
        Achievements
      </h1>
    </div>
  );
};

export default ActivityPage;
