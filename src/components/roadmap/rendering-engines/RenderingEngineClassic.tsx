import React from 'react';
import ReactDOM from 'react-dom';
import NodeManager from '@components/roadmap/to-be-organized/NodeHOCForeignObject';
import ConnectionsRenderer from '@components/roadmap/connections/ConnectionsRenderer';
import SnappingLinesRenderer from '@components/roadmap/to-be-organized/SnappingLinesRenderer';
import NodeRendererClassic from '@src/to-be-organized/node-rendering-stuff/NodeRendererClassic';
import NodeContextMenu from '@components/roadmap/contextmenu/NodeContextMenu';

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
          return <NodeRendererClassic nodeId={id} />;
        })}
        {ReactDOM.createPortal(
          <NodeContextMenu />,
          document.getElementById('menu-portal') ?? document.body
        )}
      </g>
      <g id='rootGroupSnappingLines'>
        <SnappingLinesRenderer />
      </g>
    </>
  );
};

export default RenderingEngineClassic;
