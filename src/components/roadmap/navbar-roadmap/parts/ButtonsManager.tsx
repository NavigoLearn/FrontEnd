import React from 'react';
import { getNavbarRoadmapButtons } from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-selector';
import { useStore } from '@nanostores/react';
import roadmapStateStore from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import Button from '@components/navbar/desktop/parts/buttons/Button';
import storeVisitorStatus from '@store/user/user-status';
import roadmapAbout from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';

const ButtonsManager = () => {
  useStore(roadmapStateStore);
  useStore(storeVisitorStatus);
  useStore(roadmapAbout);

  const buttons = getNavbarRoadmapButtons();

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
