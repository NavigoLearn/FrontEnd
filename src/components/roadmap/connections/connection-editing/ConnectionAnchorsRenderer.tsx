import React from 'react';
import { getAnchorPositionRelativeToNode } from '@src/typescript/roadmap_ref/node/connections/services';
import {
  type IConnectionPositions,
  ConnectionClass,
} from '@src/typescript/roadmap_ref/node/connections/core';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import ConnectionAnchor from '@components/roadmap/connections/connection-editing/ConnectionAnchor';

type IConnectionNodeSet = {
  connection: ConnectionClass;
  nodeId: string;
  type: 'child' | 'parent';
};

const ConnectionAnchorsRenderer = ({
  connection,
  nodeId,
  type,
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
  const anchorFromPosition = connection.positionFrom;
  const anchorToPosition = connection.positionTo;

  return (
    <div className='absolute left-0 top-0'>
      {positions.map((positionType: IConnectionPositions) => {
        const anchorWidth = Math.min(node.data.width / 5, 50);
        const anchorHeight = Math.min(node.data.height / 3, 50);

        const anchorCoords = getAnchorPositionRelativeToNode(
          node,
          positionType
        );
        anchorCoords.x -= anchorWidth / 2;
        anchorCoords.y -= anchorHeight / 2;

        const isFilled =
          type === 'parent'
            ? positionType === anchorFromPosition
            : positionType === anchorToPosition;

        return (
          <ConnectionAnchor
            x={anchorCoords.x}
            y={anchorCoords.y}
            width={anchorWidth}
            height={anchorHeight}
            filled={isFilled}
            connection={connection}
            positionType={positionType}
            position={type === 'child' ? 'to' : 'from'}
            // nodeId={nodeId}
            key={`position-${positionType}`}
          />
        );
      })}
    </div>
  );
};

export default ConnectionAnchorsRenderer;
