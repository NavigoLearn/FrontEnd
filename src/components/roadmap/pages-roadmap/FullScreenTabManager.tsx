import React from 'react';
import { useStore } from '@nanostores/react';
import displayManagerStoreFullScreen, {
  setDisplayPageTypeFullScreen,
} from '@src/store/roadmap-refactor/display/display-manager-full-screen';
import AuthPopup from '@components/auth/AuthPopup';
import ResetRoadmapPopup from '@components/roadmap/popups/ResetRoadmapPopup';
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
    </>
  );
};

export default FullScreenTabManager;
