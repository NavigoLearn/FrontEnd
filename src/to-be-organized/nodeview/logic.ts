import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import { ComponentText } from '@src/typescript/roadmap_ref/node/components/text/core';

export const calcCenter = (componentProperties) => {
  // Calculate the center of the component based on its width and height
  const { width, height, x = 0, y = 0 } = componentProperties;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  return { x: centerX, y: centerY };
};

export const calculateComponentsPositions = (
  component: ComponentText,
  node: NodeClass,
  divRef: React.RefObject<HTMLDivElement>
) => {
  const { components, data } = node;
  const position: ICoords = { x: 0, y: 0 };

  const { x, y, width } = component;
  let componentHeight = component.height;
  if (divRef.current) {
    componentHeight = divRef.current.clientHeight;
  }

  const newX = x - component.width / 2 + data.width / 2;
  const newY = y - componentHeight / 2 + data.height / 2;

  position.x = newX;
  position.y = newY;
  return {
    position,
    width,
    height: componentHeight,
  };
};
