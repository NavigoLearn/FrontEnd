import React from 'react';
import { createAndSetRoadmapClassicRefactored } from '@src/typescript/roadmap_ref/roadmap-templates/classic';
import renderNodesStore, {
  getRenderedRootNodesIds,
} from '@store/roadmap-refactor/render/rendered-nodes';
import {
  getChunkRerenderTrigger,
  setChunkRerenderTrigger,
  triggerChunkRerender,
} from '@store/roadmap-refactor/render/rendered-chunks';
import { useScrollHidden } from '@hooks/useScrollHidden';
import { useStore } from '@nanostores/react';
import roadmapStateStore, {
  setRoadmapIsLoaded,
  setRoadmapState,
  setHasStarterTab,
  getIsEditing,
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
  applyRoadmapElementsInitialDraggability,
  inferRoadmapElementsDraggability,
} from '@src/typescript/roadmap_ref/dragging/misc';
import { useEffectAfterLoad } from '@hooks/useEffectAfterLoad';
import renderConnectionsStore from '@store/roadmap-refactor/render/rendered-connections';
import { closeEditorProtocol } from '@src/to-be-organized/node-rendering-stuff/actions-manager';
import { addKeyListeners } from '@src/typescript/roadmap_ref/key-shortcuts';
import { type IRoadmapApi } from '@type/explore_old/card';
import {
  enableRoadmapInteractions,
  setRoadmapDisableDragAndZoom,
  setRoadmapEnableDragAndZoom,
} from '@store/roadmap-refactor/roadmap-data/roadmap-functions-utils';
import ElementsDisplayManager from '@components/roadmap/elements-display/ElementsDisplayManager';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { clearSelectedConnection } from '@components/roadmap/connections/connection-editing/connection-store';
import { setEditingState } from '@store/roadmap-refactor/editing/editing-state';
import {
  setRoadmapType,
  getRoadmapType,
  setRoadmapAboutName,
  DEFAULT_NAME,
  setRoadmapAboutDescription,
  DEFAULT_DESCRIPTION,
  setRoadmapAboutOwnerId,
  setRoadmapId,
  setRoadmapVersion,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';
import {
  saveSession,
  restoreSession,
  checkIfSessionExists,
} from '@src/typescript/roadmap_ref/caching/restoreSession';
import { setDisplayPageTypeFullScreen } from '@store/roadmap-refactor/display/display-manager-full-screen';
import { setRoadmapViewFromAPI } from '@store/roadmap-refactor/roadmap-data/roadmap-view';
import { fetchUserData } from '@src/api-wrapper/user/routes-user';
import {
  adapterUserDataToRoadmapOwnerData,
  setRoadmapOwnerData,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-owner-data';
import {
  adapterRoadmapToStatistics,
  setRoadmapStatistics,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-statistics';
import RenderingEngine from '@components/roadmap/rendering-engines/RenderingEngine';
import { addTemplateFromNode } from '@src/typescript/roadmap_ref/node/templates-system/template-protocols';
import { autosaveEditingProtocol } from '@src/typescript/roadmap_ref/roadmap-data/protocols/roadmap-state-protocols';
import { useChangeRoadmapState } from '@hooks/useChangeRoadmapState';
import { lockExit, unlockExit } from '@src/typescript/utils/confirmExit';
import { storeRenderingEngine } from '@components/roadmap/rendering-engines/store-rendering-engine';
import { fetchGetRoadmapProgress } from '@src/api-wrapper/roadmap/routes/routes-roadmaps';
import {
  getRoadmapNodeProgress,
  setRoadmapProgress,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-progress';
import NotificationProviderHOC from '@components/roadmap/NotificationProviderHOC';
import { setNotification } from '@components/roadmap/to-be-organized/notifications/notifciations-refr/notification-store-refr';
import {
  getIsResizingGlobal,
  getMouseCoords,
} from '@src/to-be-organized/resize-dragging/stores-resize-shared-data';
import {
  getNodeTriggerRender,
  triggerNodeRerender,
} from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import ToolTip from '@src/to-be-organized/node-rendering-stuff/Tooltip';
import {
  getDisplayPageType,
  setDisplayPageType,
} from '@store/roadmap-refactor/display/display-manager.ts';

export function initialRoadmapProtocolAfterLoad() {
  setRoadmapIsLoaded();
  triggerChunkRerender();
  triggerRecenterRoadmap();
  afterEventLoop(() => {
    applyRoadmapElementsInitialDraggability();
  });
}

export function checkAndSetInitialRoadmapType(
  roadmap: IRoadmapApi,
  pageId: string
) {
  const isCreate = pageId === 'create'; // parameter to determine if we are in the create mode
  if (isCreate) {
    setRoadmapType('create');
    return;
  }
  const isDraft = roadmap.isDraft === true;

  if (isDraft) {
    setRoadmapType('draft');
  } else {
    setRoadmapType('public');
  }
}

function checkAndSetRoadmapBanned(roadmap: IRoadmapApi) {
  if (!roadmap) return;
  const { isPublic } = roadmap;
  if (isPublic) return;
  setNotification(
    'error',
    'Your roadmap was flagged for inappropriate content and has been unlisted. Please edit it and feel free to publish it again. If you think this was a mistake, please contact us.'
  );
}

export function initializeRoadmapTypeData() {
  const type = getRoadmapType();
  if (type === 'create') {
    setRoadmapState('edit');
  }
  if (type === 'draft') {
    setRoadmapState('view');
  }
  if (type === 'public') {
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

function initializeRoadmapAboutData(roadmap?: IRoadmapApi) {
  const type = getRoadmapType();
  if (type === 'create') {
    setRoadmapAboutName(DEFAULT_NAME);
    setRoadmapAboutDescription(DEFAULT_DESCRIPTION);
    setRoadmapAboutOwnerId('');
  }
  if (type === 'draft' || type === 'public') {
    if (!roadmap)
      throw new Error('Roadmap is undefined despite being draft mode?');
    const { name, description, userId, id, version } = roadmap;

    setRoadmapAboutName(name);
    setRoadmapAboutDescription(description);
    setRoadmapAboutOwnerId(userId);
    setRoadmapId(id);
    setRoadmapVersion(version);
  }
}

async function handleRoadmapSessionRestoration() {
  return false;
  if (checkIfSessionExists()) {
    restoreSession();
    return true;
  }
  return false;
}

type IHandleRoadmapDataStatus =
  | 'restored'
  | 'factory-created'
  | 'retrieved-from-api'
  | 'error';

async function handleRoadmapRenderingData(
  roadmap?: IRoadmapApi
): Promise<IHandleRoadmapDataStatus> {
  const type = getRoadmapType();
  if (type === 'create') {
    const restoredFromCache = await handleRoadmapSessionRestoration();
    if (restoredFromCache) {
      return 'restored';
    }
    // otherwise the initialization triggers from the setup screen
    const node0 = createAndSetRoadmapClassicRefactored(); // also handles setting the roadmap data in the store
    addTemplateFromNode(node0);
    // createGrid();
    return 'factory-created';
  }
  if (type === 'draft' || type === 'public') {
    setRoadmapViewFromAPI(roadmap);
    initialRoadmapProtocolAfterLoad();
    return 'retrieved-from-api';
  }
  throw new Error('Roadmap rendering data initialization failed');
}

function handleRoadmapAfterLoadInitialization(
  status: IHandleRoadmapDataStatus
) {
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

let autoSaveTimer: NodeJS.Timeout | null = null;
function startAutoSaveTimer() {
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer);
  }
  autoSaveTimer = setTimeout(() => {
    autosaveEditingProtocol();
    startAutoSaveTimer();
  }, 60000);
}

function stopAutoSaveTimer() {
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer);
  }
}

async function handleRoadmapUserData(roadmap?: IRoadmapApi) {
  if (!roadmap) return;

  const ownerId = roadmap.userId;
  const ownerResponse = await fetchUserData(ownerId);
  const { data: userData } = ownerResponse;
  setRoadmapOwnerData(adapterUserDataToRoadmapOwnerData(userData));
}

function handleSetDifferentRoadmapStores(roadmap: IRoadmapApi) {
  if (!roadmap) return;
  handleRoadmapUserData(roadmap);
  fetchGetRoadmapProgress().then((res) => {
    if (!res) {
      console.warn('roadmap progress not found');
      return;
    }
    setRoadmapProgress(res.data);
    const renderedNodes = getRenderedRootNodesIds();
    renderedNodes.forEach((nodeId) => {
      if (res.data[nodeId] === undefined) return;
      if (getNodeTriggerRender(nodeId)) {
        triggerNodeRerender(nodeId);
      }
    });
  });
  setRoadmapStatistics(adapterRoadmapToStatistics(roadmap));
}

function handleSessionSaving() {
  setTimeout(() => {
    saveSession();
    handleSessionSaving();
  }, 5000);
}
const Roadmap = ({
  pageId,
  roadmap,
}: {
  pageId: string;
  roadmap: IRoadmapApi;
}) => {
  useScrollHidden();
  const { roadmapState } = useStore(roadmapStateStore);
  const { renderingEngineType } = useStore(storeRenderingEngine);
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
    checkAndSetRoadmapBanned(roadmap);
    initializeRoadmapTypeData();
    initializeRoadmapAboutData(roadmap); // all the misc data about the roadmap like title, desc, id etc
    handleSetDifferentRoadmapStores(roadmap);

    handleRoadmapRenderingData(roadmap).then((dataRetrievalStatus) => {
      handleRoadmapAfterLoadInitialization(dataRetrievalStatus);
      if (getRoadmapType() === 'create') {
        handleSessionSaving();
      }
    });
  }, []);

  useEffectAfterLoad(() => {
    // adding event
    addKeyListeners();
  }, []);

  useEffectAfterLoad(() => {
    if (firstRenderDone && nodesIds.length > 0) {
      // because when you switch between edit and view dragability needs to be changed
      inferRoadmapElementsDraggability();
    }
  }, [roadmapState, renderingEngineType]);

  // useEffectAfterLoad(() => {
  //   const state = localStorage.getItem('firstProgress');
  //   if (state !== 'true')
  //     setNotification(
  //       'info',
  //       'You can start traking your progress by right clicking on a node.'
  //     );
  // }, []);

  useChangeRoadmapState(() => {
    const type = getRoadmapType();
    const exist = type === 'public' || type === 'draft';
    if (getIsEditing() && exist) {
      // startAutoSaveTimer();
      // lockExit();
    } else {
      stopAutoSaveTimer();
      unlockExit();
    }
  }, [roadmapState]);

  return (
    <div
      className='w-full h-full pointer-events-auto'
      onClick={() => {
        // stupid workaround for clicking editor when clicking somewhere else
        if (getIsResizingGlobal()) {
          return;
        }
        closeEditorProtocol();
        clearSelectedConnection();
        setEditingState('nodes');
        if (getRoadmapState() === 'view' && getDisplayPageType() === 'tab') {
          setDisplayPageType('closed');
        }
      }}
    >
      <ElementsDisplayManager />
      <ToolTip />
      <svg
        id='rootSvg'
        width='100%'
        height='100%'
        className='bg-backgroundRoadmap pointer-events-auto'
      >
        <g id='rootGroup'>
          {firstRenderDone && (
            <RenderingEngine
              nodesIds={nodesIds}
              connectionsIds={connectionsIds}
            />
          )}
        </g>
      </svg>
    </div>
  );
};

export default NotificationProviderHOC(Roadmap);
