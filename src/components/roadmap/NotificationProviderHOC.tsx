import React from 'react';
import NotificationRenderer from './to-be-organized/notifications/notifciations-refr/NotificationRenderer';

function NotificationProviderHOC<T>(WrappedComponent: React.FC<T>) {
  const HOCWrappedComponent = ({ ...props }: T) => {
    return (
      <>
        <div className='fixed bottom-3 left-1/2 transform -translate-x-1/2'>
          <NotificationRenderer />
        </div>
        <WrappedComponent {...props} />
      </>
    );
  };
  return HOCWrappedComponent;
}

export default NotificationProviderHOC;
