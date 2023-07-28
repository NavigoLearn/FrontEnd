/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  getNodeByID,
  possibleIds,
} from '@src/to-be-organized/nodeview/node-get';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

interface NodeViewProps {
  nodeId: string;
  centerOffset: { x: number; y: number };
}

let prevComponentCenter = { width: 0, height: 0, x: 0, y: 0 };
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

  const renderComponents = (node: NodeClass) => {
    const { components } = node;
    let isFirstComponent = true;

    const componentElements = components.map((component, index) => {
      const { id, type, width, height, text, textColor, textFont, textSize } =
        component;
      let { x, y } = component;
      if (isFirstComponent) {
        x = properties.width / 2;
        y = properties.height / 8; // you don't want it to be EXACTLY at the center in terms of y-axis
        isFirstComponent = false;
      } else {
        ({ x, y } = calcCenter(prevComponentCenter));
        // Adjust y coordinate to prevent overlapping
        y += height / 4;
      }

      prevComponentCenter = {
        width,
        height,
        x: x - width / 2,
        y: y - height / 2,
      };
      subnodeHeightOffset += height;
      console.log('subnodeHeightOffset in func', subnodeHeightOffset);
      return (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          id={id}
          className='rounded-xl items-center relative overflow-hidden'
          style={{
            textDecorationColor: textColor,
            textSizeAdjust: `${textSize}%`,
            textAlign: 'center',
            fontFamily: textFont,
            width: `${width}px`,
            height: `${height}px`,
            left: `${x - width / 2}px`,
            top: `${y - height / 2}px`,
          }}
        >
          {type === 'Title' && <h1>{text}</h1>}
          {type === 'Description' && <p>{text}</p>}
          {/* Add more conditions for other component types */}
        </div>
      );
    });
    return <div className='components-container'>{componentElements}</div>;
  };

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
