import React from 'react';
import { useStore } from '@nanostores/react';
import {
  type ISnapDrawCoordintes,
  snappingCoordinates,
} from '@store/roadmap-refactor/render/snapping-lines';

const SnappingLinesRenderer = () => {
  const { snappings } = useStore(snappingCoordinates);
  return (
    <>
      {snappings.map(({ startX, startY, endX, endY }: ISnapDrawCoordintes) => {
        return (
          <line
            key={Math.random()}
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke='red'
            strokeWidth='1.5'
            opacity={1}
          />
        );
      })}
    </>
  );
};

export default SnappingLinesRenderer;
