import React, { useRef } from 'react';
import { calculateComponentsPositions } from '@src/to-be-organized/nodeview/logic';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { IComponentObject } from '@type/roadmap/node/components-types';

type IComponentElementProps = {
  component: IComponentObject;
  position: { x: number; y: number };
};

const ComponentRenderer = ({ component, position }: IComponentElementProps) => {
  const { id, type, width, height, text, textColor, textFont, textSize } =
    component;
  const objRef = useRef(null);

  return (
    <div
      ref={objRef}
      key={component.id}
      id={`div${id}`}
      className=' items-center absolute overflow-hidden border-black border-2 select-none'
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
      {type === 'Title' && <h1 className='text-center select-none'>{text}</h1>}
      {type === 'Description' && (
        <p className='text-center select-none'>{text}</p>
      )}
      {/* Add more conditions for other component types */}
    </div>
  );
};

export const componentsRenderer = (node: NodeClass) => {
  const { components, data } = node;
  const positions = calculateComponentsPositions(node);

  return (
    <div className='components-container select-none'>
      {components.map((component, index) => {
        return (
          <ComponentRenderer
            key={component.id}
            component={component}
            position={positions[index]}
          />
        );
      })}
    </div>
  );
};
