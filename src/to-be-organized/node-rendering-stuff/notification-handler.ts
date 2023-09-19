import { useNotification } from '@src/components/roadmap/to-be-organized/notifications/NotificationLogic';
import { triggerAllNodesRerender } from '@src/store/roadmap-refactor/render/rerender-triggers-nodes';
import {
  getIsDraggableNotification,
  getDeleteRootNodeNotification,
} from './notification-store';

let notificationShown1 = false;
// needs fixing it does not work for context
export const handleDeleteRootNotification = (addNotification) => {
  if (!notificationShown1 && getDeleteRootNodeNotification()) {
    addNotification('error', 'You cannot delete the root node');
    notificationShown1 = true;
  }
};

let notificationShown = false;

export const handleNotification = (addNotification) => {
  if (!notificationShown) {
    addNotification('tip', 'Hold shift to drag the entire tree of nodes');
    notificationShown = true;
  }
};
