/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { possibleIds } from '@src/to-be-organized/nodeview/node-get';
import { getNodeByIdRoadmapEdit } from '@store/roadmap-refactor/roadmap-data/roadmap-edit';

interface NodeViewProps {
  nodeId: string;
  centerOffset: { x: number; y: number };
  divSizeCallback?: (divRef: React.MutableRefObject<HTMLDivElement>) => void; //
}

const NodeView: React.FC<NodeViewProps> = ({
  nodeId,
  centerOffset,
  divSizeCallback,
}) => {
  const nodeDivRef = useRef<HTMLDivElement>(null);

  const renderNode = (nodeId: possibleIds) => {
    const node = getNodeByIdRoadmapEdit(nodeId);
    const { color, width, height, opacity } = node.data;
    node.data.center.x = width / 2;
    const { subNodeIds } = node;
    // Function to render each subnode

    const { flags } = node;
    const { nestedFlag } = flags;

    // the offset for the nodes rendered directly on the roadmap is calculated directly
    // on its group and foreign object in NodeManager. This is why you need to treat the coords
    // from subnodes which don't have their own foreign object and are divs relative to the parent node

    const coords = {
      x: nestedFlag ? node.data.coords.x : 0,
      y: nestedFlag ? node.data.coords.y : 0,
    };

    const calculatedOffsetCoords = {
      x: centerOffset.x - width / 2,
      y: centerOffset.y - height / 2,
    };

    if (node.flags.renderedOnRoadmapFlag) {
      calculatedOffsetCoords.x = 0;
      calculatedOffsetCoords.y = 0;
    }

    divSizeCallback &&
      setTimeout(() => {
        divSizeCallback(nodeDivRef);
      }, 0);

    return (
      <div
        className='drop-shadow-md  rounded-xl absolute border-2 border-black'
        id={`div${nodeId}`}
        ref={nodeDivRef}
        style={{
          backgroundColor: color.primary,
          width: `${width}px`,
          height: `${height}px`,
          top: `${calculatedOffsetCoords.y + coords.y}px`,
          left: `${calculatedOffsetCoords.x + coords.x}px`,
          opacity,
        }}
      >
        {/* {renderComponents()} */}
        {subNodeIds &&
          subNodeIds.map((subNodeId) => {
            // the div is used to position the subNode in the center of the current node
            return (
              <NodeView
                key={subNodeId}
                nodeId={subNodeId}
                centerOffset={{
                  x: node.data.width / 2,
                  y: node.data.height / 2,
                }}
              />
            );
          })}
      </div>
    );
  };

  // @ts-ignore
  return renderNode(nodeId);
};
export default NodeView;
