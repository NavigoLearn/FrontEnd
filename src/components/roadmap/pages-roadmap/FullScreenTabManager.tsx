import React from 'react';
import { useStore } from '@nanostores/react';
import displayManagerStoreFullScreen, {
  setDisplayPageTypeFullScreen,
} from '@src/store/roadmap-refactor/display/display-manager-full-screen';
import AuthPopup from '@components/auth/AuthPopup';
import ResetRoadmapPopup from '@components/roadmap/popups/ResetRoadmapPopup';
import GeneralPopup from '@components/roadmap/popups/GeneralPopup';
import { fetchDeleteRoadmap } from '@src/api-wrapper/roadmap/routes/routes-roadmaps';
import SetupScreen from './setup-screen/SetupScreen';
import AboutRenderer from '../to-be-organized/about/AboutRenderer';

const FullScreenTabManager = () => {
  const { type } = useStore(displayManagerStoreFullScreen);

  return (
    <>
      {type === 'setup-screen' && <SetupScreen />}
      {type === 'about' && <AboutRenderer />}
      {type === 'get-started' && (
        <div className='h-[100%] w-[100%] bg-[#1A1B504D] absolute top-0 z-30 flex justify-center items-center'>
          <AuthPopup
            closeCallback={() => {
              setDisplayPageTypeFullScreen('closed');
            }}
          />
        </div>
      )}
      {type === 'reset-roadmap' && (
        <div className='h-[100%] w-[100%] bg-[#1A1B504D] absolute top-0 z-30 flex justify-center items-center'>
          <ResetRoadmapPopup
            closeCallback={() => {
              setDisplayPageTypeFullScreen('closed');
            }}
          />
        </div>
      )}
      {type === 'delete-roadmap' && (
        <div className='h-[100%] w-[100%] bg-[#1A1B504D] absolute top-0 z-30 flex justify-center items-center'>
          <GeneralPopup
            actionCallback={() => {
              fetchDeleteRoadmap();
              // eslint-disable-next-line no-restricted-globals
              location.href = '/explore';
            }}
            buttonType='red'
            name='Delete roadmap'
            heroText='You are about to delete the roadmap'
            smallText='This operation cannot be undone'
          />
        </div>
      )}
    </>
  );
};

export default FullScreenTabManager;
