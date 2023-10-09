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
import { atom } from 'nanostores';
import { setDisplayPageTypeFullScreen } from '@store/roadmap-refactor/display/display-manager-full-screen.ts';

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
  if (!firstClickOnPage) return false;
  firstClickOnPage = false;
  // clear local storage if user not logged in
  if (userStatus.get().isLogged === false) {
    // triggers popup to show up
    setDisplayPageTypeFullScreen(
      'get-started',
      'Login to unlock progress tracking'
    );
  } else {
    const firstProgress = localStorage.getItem('firstProgress');
    if (firstProgress === 'true') return true;
    localStorage.setItem('firstProgress', 'true');
    // set in progress
    setNotification('info', 'Right click to track your progress');
    setRoadmapNodeProgressAndFetchUpdate(nodeId, 'In Progress');
    triggerNodeRerender(nodeId);
  }
  return true;
};

export const handleContextMenu = (node: NodeClass, event) => {
  event.stopPropagation();
  event.preventDefault();
  const nodeId = node.id;
  if (node.actions.onClick === 'Do nothing') return;

  showContextMenu(nodeId, `${event.clientX - 16}px`, `${event.clientY - 16}px`);
};
