import { useCallback, useEffect, useRef, useState } from 'react';
// Custom hook to listen to long press event and context menu
const useContextMenuOrLongPress = (callback = (event) => {}, ms = 300) => {
  const [startLongPress, setStartLongPress] = useState(false);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const start = useCallback((event) => {
    event.preventDefault();
    setStartLongPress(true);
  }, []);

  const stop = useCallback(() => {
    setStartLongPress(false);
  }, []);

  const handleContextMenu = useCallback((event) => {
    event.preventDefault();
    savedCallback.current(event);
  }, []);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(() => {
        // Default event object, can use any sensible default your application requires.
        savedCallback.current({ clientX: 0, clientY: 0 });
      }, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [ms, startLongPress]);

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
