import React from 'react';
import { useStore } from '@nanostores/react';
import CustomNotification from '../CustomNotification';
import {
  getNotificationMessage,
  getNotificationType,
  clearNotification,
  notificationStore,
} from './notification-store-refr';

const NotificationRenderer = () => {
  useStore(notificationStore);
  const notificationType = getNotificationType();
  const notificationMessage = getNotificationMessage();
  return (
    notificationType !== 'none' && (
      <CustomNotification
        type={notificationType}
        text={notificationMessage}
        onClose={() => {
          clearNotification();
        }}
      />
    )
  );
};

export default NotificationRenderer;
