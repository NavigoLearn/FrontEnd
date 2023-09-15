import React from 'react';
import NodeManager from '@components/roadmap/to-be-organized/NodeManager';
import ConnectionsRenderer from '@components/roadmap/connections/ConnectionsRenderer';
import SnappingLinesRenderer from '@components/roadmap/to-be-organized/SnappingLinesRenderer';

type IRenderingEngineClassicProps = {
  nodesIds: string[];
  connectionsIds: string[];
};

const RenderingEngineClassic = ({
  nodesIds,
  connectionsIds,
}: IRenderingEngineClassicProps) => {
  return (
    <>
      <g id='rootGroupConnections'>
        <ConnectionsRenderer connectionsIds={connectionsIds} />
      </g>
      <g id='rootGroupNodes'>
        {nodesIds.map((id) => {
          // gets the roadmap-roadmap-data
          return <NodeManager key={id} nodeId={id} />;
        })}
      </g>
      <g id='rootGroupSnappingLines'>
        <SnappingLinesRenderer />
      </g>
    </>
  );
};

export default RenderingEngineClassic;
