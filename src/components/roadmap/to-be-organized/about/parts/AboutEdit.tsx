import React from 'react';
import { setDisplayPageTypeFullScreen } from '@src/store/roadmap-refactor/display/display-manager-full-screen';
import { useStore } from '@nanostores/react';
import storeAboutTemporary, {
  getStoreAboutTemp,
  setStoreAboutTempDescription,
  setStoreAboutTempName,
} from '@components/roadmap/to-be-organized/about/stores/store-about-temp';
import TextInputStandard from '@components/roadmap/pages-roadmap/editor/editor-pages/properties-page/TextInputStandard';
import TextareaStandardInput from '@components/roadmap/pages-roadmap/editor/editor-pages/properties-page/TextareaStandardInput';
import ThemeDisplayer from '@components/roadmap/to-be-organized/about/components/ThemeDisplayer';
import { DEFAULT_ROADMAP_TITLE_MAX_LENGTH } from '@src/typescript/roadmap_ref/node/components/text/text-params';
import exit from '@assets/editor/close.svg';

type IAboutEditProps = {
  callback: () => void;
};

const AboutEdit = ({ callback }: IAboutEditProps) => {
  const { description, name } = useStore(storeAboutTemporary);
  return (
    <div className='bg-white w-[32rem] h-[33rem]'>
      <div className='flex justify-between p-3'>
        <div className='font-kanit-text text-black text-xl'>Edit Roadmap</div>
        <button
          type='button'
          onClick={() => setDisplayPageTypeFullScreen('closed')}
        >
          <img src={exit.src} alt='exitButton' className='w-7 h-7' />
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
            characterLimit={DEFAULT_ROADMAP_TITLE_MAX_LENGTH}
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
        <ThemeDisplayer isSelectible initialTheme={getStoreAboutTemp().theme} />
      </div>
      <div className=' mt-12 flex justify-center'>
        <div className='flex flex-row w-[90%] justify-end'>
          <button
            onClick={() => {
              callback();
            }}
            type='button'
            className='py-1 px-4 mr-2'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={() => {
              callback();
            }}
            className='bg-[#3361D8] text-white px-7 py-1 rounded-md text-base font-roboto-text'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutEdit;
