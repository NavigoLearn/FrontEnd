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
  pullStoreAboutTempFromApp,
} from '@components/roadmap/to-be-organized/about/stores/store-about-temp';
import ThemeDisplayer from '@components/roadmap/to-be-organized/about/components/ThemeDisplayer';
import StandardTextDisplay from '@components/roadmap/to-be-organized/about/components/StandardTextDisplay';
import title from '@components/roadmap/navbar-roadmap/parts/Title';

type IAboutViewProps = {
  callback: () => void;
};

const AboutView = ({ callback }: IAboutViewProps) => {
  const { description, name } = useStore(storeRoadmapAbout);

  return (
    <div className='relative bg-white w-[32rem] pb-6'>
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
      <div className='flex justify-center w-full flex-col items-center  mt-10'>
        <div className='w-[90%] mt-0'>
          <StandardTextDisplay label='Title' value={name} h='40px' w='full' />
        </div>
        <div className='w-[90%] mt-5'>
          <StandardTextDisplay
            label='Description'
            value={description}
            h=''
            w='full'
          />
        </div>
      </div>
      <div className='flex justify-center items-center flex-col'>
        <div className='w-[90%] mt-1'>
          <div className='font-roboto-text text-darkBlue'>Theme</div>
        </div>
        <div className='ml-3'>
          <ThemeDisplayer isSelectible={false} />
        </div>
      </div>
      <div className='relative mt-12 flex justify-center w-full '>
        <div className='flex flex-row w-[90%] justify-end'>
          <button
            type='button'
            onClick={() => {
              pullStoreAboutTempFromApp();
              callback();
            }}
            className='bg-[#3361D8] text-white px-7 py-1 rounded-md text-base font-roboto-text'
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
