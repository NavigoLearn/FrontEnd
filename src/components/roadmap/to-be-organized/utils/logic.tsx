import React from 'react';

export const divWrapper = (children: React.ReactNode) => {
  return (
    <div className='flex w-full justify-center items-center'>
      <div className='w-5/6 mt-6 text-secondary font-normal font-roboto-text'>
        {children}
      </div>
    </div>
  );
};

export const addIssue = () => {
  // add issue roadmap-roadmap-data
};
