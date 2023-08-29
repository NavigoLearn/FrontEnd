import React from 'react';
import {
  getConnectionPositionCoords,
  connectionSetter,
} from '@src/typescript/roadmap_ref/node/connections/services';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  IConnectionPositions,
  ConnectionClass,
} from '@src/typescript/roadmap_ref/node/connections/core';
import { getConnectionByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';

type IConnectionNodeSet = {
  node: NodeClass;
  connections: string[];
};

type IRedSquare = {
  x: number;
  y: number;
  positionType: IConnectionPositions;
  position: 'to' | 'from';
  connection: ConnectionClass;
};

const RedSquare = ({
  x,
  y,
  positionType,
  position,
  connection,
}: IRedSquare) => {
  const handleClick = () => {
    connectionSetter(position, connection, positionType);
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

const ConnectionNodeSet = ({ node, connections }: IConnectionNodeSet) => {
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

  return (
    <div>
      {connections.map((connectionId, index) => {
        const connection = getConnectionByIdRoadmapSelector(connectionId);

        if (index === 0) {
          // This is the case for the parent node
          return positions.map((positionType: IConnectionPositions) => {
            const currentNodeCoords = getConnectionPositionCoords(
              node,
              positionType
            );

            return (
              <RedSquare
                key={`${connectionId}-${positionType}`}
                x={currentNodeCoords.x}
                y={currentNodeCoords.y}
                connection={connection}
                positionType={positionType}
                position='from'
              />
            );
          });
        }

        return positions.map((positionType: IConnectionPositions) => {
          const endNodeCoords = getConnectionPositionCoords(node, positionType);

          return (
            <RedSquare
              key={`${connectionId}-${positionType}`}
              x={endNodeCoords.x}
              y={endNodeCoords.y}
              connection={connection}
              positionType={positionType}
              position='to'
            />
          );
        });
      })}
    </div>
  );
};

export default ConnectionNodeSet;
