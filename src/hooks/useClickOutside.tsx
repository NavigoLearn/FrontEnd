import { useEffect } from 'react';

type ICallback = () => void;
export function useClickOutside(
  myElement: React.MutableRefObject<any>,
  callback: ICallback
) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (myElement.current && !myElement.current.contains(event.target)) {
        callback();
        event.stopPropagation();
      }
    }
    // document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('click', handleClickOutside);
    return () => {
      // document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); // Empty dependency array means this useEffect runs once when the component mounts
}
