import React, { useRef } from 'react';
import { calculateComponentsPositions } from '@src/to-be-organized/nodeview/logic';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { IComponentObject } from '@type/roadmap/node/components-types';
import { selectNodeColorText } from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/services';
import { getColorThemeFromRoadmap } from '@components/roadmap/displayers/setup-screen/theme-controler';

type IComponentElementProps = {
  component: IComponentObject;
  position: { x: number; y: number };
  parentNode: NodeClass;
};

const ComponentRenderer = ({
  component,
  position,
  parentNode,
}: IComponentElementProps) => {
  const { id, type, width, height, text, textFont, textSize } = component;
  const { colorType } = parentNode.data;
  const objRef = useRef(null);
  // text color is based on the node color
  const theme = getColorThemeFromRoadmap();

  const textColor = selectNodeColorText(theme, colorType);
  // here goes both font weight and font size

  return (
    <div
      ref={objRef}
      key={component.id}
      id={`div${id}`}
      className=' items-center absolute overflow-hidden select-none'
      style={{
        color: textColor,
        fontSize: `18px`,
        fontWeight: '450',
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
            parentNode={node}
          />
        );
      })}
    </div>
  );
};
