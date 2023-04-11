import React, { useEffect } from 'react';
import * as d3 from 'd3';
import NodeManager2 from '@components/roadmap/NodeManager2';
import { useStore } from '@nanostores/react';
import roadmapState from '@store/roadmap_state';
import roadmapStatic, { setTrigger } from '@store/roadmap';
import { addZoom } from '@typescript/d3utils';
import renderNodesStore from '@store/render';
import { get } from 'astro/dist/assets/image-endpoint';
import Report from './tabs/Report';

const Roadmap2 = () => {
  const { editing } = useStore(roadmapState);
  const { nodes: nodesIds } = useStore(renderNodesStore);
  const { nodes: nodesValues } = roadmapStatic.get();

  useEffect(() => {
    // sets overflow hidden on body
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'hidden';
    }
    return () => {
      // sets overflow auto on body
      if (body) {
        body.style.overflow = 'auto';
      }
    };
  }, []);

  useEffect(() => {
    addZoom('#rootSvg', '#rootGroup');
    // renderNodes();
    // renderConnections();
  }, [editing]);
  console.log('rerendered roadmap2');
  return (
    <div className='w-full h-full '>
      <Report />
      <svg id='rootSvg' width='100%' height='100%'>
        <g id='rootGroup'>
          <g id='rootGroupConnections'>
            {/* placeholder for eslint to not scream at me */}
          </g>
          <g id='rootGroupNodes'>
            {nodesIds.map((id) => {
              // gets the data
              const data = nodesValues[id];
              return (
                <NodeManager2
                  key={id}
                  data={data}
                  renderTrigger={(cb) => {
                    setTrigger(id, cb);
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

export default Roadmap2;
