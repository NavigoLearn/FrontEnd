/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';

const NodeView = ({ node }) => {
  const { properties } = node;

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
    let prevComponentCenter = { x: 0, y: 0 };
    let isFirstComponent = true;

    const componentElements = components.map((component, index) => {
      const { type, text, properties } = component;
      const { id, color, width, height } = properties;

      let { x = 0, y = 0 } = {};
      if (isFirstComponent) {
        x = node.properties.width / 2;
        y = node.properties.height / 2 - (80 * properties.height) / 100;
        isFirstComponent = false;
      } else {
        // Calculate center based on the previous component's width and height
        ({ x, y } = calcCenter(prevComponentCenter));
        // Adjust y coordinate to prevent overlapping
        y += height / 2;
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
            backgroundColor: color,
            width: `${width}px`,
            height: `${height}px`,
            left: `${x - width / 2}px`,
            top: `${y - height / 2}px`,
          }}
        >
          {type === 'title' && <h1 className='text-center text-xm'>{text}</h1>}
          {type === 'description' && (
            <p className='text-center text-sm'>{text}</p>
          )}
          {/* Add more conditions for other component types */}
        </div>
      );
    });

    return <div className='components-container'>{componentElements}</div>;
  };

  const renderCurrentNode = () => {
    // rendering logic for the current node
    const { id, color, width, height, opacity } = properties;
    return (
      <div
        className='drop-shadow-md rounded-xl relative'
        id={id}
        style={{
          backgroundColor: color,
          width: `${width}px`,
          height: `${height}px`,
          opacity,
        }}
      >
        {renderComponents()}
      </div>
    );
  };

  return <div>{renderCurrentNode()}</div>;
};

export default NodeView;
