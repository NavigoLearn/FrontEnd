import React, { useState, useEffect } from 'react';
import { getAsyncDelay } from '@components/roadmap/rendering-engines/async-loading/store-async-loading';

export default (WrappedComponent: React.FC<any>) => {
  const hocComponent = (props) => {
    const [load, setLoad] = useState(false);
    useEffect(() => {
      const timeout = getAsyncDelay();
      setTimeout(() => {
        setLoad(true);
      }, timeout);
    }, []);
    return load && <WrappedComponent {...props} />;
  };

  return hocComponent;
};
