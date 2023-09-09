import React, { useState } from 'react';
import AboutEdit from '@components/roadmap/to-be-organized/about/parts/AboutEdit';
import AboutView from '@components/roadmap/to-be-organized/about/parts/AboutView';
import { postOnSaveAboutDataProtocol } from '@components/roadmap/to-be-organized/about/logic/logic';
import { pushStoreAboutTempChangesToApp } from '@components/roadmap/to-be-organized/about/stores/store-about-temp';

const AboutRenderer = () => {
  const [edit, setEdit] = useState(false);

  return (
    <div className='h-[100%] w-[100%] bg-[#1A1B504D] absolute top-0 z-30 flex justify-center items-center'>
      {edit ? (
        <AboutEdit
          callback={() => {
            pushStoreAboutTempChangesToApp();
            setEdit(false);
            postOnSaveAboutDataProtocol();
          }}
        />
      ) : (
        <AboutView
          callback={() => {
            setEdit(true);
          }}
        />
      )}
    </div>
  );
};

export default AboutRenderer;
