import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import roadmapVisitData from '@store/roadmap/data/roadmap-visit-data';
import loggedUser from '@store/user/logged-user';
import { fetchDeleteComment } from '@src/api-wrapper/roadmap/issues';
import { TimeProcess } from '@src/typescript/utils/TimeProcess';

type CommentProps = {
  id: string;
  author: string;
  authorId: string;
  text: string;
  date: string;
  issueId: string;
  urlPic: string;
  rerender: () => void;
};
const Comment = ({
  id,
  author,
  authorId,
  text,
  date,
  issueId,
  urlPic,
  rerender,
}: CommentProps) => {
  const { visitorIsOwner, roadmapId } = useStore(roadmapVisitData);
  const { userId } = loggedUser.get();
  const gotPermission = userId === authorId;

  return (
    <div className={`w-full relative `}>
      <div className='absolute -left-8 top-1 w-6 h-6 hidden sm:block '>
        <img
          draggable='false'
          alt='img circledot'
          src={urlPic}
          className='w-full h-full rounded-full border-[1px] border-black'
        />
      </div>
      <div className='border-2 border-gray-500 flex relative gap-4 rounded-full py-0.5 z-10 bg-[#E3E6EB] '>
        <div className='text-main font-semibold ml-5'>{author}</div>
        <div className='text-secondary font-light hidden md:block'>
          {TimeProcess(date)}
        </div>
        {gotPermission && (
          <button
            type='button'
            className='absolute right-10 text-red-400 hover:text-red-600 text-lg '
            onClick={() => {
              fetchDeleteComment(roadmapId, issueId, id).then((res) => {
                rerender();
              });
            }}
          >
            delete
          </button>
        )}
      </div>
      <div className='border-2 border-gray-400 -mt-5 pt-7 pb-3 px-2 border-t-0 rounded-lg relative z-0  '>
        {text}
      </div>
    </div>
  );
};

export default Comment;
