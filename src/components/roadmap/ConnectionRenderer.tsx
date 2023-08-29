import React from 'react';
import Connection from '@components/roadmap/Connection';
import { useIsLoaded } from '@hooks/useIsLoaded';

const ConnectionRenderer = ({
  connectionsIds,
}: {
  connectionsIds: string[];
}) => {
  const loaded = useIsLoaded();
  if (!loaded) return null;
  return (
    <>
      {connectionsIds.map((connectionId) => {
        return (
          <g id={`g${connectionId}`} key={connectionId}>
            <Connection key={connectionId} connId={connectionId} />
          </g>
        );
      })}
    </>
  );
};

export default ConnectionRenderer;
