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
      {/* <filter id='shadow' x='-50%' y='-50%' width='200%' height='200%'> */}
      {/*  <feGaussianBlur in='SourceAlpha' stdDeviation='2' /> */}
      {/*  <feOffset dx='2' dy='2' result='offsetblur' /> */}
      {/*  <feFlood floodColor='black' result='color' /> */}
      {/*  <feComposite in2='offsetblur' operator='in' /> */}
      {/*  <feComposite in2='SourceAlpha' operator='in' /> */}
      {/*  <feMerge> */}
      {/*    <feMergeNode in='offsetblur' /> */}
      {/*    <feMergeNode in='SourceGraphic' /> */}
      {/*  </feMerge> */}
      {/* </filter> */}
      <g id='rootGroupConnections'>
        <ConnectionsRenderer connectionsIds={connectionsIds} />
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
