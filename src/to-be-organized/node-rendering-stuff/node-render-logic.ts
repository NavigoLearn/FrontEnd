import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  getRoadmapNodeProgress,
  setRoadmapNodeProgressAndFetchUpdate,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-progress';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { setNotification } from '@components/roadmap/to-be-organized/notifications/notifciations-refr/notification-store-refr';
import { showContextMenu } from '@components/roadmap/contextmenu/store/ContextMenu';
import userStatus from '@store/user/user-status';
import { checkIsMobile } from '@hooks/useIsMobile.tsx';

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
  // const attachment = node.attachments[0];
  const status = getRoadmapNodeProgress(node.id);
  return statusCircleBgColor[status];
}

let firstClickOnPage = true;
export const checkFirstOnClick = (nodeId) => {
  if (!firstClickOnPage) return;

  firstClickOnPage = false;

  // set in progress
  setRoadmapNodeProgressAndFetchUpdate(nodeId, 'In Progress');
  triggerNodeRerender(nodeId);

  // clear local storage if user not logged in
  if (userStatus.get().isLogged === false) {
    localStorage.removeItem('firstClick');
    setNotification(
      'info',
      'Log in to unlock the following features: progress and voting.'
    );
    return;
  }

  // check local storage if it's the first time the user clicks on a node
  const firstClick = localStorage.getItem('firstClick');
  if (firstClick !== null) return;
  localStorage.setItem('firstClick', 'true');

  // show notification
  setNotification(
    'info',
    `To modify progress status, ${
      checkIsMobile() ? 'long-tap' : 'right-click'
    } on the node.`
  );
};

export const handleContextMenu = (node: NodeClass, event) => {
  event.stopPropagation();
  event.preventDefault();
  const nodeId = node.id;
  if (node.actions.onClick === 'Do nothing') return;

  showContextMenu(nodeId, `${event.clientX - 16}px`, `${event.clientY - 16}px`);
};
