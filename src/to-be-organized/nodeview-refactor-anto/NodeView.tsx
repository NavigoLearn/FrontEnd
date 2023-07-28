/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  getNodeByID,
  possibleIds,
} from '@src/to-be-organized/nodeview-refactor-anto/node-get';
import renderComponents from '@src/to-be-organized/nodeview-refactor-anto/CompRender';

interface NodeViewProps {
  nodeId: string;
  centerOffset: { x: number; y: number };
}

const prevComponentCenter = { width: 0, height: 0, x: 0, y: 0 };
const NodeView: React.FC<NodeViewProps> = ({ nodeId, centerOffset }) => {
  // from the center offset of the previous component, calculate the center of the current component

  // let subnodeHeightOffset = 0;
  // const { properties } = node;
  // const { nestedNodesIds } = node;

  // const renderSubnodes = (nodeID: string, positionx) => {
  //   // TODO fix colors not changing with node properties
  //   const subnode = getNodeByID(nodeID);
  //   if (subnode) {
  //     console.log('subnodeHeightOffset', subnodeHeightOffset);
  //     console.log('prevComponentCenter', prevComponentCenter);
  //     return (
  //       <div
  //         style={{
  //           position: 'absolute',
  //           left: `${positionx - subnode.properties.width / 2}px`,
  //           top: `${prevComponentCenter.y + subnodeHeightOffset}px`,
  //         }}
  //       >
  //         <NodeView key={nodeID} node={subnode} />
  //       </div>
  //     );
  //   }
  //   // If the node is not found
  //   return null;
  // };

  const renderNode = (nodeId: possibleIds) => {
    const node = getNodeByID(nodeId);
    const { color, width, height, opacity } = node.data;
    node.data.center.x = width / 2;
    const { subNodeIds } = node;
    // Function to render each subnode

    // const renderSubnode = (subnodeId: string) => {
    //   return renderSubnodes(subnodeId, node.properties.center.x);
    // };

    const calculatedOffsetCoords = {
      x: centerOffset.x - width / 2,
      y: centerOffset.y - height / 2,
    };

    return (
      <div
        className='drop-shadow-md  rounded-xl absolute border-2 border-black'
        id={nodeId}
        style={{
          backgroundColor: color.primary,
          width: `${width}px`,
          height: `${height}px`,
          top: `${calculatedOffsetCoords.y}px`,
          left: `${calculatedOffsetCoords.x}px`,
          opacity,
        }}
      >
        {renderComponents(node.components, node.properties)};
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
