import React, { useEffect } from 'react';
import {
  decrementAsyncDelay,
  getAsyncDelay,
} from '@components/roadmap/rendering-engines/async-loading/store-async-loading';
import useStateAndRef from '@hooks/useStateAndRef';

export default (WrappedComponent: React.FC<any>) => {
  const hocComponent = (props) => {
    const [load, setLoad, ref] = useStateAndRef(false);
    useEffect(() => {
      const timeoutTime = getAsyncDelay();
      const timeout = setTimeout(() => {
        setLoad(true);
      }, timeoutTime);
      return () => {
        clearTimeout(timeout);
        if (ref.current === false) {
          decrementAsyncDelay();
        }
      };
    }, []);
    return load && <WrappedComponent {...props} />;
  };

  return hocComponent;
};
