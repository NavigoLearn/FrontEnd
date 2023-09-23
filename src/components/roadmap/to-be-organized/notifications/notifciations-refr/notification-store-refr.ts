import { atom } from 'nanostores';

type notificationStoreType = {
  type: 'info' | 'confirm' | 'error' | 'none';
  message: string;
};

export const notificationStore = atom({
  type: 'none',
  message: '',
} as notificationStoreType);

export function setNotification(
  type: 'info' | 'confirm' | 'error',
  message: string
) {
  notificationStore.set({
    type,
    message,
  });
}

export function getNotificationType() {
  return notificationStore.get().type;
}

export function getNotificationMessage() {
  return notificationStore.get().message;
}

export function clearNotification() {
  notificationStore.set({
    type: 'none',
    message: '',
  });
}
