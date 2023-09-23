import React, { useEffect } from 'react';
import {
  insertNodeToRender,
  removeNodeToRender,
} from '@components/roadmap/rendering-engines/async-loading/store-async-loading';
import useStateAndRef from '@hooks/useStateAndRef';

export default function <T>(WrappedComponent: React.FC<T>) {
  return (props: T) => {
    const [load, setLoad, ref] = useStateAndRef(false);
    useEffect(() => {
      const setLoadFn = () => {
        setLoad(true);
      };

      insertNodeToRender(setLoadFn);

      return () => {
        setLoad(false);

        if (!ref.current) {
          removeNodeToRender(setLoadFn);
        }
      };
    }, []);
    return load && <WrappedComponent {...props} />;
  };
}
