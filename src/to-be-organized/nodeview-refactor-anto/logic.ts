export const calcCenter = (componentProperties) => {
  // Calculate the center of the component based on its width and height
  const { width, height } = componentProperties;
  const { x = 0, y = 0 } = componentProperties;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  return { x: centerX, y: centerY };
};
