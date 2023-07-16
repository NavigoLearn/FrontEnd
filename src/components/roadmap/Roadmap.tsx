import React, { useEffect, useRef } from 'react';
import { v4 as uuid4 } from 'uuid';
import NodeManager from '@components/roadmap/NodeManager';
import { useStore } from '@nanostores/react';
import roadmapState, {
  setEditingTrueNoRerender,
  setRoadmapId,
} from '@store/roadmap/data/roadmap_state';
import roadmapStatic, {
  initialRoadmapCreateRender,
  setRoadmapFromAPI,
} from '@store/roadmap/data/roadmap_static';
import {
  setTriggerDisable,
  setTriggerEnable,
  setTriggerRender,
} from '@store/roadmap-refactor/render/rerenderTriggers';
import { addZoom, disableZoom } from '@typescript/roadmap/d3utils';
import { RoadmapChunkingManager } from '@typescript/roadmap_ref/render/chunks';
import renderNodesStore from '@store/roadmap-refactor/render/renderedNodes';
import { setChunkRerenderTrigger } from '@store/roadmap-refactor/render/renderedChunks';
import renderConnectionsStore from '@store/roadmap-refactor/render/renderedConnections';
import { renderConnections } from '@typescript/roadmap_ref/render/connections';
import roadmapEdit from '@store/roadmap/data/roadmap_edit';
import {
  setDisableZoomTrigger,
  setEnableZoomTrigger,
} from '@store/roadmap-refactor/misc/miscParams';
import Popup from './tabs/popups/Popup';

const Roadmap = ({ pageId }: { pageId: string }) => {
  const isCreate = pageId === 'create'; // parameter to determine if we are in the create mode
  if (isCreate) {
    setEditingTrueNoRerender();
  }
  const { editing } = isCreate ? { editing: true } : useStore(roadmapState);
  // the ids of the nodes that need to be rendered accorind to the current view and the chunks visible
  const { nodes: nodesIds } = useStore(renderNodesStore); // used to trigger a rerender when the nodes change
  const { nodes: nodesValues } =
    editing || isCreate ? roadmapEdit.get() : roadmapStatic.get();

  useEffect(() => {
    // sets overflow hidden on body
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'hidden';
      window.scrollTo({
        top: 0,
      });
    }

    return () => {
      // sets overflow auto on body
      if (body) {
        body.style.overflow = 'auto';
      }
    };
  }, []);

  const renderer = useRef(null);

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
    setChunkRerenderTrigger(
      // used for decorators
      renderer.current.recalculateChunks.bind(renderer.current)
    );
    if (!isCreate) setRoadmapId(pageId);
    else setRoadmapId(uuid4());
    // fetches the roadmap-roadmap-data from the api-wrapper
    if (!isCreate) {
      setRoadmapFromAPI(pageId); // when request finishes it triggers chunk renderer which sets the nodes and connections to render-roadmap-roadmap-data
      // to their respective stores. The node rendering is triggered by the rerender of the Roadmap component
      // for the connections we need to subscribe to the store with a callback
    } else {
      initialRoadmapCreateRender();
    }

    renderConnectionsStore.subscribe(() => {
      // calling the connection rendering function
      setTimeout(() => {
        // wait for event loop to finish rendering the nodes and then render-roadmap-roadmap-data the connections
        renderConnections();
      }, 0);
    });
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
            {nodesIds.map((id) => {
              // gets the roadmap-roadmap-data
              const data = nodesValues[id];
              return (
                <NodeManager
                  key={id}
                  data={data}
                  editing={editing}
                  triggerCb={async (cbTrigger, cbDisableDrag, cbEnableDrag) => {
                    setTriggerRender(id, cbTrigger);
                    setTriggerDisable(id, cbDisableDrag);
                    setTriggerEnable(id, cbEnableDrag);
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
