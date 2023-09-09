import React from 'react';
import { useStore } from '@nanostores/react';
import storeRoadmapAbout from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';
import { setDisplayPageTypeFullScreen } from '@store/roadmap-refactor/display/display-manager-full-screen';
import TextareaStandardInput from '@components/roadmap/pages-roadmap/editor/editor-pages/properties-page/TextareaStandardInput';
import TextInputStandard from '@components/roadmap/pages-roadmap/editor/editor-pages/properties-page/TextInputStandard';

import {
  setStoreAboutTempDescription,
  setStoreAboutTempName,
  pushStoreAboutTempChangesToApp,
} from '@components/roadmap/to-be-organized/about/stores/store-about-temp';
import ThemeDisplayer from '@components/roadmap/to-be-organized/about/components/ThemeDisplayer';

const AboutView = () => {
  const { description, name } = useStore(storeRoadmapAbout);

  return (
    <div className='bg-white w-[32rem] h-[33rem]'>
      <div className='flex justify-between p-3'>
        <div className='font-kanit-text text-black text-xl'>Edit Roadmap</div>
        <button
          type='button'
          onClick={() => setDisplayPageTypeFullScreen('closed')}
        >
          <img
            src='/public/editor/close.svg'
            alt='exitButton'
            className='w-7 h-7'
          />
        </button>
      </div>
      <div className='flex justify-center w-full flex-col items-center h-52 mt-2'>
        <div className='w-[95%]'>
          <TextInputStandard
            label='Title'
            value={name}
            placeholder='Give an expressive title'
            onChange={(newValue: string) => {
              setStoreAboutTempName(newValue);
            }}
            h='40px'
            w='100%'
          />
        </div>
        <div className='w-[95%] mt-5'>
          <TextareaStandardInput
            label='Description'
            value={description}
            placeholder='Give an expressive title'
            onChange={(newValue: string) => {
              setStoreAboutTempDescription(newValue);
            }}
            h='144px'
            w='100%'
          />
        </div>
      </div>
      <div className='flex justify-center items-center flex-col'>
        <div className='w-[90%] mt-1'>
          <div className='font-roboto-text text-darkBlue'>Theme</div>
        </div>
        <ThemeDisplayer />
      </div>
      <div className=' mt-12 flex justify-center'>
        <div className='flex flex-row w-[95%] justify-end'>
          <button
            onClick={() => setDisplayPageTypeFullScreen('closed')}
            type='button'
            className='py-1 px-4 mr-2'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={() => {
              setDisplayPageTypeFullScreen('closed');
              pushStoreAboutTempChangesToApp();
            }}
            className='bg-[#3361D8] text-white px-4 py-1 rounded-md text-base w-44 font-roboto-text'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
