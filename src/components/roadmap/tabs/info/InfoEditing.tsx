import React, { useEffect, useRef, useState } from 'react';
import roadmapState from '@store/roadmap/data/roadmap_state';
import Button from '@components/roadmap/tabs/utils/Button';
import { divWrapper } from '@components/roadmap/tabs/utils/logic';
import { useStore } from '@nanostores/react';
import tabStore, {
  addInfoTabLink,
  changeInfoTabLink,
  changeInfoTabProp,
  deleteInfoTabLink,
  flipOpen,
} from '@store/roadmap-refactor/display/display-manager';
import { diffSaveTabInfo } from '@store/roadmap/cache/diff-tabs';
import cross from '@assets/cross.svg';
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
    <div className=' w-full h-full relative md:border-t-black md:border-t-2'>
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
        </div>
      )}
      <div className='w-5/6 flex justify-between items-center mx-8 mt-6 '>
        <input
          className=' text-2xl font-kanit-text font-semibold md:text-4xl border-2 border-gray-200 w-3/4'
          value={info.title}
          onChange={(e) => {
            const newVal = capStringLen(e.target.value, 20);
            changeInfoTabProp('title', newVal);
          }}
        />
        <div className='mt-2 flex gap-2 items-center '>
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
      {divWrapper(
        <textarea
          className='w-full border-2 border-gray-200 text-sm md:text-lg'
          value={info.description}
          onChange={(e) => {
            const newVal = capStringLen(e.target.value, 2048);
            changeInfoTabProp('description', newVal);
          }}
        />
      )}
      {divWrapper(<div>Visit the following resources to learn more</div>)}
      {divWrapper(
        <div className='w-full'>
          {info.links.map((resource, index) => {
            return (
              // eslint-disable-next-line
              <div className='flex gap-2 my-2' key={`${index}`}>
                <input
                  className='text-main font-semibold font-roboto-text text-sm md:text-lg border-2 border-gray-100 w-1/2'
                  value={resource.title}
                  onChange={(e) => {
                    const newVal = capStringLen(e.target.value, 20);
                    changeInfoTabLink(index, 'title', newVal);
                  }}
                />
                <input
                  type='url'
                  className=' text-blue-400 font-light font-roboto-text text-sm md:text-base border-2 border-gray-100 w-1/2'
                  value={resource.link}
                  onChange={(e) => {
                    changeInfoTabLink(index, 'link', e.target.value);
                  }}
                />
                <button
                  type='button'
                  className=' text-sm text-placeholder font-roboto-text font-light'
                  onClick={() => {
                    deleteInfoTabLink(index);
                  }}
                >
                  delete
                </button>
              </div>
            );
          })}
          <div className='flex gap-2 my-2 w-full'>
            <input
              className='text-main font-semibold font-roboto-text text-base md:text-lg border-2 border-gray-100 w-1/2'
              value={newLink.title}
              onChange={(e) => {
                const newVal = capStringLen(e.target.value, 20);
                setNewLink({ ...newLink, title: newVal });
              }}
            />
            <input
              className=' text-blue-400 font-light font-roboto-text text-sm md:text-base border-2 border-gray-100 w-1/2'
              value={newLink.link}
              onChange={(e) => {
                setNewLink({ ...newLink, link: e.target.value });
              }}
            />
            <button
              type='button'
              className=' text-sm text-placeholder font-roboto-text font-light'
              onClick={() => {
                // add a new link to the array
                addInfoTabLink({ ...newLink });
                setNewLink({ title: '', link: '' });
              }}
            >
              add
            </button>
          </div>
        </div>
      )}
      <div className='flex justify-center w-full'>
        <div className='absolute bottom-32 w-5/6 bg-gray-300 h-[1px] ' />
      </div>
      <div className='absolute bottom-20 w-full max-h-20'>
        {divWrapper(
          <textarea
            className='text-secondary font-normal font-roboto-text w-full h-10 mt-4 max-h-20 border-2 border-gray-200'
            value={info.additionalInfo}
            onChange={(e) => {
              const newVal = capStringLen(e.target.value, 100);
              changeInfoTabProp('additionalInfo', newVal);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default InfoEditing;
