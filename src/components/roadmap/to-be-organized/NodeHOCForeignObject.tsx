import React, { useEffect, useRef } from 'react';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import { setTriggerRender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { getRoadmapState } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state.ts';

export type INodeManagerProps = {
  nodeId: string;
};

interface INodeProps {
  nodeId: string;
  centerOffset: { x: number; y: number };
}

const NodeHOCForeignObject = (WrappedComponent: React.FC<INodeProps>) => {
  const NodeHOCForeignObjectClosure = ({ nodeId }: INodeManagerProps) => {
    const objRef = useRef<SVGForeignObjectElement>(null);
    const rerender = useTriggerRerender();

    const node = getNodeByIdRoadmapSelector(nodeId);
    const { data } = node;

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

    const shouldNotHaveEvents =
      getRoadmapState() === 'view' && node.actions.onClick === 'Do nothing';

    return (
      <g
        id={`g${node.id}`}
        transform={`translate(${data.coords.x},${data.coords.y})`}
      >
        <foreignObject
          ref={objRef}
          className={`bg-transparent overflow-visible ${
            shouldNotHaveEvents
              ? 'pointer-events-none'
              : '  pointer-events-auto'
          }`}
        >
          <WrappedComponent
            nodeId={nodeId}
            centerOffset={{
              x: node.data.width / 2,
              y: node.data.height / 2,
            }}
          />
        </foreignObject>
      </g>
    );
  };

  return NodeHOCForeignObjectClosure;
};

export default NodeHOCForeignObject;
