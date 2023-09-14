import React from 'react';
import Connection from '@components/roadmap/connections/Connection';
import { useIsLoaded } from '@hooks/useIsLoaded';

const ConnectionsRenderer = ({
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

export default ConnectionsRenderer;
