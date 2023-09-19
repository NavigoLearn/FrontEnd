import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { getRoadmapNodeProgress } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-progress';

export function getNodeOpacity(node: NodeClass) {
  return node.data.opacity / 100;
}

export function getNodeStatusBarColor(node: NodeClass) {
  const statusCircleBgColor = {
    Status: 'bg-transparent',
    'In Progress': 'bg-yellow-400',
    Completed: 'bg-green-400',
    Skip: 'bg-gray-400',
  };
  const attachment = node.attachments[0];
  const status = getRoadmapNodeProgress(node.id);
  return statusCircleBgColor[status];
}
