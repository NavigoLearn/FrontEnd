import React from 'react';
import NodeRendererExperimental from '@components/roadmap/rendering-engines/optimized/components/NodeRendererExperimental';
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
      <filter id='shadow' x='-50%' y='-50%' width='200%' height='200%'>
        <feGaussianBlur in='SourceAlpha' stdDeviation='2' />
        <feOffset dy='2' result='offsetblur' />
        <feFlood floodColor='#B0B0B0' result='color' />
        <feComposite in2='offsetblur' operator='in' />
        <feComposite
          in='color'
          in2='offsetblur'
          operator='in'
          result='coloredBlur'
        />
        <feMerge>
          <feMergeNode in='coloredBlur' />
          <feMergeNode in='SourceGraphic' />
        </feMerge>
      </filter>

      <g id='rootGroupConnections'>
        <ConnectionsRenderer connectionsIds={connectionsIds} />
      </g>
      <g id='rootGroupNodes'>
        {nodesIds.map((id) => {
          // gets the roadmap-roadmap-data
          return (
            <NodeRendererExperimental
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
