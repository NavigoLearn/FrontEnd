import React, { useEffect, useRef } from 'react';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import NodeView from '@src/to-be-organized/nodeview/NodeView';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { setTriggerRender } from '@store/roadmap-refactor/render/rerender-triggers';

export type NodeManagerProps = {
  node: NodeClass;
};

const NodeManager = ({ node }: NodeManagerProps) => {
  const objRef = useRef<SVGForeignObjectElement>(null);
  const rerender = useTriggerRerender();

  const { data } = node;

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
    // addDragabilityProtocol(node.draggingBehavior);
    // inferAndSetNodeDraggability(node);
  }, []);

  useEffect(() => {
    setTriggerRender(node.id, rerender);
  }, []);

  const renderNode = () => {
    const { id } = node;
    const centerOffset = { x: 0, y: 0 };
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
      id={`g${node.id}`}
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
