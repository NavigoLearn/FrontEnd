import { atom } from 'nanostores';

type notificationStoreType = {
  deleteRootNode: boolean;
  isDraggable: boolean;
};

export const notificationStore = atom({
  deleteRootNode: false,
  isDraggable: false,
} as notificationStoreType);

export function setDeleteRootNodeNotificationTrue() {
  notificationStore.set({
    ...notificationStore.get(),
    deleteRootNode: true,
  });
}

export function getDeleteRootNodeNotification() {
  return notificationStore.get().deleteRootNode;
}

export function setDeleteRootNodeNotificationFalse() {
  notificationStore.set({
    ...notificationStore.get(),
    deleteRootNode: false,
  });
}

export function setIsDraggableNotificationTrue() {
  notificationStore.set({
    ...notificationStore.get(),
    isDraggable: true,
  });
}

export function getIsDraggableNotification() {
  return notificationStore.get().isDraggable;
}
