import React from 'react';
import { getNavbarRoadmapButtonsOwner } from '@components/roadmap/navbar-roadmap/buttons/buttons-selector.ts';
import { useStore } from '@nanostores/react';
import roadmapStateStore from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state.ts';
import storeVisitorStatus from '@store/user/user-status.ts';
import roadmapAbout from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about.ts';
import ButtonNavbarRoadmap from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/ButtonNavbarRoadmap.tsx';

const ButtonsManager = () => {
  useStore(roadmapStateStore);
  useStore(storeVisitorStatus);
  useStore(roadmapAbout);

  const buttons = getNavbarRoadmapButtonsOwner();

  return (
    <div className='flex gap-5 whitespace-nowrap ml-4'>
      {buttons.map((button) => {
        return (
          <ButtonNavbarRoadmap
            key={button.name}
            name={button.name}
            callback={button.callback}
            IconComponent={button.IconComponent}
          />
        );
      })}
    </div>
  );
};

export default ButtonsManager;
