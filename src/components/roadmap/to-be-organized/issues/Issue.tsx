import React, { useState } from 'react';
import circledot from '@assets/circledot.svg';
import circle from '@assets/circle.svg';
// import { setThread } from '@store/roadmap-refactor/display/display-manager';
import loggedUser from '@store/user/logged-user';
import {
  fetchCloseIssue,
  fetchOpenIssue,
} from '@src/api-wrapper/roadmap/deprecated/issues';
import { useStore } from '@nanostores/react';
import roadmapVisitData from '@store/roadmap-refactor/roadmap-data/roadmap-visit-data';

const Issue = ({
  id,
  title,
  author,
  authorId,
  open,
  imgUrl,
}: {
  id: string;
  title: string;
  author: string;
  authorId: string;
  open: boolean;
  imgUrl: string;
}) => {
  const [render, setRender] = useState(false);
  const [openIssue, setOpenIssue] = useState(open);
  const { visitorIsOwner, roadmapId } = useStore(roadmapVisitData);
  const { userId } = loggedUser.get();
  const gotPermission = userId === authorId || visitorIsOwner;

  return (
    <div className='w-full flex my-6 relative'>
      <div className='w-10 h-10 '>
        <img
          draggable='false'
          src={openIssue ? circledot : circle}
          alt='issue icon'
        />
      </div>
      <div>
        <button
          type='button'
          className='font-semibold flex justify-start font-roboto-text text-main text-sm md:text-base w-full'
          onClick={() => {
            // setThread(id);
          }}
        >
          {title}
        </button>
        <div className='font-medium font-roboto-text text-secondary text-sm mt-1'>
          by <a href={`/profile/${authorId}`}>{author}</a>
        </div>
      </div>
      {gotPermission && (
        <div className='absolute right-0 h-full'>
          <button
            type='button'
            className=' text-placeholder font-normal text-xs flex items-center h-full'
            onClick={() => {
              if (open) {
                fetchCloseIssue(id, roadmapId).then((res) => {
                  if (!res) setOpenIssue(!openIssue);
                });
              } else {
                fetchOpenIssue(id, roadmapId).then((res) => {
                  if (!res) setOpenIssue(!openIssue);
                });
              }
              setOpenIssue(!openIssue);
              setRender(!render);
            }}
          >
            {openIssue ? 'archive' : 'unarchive'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Issue;
