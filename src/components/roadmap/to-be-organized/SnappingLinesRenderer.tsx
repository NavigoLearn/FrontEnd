import React from 'react';
import { useStore } from '@nanostores/react';
import {
  ISnapping,
  snappingCoordinates,
} from '@store/roadmap-refactor/render/snapping-lines';

const SnappingLinesRenderer = () => {
  const { snappings } = useStore(snappingCoordinates);
  return (
    <>
      {snappings.map(({ startX, startY, endX, endY }: ISnapping) => {
        return (
          <line
            key={Math.random()}
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke='red'
            strokeWidth='2'
            opacity={0.55}
          />
        );
      })}
    </>
  );
};

export default SnappingLinesRenderer;
