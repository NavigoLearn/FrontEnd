import React, { useEffect, useRef } from 'react';
import { NodeManagerProps } from '@type/roadmap/old/nodes';
import { addDraggabilityFlow } from '@src/typescript/roadmap_ref/render/dragging';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import NodeView from '@src/to-be-organized/nodeview/NodeView';

function disableDragging(nodeId: string) {
  addDraggabilityFlow(nodeId, false);
}
function enableDragging(nodeId: string) {
  addDraggabilityFlow(nodeId, true);
}

const NodeManager = ({ node, editing, triggerCb }: NodeManagerProps) => {
  const objRef = useRef<SVGForeignObjectElement>(null);
  const rerender = useTriggerRerender();

  const { data } = node;
  useEffect(() => {
    triggerCb(rerender, disableDragging, enableDragging);
  }, []);

  function setForeignObjectSize(rootDivRef) {
    if (!rootDivRef) return;
    // updates the size of the foreignObject to match the size of the div for draggability and movement purposes
    const width = `${rootDivRef.current.offsetWidth}`;
    const height = `${rootDivRef.current.offsetHeight}`;
    objRef.current.setAttribute('width', width);
    objRef.current.setAttribute('height', height);
  }

  useEffect(() => {
    // locks the nodes that are currently in text elements-editing or view mode
    addDraggabilityFlow(node.id, editing);
  }, [editing]);

  const renderNode = () => {
    const { id } = node;
    const centerOffset = { x: 0, y: 0 };
    console.log('rendering node', id);
    return (
      <NodeView
        nodeId={id}
        centerOffset={centerOffset}
        divSizeCallback={(divRef) => setForeignObjectSize(divRef)}
      />
    );

    throw new Error('Something went wrong in node rendering in NodeManager');
  };

  return (
    <g
      id={`group${node.id}`}
      transform={`translate(${data.coords.x},${data.coords.y})`}
    >
      <foreignObject
        ref={objRef}
        className='bg-transparent overflow-visible pointer-events-auto '
      >
        {renderNode()}
      </foreignObject>
    </g>
  );
};

export default NodeManager;
