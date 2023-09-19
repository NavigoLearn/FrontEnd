import { attachmentTabStatusArray } from '@src/typescript/roadmap_ref/node/attachments/tab/core';
import inProgress from '@assets/progress-status.svg';
import complete from '@assets/completed-status.svg';
import skip from '@assets/skip-status.svg';
import { motion } from 'framer-motion';
import { setRoadmapNodeProgressAndFetchUpdate } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-progress';
import { injectMarkAsDone } from '@src/typescript/roadmap_ref/node/core/data-mutation/inject';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { useEffect, useRef } from 'react';

type IStatusContextMenuProps = {
  nodeId: string;
  visible: boolean;
  x: string;
  y: string;
  progress: string;
  setVisibility: (visible: boolean) => void;
};

const iconMap = {
  'In Progress': inProgress,
  Completed: complete,
  Skip: skip,
};

const NodeContextMenu = ({
  nodeId,
  visible,
  x,
  y,
  progress,
  setVisibility,
}: IStatusContextMenuProps) => {
  const root = useRef<HTMLDivElement>();
  const variants = {
    hidden: { opacity: 0, y: '25%', scale: 0 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  useEffect(() => {
    const closeMenu = () => {
      setVisibility(false);
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
      className={`${
        visible ? 'pointer-events-auto' : 'pointer-events-none'
      } rounded-lg w-60 outline-none absolute`}
      style={{
        left: x,
        top: y,
      }}
    >
      <motion.div
        initial='hidden'
        animate={visible ? 'visible' : 'hidden'}
        exit='hidden'
        transition={{ duration: 0.1 }}
        variants={variants}
        className={`${
          visible ? 'pointer-events-auto' : 'pointer-events-none'
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
                setRoadmapNodeProgressAndFetchUpdate(nodeId, actionName);

                if (actionName === 'Completed' || actionName === 'Skip') {
                  injectMarkAsDone(getNodeByIdRoadmapSelector(nodeId), true);
                } else {
                  injectMarkAsDone(getNodeByIdRoadmapSelector(nodeId), false);
                }

                triggerNodeRerender(nodeId);
                setVisibility(false);
              }}
              key={actionName}
              className={`${
                actionName === progress && actionName !== 'Status'
                  ? 'bg-backgroundRoadmap'
                  : 'bg-white'
              } h-10 py-1 text-opacity-60 hover:text-opacity-100 text-darkBlue w-full text-lg flex items-center pl-4`}
            >
              {actionIcon && (
                <img
                  src={actionIcon}
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
