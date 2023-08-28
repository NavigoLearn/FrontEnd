import React from 'react';
import { getNavbarRoadmapButtons } from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-selector';
import { useStore } from '@nanostores/react';
import userStatusStore from '@store/user/user-status';
import { getRoadmapState } from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import Button from '@components/roadmap/navbar-roadmap/parts/buttons/Button';
import roadmapVisitData from '@store/roadmap-refactor/roadmap-data/roadmap-visit-data';

const ButtonsManager = () => {
  const { isLogged, loaded } = useStore(userStatusStore);
  const { visitorIsOwner } = useStore(roadmapVisitData);

  const state = getRoadmapState();

  const buttons = getNavbarRoadmapButtons(state, isLogged, visitorIsOwner);
  return (
    <div className='flex gap-8 '>
      {buttons.map((button) => {
        return <Button key={button.name} />;
      })}
    </div>
  );
};

export default ButtonsManager;
