import React from 'react';
import { getNavbarRoadmapButtons } from '@components/roadmap/navbar-roadmap/parts/buttons/buttons-selector';
import { useStore } from '@nanostores/react';
import userStatusStore from '@store/user/user-status';
import roadmapStateStore, {
  getRoadmapState,
} from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import Button from '@components/roadmap/navbar-roadmap/parts/buttons/Button';
import roadmapVisitData from '@store/roadmap-refactor/roadmap-data/roadmap-visit-data';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';

const ButtonsManager = () => {
  useStore(roadmapStateStore);
  const { isLogged, loaded: loadedUserData } = useStore(userStatusStore);
  const { visitorIsOwner, loaded: loadedRoadmapData } =
    useStore(roadmapVisitData);

  if (!loadedUserData || !loadedRoadmapData) return <div />;

  const state = getRoadmapState();

  const buttons = getNavbarRoadmapButtons(state, isLogged, visitorIsOwner);

  return (
    <div className='flex gap-6 '>
      {buttons.map((button) => {
        return <Button key={button.name} button={button} />;
      })}
    </div>
  );
};

export default ButtonsManager;
