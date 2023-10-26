import React from 'react';
import {
  getRoadmapProgress,
  storeRoadmapProgress,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-progress.ts';
import { getRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get.ts';
import type { NodeClass } from '@src/typescript/roadmap_ref/node/core/core.ts';
import { useStore } from '@nanostores/react';

function getProgressStatistics() {
  const progress = getRoadmapProgress();
  const { nodes } = getRoadmapSelector();
  const nodesArray: NodeClass[] = Object.values(nodes);

  let inProgressNodeCount = 0;
  let completedNodeCount = 0;
  let skippedNodeCount = 0;

  nodesArray.forEach((node) => {
    const status = progress[node.id];
    if (status === 'In Progress') {
      inProgressNodeCount += 1;
    }
    if (status === 'Completed') {
      completedNodeCount += 1;
    }
    if (status === 'Skip') {
      skippedNodeCount += 1;
    }
  });

  return {
    inProgressNodeCount,
    completedNodeCount,
    skippedNodeCount,
  };
}

const StatisticsDropdown = () => {
  useStore(storeRoadmapProgress);
  const { skippedNodeCount, inProgressNodeCount, completedNodeCount } =
    getProgressStatistics();

  return (
    <div className='bg-white px-4 py-2 border-2 border-gray-200 flex items-center justify-center gap-4'>
      <section className='flex gap-1 items-center'>
        <span className='font-roboto-text text-placeholder w-[84px] '>
          In-progress
        </span>
        <div className='text-secondary font-roboto-text'>
          {inProgressNodeCount}
        </div>
      </section>
      <section className='flex gap-1 items-center'>
        <span className='font-roboto-text text-placeholder '>Skipped</span>
        <div className='text-secondary font-roboto-text'>
          {skippedNodeCount}
        </div>
      </section>
      <section className='flex gap-1 items-center'>
        <span className='font-roboto-text text-placeholder '>Completed</span>
        <div className='text-secondary  font-roboto-text'>
          {completedNodeCount}
        </div>
      </section>
    </div>
  );
};

export default StatisticsDropdown;
