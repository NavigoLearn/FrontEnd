import React from 'react';
import CoordsAndOptions from '@components/roadmap/elements-display/static/parts/coords-and-options/CoordsAndOptions.tsx';
import { getIsEditable } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import RecenterButton from '@components/roadmap/elements-display/static/parts/coords-and-options/RecenterButton.tsx';
import { useStore } from '@nanostores/react';
import { storeRoadmapOwnerData } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-owner-data';
import storeVisitorStatus from '@store/user/user-status.ts';
import SwitchNavbarViewMode from '@components/roadmap/elements-display/static/parts/switch-navbar-viewmode/SwitchNavbarViewMode.tsx';

const StaticElementsDisplayManager = () => {
  const { ownerId } = useStore(storeRoadmapOwnerData);
  const { userId } = useStore(storeVisitorStatus);
  const isOwner = ownerId === userId && !!ownerId && !!userId;

  return (
    <div className='absolute w-full h-full'>
      <div className='absolute bottom-4 md:bottom-auto md:top-4 left-4 '>
        {!!isOwner && (
          <div>
            <div />
          </div>
        )}

        {!!isOwner && <SwitchNavbarViewMode />}
        <div className='mt-4' />
        <CoordsAndOptions />
      </div>
      <div className='absolute md:hidden top-0 left-0 right-0 flex justify-center'>
        <RecenterButton />
      </div>
    </div>
  );
};

export default StaticElementsDisplayManager;
