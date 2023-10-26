import React from 'react';
import CoordsAndOptions from '@components/roadmap/elements-display/static/parts/coords-and-options/CoordsAndOptions.tsx';
import RecenterButton from '@components/roadmap/elements-display/static/parts/coords-and-options/RecenterButton.tsx';
import { useStore } from '@nanostores/react';
import { storeRoadmapOwnerData } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-owner-data';
import storeVisitorStatus from '@store/user/user-status.ts';
import SwitchNavbarViewMode from '@components/roadmap/elements-display/static/parts/switch-navbar-viewmode/SwitchNavbarViewMode.tsx';
import ShareIcons from '@components/roadmap/elements-display/static/parts/share-icons/ShareIcons.tsx';
import StarUsGithub from '@components/roadmap/elements-display/static/parts/star-us-github/StarUsGithub.tsx';

const StaticElementsDisplayManager = () => {
  const { ownerId } = useStore(storeRoadmapOwnerData);
  const { userId } = useStore(storeVisitorStatus);
  const isOwner = ownerId === userId && !!ownerId && !!userId;

  return (
    <div className='absolute w-full h-full'>
      <div className='absolute hidden xl:block top-4 right-4'>
        <StarUsGithub />
        <div className='relative translate-x-0'>
          <ShareIcons />
        </div>
      </div>
      <div className='absolute bottom-4 md:bottom-auto md:top-4 left-4 hidden xl:block'>
        {!!isOwner && (
          <>
            <SwitchNavbarViewMode />
            <div className='mt-4' />
          </>
        )}
        <CoordsAndOptions />
      </div>
      <div className='absolute md:hidden top-0 left-0 right-0 flex justify-center'>
        <RecenterButton />
      </div>
    </div>
  );
};

export default StaticElementsDisplayManager;
