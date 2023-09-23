import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import {
  storeProfileData,
  getIsOwnerOfProfile,
} from '@components/profile/stores/store-profile-data';
import Card from '@components/explore/UI/shared/cards/Card';
import { type ICardRoadmapTypeApi } from '@type/explore/card';
import ProfileButtonsToggleM from '@components/profile/UI/parts-mobile/profile-display-pages/pages/roadmaps-page/components/ProfileButtonsToggleM';

const RoadmapsPageM = () => {
  const [isDraft, setIsDraft] = useState(false);
  const { loading, profileRoadmaps } = useStore(storeProfileData);

  if (loading)
    return (
      <div className='text-2xl ml-14 mt-6 font-roboto-text text-darkBlue'>
        Loading...
      </div>
    );

  return (
    <div className='mt-5'>
      <div className='flex justify-center w-full'>
        <section className='flex justify-start w-72'>
          {getIsOwnerOfProfile() && (
            <ProfileButtonsToggleM
              selection={isDraft ? 'draft' : 'published'}
              setIsPublished={() => {
                setIsDraft(false);
              }}
              setIsDraftCb={() => {
                setIsDraft(true);
              }}
            />
          )}
        </section>
      </div>
      <div className='mt-4 flex flex-col gap-4  items-center pb-4 mx-2'>
        {profileRoadmaps.map((card: ICardRoadmapTypeApi) => {
          if (card.isDraft && isDraft === true && getIsOwnerOfProfile()) {
            return <Card data={card} key={card.id} h='12rem' w='20rem' />;
          }
          if (!card.isDraft && isDraft === false) {
            return <Card data={card} key={card.id} h='12rem' w='20rem' />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default RoadmapsPageM;
