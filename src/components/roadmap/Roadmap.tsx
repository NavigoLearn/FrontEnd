import React, { useEffect, useRef } from 'react';
import renderNodesStore from '@store/roadmap-refactor/render/rendered-nodes';
import {
  setChunkRerenderTrigger,
  triggerChunkRerender,
} from '@store/roadmap-refactor/render/rendered-chunks';
import {
  addConnectionRoadmapSelector,
  addNode,
  addRootNodeId,
  roadmapSelector,
} from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { useScrollHidden } from '@hooks/useScrollHidden';
import { v4 as uuid4 } from 'uuid';
import NodeManager from '@components/roadmap/NodeManager';
import { useStore } from '@nanostores/react';
import roadmapState, {
  setEditingTrueNoRerender,
  setRoadmapId,
  setRoadmapIsLoaded,
} from '@store/roadmap/data/roadmap_state';
import { addZoom, disableZoom } from '@src/typescript/roadmap/d3utils';
import { recalculateChunks } from '@src/typescript/roadmap_ref/render/chunks';
import {
  setDisableZoomTrigger,
  setEnableZoomTrigger,
  triggerRecenterRoadmap,
} from '@store/roadmap-refactor/misc/miscParams';
import { useIsLoaded } from '@hooks/useIsLoaded';
import { factoryNodeClassic } from '@src/typescript/roadmap_ref/node/core/factories/templates/classic';
import { factorySubNode } from '@src/typescript/roadmap_ref/node/core/factories/templates/sub-node';
import { appendSubNode } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { setRoadmapFromAPI } from '@store/roadmap-refactor/roadmap-data/roadmap-view';
import { applyRoadmapDraggability } from '@src/typescript/roadmap_ref/dragging/misc';
import { useEffectAfterLoad } from '@hooks/useEffectAfterLoad';
import { hydrateRoadmap } from '@src/typescript/roadmap_ref/hydration/roadmap-hydration';
import ConnectionRenderer from '@components/roadmap/ConnectionRenderer';
import renderConnectionsStore from '@store/roadmap-refactor/render/rendered-connections';
import { factoryConnection } from '@src/typescript/roadmap_ref/node/connections/factories-protocols';
import Popup from './tabs/popups/Popup';

const Roadmap = ({ pageId }: { pageId: string }) => {
  const isCreate = pageId === 'create'; // parameter to determine if we are in the create mode
  if (isCreate) {
    setEditingTrueNoRerender();
  }
  const { editing } = isCreate ? { editing: true } : useStore(roadmapState);
  // need to take the ids of the nodes included in the current chunks and render them
  const { nodes } = roadmapSelector.get();
  const { nodesIds } = useStore(renderNodesStore);
  const { connections: connectionsIds } = useStore(renderConnectionsStore);

  const chunkRenderer = useRef(null);
  useScrollHidden();
  const isLoaded = useIsLoaded();

  const enableZoomFn = () => {
    addZoom('rootSvg', 'rootGroup', chunkRenderer.current);
  };

  useEffect(() => {
    // dummmy data
    if (!isCreate) return;

    const node0 = factoryNodeClassic(500, 200, 500, 500);
    const node1 = factoryNodeClassic(100, 100, 200, 100);
    const connection0 = factoryConnection(node0, node1);
    const subNode00 = factorySubNode(node0.id, 100, 50, -75, -75);
    const subNode01 = factorySubNode(node0.id, 100, 50, 75, 75);
    const subNode02 = factorySubNode(node0.id, 100, 50, 75, -75);
    const subNode03 = factorySubNode(node0.id, 100, 50, -75, 75);
    addNode(node0);
    addNode(node1);
    addConnectionRoadmapSelector(connection0);

    appendSubNode(node0, subNode00.id);
    appendSubNode(node0, subNode01.id);
    appendSubNode(node0, subNode02.id);
    appendSubNode(node0, subNode03.id);

    addNode(subNode00);
    addNode(subNode01);
    addNode(subNode02);
    addNode(subNode03);

    addRootNodeId(node0.id);
    addRootNodeId(node1.id);
  }, []);

  const disableZoomFn = () => {
    disableZoom('rootSvg');
  };

  useEffect(() => {
    // renderer object that handles chunking
    chunkRenderer.current = recalculateChunks('rootSvg');
    // sets the trigger for chunk recalculations to a global state

    setChunkRerenderTrigger(
      // used for decorators
      () => {
        chunkRenderer.current();
      }
    );

    if (!isCreate) setRoadmapId(pageId);
    else setRoadmapId(uuid4());
    // fetches the roadmap-roadmap-data from the api-wrapper
    // ...
    !isCreate &&
      setRoadmapFromAPI(pageId).then(() => {
        hydrateRoadmap();
        triggerChunkRerender();
        applyRoadmapDraggability();
      });
    isCreate && setRoadmapIsLoaded();
    isCreate && triggerChunkRerender();

    setRoadmapIsLoaded();

    setEnableZoomTrigger(() => {
      enableZoomFn();
    });

    setDisableZoomTrigger(() => {
      disableZoomFn();
    });
  }, []);

  useEffect(() => {
    enableZoomFn();
  }, [editing, isCreate]);

  useEffectAfterLoad(() => {
    triggerRecenterRoadmap();
  }, []);

  useEffectAfterLoad(() => {
    // the dynamically injected strategies need to be hydrated into the class to be used since they are lost on serialization
    // the strategies need refactor into their own strategies libraries and not embedded into the node class so we avoid hydration completely
    // hydrateRoadmap();
  }, [editing]);

  useEffectAfterLoad(() => {
    applyRoadmapDraggability();
  }, [nodesIds]);

  return (
    <div className='w-full h-full '>
      <Popup />
      <svg
        id='rootSvg'
        width='100%'
        height='100%'
        className='bg-background pointer-events-auto'
      >
        <g id='rootGroup'>
          <g id='rootGroupConnections'>
            <ConnectionRenderer connectionsIds={connectionsIds} />
          </g>
          <g id='rootGroupNodes'>
            {isLoaded &&
              nodesIds.map((id) => {
                // gets the roadmap-roadmap-data
                return <NodeManager key={id} node={nodes[id]} />;
              })}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Roadmap;
