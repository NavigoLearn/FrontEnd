import React from 'react';
import {
  getNodeByID,
  possibleIds,
} from '@src/to-be-organized/nodeview-refactor-anto/node-get';
import { calculateComponentPositions } from '@src/to-be-organized/nodeview-refactor-anto/logic';

const createComponentElement = (component, index, position) => {
  const { id, type, width, height, text, textColor, textFont, textSize } =
    component;
  return (
    <div
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
        left: `${position.x - width / 2}px`,
        top: `${position.y - height / 2}px`,
      }}
    >
      {type === 'Title' && <h1>{text}</h1>}
      {type === 'Description' && <p>{text}</p>}
      {/* Add more conditions for other component types */}
    </div>
  );
};

const CompRender = (components, nodeProperties) => {
  const positions = calculateComponentPositions(components, nodeProperties);

  const componentElements = components.map((component, index) => {
    const position = positions[index];
    return createComponentElement(component, index, position);
  });

  return <div className='components-container'>{componentElements}</div>;
};

export default CompRender;
