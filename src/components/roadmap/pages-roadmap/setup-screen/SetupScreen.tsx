import React, { useEffect, useState } from 'react';
import { checkIfSessionExists } from '@src/typescript/roadmap_ref/history/restoreSession';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';
import exit from '../../../../../public/editor/close.svg';
import ThemeSelector from './pages/ThemeSelector';
import TitleSelector from './pages/TitleSelector';
import { initializeRoadmapAfterLoad } from '../../Roadmap';
import { getCurrentRoadmap } from './roadmap-funtions';

const SetupScreen = ({ isCreate }: { isCreate: boolean }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [creation, setCreation] = useState(isCreate);
  const totalTabs = 2;

  const handleExit = () => {
    setCreation(false);
  };

  const handleNext = () => {
    setActiveTab((prevTab) => (prevTab + 1) % totalTabs);
  };

  useEffect(() => {
    setTimeout(() => {
      if (checkIfSessionExists()) {
        initializeRoadmapAfterLoad();
        handleExit();
      }
    }, 50);
  }, []);

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

  if (creation === false) return null;

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
              initializeRoadmapAfterLoad();
            }}
          >
            <img src={exit} alt='exitButton' className='w-7 h-7' />
          </button>
        </div>
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default SetupScreen;
