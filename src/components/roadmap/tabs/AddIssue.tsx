import React, { useState } from 'react';
import cross from '@assets/cross.svg';
import { divWrapper } from '@components/roadmap/tabs/utils/logic';
import Button from '@components/roadmap/tabs/utils/Button';
import roadmapState from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import { IssueApi } from '@type/roadmap/old/Issues';
import { fetchPostNewIssue } from '../../../api-wrapper/roadmap/issues';

const AddIssue = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className='w-full h-full relative flex flex-col '>
      <div className='relative mt-6 w-full flex justify-center'>
        <div className=' font-kanit-text font-semibold text-xl md:text-3xl relative flex flex-col '>
          Add new issue
        </div>
        <button
          type='button'
          className=' w-6 h-6 absolute left-10 top-2 '
          onClick={() => {
            // close tab-attachment-page
            // setIssues();
          }}
        >
          <img
            draggable='false'
            alt='close tab issue'
            src={cross}
            className='w-6 h-6'
          />
        </button>
      </div>

      <div className='w-full'>
        {divWrapper(
          <div className='w-full flex justify-center'>
            <input
              className='w-full  rounded-lg min-h-[40px] p-2 bg-background outline-gray-200'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder='Write title'
            />
          </div>
        )}
        {divWrapper(
          <div className='w-full flex justify-center'>
            <textarea
              className='w-full  rounded-lg min-h-[250px] p-2  bg-background outline-gray-200'
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder='Write description'
            />
          </div>
        )}
        <div className='w-full flex justify-center mt-10'>
          <Button
            text='Add issue'
            callback={() => {
              // post issue to api
              const issue: IssueApi = {
                title,
                content: description,
                roadmapId: roadmapState.get().id,
                open: true,
                createdAt: new Date(),
                updatedAt: new Date(),
              };
              fetchPostNewIssue(roadmapState.get().id, issue).then(() => {
                // setIssues();
              });
            }}
            color='primary'
            size='medium'
          />
        </div>
      </div>
    </div>
  );
};

export default AddIssue;
