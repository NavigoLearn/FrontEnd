import React, { useEffect, useRef, useState } from 'react';
import {
  factoryRoadmapFirstAttempt,
  createAndSetRoadmapClassic,
} from '@src/typescript/roadmap_ref/roadmap-templates/classic';
import renderNodesStore from '@store/roadmap-refactor/render/rendered-nodes';
import {
  getChunkRerenderTrigger,
  setChunkRerenderTrigger,
  triggerChunkRerender,
} from '@store/roadmap-refactor/render/rendered-chunks';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { useScrollHidden } from '@hooks/useScrollHidden';
import { v4 as uuid4 } from 'uuid';
import NodeManager from '@components/roadmap/to-be-organized/NodeManager';
import { useStore } from '@nanostores/react';
import {
  setRoadmapId,
  setRoadmapIsLoaded,
  setRoadmapState,
  setHasStarterTab,
  getRoadmapState,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import {
  disableRoadmapDragZoomAnd,
  enableRoadmapZoomDragAndRecenter,
} from '@src/typescript/roadmap_ref/render/zoom-d3';
import { recalculateChunks } from '@src/typescript/roadmap_ref/render/chunks';
import { triggerRecenterRoadmap } from '@store/roadmap-refactor/misc/misc-params-store';
import { useIsLoaded } from '@hooks/useIsLoaded';
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
import { RoadmapTypeApi } from '@type/explore_old/card';
import {
  enableRoadmapInteractions,
  setRoadmapDisableDragAndZoom,
  setRoadmapEnableDragAndZoom,
} from '@store/roadmap-refactor/roadmap-data/roadmap-functions-utils';
import ElementsDisplayManager from '@components/roadmap/elements-display/ElementsDisplayManager';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { clearSelectedConnection } from '@components/roadmap/connections/connection-editing/connection-store';
import { setEditingState } from '@store/roadmap-refactor/editing/editing-state';
import { setRoadmapEditFromAPI } from '@store/roadmap-refactor/roadmap-data/roadmap-edit';
import {
  setRoadmapType,
  getRoadmapType,
  setRoadmapAboutName,
  DEFAULT_NAME,
  setRoadmapAboutDescription,
  DEFAULT_DESCRIPTION,
  setRoadmapAboutOwnerId,
  setRoadmapAboutId,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';
import userStatus from '@store/user/user-status';
import { checkIfSessionExists } from '@src/typescript/roadmap_ref/history/restoreSession';
import { setDisplayPageTypeFullScreen } from '@store/roadmap-refactor/display/display-manager-full-screen';
import { setRoadmapCreate } from '@store/roadmap-refactor/roadmap-data/roadmap-create';
import { setRoadmapViewFromAPI } from '@store/roadmap-refactor/roadmap-data/roadmap-view';

export function initialRoadmapProtocolAfterLoad() {
  setRoadmapIsLoaded();
  triggerChunkRerender();
  triggerRecenterRoadmap();
  afterEventLoop(() => {
    applyRoadmapElementsInitialDraggability();
  });
}

export function checkAndSetInitialRoadmapType(
  roadmap: RoadmapTypeApi,
  pageId: string
) {
  const isCreate = pageId === 'create'; // parameter to determine if we are in the create mode
  if (isCreate) {
    setRoadmapType('create');
    return;
  }
  const isDraft = roadmap.isDraft === true;
  const isPublic = roadmap.isPublic === true;

  if (!isDraft && !isPublic) {
    throw new Error('Roadmap is neither draft nor public');
  }

  if (isDraft) {
    setRoadmapType('draft');
  }
  if (isPublic) {
    setRoadmapType('public');
  }
}

export function initializeRoadmapTypeData(roadmap?: RoadmapTypeApi) {
  const type = getRoadmapType();
  if (type === 'create') {
    createAndSetRoadmapClassic();
    setRoadmapState('edit');
  }
  if (type === 'draft') {
    setRoadmapEditFromAPI(roadmap);
    setRoadmapState('edit');
  }

  if (type === 'public') {
    setRoadmapViewFromAPI(roadmap);
    setRoadmapState('view');
  }
}

function initializeRoadmapInteractions() {
  const chunkRecalculation = getChunkRerenderTrigger();
  const enableRoadmapInteraction = () => {
    enableRoadmapZoomDragAndRecenter(
      'rootSvg',
      'rootGroup',
      chunkRecalculation
    );
  };

  const disableRoadmapInteraction = () => {
    disableRoadmapDragZoomAnd('rootSvg');
  };

  setRoadmapDisableDragAndZoom(disableRoadmapInteraction);
  setRoadmapEnableDragAndZoom(enableRoadmapInteraction);
}

function initializeChunkRerendering() {
  const chunkRecalculation = recalculateChunks('rootSvg');
  setChunkRerenderTrigger(() => {
    chunkRecalculation();
  });
}

function initializeRoadmapAboutData(roadmap?: RoadmapTypeApi) {
  const type = getRoadmapType();
  if (type === 'create') {
    setRoadmapAboutName(DEFAULT_NAME);
    setRoadmapAboutDescription(DEFAULT_DESCRIPTION);
    setRoadmapAboutOwnerId('');
  }
  if (type === 'draft' || type === 'public') {
    if (!roadmap)
      throw new Error('Roadmap is undefined despite being draft mode?');
    const { name, description, userId, id } = roadmap;
    console.log('roadmap', roadmap);

    setRoadmapAboutName(name);
    setRoadmapAboutDescription(description);
    setRoadmapAboutOwnerId(userId);
    setRoadmapAboutId(id);
  }
}

function handleRoadmapSessionRestoration() {
  return false;
  if (checkIfSessionExists()) {
    console.log('restoring session');
  }
  return false;
}

type IHandleRoadmapDataStatus =
  | 'restored'
  | 'factory-created'
  | 'retrieved-from-api'
  | 'error';

function handleRoadmapRenderingData(
  roadmap?: RoadmapTypeApi
): IHandleRoadmapDataStatus {
  const type = getRoadmapType();
  if (type === 'create') {
    const restoredFromCache = handleRoadmapSessionRestoration();

    if (restoredFromCache) {
      initialRoadmapProtocolAfterLoad();
      return 'restored';
    }
    // otherwise the initialization triggers from the setup screen
    createAndSetRoadmapClassic(); // also handles setting the roadmap data in the store
    return 'factory-created';
  }
  if (type === 'draft' || type === 'public') {
    setRoadmapEditFromAPI(roadmap);
    initialRoadmapProtocolAfterLoad();
    return 'retrieved-from-api';
  }
  throw new Error('Roadmap rendering data initialization failed');
}

function handleRoadmapAfterLoadInitialization(
  status: IHandleRoadmapDataStatus
) {
  console.log('handleRoadmapAfterLoadInitialization', status);
  if (status === 'restored') {
    initialRoadmapProtocolAfterLoad();
    return;
  }
  if (status === 'factory-created') {
    setDisplayPageTypeFullScreen('setup-screen');
    setHasStarterTab(true);
    // intialization is done as a side effect in the setup screen
  }
  if (status === 'retrieved-from-api') {
    initialRoadmapProtocolAfterLoad();
  }
}

const Roadmap = ({
  pageId,
  roadmap,
}: {
  pageId: string;
  roadmap: RoadmapTypeApi;
}) => {
  useScrollHidden();

  const { nodesIds } = useStore(renderNodesStore);
  const { connections: connectionsIds } = useStore(renderConnectionsStore);

  const firstRenderDone = useIsLoaded();

  useEffectAfterLoad(() => {
    // rendering and interactivity initializations
    initializeChunkRerendering();
    initializeRoadmapInteractions();
    enableRoadmapInteractions();

    // data initializations
    checkAndSetInitialRoadmapType(roadmap, pageId);
    initializeRoadmapAboutData(roadmap); // all the misc data about the roadmap like title, desc, id etc
    const dataRetrievalStatus = handleRoadmapRenderingData(roadmap); // .data from api
    handleRoadmapAfterLoadInitialization(dataRetrievalStatus);
  }, []);

  useEffectAfterLoad(() => {
    // adding event
    addKeyListeners();
  }, []);

  useEffectAfterLoad(() => {
    if (firstRenderDone && nodesIds.length > 0) {
      applyNodesDraggability();
    }
  }, [nodesIds]);

  return (
    <div
      className='w-full h-full pointer-events-auto'
      onClick={() => {
        // stupid workaround for clicking editor when clicking somewhere else
        closeEditorProtocol();
        clearSelectedConnection();
        setEditingState('nodes');
      }}
    >
      <ElementsDisplayManager />
      <svg
        id='rootSvg'
        width='100%'
        height='100%'
        className='bg-backgroundRoadmap pointer-events-auto'
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
