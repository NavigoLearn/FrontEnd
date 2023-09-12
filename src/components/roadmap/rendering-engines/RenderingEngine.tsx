import React from 'react';
import RenderingEngineClassic from '@components/roadmap/rendering-engines/RenderingEngineClassic';
import RenderingEngineOptimized from '@components/roadmap/rendering-engines/optimized/RenderingEngineOptimized';
import { useStore } from '@nanostores/react';
import { storeRenderingEngine } from '@components/roadmap/rendering-engines/store-rendering-engine';

type IRenderingEngineNodesProps = {
  nodesIds: string[];
  connectionsIds: string[];
};
const RenderingEngine = ({
  nodesIds,
  connectionsIds,
}: IRenderingEngineNodesProps) => {
  let { renderingType } = useStore(storeRenderingEngine);
  renderingType = 'classic';
  return (
    <>
      {renderingType === 'classic' && (
        <RenderingEngineClassic
          nodesIds={nodesIds}
          connectionsIds={connectionsIds}
        />
      )}
      {renderingType === 'optimized' && (
        <RenderingEngineOptimized
          nodesIds={nodesIds}
          connectionsIds={connectionsIds}
        />
      )}
    </>
  );
};

export default RenderingEngine;
