import React from 'react';
import { calculateComponentsPositions } from '@src/to-be-organized/nodeview/logic';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

const createComponentElement = (component, index, position) => {
  const { id, type, width, height, text, textColor, textFont, textSize } =
    component;

  return (
    <div
      key={index}
      id={id}
      className='rounded-xl items-center absolute overflow-hidden'
      style={{
        textDecorationColor: textColor,
        textSizeAdjust: `${textSize}%`,
        textAlign: 'center',
        fontFamily: textFont,
        width: `${width}px`,
        height: `${height}px`,
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      {type === 'Title' && <h1 className='text-center'>{text}</h1>}
      {type === 'Description' && <p className='text-center'>{text}</p>}
      {/* Add more conditions for other component types */}
    </div>
  );
};

const CompRender = (node: NodeClass) => {
  const { components, data } = node;
  const positions = calculateComponentsPositions(node);
  console.log('positions', positions);

  const componentElements = components.map((component, index) => {
    const position = positions[index];
    return createComponentElement(component, index, position);
  });

  return <div className='components-container'>{componentElements}</div>;
};

export default CompRender;
