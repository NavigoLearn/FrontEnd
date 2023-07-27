export const calcCenter = (componentProperties) => {
  // Calculate the center of the component based on its width and height
  const { width, height, x = 0, y = 0 } = componentProperties;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  return { x: centerX, y: centerY };
};

export const calculateComponentPositions = (components, nodeProperties) => {
  const positions = [];
  let isFirstComponent = true;
  components.forEach((component) => {
    const { x, y, width, height } = component;
    let newX = x;
    let newY = y;

    if (isFirstComponent) {
      newX = nodeProperties.width / 2;
      newY = nodeProperties.height / 8;
      isFirstComponent = false;
    } else {
      const { x: centerX, y: centerY } = calcCenter(component);
      newX = nodeProperties.width / 2;
      newY = centerY + height / 4;
    }
    positions.push({ x: newX, y: newY });
  });
  return positions;
};
