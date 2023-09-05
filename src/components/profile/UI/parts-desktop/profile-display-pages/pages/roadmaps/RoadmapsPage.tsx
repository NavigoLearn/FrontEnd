import React, { useState } from 'react';
import Card from '@components/profile/UI/shared/Card';

const RoadmapsPage = () => {
  const [drafts, setDrafts] = useState(false);
  const roadmapsIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className='mt-5 ml-10'>
      <div className=''>
        <button
          type='button'
          className={`border-2 border-transparent  hover:text-darkBlue  font-roboto-text ${
            !drafts
              ? 'border-b-darkBlue border-opacity-100 text-darkBlue font-medium '
              : ' text-secondaryDarkBlue border-transparent'
          }`}
          onClick={() => setDrafts(false)}
        >
          Published
        </button>

        <button
          type='button'
          className={`border-2 ml-5 hover:text-darkBlue border-transparent font-roboto-text ${
            drafts
              ? 'border-b-darkBlue border-opacity-100 text-darkBlue font-medium '
              : ' text-secondaryDarkBlue border-transparent'
          }`}
          onClick={() => setDrafts(true)}
        >
          Drafts
        </button>
      </div>
      <div className='grid-cols-2 grid gap-5 w-[660px] mt-7'>
        {roadmapsIds.map((id) => {
          return <Card roadmapId={id} key={id} />;
        })}
      </div>
    </div>
  );
};

export default RoadmapsPage;
