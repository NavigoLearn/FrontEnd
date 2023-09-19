import React, { useEffect, useRef } from 'react';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import NodeRendererClassic from '@src/to-be-organized/node-rendering-stuff/NodeRendererClassic';
import { setTriggerRender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import AsyncLoaderHOC from '@components/roadmap/rendering-engines/async-loading/AsyncLoaderHOC';

export type NodeManagerProps = {
  nodeId: string;
};

const NodeManager = ({ nodeId }: NodeManagerProps) => {
  const objRef = useRef<SVGForeignObjectElement>(null);
  const rerender = useTriggerRerender();

  const node = getNodeByIdRoadmapSelector(nodeId);
  const { data } = node;
  const { id } = node;

  function setForeignObjectSize() {
    const width = `${node.data.width}`;
    const height = `${node.data.height}`;
    objRef.current.setAttribute('width', width);
    objRef.current.setAttribute('height', height);
  }

  useEffect(() => {
    setTriggerRender(node.id, rerender);
  }, []);

  useEffect(() => {
    setForeignObjectSize();
  });

  return (
    <g
      id={`g${node.id}`}
      transform={`translate(${data.coords.x},${data.coords.y})`}
    >
      <foreignObject
        ref={objRef}
        className='bg-transparent overflow-visible pointer-events-auto '
      >
        <NodeRendererClassic
          nodeId={id}
          centerOffset={{
            x: node.data.width / 2,
            y: node.data.height / 2,
          }}
        />
      </foreignObject>
    </g>
  );
};

export default AsyncLoaderHOC(NodeManager);
