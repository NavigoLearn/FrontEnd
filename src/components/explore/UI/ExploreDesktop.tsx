import React from 'react';
import OptionSelect from '@components/explore/UI/components-desktop/OptionSelect';

const ExploreDesktop = () => {
  return (
    <div className='w-full h-full border-black border-2'>
      <div className=' w-full border-2 border-black flex'>
        <div className='w-52 border-2 border-black'>
          <div className='w-full h-24'>empty space</div>
          <div
            className='w-full h-96 border-2 border-black pl-3 bg-red-200 '
            onMouseOver={() => {
              console.log('hovered');
            }}
          >
            <OptionSelect
              name='Sort By'
              options={['Likes', 'Views', 'Popularity']}
              callback={(name: string) => {
                console.log(name);
              }}
            />
          </div>
        </div>
        <div className='flex-grow  border-2 border-black'>
          <div className='w-full h-24 border-2 border-black  flex justify-between items-end  '>
            <div className='text-3xl font-kanit-text  text-darkBlue font-semibold'>
              10,000 results for "React"
            </div>
            <button
              type='button'
              className='py-2 px-4 border-2 border-primary font-roboto-text font-medium text-primary rounded-lg text-lg'
            >
              I'm feeling lucky
            </button>
          </div>
          <div className='w-full h-96 border-2 border-black'>Cards go here</div>
        </div>
      </div>
    </div>
  );
};

export default ExploreDesktop;
