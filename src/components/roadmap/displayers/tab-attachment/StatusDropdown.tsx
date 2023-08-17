import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AttachmentTab,
  attachmentTabStatusArray,
} from '@src/typescript/roadmap_ref/node/attachments/tab/core';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { mutateAttachmentTabStatus } from '@src/typescript/roadmap_ref/node/attachments/tab/mutate';
import complete from '@assets/completed-status.svg';
import inProgress from '@assets/progress-status.svg';
import skip from '@assets/skip-status.svg';

type IStatusDropdownProps = {
  attachment: AttachmentTab;
};

const iconMap = {
  'In Progress': inProgress,
  Completed: complete,
  Skip: skip,
  // Add other actions-page and corresponding SVG imports here
};

const StatusDropdown = ({ attachment }: IStatusDropdownProps) => {
  const [dropdown, setDropdown] = useState(false);
  const { status } = attachment;

  return (
    <div
      className={` w-60 bg-gray-200 rounded-lg h-10  outline-none mt-2 border-2 ${tailwindTransitionClass} relative`}
    >
      <button
        type='button'
        className='flex items-center w-full h-full px-5'
        onClick={() => {
          setDropdown((prev) => !prev);
        }}
      >
        {iconMap[status] && (
          <img
            src={iconMap[status]}
            alt='status Icon'
            className='w-5 h-5 mr-2'
          />
        )}
        <span className='text-darkBlue text-lg'>{status}</span>
        <img
          alt='arrow dropdown'
          src='/roadmap/arrow-dropdown.svg'
          className={` w-8 h-8 ${
            dropdown && 'rotate-180'
          }${tailwindTransitionClass} absolute right-2`}
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
              const actionIcon = iconMap[actionName];

              return (
                <button
                  type='button'
                  onClick={() => {
                    mutateAttachmentTabStatus(attachment, actionName);
                    setDropdown(false);
                  }}
                  key={actionName}
                  className={`pointer-events-auto h-10 my-1 text-opacity-60 hover:text-opacity-100 text-darkBlue w-full text-lg flex items-center ml-4 ${tailwindTransitionClass}`}
                >
                  {actionIcon && (
                    <img
                      src={actionIcon}
                      alt={`${actionName} Icon`}
                      className='w-5 h-5 mr-2'
                    />
                  )}
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
