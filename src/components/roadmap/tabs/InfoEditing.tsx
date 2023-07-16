import React, { useEffect, useRef, useState } from 'react';
import roadmapState from '@store/roadmap/data/roadmap_state';
import Button from '@components/roadmap/tabs/utils/Button';
import { divWrapper } from '@components/roadmap/tabs/utils/logic';
import { useStore } from '@nanostores/react';
import { diffSaveTabInfo } from '@store/roadmap/cache/diff-tabs';
import cross from '@assets/cross.svg';
import addlink from '@assets/add-link.svg';
import trash from '@assets/trash.svg';
import { capStringLen } from '@typescript/roadmap/utils2';

type link = {
  title: string;
  link: string;
};

const InfoEditing = () => {
  const { info } = useStore(tabStore);
  const { editing } = useStore(roadmapState);

  const [newLink, setNewLink] = useState<link>({
    title: '',
    link: '',
  });

  function changeTabInfo() {
    diffSaveTabInfo(info.id, info);
  }

  const save = useRef(true);
  useEffect(() => {
    return () => {
      if (save.current) {
        // saves the diffs to the store (compared to the cached version)
        changeTabInfo();
      } else {
        // save is canceled
      }
      // when the component unmounts, if elements-editing is true, set roadmap_static tab-attachment to current
    };
  }, []);

  return (
    <div className=' w-full h-full relative md:border-t-black md:border-t-2 overflow-auto'>
      {divWrapper(
        <div className='flex justify-between'>
          <button
            type='button'
            className=' h-8 w-8'
            onClick={() => {
              flipOpen();
            }}
          >
            <img
              draggable='false'
              alt='cross'
              src={cross}
              className='w-6 h-6 right-10 absolute'
            />
          </button>
        </div>
      )}
      {divWrapper(
        <h1 className='font-kanit-text font-light text-main text-sm'>Title</h1>
      )}
      <div className='w-5/6 flex justify-between items-center mx-auto mt-6 flex-col '>
        <input
          className='text-xl font-kanit-text font-medium h-10 md:text-3xl border-b-[1px] border-b-primary shadow-sm w-full flex'
          value={info.title}
          onChange={(e) => {
            const newVal = capStringLen(e.target.value, 20);
            changeInfoTabProp('title', newVal);
          }}
        />
      </div>
      {divWrapper(
        <h1 className='text-placeholder font-kanit-text font-light text-sm '>
          Description
        </h1>
      )}
      {divWrapper(
        <textarea
          className='w-full border-[1px] h-36 border-primary rounded-lg shadow-sm text-sm md:text-lg p-2'
          value={info.description}
          onChange={(e) => {
            const newVal = capStringLen(e.target.value, 2048);
            changeInfoTabProp('description', newVal);
          }}
        >
          <style>
            {`
            ::-webkit-scrollbar {
              width: 5px;
            }
            ::-webkit-scrollbar-track {
              background: #f1f1f1;
            }
            ::-webkit-scrollbar-thumb {
              border-radius: 5px;
              background: #3361D8;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: #073EFF;
            }
            `}
          </style>
        </textarea>
      )}
      {divWrapper(
        <div className='flex gap-2'>
          <div className='font-medium font-roboto-text text-placeholder'>
            Resources
          </div>
          <div className='flex w-full -translate-y-3 -translate-x-2'>
            <button
              type='button'
              onClick={() => {
                addInfoTabLink({ ...newLink });
                setNewLink({ title: '', link: '' });
              }}
            >
              <img src={addlink} alt='add link' className=' w-12 h-12' />
            </button>
          </div>
        </div>
      )}
      {divWrapper(
        <div className='w-full overflow-auto max-h-80'>
          {info.links.map((resource, index) => {
            return (
              // eslint-disable-next-line
              <div className='flex-col gap-2 my-2 pr-4' key={`${index}`}>
                <input
                  className='text-main flex font-semibold font-roboto-text text-sm md:text-lg border-b-[1px] p-2 border-primary rounded-lg w-full'
                  value={resource.title}
                  placeholder='Resource Title'
                  onChange={(e) => {
                    const newVal = capStringLen(e.target.value, 20);
                    changeInfoTabLink(index, 'title', newVal);
                  }}
                />
                <input
                  className=' text-blue-400 flex mt-2 font-light font-roboto-text text-sm md:text-base border-b-[1px] p-2 border-primary rounded-lg w-full'
                  value={resource.link}
                  placeholder='https://example.com'
                  onChange={(e) => {
                    changeInfoTabLink(index, 'link', e.target.value);
                  }}
                />
                <button
                  type='button'
                  className=' text-sm text-placeholder font-roboto-text font-light mt-1'
                  onClick={() => {
                    deleteInfoTabLink(index);
                  }}
                >
                  <img src={trash} alt='delete' className='w-8 h-8' />
                </button>
              </div>
            );
          })}
          <style>
            {`
            ::-webkit-scrollbar {
              width: 5px;
            }
            ::-webkit-scrollbar-track {
              background: #f1f1f1;
            }
            ::-webkit-scrollbar-thumb {
              border-radius: 5px;
              background: #3361D8;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: #073EFF;
            }
            `}
          </style>
        </div>
      )}
      <hr className='bg-gray-300 flex mt-2 w-5/6 justify-center mx-auto border-1' />
      {/* <div className='flex justify-center w-full'>
        <div className='absolute bottom-32 w-5/6 bg-gray-300 h-[1px] ' />
      </div> eugene lol */}
      <div className='w-full max-h-36'>
        {divWrapper(
          <textarea
            className='text-secondary -translate-y-6 font-normal font-roboto-text w-full h-12 mt-4 max-h-20 border-[1px] p-2 border-primary rounded-lg shadow-sm md:h-36'
            placeholder='Additional Info...'
            value={info.additionalInfo}
            onChange={(e) => {
              const newVal = capStringLen(e.target.value, 100);
              changeInfoTabProp('additionalInfo', newVal);
            }}
          />
        )}
      </div>
      <div className='mt-2 flex gap-2 justify-end mr-4 mb-2'>
        <Button
          text='Cancel'
          callback={() => {
            save.current = false;
            flipOpen();
          }}
          color='primary'
          size='small'
        />
        <Button
          text='Save'
          callback={() => {
            if (editing) {
              save.current = true;
              changeTabInfo();
              flipOpen();
            }
            // to be done
          }}
          color='green'
          size='small'
        />
      </div>
    </div>
  );
};

export default InfoEditing;
