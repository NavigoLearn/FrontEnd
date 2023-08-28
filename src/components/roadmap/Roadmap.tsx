import React, { useEffect, useRef, useState } from 'react';
import {
  factoryRoadmapClassic,
  factoryRoadmapFirstAttempt,
} from '@src/typescript/roadmap_ref/roadmap-templates/classic';
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
import roadmapStateStore, {
  getRoadmapState,
  setRoadmapId,
  setRoadmapIsLoaded,
  setRoadmapState,
} from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import {
  enableRoadmapZoomDragAndRecenter,
  disableRoadmapDragZoom,
} from '@src/typescript/roadmap_ref/render/zoom-d3';
import { recalculateChunks } from '@src/typescript/roadmap_ref/render/chunks';
import { triggerRecenterRoadmap } from '@store/roadmap-refactor/misc/misc-params-store';
import { useIsLoaded } from '@hooks/useIsLoaded';
import { setRoadmapFromData } from '@store/roadmap-refactor/roadmap-data/roadmap-view';
import { applyRoadmapElementsDraggability } from '@src/typescript/roadmap_ref/dragging/misc';
import { useEffectAfterLoad } from '@hooks/useEffectAfterLoad';
import ConnectionRenderer from '@components/roadmap/ConnectionRenderer';
import renderConnectionsStore from '@store/roadmap-refactor/render/rendered-connections';
import { closeEditorProtocol } from '@src/to-be-organized/nodeview/actions-manager';
import { afterEventLoop } from '@src/typescript/utils/misc';
import SnappingLinesRenderer from '@components/roadmap/SnappingLinesRenderer';
import { addKeyListeners } from '@src/typescript/roadmap_ref/key-shortcuts';
import { RoadmapTypeApi } from '@type/explore/card';
import {
  setRoadmapDisableDrag,
  setRoadmapEnableDrag,
} from '@store/roadmap-refactor/roadmap-data/roadmap-functions-utils';
import Notifications from '@src/UI-library/Notifications';
import draggableElements from '@store/roadmap-refactor/elements-editing/draggable-elements';
import Popup from './tabs/popups/Popup';

export function initializeRoadmapAfterLoad() {
  applyRoadmapElementsDraggability();
  setRoadmapIsLoaded();
  triggerChunkRerender();
  triggerRecenterRoadmap();
}

const Roadmap = ({
  pageId,
  roadmap,
}: {
  pageId: string;
  roadmap: RoadmapTypeApi;
}) => {
  const isCreate = pageId === 'create'; // parameter to determine if we are in the create mode
  if (isCreate) {
    setRoadmapState('create');
  }
  const state = getRoadmapState();
  // need to take the ids of the nodes-page included in the current chunks and render them
  const { nodes } = roadmapSelector.get();
  const { nodesIds } = useStore(renderNodesStore);
  const { connections: connectionsIds } = useStore(renderConnectionsStore);

  const chunkRenderer = useRef(null);
  useScrollHidden();
  const isLoaded = useIsLoaded();
  const enableRoadmapDrag = () => {
    enableRoadmapZoomDragAndRecenter(
      'rootSvg',
      'rootGroup',
      chunkRenderer.current
    );
  };

  useEffect(() => {
    // dummmy data
    if (!isCreate) return;
    factoryRoadmapFirstAttempt();
    // factoryRoadmapClassic();
  }, []);

  const disableRoadmapDrag = () => {
    disableRoadmapDragZoom('rootSvg');
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

    if (!isCreate) setRoadmapId(roadmap.id);
    else setRoadmapId(uuid4());
    // fetches the roadmap-roadmap-data from the api-wrapper
    // ...

    !isCreate &&
      setRoadmapFromData(roadmap).then(() => {
        initializeRoadmapAfterLoad();
      });

    setRoadmapDisableDrag(disableRoadmapDrag);
    setRoadmapEnableDrag(enableRoadmapDrag);
  }, []);

  useEffect(() => {
    enableRoadmapZoomDragAndRecenter(
      'rootSvg',
      'rootGroup',
      chunkRenderer.current
    );
  }, [state, isCreate]);

  useEffectAfterLoad(() => {
    // adding event
    addKeyListeners();
  }, []);

  useEffectAfterLoad(() => {
    applyRoadmapElementsDraggability();
  }, [nodesIds, state]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className='w-full h-full pointer-events-auto'
      onClick={() => {
        // stupid workaround for clicking editor when clicking somewhere else
        closeEditorProtocol();
      }}
    >
      {/* <Notifications /> */}
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
          {isLoaded && state === 'edit' && (
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
