import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import {
  profileDataStore,
  getOwnProfile,
  setProfileDataLoading,
} from '@src/components/profile/stores/store-profile-data';
import { CardRoadmapTypeApi } from '@src/types/explore/card';
import Card from '@src/components/explore/UI/shared/cards/Card';
import { get } from 'http';

const RoadmapsPage = () => {
  const [drafts, setDrafts] = useState(false);
  const { loading, ProfileRoadmaps } = useStore(profileDataStore);

  if (loading)
    return (
      <div className='text-2xl ml-14 mt-6 font-roboto-text text-darkBlue'>
        Loading...
      </div>
    );

  return (
    <div className='mt-5 ml-10'>
      {getOwnProfile() && (
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
      )}
      <div className='grid-cols-2 grid gap-5 w-[660px] mt-7'>
        {ProfileRoadmaps.map((card: CardRoadmapTypeApi) => {
          console.log(card.isDraft);
          if (card.isDraft === 1 && drafts === true && getOwnProfile()) {
            return <Card data={card} key={card.id} />;
          }
          if (card.isDraft === 0 && drafts === false) {
            return <Card data={card} key={card.id} />;
          }
          return null;
          // return <Card data={card} key={card.id} />;
        })}
      </div>
    </div>
  );
};

export default RoadmapsPage;
