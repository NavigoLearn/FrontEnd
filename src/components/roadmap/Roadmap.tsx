import React, { useEffect, useRef } from 'react';
import { useScrollHidden } from '@hooks/useScrollHidden';
import { v4 as uuid4 } from 'uuid';
import NodeManager from '@components/roadmap/NodeManager';
import { useStore } from '@nanostores/react';
import roadmapState, {
  setEditingTrueNoRerender,
  setRoadmapId,
} from '@store/roadmap/data/roadmap_state';
import { setTriggerRender } from '@store/roadmap-refactor/render/rerender-triggers';
import { addZoom, disableZoom } from '@src/typescript/roadmap/d3utils';
import { RoadmapChunkingManager } from '@src/typescript/roadmap_ref/render/chunks';
import { roadmapEdit } from '@store/roadmap-refactor/roadmap-data/roadmap-edit';
import {
  setDisableZoomTrigger,
  setEnableZoomTrigger,
} from '@store/roadmap-refactor/misc/miscParams';
import { useIsLoaded } from '@hooks/useIsLoaded';
import Popup from './tabs/popups/Popup';

const Roadmap = ({ pageId }: { pageId: string }) => {
  const isCreate = pageId === 'create'; // parameter to determine if we are in the create mode
  if (isCreate) {
    setEditingTrueNoRerender();
  }
  const { editing } = isCreate ? { editing: true } : useStore(roadmapState);
  // need to take the ids of the nodes included in the current chunks and render them
  // const { nodesIds } = useStore(renderNodesStore);
  const nodesIds = roadmapEdit.get().rootNodesIds;
  const { nodes } = editing || isCreate ? roadmapEdit.get() : roadmapEdit.get();

  const renderer = useRef(null);
  useScrollHidden();
  const isLoaded = useIsLoaded();

  const enableZoomFn = () => {
    addZoom(
      'rootSvg',
      'rootGroup',
      renderer.current.recalculateChunks.bind(renderer.current)
    );
  };

  const disableZoomFn = () => {
    disableZoom('rootSvg');
  };

  useEffect(() => {
    // renderer object that handles chunking
    renderer.current = new RoadmapChunkingManager('rootSvg');
    // sets the trigger for chunk recalculations to a global state

    // setChunkRerenderTrigger(
    //   // used for decorators
    //   renderer.current.recalculateChunks.bind(renderer.current)
    // );
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
                return (
                  <NodeManager
                    key={id}
                    node={nodes[id]}
                    editing={editing}
                    triggerCb={async (nodeId, cbTrigger) => {
                      setTriggerRender(nodeId, cbTrigger);
                    }}
                  />
                );
              })}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Roadmap;
