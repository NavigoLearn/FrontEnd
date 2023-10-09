import React from 'react';
import { useStore } from '@nanostores/react';
import displayManagerStoreFullScreen, {
  setDisplayPageTypeFullScreen,
} from '@src/store/roadmap-refactor/display/display-manager-full-screen';
import AuthPopup from '@components/auth/AuthPopup';
import ResetRoadmapPopup from '@components/roadmap/popups/ResetRoadmapPopup';
import GeneralPopup from '@components/roadmap/popups/GeneralPopup';
import { fetchDeleteRoadmap } from '@src/api-wrapper/roadmap/routes/routes-roadmaps';
import {
  cancelEditingProtocol,
  saveEditingProtocol,
} from '@src/typescript/roadmap_ref/roadmap-data/protocols/roadmap-state-protocols';
import { getDomainFromUrl } from '@src/typescript/utils/urlUtils';
import SetupScreen from './setup-screen/SetupScreen';
import AboutRenderer from '../to-be-organized/about/AboutRenderer';

const FullScreenPopupManager = () => {
  const { type, additionalData } = useStore(displayManagerStoreFullScreen);

  return (
    <>
      {type === 'setup-screen' && <SetupScreen />}
      {type === 'about' && <AboutRenderer />}
      {type === 'get-started' && (
        <div className='h-[100%] w-[100%] bg-[#1A1B504D] absolute top-0 z-30 flex justify-center items-center'>
          <AuthPopup
            additionalData={additionalData}
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
              fetchDeleteRoadmap().then(() => {
                window.location.href = '/explore';
              });
            }}
            buttonType='red'
            name='Delete roadmap'
            heroText='You are about to delete the roadmap'
            smallText='This operation cannot be undone'
          />
        </div>
      )}
      {type === 'save-changes' && (
        <div className='h-[100%] w-[100%] bg-[#1A1B504D] absolute top-0 z-30 flex justify-center items-center'>
          <GeneralPopup
            actionCallback={() => {
              saveEditingProtocol();
            }}
            buttonType='darkblue'
            name='Save changes'
            heroText='You are about to save changes'
            smallText='This will overwrite the previous roadmap with the one you just edited'
          />
        </div>
      )}
      {type === 'cancel-changes' && (
        <div className='h-[100%] w-[100%] bg-[#1A1B504D] absolute top-0 z-30 flex justify-center items-center'>
          <GeneralPopup
            actionCallback={() => {
              cancelEditingProtocol();
            }}
            buttonType='red'
            name='Cancel changes'
            heroText='You are about to cancel all the changes'
            smallText='This will cancel all the changes you made during edit mode'
          />
        </div>
      )}
      {type === 'unsafe-link' && (
        <div className='h-[100%] w-[100%] bg-[#1A1B504D] absolute top-0 z-30 flex justify-center items-center'>
          <GeneralPopup
            actionCallback={() => {
              window.open(additionalData, '_blank');
            }}
            buttonType='darkblue'
            name='Continue to external link'
            heroText='Unknown link'
            previewContent={additionalData}
            smallText={`Website hosted at ${getDomainFromUrl(
              additionalData
            )} is not verified by NavigoLearn. Proceed at your own risk.`}
          />
        </div>
      )}
    </>
  );
};

export default FullScreenPopupManager;
