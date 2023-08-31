import React, { useEffect, useRef, useState } from 'react';
import {
  factoryRoadmapFirstAttempt,
  factoryRoadmapClassic,
} from '@src/typescript/roadmap_ref/roadmap-templates/classic';
import renderNodesStore from '@store/roadmap-refactor/render/rendered-nodes';
import {
  setChunkRerenderTrigger,
  triggerChunkRerender,
} from '@store/roadmap-refactor/render/rendered-chunks';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { useScrollHidden } from '@hooks/useScrollHidden';
import { v4 as uuid4 } from 'uuid';
import NodeManager from '@components/roadmap/to-be-organized/NodeManager';
import { useStore } from '@nanostores/react';
import {
  getRoadmapState,
  getRoadmapStateStore,
  setRoadmapId,
  setRoadmapIsLoaded,
  setRoadmapState,
} from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import {
  disableRoadmapDragZoom,
  enableRoadmapZoomDragAndRecenter,
} from '@src/typescript/roadmap_ref/render/zoom-d3';
import { recalculateChunks } from '@src/typescript/roadmap_ref/render/chunks';
import { triggerRecenterRoadmap } from '@store/roadmap-refactor/misc/misc-params-store';
import { useIsLoaded } from '@hooks/useIsLoaded';
import { setRoadmapFromData } from '@store/roadmap-refactor/roadmap-data/roadmap-view';
import {
  applyNodesDraggability,
  applyRoadmapElementsInitialDraggability,
} from '@src/typescript/roadmap_ref/dragging/misc';
import { useEffectAfterLoad } from '@hooks/useEffectAfterLoad';
import ConnectionsRenderer from '@components/roadmap/connections/ConnectionsRenderer';
import renderConnectionsStore from '@store/roadmap-refactor/render/rendered-connections';
import { closeEditorProtocol } from '@src/to-be-organized/nodeview/actions-manager';
import SnappingLinesRenderer from '@components/roadmap/to-be-organized/SnappingLinesRenderer';
import { addKeyListeners } from '@src/typescript/roadmap_ref/key-shortcuts';
import { RoadmapTypeApi } from '@type/explore/card';
import {
  setRoadmapDisableDrag,
  setRoadmapEnableDrag,
} from '@store/roadmap-refactor/roadmap-data/roadmap-functions-utils';
import { useEffectDelayedCycle } from '@hooks/useEffectDelayedCycle';
import ElementsDisplayManager from '@components/roadmap/elements-display/ElementsDisplayManager';
import {
  checkIfSessionExists,
  clearSession,
  restoreSession,
  saveSession,
} from '@src/typescript/roadmap_ref/history/restoreSession';
import { afterEventLoop } from '@src/typescript/utils/misc';

export function initializeRoadmapAfterLoad() {
  setRoadmapIsLoaded();
  triggerChunkRerender();
  triggerRecenterRoadmap();
  afterEventLoop(() => {
    applyRoadmapElementsInitialDraggability();
  });
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
  const initialState = getRoadmapState();
  const stateStore = getRoadmapStateStore();
  const { loaded } = stateStore;
  const [state, _] = useState(initialState);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  // need to take the ids of the nodes-page included in the current chunks and render them
  const { nodes } = roadmapSelector.get();
  const { nodesIds } = useStore(renderNodesStore);
  const { connections: connectionsIds } = useStore(renderConnectionsStore);

  const chunkRenderer = useRef(null);
  useScrollHidden();
  const firstRenderDone = useIsLoaded();

  const enableRoadmapDrag = () => {
    enableRoadmapZoomDragAndRecenter(
      'rootSvg',
      'rootGroup',
      chunkRenderer.current
    );
  };

  function onBeforeUnload(e: BeforeUnloadEvent) {
    const state = getRoadmapState();
    // console.error('onBeforeUnload', state, isCreate)
    if (isCreate || state === 'edit') {
      setConfirmed(true);
      setTimeout(() => {
        setConfirmed(false);
      }, 10000);
      // Cancel the event
      e.preventDefault();
      const msg =
        'Are you sure you want to leave? All your changes will be lost.';
      e.returnValue = msg;
      return msg;
    }
  }

  useEffect(() => {
    // dummmy data
    if (!isCreate) return;
    // factoryRoadmapFirstAttempt();
    factoryRoadmapClassic();
  }, []);

  const disableRoadmapDrag = () => {
    disableRoadmapDragZoom('rootSvg');
  };

  useEffect(() => {
    // ! commented out to avoid infinite loop of re-renders
    // roadmapStateStore.subscribe(() => {
    //   setState(getRoadmapState());
    // });
    if (isCreate) {
      setInterval(async () => {
        await saveSession();
      }, 10000);
    }

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

    window.addEventListener('beforeunload', onBeforeUnload);

    if (checkIfSessionExists()) {
      restoreSession();
    }
  }, []);

  useEffect(() => {
    window.onunload = () => {
      if (confirmed) clearSession();
    };
  }, [confirmed]);

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
    if (loaded && nodesIds.length > 0) {
      applyNodesDraggability();
    }
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
      <ElementsDisplayManager />
      <svg
        id='rootSvg'
        width='100%'
        height='100%'
        className='bg-background pointer-events-auto'
      >
        <g id='rootGroup'>
          <g id='rootGroupConnections'>
            <ConnectionsRenderer connectionsIds={connectionsIds} />
          </g>
          <g id='rootGroupNodes'>
            {firstRenderDone &&
              nodesIds.map((id) => {
                // gets the roadmap-roadmap-data
                return <NodeManager key={id} nodeId={id} />;
              })}
          </g>
          {firstRenderDone && (
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
