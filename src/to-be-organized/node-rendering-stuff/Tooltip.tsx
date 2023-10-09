import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import {
  toolTipStore,
  getNodeType,
  isZoomed,
  setZoomed,
  toggleToolTip,
  getToggleToolTip,
} from './store-tooltip';
import { useNodeExternalData } from './node-renderer-hooks';

const ToolTip = () => {
  const { active } = useStore(toolTipStore);
  const zoomState = useStore(isZoomed);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const { editing } = useNodeExternalData();
  const nodeType = getNodeType();
  const prevCoordsRef = useRef({ x: 0, y: 0 });
  useStore(toggleToolTip);
  const show = getToggleToolTip();

  const messageTypeMap = {
    'Do nothing': '',
    'Open attachment': 'Open tab',
    'Open link': 'Go to link',
  };

  const message = messageTypeMap[nodeType];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newCoords = { x: e.clientX + 10, y: e.clientY - 85 };
      prevCoordsRef.current = coords;
      setCoords(newCoords);
      setZoomed(false);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [coords]);

  if (!show) return null;

  return (
    active &&
    message !== '' &&
    !editing &&
    !zoomState &&
    prevCoordsRef.current !== coords && (
      <div
        className='absolute pointer-events-none'
        style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
      >
        <div className='text-sm text-secondaryBlack whitespace-nowrap text-darkBlue text-opacity-60 bg-white rounded-sm px-2 py-0.5 border-gray-100 border-2 drop-shadow-2xl'>
          {message}
        </div>
      </div>
    )
  );
};

export default ToolTip;
