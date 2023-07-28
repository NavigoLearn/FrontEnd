import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

export const calcCenter = (componentProperties) => {
  // Calculate the center of the component based on its width and height
  const { width, height, x = 0, y = 0 } = componentProperties;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  return { x: centerX, y: centerY };
};

export const calculateComponentsPositions = (node: NodeClass) => {
  const { components, data } = node;
  const positions = [];
  // const isFirstComponent = true;
  components.forEach((component) => {
    const { x, y, width, height } = component;
    const newX = x - component.width / 2 + data.width / 2;
    const newY = y - component.height / 2 + data.height / 2;

    // if (isFirstComponent) {
    //   newX = nodeProperties.width / 2;
    //   newY = nodeProperties.height / 8;
    //   isFirstComponent = false;
    // } else {
    //   const { x: centerX, y: centerY } = calcCenter(component);
    //   newX = nodeProperties.width / 2;
    //   newY = centerY + height / 4;
    // }
    //
    positions.push({ x: newX, y: newY });
  });
  // console.log('calculated positions', positions);
  return positions;
};
