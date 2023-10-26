import React from 'react';
import { getNavbarRoadmapButtonsOwner } from '@components/roadmap/navbar-roadmap/buttons/buttons-selector.ts';
import { useStore } from '@nanostores/react';
import roadmapStateStore from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state.ts';
import Button from '@components/navbar/desktop/parts/buttons/Button.tsx';
import storeVisitorStatus from '@store/user/user-status.ts';
import roadmapAbout from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about.ts';

const ButtonsManager = () => {
  useStore(roadmapStateStore);
  useStore(storeVisitorStatus);
  useStore(roadmapAbout);

  const buttons = getNavbarRoadmapButtonsOwner();

  return (
    <div className='flex gap-4 whitespace-nowrap'>
      {buttons.map((button) => {
        return (
          <Button
            key={button.name}
            name={button.name}
            hasUnder
            buttonData={{
              type: 'button',
              callback: button.callback,
            }}
          />
        );
      })}
    </div>
  );
};

export default ButtonsManager;
