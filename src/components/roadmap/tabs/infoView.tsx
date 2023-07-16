import React from 'react';

import Button from '@components/roadmap/tabs/utils/Button';
import { divWrapper } from '@components/roadmap/tabs/utils/logic';
import { useStore } from '@nanostores/react';
import tabStore, {
  flipOpen,
} from '@store/roadmap-refactor/display/display-manager';
import cross from '@assets/cross.svg';

const InfoView = () => {
  const { info } = useStore(tabStore);
  return (
    <div className=' w-full h-full relative border-t-2 border-t-black md:border-t-0'>
      {divWrapper(
        <div className='flex justify-between'>
          <button
            className=' h-8 w-8'
            onClick={() => {
              flipOpen();
            }}
          >
            <img draggable='false' src={cross} className='w-6 h-6' />
          </button>
          <div className='mt-2'>
            <Button
              text='Mark as done'
              callback={() => {
                // to be done
              }}
              color='secondary'
              size='small'
            />
          </div>
        </div>
      )}
      <div className='w-5/6 flex justify-between items-center mx-8 mt-6 '>
        <div className=' font-kanit-text font-semibold text-2xl md:text-4xl  '>
          {info.title}
        </div>
      </div>
      {divWrapper(
        <div className=' text-sm  md:text-xl'>{info.description}</div>
      )}
      {divWrapper(
        <div className='text-xs md:text-lg'>
          Visit the following resources to learn more
        </div>
      )}
      {divWrapper(
        <div>
          {info.links.map((resource) => {
            return (
              <li key={resource.title} className='list-disc ml-4'>
                <a
                  href={resource.link}
                  target='_blank'
                  rel='noreferrer'
                  className='text-main font-semibold font-roboto-text text-sm md:text-lg'
                >
                  {resource.title}
                </a>
              </li>
            );
          })}
        </div>
      )}
      <div className='flex justify-center w-full'>
        <div className='absolute bottom-32 w-5/6 bg-gray-300 h-[1px] ' />
      </div>
      <div className='absolute bottom-20 w-full'>
        {divWrapper(
          <div>
            <div className='text-secondary font-normal font-roboto-text text-sm md:text-base  '>
              {info.additionalInfo}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoView;
