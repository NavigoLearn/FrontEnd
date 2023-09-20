import { useCallback, useEffect, useRef, useState } from 'react';

const useContextMenuOrLongPress = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  callback = (event?: MouseEvent) => {},
  ms = 300
) => {
  const [timerId, setTimerId] = useState(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const start = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      setTimerId(setTimeout(() => savedCallback.current(event), ms));
    },
    [ms]
  );

  const stop = useCallback(() => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
  }, [timerId]);

  const handleContextMenu = useCallback((event: MouseEvent) => {
    event.preventDefault();
    savedCallback.current(event);
  }, []);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchEnd: stop,
    onContextMenu: handleContextMenu,
  };
};

export default useContextMenuOrLongPress;
