import React from 'react';
import { RoadmapTypeApi } from '@src/types/explore/card';
import { setDisplayPageTypeFullScreen } from '@src/store/roadmap-refactor/display/display-manager-full-screen';
import SpecialInput from '../../pages-roadmap/editor/editor-pages/properties-page/SpecialInput';
import SpecialTextArea from '../../pages-roadmap/editor/editor-pages/properties-page/SpecialTextArea';
import ThemeDisplayer from './ThemeDisplayer';

const AboutRenderer = () => {
  return (
    <div className='h-[100%] w-[100%] bg-[#1A1B504D] absolute top-0 z-30 flex justify-center items-center'>
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
            <SpecialInput
              label='Title'
              value='dawg'
              placeholder='Give an expressive title'
              onChange={() => {}}
              h='10'
              w='full'
            />
          </div>
          <div className='w-[95%] mt-5'>
            <SpecialTextArea
              label='Description'
              value='dawg'
              placeholder='Give an expressive title'
              onChange={() => {}}
              h='36'
              w='full'
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
            <button type='button' className='py-1 px-4 mr-2'>
              Cancel
            </button>
            <button
              type='button'
              className='bg-[#3361D8] text-white px-4 py-1 rounded-md text-base w-44 font-roboto-text'
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutRenderer;
