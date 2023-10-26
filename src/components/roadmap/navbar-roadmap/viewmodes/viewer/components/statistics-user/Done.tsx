import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import {
  getRoadmapProgress,
  storeRoadmapProgress,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-progress.ts';
import { getRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get.ts';
import type { NodeClass } from '@src/typescript/roadmap_ref/node/core/core.ts';

const calculateDonePercentage = async (): Promise<number> => {
  return new Promise((resolve, reject) => {
    const { nodes } = getRoadmapSelector();
    const progress = getRoadmapProgress();

    const nodesArray: NodeClass[] = Object.values(nodes);

    let markedNodesCount = 0;
    let totalNodesNumber = nodesArray.length;

    nodesArray.forEach((node) => {
      const status = progress[node.id];
      if (status !== 'Status' && status) {
        markedNodesCount += 1;
      }
      if (node.actions.onClick === 'Do nothing') {
        totalNodesNumber -= 1;
        // we don't count nodes that do nothing
      }
    });

    const percentage: number = Math.ceil(
      (markedNodesCount / totalNodesNumber) * 100
    );
    resolve(percentage);
  });
};
const Done = () => {
  useStore(storeRoadmapProgress);
  const [calculatedPercentage, setCalculatedPercentage] = useState(0);

  useEffect(() => {
    calculateDonePercentage().then((percentage) => {
      if (Number.isNaN(percentage)) return;
      setCalculatedPercentage(percentage);
    });
  });

  return (
    <div className='flex gap-2 items-center pr-1'>
      <span className='font-roboto-text text-secondary'>Done</span>
      <div className='font-roboto-text font-medium'>
        {calculatedPercentage}%
      </div>
    </div>
  );
};

export default Done;
