import React, { useState } from 'react';
import { setDisplayPageTypeFullScreen } from '@store/roadmap-refactor/display/display-manager-full-screen';
import exit from '@assets/editor/close.svg';
import ThemeSelector from './pages/ThemeSelector';
import TitleSelector from './pages/TitleSelector';
import { initialRoadmapProtocolAfterLoad } from '../../Roadmap';

const SetupScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const totalTabs = 2;

  const handleExit = () => {
    setDisplayPageTypeFullScreen('closed');
  };

  const handleNext = () => {
    setActiveTab((prevTab) => (prevTab + 1) % totalTabs);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (checkIfSessionExists()) {
  //       initializeRoadmapAfterLoad();
  //       handleExit();
  //     }
  //   }, 50);
  // }, []);
  //
  const renderActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <ThemeSelector onNext={handleNext} handleExit={handleExit} />;
      case 1:
        return <TitleSelector onNext={handleNext} handleExit={handleExit} />;
      default:
        return null;
    }
  };

  return (
    <div className='h-[100%] w-[100%] bg-[#1A1B504D] absolute top-0 z-30 flex justify-center items-center'>
      <div className='bg-white w-[32rem] h-[22rem]'>
        <div className='flex justify-between p-3'>
          <div className='font-kanit-text text-black text-xl'>
            First things first
          </div>
          <button
            type='button'
            onClick={() => {
              handleExit();
              initialRoadmapProtocolAfterLoad();
            }}
          >
            <img src={exit.src} alt='exitButton' className='w-7 h-7' />
          </button>
        </div>
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default SetupScreen;
