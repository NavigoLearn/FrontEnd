import React from 'react';
import {
  getConnectionPositionCoords,
  connectionSetter,
  getAnchorPositionRelativeToNodes,
} from '@src/typescript/roadmap_ref/node/connections/services';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  IConnectionPositions,
  ConnectionClass,
} from '@src/typescript/roadmap_ref/node/connections/core';
import { triggerNodeRerender } from '@src/store/roadmap-refactor/render/rerender-triggers-nodes';
import { triggerConnectionRerender } from '@src/store/roadmap-refactor/render/rerender-trigger-connections';
import {
  getConnectionByIdRoadmapSelector,
  getNodeByIdRoadmapSelector,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';

type IConnectionNodeSet = {
  connection: ConnectionClass | null;
  nodeId: string;
  kind: 'child' | 'parent';
};

type IRedSquare = {
  x: number;
  y: number;
  positionType: IConnectionPositions;
  position: 'to' | 'from';
  connection: ConnectionClass;
  nodeId: string;
};

const RedSquare = ({
  x,
  y,
  positionType,
  position,
  connection,
}: IRedSquare) => {
  const handleClick = (e) => {
    connectionSetter(position, connection, positionType);
    triggerConnectionRerender(connection.id);
    e.stopPropagation();
  };

  return (
    <button
      type='button'
      className='w-4 h-4 bg-red-500 absolute'
      style={{ top: `${y}px`, left: `${x}px` }}
      onClick={handleClick}
    />
  );
};

const ConnectionNodeSet = ({
  connection,
  nodeId,
  kind,
}: IConnectionNodeSet) => {
  const positions = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
    'center',
    'left',
    'right',
    'top',
    'bottom',
  ];

  const node = getNodeByIdRoadmapSelector(nodeId);
  console.log(kind);

  if (kind === 'child') {
    return (
      <div className='absolute left-0 top-0'>
        {positions.map((positionType: IConnectionPositions) => {
          const nodeCoords = getAnchorPositionRelativeToNodes(
            node,
            positionType
          );

          return (
            <RedSquare
              x={nodeCoords.x}
              y={nodeCoords.y}
              connection={connection}
              positionType={positionType}
              position='to'
              nodeId={nodeId}
              key={`position-${positionType}`}
            />
          );
        })}
      </div>
    );
  }

  if (kind === 'parent') {
    return (
      <div className='absolute left-0 top-0'>
        {positions.map((positionType: IConnectionPositions) => {
          const nodeCoords = getAnchorPositionRelativeToNodes(
            node,
            positionType
          );

          return (
            <RedSquare
              x={nodeCoords.x}
              y={nodeCoords.y}
              connection={connection}
              positionType={positionType}
              position='from'
              nodeId={nodeId}
              key={`position-${positionType}`}
            />
          );
        })}
      </div>
    );
  }

  return null; // Optional, in case there's another kind value
};

export default ConnectionNodeSet;
