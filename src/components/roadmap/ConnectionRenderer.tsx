import React from 'react';
import Connection from '@components/roadmap/Connection';

const ConnectionRenderer = ({
  connectionsIds,
}: {
  connectionsIds: string[];
}) => {
  console.log('rerender connections');
  return (
    <>
      {connectionsIds.map((connectionId) => {
        return (
          <g key={connectionId} id={`g${connectionId}`}>
            <Connection key={connectionId} connId={connectionId} />
          </g>
        );
      })}
    </>
  );
};

export default ConnectionRenderer;
