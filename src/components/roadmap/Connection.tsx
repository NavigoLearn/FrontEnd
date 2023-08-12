import React, { useEffect } from 'react';
import {
  getConnectionByIdRoadmapSelector,
  getNodeByIdRoadmapSelector,
} from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { getConnectionPositionCoords } from '@src/typescript/roadmap_ref/node/connections/services';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import { addConnectionTrigger } from '@store/roadmap-refactor/render/rerender-trigger-connections';

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

  const dValue = `M${startX},${startY} L${endX},${endY}`;
  return (
    <path
      className='dashed-line animate-flowingDash stroke-3 stroke-primary fill-none pointer-events-none'
      d={dValue}
    />
  );
};

export default Connection;
