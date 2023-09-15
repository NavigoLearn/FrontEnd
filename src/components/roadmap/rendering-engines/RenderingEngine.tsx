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
  const { renderingEngineType } = useStore(storeRenderingEngine);

  return (
    <>
      {renderingEngineType === 'foreign-object' && (
        <RenderingEngineClassic
          nodesIds={nodesIds}
          connectionsIds={connectionsIds}
        />
      )}
      {renderingEngineType === 'native-elements' && (
        <RenderingEngineOptimized
          nodesIds={nodesIds}
          connectionsIds={connectionsIds}
        />
      )}
    </>
  );
};

export default RenderingEngine;
