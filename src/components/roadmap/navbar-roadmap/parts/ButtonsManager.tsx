import React from 'react';
import { getNavbarRoadmapButtons } from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-selector';
import { useStore } from '@nanostores/react';
import userStatusStore from '@store/user/user-status';
import roadmapStateStore from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import roadmapVisitData from '@store/roadmap-refactor/roadmap-data/roadmap-visit-data';
import Button from '@components/navbar/desktop/parts/buttons/Button';

const ButtonsManager = () => {
  useStore(roadmapStateStore);
  useStore(userStatusStore);
  useStore(roadmapVisitData);

  const buttons = getNavbarRoadmapButtons();

  return (
    <div className='flex gap-6 '>
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
