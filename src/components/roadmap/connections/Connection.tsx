import React, { useEffect, useRef } from 'react';
import {
  getConnectionByIdRoadmapSelector,
  getNodeByIdRoadmapSelector,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { getConnectionPositionCoords } from '@src/typescript/roadmap_ref/node/connections/services';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import { addConnectionTrigger } from '@store/roadmap-refactor/render/rerender-trigger-connections';
import { setSelectedConnectionForConnectionId } from '@components/roadmap/connections/connection-editing/connection-store';

const Connection = ({ connId }: { connId: string }) => {
  const rerender = useTriggerRerender();

  useEffect(() => {
    addConnectionTrigger(connId, rerender);
  }, []);

  const connection = getConnectionByIdRoadmapSelector(connId);
  const startNode = getNodeByIdRoadmapSelector(connection.from);
  const endNode = getNodeByIdRoadmapSelector(connection.to);
  const { x: startX, y: startY } = getConnectionPositionCoords(
    startNode,
    connection.positionFrom
  );
  const { x: endX, y: endY } = getConnectionPositionCoords(
    endNode,
    connection.positionTo
  );

  const pathRef = useRef(null);
  const rectRef = useRef(null);

  useEffect(() => {
    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

    rectRef.current.setAttribute('x', startX);
    rectRef.current.setAttribute('y', startY - 8); // -5 centers the rectangle around the line
    rectRef.current.setAttribute(
      'width',
      Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2)
    );
    rectRef.current.setAttribute('height', 16);
    rectRef.current.setAttribute(
      'transform',
      `rotate(${angle}, ${startX}, ${startY})`
    );
  });

  const dValue = `M${startX},${startY} L${endX},${endY}`;

  return (
    <g>
      <path
        ref={pathRef}
        className='dashed-line animate-flowingDash stroke-3 stroke-primary fill-none pointer-events-none'
        d={dValue}
      />
      <rect
        ref={rectRef}
        fill='transparent'
        pointerEvents='visible'
        onClick={(e) => {
          setSelectedConnectionForConnectionId(connId);
          e.stopPropagation();
        }}
      />
    </g>
  );
};

export default Connection;
