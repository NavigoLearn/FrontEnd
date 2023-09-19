import { attachmentTabStatusArray } from '@src/typescript/roadmap_ref/node/attachments/tab/core';
import inProgress from '@assets/progress-status.svg';
import complete from '@assets/completed-status.svg';
import skip from '@assets/skip-status.svg';
import { AnimatePresence, motion } from 'framer-motion';
import {
  getRoadmapNodeProgress,
  setRoadmapNodeProgressAndFetchUpdate,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-progress';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { injectMarkAsDone } from '@src/typescript/roadmap_ref/node/core/data-mutation/inject';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';

type IStatusContextMenuProps = {
  nodeId: string;
  x: string;
  y: string;
  setVisibility: (visible: boolean) => void;
};

const iconMap = {
  'In Progress': inProgress,
  Completed: complete,
  Skip: skip,
};

const NodeContextMenu = ({
  nodeId,
  x,
  y,
  setVisibility,
}: IStatusContextMenuProps) => {
  // const status = getRoadmapNodeProgress(nodeId);

  return (
    <div
      className={`pointer-events-auto w-60 rounded-lg h-10  outline-none mt-2 border-2 ${tailwindTransitionClass} absolute`}
      style={{
        left: x,
        top: y,
      }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: '-25%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-25%' }}
          transition={{ duration: 0.25 }}
          className={`pointer-events-none transform opacity-0 w-full rounded-lg bg-white border-2 border-gray-100 drop-shadow-2xl `}
        >
          {attachmentTabStatusArray.map((actionName) => {
            const actionIcon = iconMap[actionName];

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
      </AnimatePresence>
    </div>
  );
};

export default NodeContextMenu;
