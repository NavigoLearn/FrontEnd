import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  getRoadmapNodeProgress,
  setRoadmapNodeProgressAndFetchUpdate,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-progress';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { setNotification } from '@components/roadmap/to-be-organized/notifications/notifciations-refr/notification-store-refr';
import { showContextMenu } from '@components/roadmap/contextmenu/store/ContextMenu';

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

export const checkFirstOnClick = (nodeId) => {
  // check local storage if it's the first time the user clicks on a node
  const firstClick = localStorage.getItem('firstClick');
  if (firstClick !== null) return;
  localStorage.setItem('firstClick', 'true');

  // set in progress
  setRoadmapNodeProgressAndFetchUpdate(nodeId, 'In Progress');
  triggerNodeRerender(nodeId);

  // show notification
  setNotification('tip', 'To modify progress status, right-click on the node.');
};

export const handleContextMenu = (node: NodeClass, event) => {
  event.stopPropagation();
  event.preventDefault();
  const nodeId = node.id;
  if (node.actions.onClick === 'Do nothing') return;

  showContextMenu(nodeId, `${event.clientX - 16}px`, `${event.clientY - 16}px`);
};
