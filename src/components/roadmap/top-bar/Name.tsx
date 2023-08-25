import React from 'react';
import { useStore } from '@nanostores/react';
import aboutTabStore from '@store/roadmap-refactor/roadmap-data/roadmap-about';
// import { setAbout } from '@store/roadmap-refactor/display/display-manager';
import edit from '@assets/edit.svg';

const Name = () => {
  const { name } = useStore(aboutTabStore);
  return (
    <button
      type='button'
      onClick={() => {
        // setAbout();
      }}
      className='flex pointer-events-auto'
    >
      <div className='font-kanit-text text-main absolute top-4 md:top-0 md:relative '>
        {name}
      </div>
      <div className='w-5 h-5 ml-2 pointer-events-auto relative'>
        <img alt='Edit info' src={edit} className='w-full h-full' />
      </div>
    </button>
  );
};

export default Name;
