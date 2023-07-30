import React, { useEffect, useRef } from 'react';
import { setChunkRerenderTrigger } from '@store/roadmap-refactor/render/rendered-chunks';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { useScrollHidden } from '@hooks/useScrollHidden';
import { v4 as uuid4 } from 'uuid';
import NodeManager from '@components/roadmap/NodeManager';
import { useStore } from '@nanostores/react';
import roadmapState, {
  setEditingTrueNoRerender,
  setRoadmapId,
} from '@store/roadmap/data/roadmap_state';
import { addZoom, disableZoom } from '@src/typescript/roadmap/d3utils';
import { recalculateChunks } from '@src/typescript/roadmap_ref/render/chunks';
import { setRoadmapEdit } from '@store/roadmap-refactor/roadmap-data/roadmap-edit';
import {
  setDisableZoomTrigger,
  setEnableZoomTrigger,
} from '@store/roadmap-refactor/misc/miscParams';
import { useIsLoaded } from '@hooks/useIsLoaded';
import { roadmap1 } from '@store/roadmap-refactor/roadmap-data/dummy-data';
import Popup from './tabs/popups/Popup';

const Roadmap = ({ pageId }: { pageId: string }) => {
  const isCreate = pageId === 'create'; // parameter to determine if we are in the create mode
  if (isCreate) {
    setEditingTrueNoRerender();
  }
  const { editing } = isCreate ? { editing: true } : useStore(roadmapState);
  // need to take the ids of the nodes included in the current chunks and render them
  // const { nodesIds } = useStore(renderNodesStore);
  const { nodes, rootNodesIds: nodesIds } = roadmapSelector.get();

  const chunkRenderer = useRef(null);
  useScrollHidden();
  const isLoaded = useIsLoaded();

  const enableZoomFn = () => {
    addZoom('rootSvg', 'rootGroup', chunkRenderer.current);
  };

  useEffect(() => {
    setRoadmapEdit(roadmap1);
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
      chunkRenderer.current
    );

    if (!isCreate) setRoadmapId(pageId);
    else setRoadmapId(uuid4());
    // fetches the roadmap-roadmap-data from the api-wrapper
    // ...

    // renderConnectionsStore.subscribe(() => {
    //   // calling the connection rendering function
    //   setTimeout(() => {
    //     // wait for event loop to finish rendering the nodes and then render-roadmap-roadmap-data the connections
    //     renderConnections();
    //   }, 0);
    // });

    setEnableZoomTrigger(() => {
      enableZoomFn();
    });
    setDisableZoomTrigger(() => {
      disableZoomFn();
    });
  }, []);

  useEffect(() => {
    enableZoomFn();
    // adding zoom and a callback for chunk recalculations (the cb is throttled to 50ms, see class)
  }, [editing]);

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
            {/* placeholder for eslint to not scream at me */}
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
