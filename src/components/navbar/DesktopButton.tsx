import React, { useEffect, useRef, useState } from 'react';
import { exitSetupScreen } from '../roadmap/displayers/setup-screen/roadmap-funtions';

type Props = {
  id: number;
  cName: string;
  path: string;
  cIcon: string;
  title: string;
  hasUnder: boolean;
};

const DesktopButton = ({ id, cName, path, cIcon, title, hasUnder }: Props) => {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <li
      key={id}
      className='flex pointer-events-auto relative'
      onMouseOver={() => {
        const div = lineRef.current;
        if (!div) {
          return;
        }
        div.style.left = '0px';
        div.style.removeProperty('right');
        div.style.width = '100%';
      }}
      onMouseOut={() => {
        const div = lineRef.current;
        if (!div) {
          return;
        }
        div.style.right = '0px';
        div.style.removeProperty('left');
        div.style.width = '0px';
      }}
    >
      {hasUnder && (
        <div
          ref={lineRef}
          className='absolute -bottom-1 w-0 h-[2px] bg-black transition-all duration-300'
        />
      )}
      {currentPath === '/roadmap/create' &&
      path === '/roadmap/create' ? null : (
        <a className={cName} href={path} onClick={() => exitSetupScreen()}>
          {cIcon && (
            <img
              draggable='false'
              src={cIcon}
              alt='icon'
              className='w-6 flex m-1'
            />
          )}
          {title}
        </a>
      )}
    </li>
  );
};

export default DesktopButton;
