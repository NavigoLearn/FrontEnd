import { attachmentTabStatusArray } from '@src/typescript/roadmap_ref/node/attachments/tab/core';
import inProgress from '@assets/progress-status.svg';
import complete from '@assets/completed-status.svg';
import skip from '@assets/skip-status.svg';
import { motion } from 'framer-motion';
import { setRoadmapNodeProgressAndFetchUpdate } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-progress';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import {
  contextMenuStore,
  hideContextMenu,
} from '@components/roadmap/contextmenu/store/ContextMenu';
import userStatus from '@store/user/user-status';
import { setBasePopup } from '@components/shared/stores/store-base-popups';

const iconMap = {
  'In Progress': inProgress,
  Completed: complete,
  Skip: skip,
};

const NodeContextMenu = () => {
  const state = useStore(contextMenuStore);
  const root = useRef<HTMLDivElement>();
  const variants = {
    hidden: { opacity: 0, y: '25%', scale: 0 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  useEffect(() => {
    const closeMenu = () => {
      hideContextMenu();
    };

    const handleMouseDown = (event) => {
      if (root.current && !root.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('click', closeMenu);
    document.addEventListener('contextmenu', closeMenu);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('pointerdown', handleMouseDown);
    document.addEventListener('touchstart', handleMouseDown);

    return () => {
      document.removeEventListener('click', closeMenu);
      document.removeEventListener('contextmenu', closeMenu);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('pointerdown', handleMouseDown);
      document.removeEventListener('touchstart', handleMouseDown);
    };
  }, []);

  return (
    <div
      ref={root}
      onContextMenu={(e) => e.preventDefault()}
      className={`${
        state.visible ? 'pointer-events-auto' : 'pointer-events-none'
      } rounded-lg w-60 outline-none absolute`}
      style={{
        left: state.x,
        top: state.y,
      }}
    >
      <motion.div
        initial='hidden'
        animate={state.visible ? 'visible' : 'hidden'}
        exit='hidden'
        transition={{ duration: 0.1 }}
        variants={variants}
        className={`${
          state.visible ? 'pointer-events-auto' : 'pointer-events-none'
        } origin-top-left w-full rounded-lg bg-white border-2 border-gray-100 drop-shadow-2xl `}
      >
        {attachmentTabStatusArray.map((actionName) => {
          const actionIcon = iconMap[actionName];

          const textName =
            (actionName as string) === 'Status' ? 'Clear Status' : actionName;

          return (
            <button
              type='button'
              onClick={(event) => {
                event.stopPropagation();
                if (!userStatus.get().isLogged) {
                  // show login modal
                  setBasePopup('get-started');
                  return;
                }
                setRoadmapNodeProgressAndFetchUpdate(state.nodeId, actionName);
                triggerNodeRerender(state.nodeId);
                hideContextMenu();
              }}
              key={actionName}
              className={`${
                actionName === state.progress && actionName !== 'Status'
                  ? 'bg-backgroundRoadmap'
                  : 'bg-white'
              } h-10 py-1 text-opacity-60 hover:text-opacity-100 text-darkBlue w-full text-lg flex items-center pl-4`}
            >
              {actionIcon && (
                <img
                  src={actionIcon.src}
                  alt={`${actionName} Icon`}
                  className='w-5 h-5 mr-2'
                />
              )}
              {textName}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default NodeContextMenu;
