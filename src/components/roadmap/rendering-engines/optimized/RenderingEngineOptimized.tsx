import React from 'react';
import ONodeRenderer from '@components/roadmap/rendering-engines/optimized/components/ONodeRenderer';
import ConnectionsRenderer from '@components/roadmap/connections/ConnectionsRenderer';
import SnappingLinesRenderer from '@components/roadmap/to-be-organized/SnappingLinesRenderer';

type IRenderingEngineClassicProps = {
  nodesIds: string[];
  connectionsIds: string[];
};

const RenderingEngineOptimized = ({
  nodesIds,
  connectionsIds,
}: IRenderingEngineClassicProps) => {
  return (
    <>
      <g id='rootGroupConnections'>
        {/* <ConnectionsRenderer connectionsIds={connectionsIds} /> */}
      </g>
      <g id='rootGroupNodes'>
        {nodesIds.map((id) => {
          // gets the roadmap-roadmap-data
          return (
            <ONodeRenderer
              key={id}
              centerOffset={{
                x: 0,
                y: 0,
              }}
              nodeId={id}
            />
          );
        })}
      </g>
      <g id='rootGroupSnappingLines'>
        <SnappingLinesRenderer />
      </g>
    </>
  );
};

export default RenderingEngineOptimized;
