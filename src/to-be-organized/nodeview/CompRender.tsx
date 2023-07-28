import React, { useEffect, useRef } from 'react';
import { addDragabilityProtocol } from '@src/typescript/roadmap_ref/render/dragging';
import { calculateComponentsPositions } from '@src/to-be-organized/nodeview/logic';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

const createComponentElement = (component, index, position) => {
  const { id, type, width, height, text, textColor, textFont, textSize } =
    component;
  const objRef = useRef(null);

  useEffect(() => {
    // locks the nodes that are currently in text elements-editing or view mode
    console.log('addDragabilityProtocol componentyess');
    console.log(component.draggingBehavior);
    addDragabilityProtocol(component.draggingBehavior, true);
  }, []);

  return (
    <div
      ref={objRef}
      key={index}
      id={`div${id}`}
      className='rounded-xl items-center absolute overflow-hidden border-2 border-black'
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

  const componentElements = components.map((component, index) => {
    const position = positions[index];
    return createComponentElement(component, index, position);
  });

  return <div className='components-container'>{componentElements}</div>;
};

export default CompRender;
