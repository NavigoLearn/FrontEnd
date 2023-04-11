import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import roadmapState from '@store/roadmap_state';
import { addZoom } from '@typescript/d3utils';
import Report from './tabs/Report';

const Roadmap = () => {
  const { editing } = useStore(roadmapState);

  useEffect(() => {
    // sets overflow hidden on body
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'hidden';
    }
    return () => {
      // sets overflow auto on body
      if (body) {
        body.style.overflow = 'auto';
      }
    };
  }, []);

  useEffect(() => {
    addZoom('#rootSvg', '#rootGroup');

    // renderNodes();
    // renderConnections();
  }, [editing]);

  return (
    <div className='w-full h-full '>
      <Report />
      <svg id='rootSvg' width='100%' height='100%'>
        <g id='rootGroup'>
          <g id='rootGroupConnections'>
            {/* placeholder for eslint to not scream at me */}
          </g>
          <g id='rootGroupNodes'>
            {/* placeholder for eslint to not scream at me */}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Roadmap;
