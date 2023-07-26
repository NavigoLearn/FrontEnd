/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import renderSubnodes from './SubNodesRender';

interface NodeViewProps {
  node: NodeClass;
}
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
    let prevComponentCenter = { width: 0, height: 0, x: 0, y: 0 };
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

  const renderCurrentNode = () => {
    // rendering logic for the current node
    const { data } = node;
    const { id } = data;
    const { color, width, height, opacity } = properties;
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
        {nestedNodesIds && renderSubnodes(nestedNodesIds)}
      </div>
    );
  };
  return <div>{renderCurrentNode()}</div>;
};

export default NodeView;
