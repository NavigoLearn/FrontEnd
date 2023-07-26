/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { NodeClass } from '@typescript/roadmap_ref/node/core/core';
import { factoryComponentEmpty } from '@typescript/roadmap_ref/node/components/text/factories';

interface NodeViewProps {
  node: NodeClass;
}

let prevComponentCenter = { width: 0, height: 0, x: 0, y: 0 };
let subnodeHeightOffset = 0;
let prevSubnodeDimensions = { width: 0, height: 0 };
const NodeView: React.FC<NodeViewProps> = ({ node }) => {
  const { properties } = node;
  const { nestedNodesIds } = node;
  console.log('nestedNodesIds', nestedNodesIds);
  const calcCenter = (componentProperties) => {
    // Calculate the center of the component based on its width and height
    const { width, height } = componentProperties;
    const { x = 0, y = 0 } = componentProperties;
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    return { x: centerX, y: centerY };
  };

  const renderComponents = () => {
    const { components } = node;
    let isFirstComponent = true;

    const componentElements = components.map((component, index) => {
      const { id, type, width, height, text, textColor, textFont, textSize } =
        component;
      let { x, y } = component;
      if (isFirstComponent) {
        x = properties.width / 2;
        y = properties.height / 8;
        isFirstComponent = false;
      } else {
        // Calculate center based on the previous component's width and height
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

  const renderSubnodes = (nodeID: string, positionx, positiony) => {
    const getNodeByID = (nodeID: string): NodeClass | undefined => {
      // placeholder for when nodes store is implemented
      if (nodeID === 'node2') {
        const node2 = new NodeClass();
        node2.data.id = 'node2';
        node2.properties.width = 300;
        node2.properties.height = 300;
        node2.components[0] = factoryComponentEmpty('Title');
        node2.components[1] = factoryComponentEmpty('Description');
        node2.properties.color.primary = '#FF0000';
        return node2;
      }
      if (nodeID === 'node3') {
        const node3 = new NodeClass();
        node3.data.id = 'node3';
        node3.properties.width = 35;
        node3.properties.height = 49;
        node3.components[0] = factoryComponentEmpty('Title');
        node3.components[1] = factoryComponentEmpty('Description');
        node3.properties.color.primary = '#0000FF';
        return node3;
      }
      if (nodeID === 'node4') {
        const node4 = new NodeClass();
        node4.data.id = 'node4';
        node4.properties.width = 123;
        node4.properties.height = 37;
        node4.components[0] = factoryComponentEmpty('Title');
        node4.components[1] = factoryComponentEmpty('Description');
        return node4;
      }
      // if (nodeID === 'node5') {
      //   const node5 = new NodeClass();
      //   node5.data.id = 'node5';
      //   node5.properties.width = 65;
      //   node5.properties.height = 54;
      //   node5.components[0] = factoryComponentEmpty('Title');
      //   node5.components[1] = factoryComponentEmpty('Description');
      //   node5.properties.color.primary = '#FF0000';
      //   return node5;
      // }
      // if (nodeID === 'node6') {
      //   const node6 = new NodeClass();
      //   node6.data.id = 'node6';
      //   node6.properties.width = 90;
      //   node6.properties.height = 90;
      //   node6.componentsJSON[0] = factoryComponentEmpty('Title');
      //   node6.componentsJSON[1] = factoryComponentEmpty('Description');
      //   return node6;
      // }
      // if (nodeID === 'node7') {
      //   const node7 = new NodeClass();
      //   node7.data.id = 'node7';
      //   node7.properties.width = 70;
      //   node7.properties.height = 70;
      //   node7.componentsJSON[0] = factoryComponentEmpty('Title');
      //   node7.componentsJSON[1] = factoryComponentEmpty('Description');
      //   return node7;
      // }
      // if (nodeID === 'node8') {
      //   const node8 = new NodeClass();
      //   node8.data.id = 'node8';
      //   node8.properties.width = 33;
      //   node8.properties.height = 35;
      //   node8.componentsJSON[0] = factoryComponentEmpty('Title');
      //   node8.componentsJSON[1] = factoryComponentEmpty('Description');
      //   return node8;
      // }
      // if (nodeID === 'node9') {
      //   const node9 = new NodeClass();
      //   node9.data.id = 'node9';
      //   node9.properties.width = 100;
      //   node9.properties.height = 100;
      //   node9.componentsJSON[0] = factoryComponentEmpty('Title');
      //   node9.componentsJSON[1] = factoryComponentEmpty('Description');
      //   return node9;
      // }
      // If the node is not found, return undefined
      return undefined;
    };

    // TODO fix colors not changing with node properties
    const subnode = getNodeByID(nodeID);
    if (subnode) {
      prevSubnodeDimensions = {
        width: subnode.properties.width,
        height: subnode.properties.height,
      };
    }
    if (subnode) {
      console.log('subnodeHeightOffset', subnodeHeightOffset);
      console.log('prevSubnodeDimensions', prevSubnodeDimensions);
      return (
        <div
          style={{
            position: 'absolute',
            left: `${positionx - subnode.properties.width / 2}px`,
            top: `${prevComponentCenter.y + subnodeHeightOffset}px`,
          }}
        >
          <NodeView key={nodeID} node={subnode} />
        </div>
      );
    }
    // If the node is not found
    return null;
  };

  const renderCurrentNode = () => {
    // rendering logic for the current node
    const { data } = node;
    const { id } = data;
    const { color, width, height, opacity } = properties;
    node.data.center.x = width / 2;
    node.data.center.y = height / 2;

    // Function to render each subnode
    const renderSubnode = (subnodeId: string) => {
      return renderSubnodes(
        subnodeId,
        node.data.center.x,
        prevComponentCenter.y
      );
    };

    return (
      <div
        className='drop-shadow-md rounded-xl relative'
        id={id}
        style={{
          backgroundColor: color.primary,
          width: `${width}px`,
          height: `${height}px`,
          opacity,
        }}
      >
        {renderComponents()}
        {nestedNodesIds &&
          nestedNodesIds.map((subnodeId) => renderSubnode(subnodeId))}
      </div>
    );
  };

  return renderCurrentNode();
};
export default NodeView;
