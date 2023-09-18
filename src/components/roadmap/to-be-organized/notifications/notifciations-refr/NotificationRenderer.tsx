import React from 'react';
import { useStore } from '@nanostores/react';
import CustmoNotification from '../CustomNotification';
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
      <CustmoNotification
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
