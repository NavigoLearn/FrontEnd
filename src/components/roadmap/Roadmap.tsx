import React, { useEffect, useRef } from 'react';
import renderNodesStore from '@store/roadmap-refactor/render/rendered-nodes';
import {
  setChunkRerenderTrigger,
  triggerChunkRerender,
} from '@store/roadmap-refactor/render/rendered-chunks';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { useScrollHidden } from '@hooks/useScrollHidden';
import { v4 as uuid4 } from 'uuid';
import NodeManager from '@components/roadmap/NodeManager';
import { useStore } from '@nanostores/react';
import roadmapState, {
  setEditingTrueNoRerender,
  setRoadmapId,
  setRoadmapIsLoaded,
} from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import {
  addZoomAndRecenter,
  disableZoom,
} from '@src/typescript/roadmap_ref/render/zoom-d3';
import { recalculateChunks } from '@src/typescript/roadmap_ref/render/chunks';
import { triggerRecenterRoadmap } from '@store/roadmap-refactor/misc/miscParams';
import { useIsLoaded } from '@hooks/useIsLoaded';
import { setRoadmapFromAPI } from '@store/roadmap-refactor/roadmap-data/roadmap-view';
import { applyRoadmapDraggability } from '@src/typescript/roadmap_ref/dragging/misc';
import { useEffectAfterLoad } from '@hooks/useEffectAfterLoad';
import ConnectionRenderer from '@components/roadmap/ConnectionRenderer';
import renderConnectionsStore from '@store/roadmap-refactor/render/rendered-connections';
import { closeEditorProtocol } from '@src/to-be-organized/nodeview/actions-manager';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { factoryRoadmapClassic } from '@src/typescript/roadmap_ref/roadmap-templates/classic';
import SnappingLinesRenderer from '@components/roadmap/SnappingLinesRenderer';
import Popup from './tabs/popups/Popup';

const Roadmap = ({ pageId }: { pageId: string }) => {
  const isCreate = pageId === 'create'; // parameter to determine if we are in the create mode
  if (isCreate) {
    setEditingTrueNoRerender();
  }
  const { editing } = isCreate ? { editing: true } : useStore(roadmapState);
  // need to take the ids of the nodes-page included in the current chunks and render them
  const { nodes } = roadmapSelector.get();
  const { nodesIds } = useStore(renderNodesStore);
  const { connections: connectionsIds } = useStore(renderConnectionsStore);

  const chunkRenderer = useRef(null);
  useScrollHidden();
  const isLoaded = useIsLoaded();

  const enableZoom = () => {
    addZoomAndRecenter('rootSvg', 'rootGroup', chunkRenderer.current);
  };

  useEffect(() => {
    // dummmy data
    if (!isCreate) return;
    // factoryRoadmapFirstAttempt();
    factoryRoadmapClassic();
  }, []);

  const disableZoomFn = () => {
    disableZoom('rootSvg');
  };

  function initializeRoadmapAfterLoad() {
    applyRoadmapDraggability();
    setRoadmapIsLoaded();
    triggerChunkRerender();
    triggerRecenterRoadmap();
  }

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
        initializeRoadmapAfterLoad();
      });

    afterEventLoop(() => {
      isCreate &&
        (() => {
          initializeRoadmapAfterLoad();
        })();
    });
  }, []);

  useEffect(() => {
    addZoomAndRecenter('rootSvg', 'rootGroup', chunkRenderer.current);
  }, [editing, isCreate]);

  useEffectAfterLoad(() => {}, []);

  useEffectAfterLoad(() => {
    applyRoadmapDraggability();
  }, [nodesIds, editing]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className='w-full h-full pointer-events-auto'
      onClick={() => {
        // stupid workaround for clicking editor when clicking somewhere else
        closeEditorProtocol();
      }}
    >
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
          {editing && (
            <g id='rootGroupSnappingLines'>
              <SnappingLinesRenderer />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

export default Roadmap;
