import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AttachmentTab,
  attachmentTabStatusArray,
} from '@src/typescript/roadmap_ref/node/attachments/tab/core';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { mutateAttachmentTabStatus } from '@src/typescript/roadmap_ref/node/attachments/tab/mutate';

type IStatusDropdownProps = {
  attachment: AttachmentTab;
};

const StatusDropdown = ({ attachment }: IStatusDropdownProps) => {
  const [dropdown, setDropdown] = useState(false);
  const { status } = attachment;

  return (
    <div
      className={` w-60 bg-gray-200 rounded-lg h-10  outline-none mt-4 border-2  ${tailwindTransitionClass}`}
    >
      <button
        type='button'
        className='flex justify-between items-center w-full h-full px-5'
        onClick={() => {
          setDropdown((prev) => !prev);
        }}
      >
        <span className='text-darkBlue text-lg'>{status}</span>
        <img
          alt='arrow dropdown'
          src='/roadmap/arrow-dropdown.svg'
          className={` w-8 h-8 ${
            dropdown && 'rotate-180'
          }${tailwindTransitionClass}`}
        />
      </button>

      <AnimatePresence>
        {dropdown && (
          <motion.div
            initial={{ opacity: 0, y: '25%' }}
            animate={{ opacity: 1, y: 5 }}
            exit={{ opacity: 0, y: '25%' }}
            transition={{
              duration: 0.25,
            }}
            className={` pointer-events-none translate-y-16 opacity-0 w-full rounded-lg bg-white 
             border-2 border-gray-100 drop-shadow-2xl `}
          >
            {attachmentTabStatusArray.map((actionName) => {
              return (
                <button
                  type='button'
                  onClick={() => {
                    mutateAttachmentTabStatus(attachment, actionName);
                    setDropdown(false);
                  }}
                  key={actionName}
                  className={` pointer-events-auto h-10 my-1 text-opacity-60 hover:text-opacity-100 text-darkBlue w-full text-lg flex justify-center items-center ${tailwindTransitionClass}`}
                >
                  {actionName}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusDropdown;
