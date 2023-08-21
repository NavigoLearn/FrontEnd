import React, { useState } from 'react';
import exit from '../../../../../public/editor/close.svg';
import ThemeSelector from './pages/ThemeSelector';
import TitleSelector from './pages/TitleSelector';

const SetupScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const totalTabs = 2;

  const handleNext = () => {
    setActiveTab((prevTab) => (prevTab + 1) % totalTabs);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <ThemeSelector onNext={handleNext} />;
      case 1:
        return <TitleSelector onNext={handleNext} />;
      default:
        return null;
    }
  };
  return (
    <div className='bg-white w-96 h-80'>
      <div className='flex justify-between p-3'>
        <div className='font-kanit-text text-black text-xl'>
          First things first
        </div>
        <button type='button'>
          <img src={exit} alt='exitButton' className='w-7 h-7' />
        </button>
      </div>
      {renderActiveTab()}
    </div>
  );
};

export default SetupScreen;
