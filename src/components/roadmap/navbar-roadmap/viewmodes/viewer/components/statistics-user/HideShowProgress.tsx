import React from 'react';
import { requestButton } from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/buttons-requester.ts';
import roadmapStateStore from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state.ts';
import { useStore } from '@nanostores/react';

const HideShowProgress = () => {
  useStore(roadmapStateStore);
  const showHideButton = requestButton('hide-progress');
  const progressIsShown = roadmapStateStore.get().hiddenProgress;

  return (
    <button
      type='button'
      onClick={() => {
        showHideButton.callback();
      }}
      className='p-1 hover:bg-gray-200'
    >
      <span className='font-roboto-text font-medium'>
        {!progressIsShown ? 'Hide' : 'Show'} progress
      </span>
    </button>
  );
};

export default HideShowProgress;
