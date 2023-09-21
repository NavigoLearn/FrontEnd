import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useMemo,
  useCallback,
} from 'react';

import { AnimatePresence } from 'framer-motion';
import CustomNotification from './CustomNotification';

export type NotificationType = 'error' | 'info' | 'confirm';

type Notification = {
  id: string;
  type: NotificationType;
  text: string;
};

type NotificationLogicType = {
  notifications: Notification[];
  addNotification: (type: NotificationType, text: string) => void;
  removeNotification: (id: string) => void;
};

const NotificationContext = createContext<NotificationLogicType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

type NotificationProviderProps = {
  children: ReactNode;
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (type, text) => {
      const id = Math.random().toString(36).substr(2, 9);
      const notification = { id, type, text };
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
      console.log('notification successfully added', notification);
    },
    [notifications]
  );

  const removeNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const contextValue = useMemo(() => {
    return { notifications, addNotification, removeNotification };
  }, [notifications, addNotification, removeNotification]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <div className='flex flex-col gap-2 fixed bottom-2 right-[calc(50vw-225px)]'>
        <ul>
          <AnimatePresence>
            {notifications.map((notification) => (
              <CustomNotification
                key={notification.id}
                type={notification.type}
                text={notification.text}
                onClose={() => removeNotification(notification.id)}
              />
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </NotificationContext.Provider>
  );
};
