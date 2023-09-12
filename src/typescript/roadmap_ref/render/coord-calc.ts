export function getTransformXY(transform: string) {
  const firstParentheses = transform.indexOf('(');
  const lastParentheses = transform.indexOf(')');
  const transformValues = transform
    .slice(firstParentheses + 1, lastParentheses)
    .split(',');
  return {
    x: parseInt(transformValues[0], 10),
    y: parseInt(transformValues[1], 10),
  };
}

export function getNodeCoords(id: string) {
  const offset = {
    x: 0,
    y: 0,
  };
  const groupId = `group${id}`;
  const nodeGroup = document.getElementById(groupId);
  // gets node group bounding box
  const transform = nodeGroup.getAttribute('transform');
  const { x, y } = getTransformXY(transform);
  // calculates offset
  offset.x = x;
  offset.y = y;

  return offset;
}
