import { NodeTypesStore } from '@type/roadmap/old/nodes';
import {
  isNodeInfoStore,
  isNodeResourceStore,
} from '@type/roadmap/old/typecheckers';
import roadmapEdit from '@store/roadmap/data/roadmap_edit';
import roadmapState from '@store/roadmap/data/roadmap_state';
import roadmapStatic from '@store/roadmap/data/roadmap_static';
import cachedCoords, {
  cacheNodeCoord,
} from '@store/roadmap/cache/cached-node-coords';

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
export function calculateMiddleOfNodeOffsetStatic(node?: NodeTypesStore) {
  const offset = {
    x: 0,
    y: 0,
  };
  if (isNodeInfoStore(node)) {
    offset.x = 220; // calculates the default values for each node type based on their properties
    offset.y = 30; // this way we dont need to actually render-roadmap-roadmap-data the nodes to get their sizes which would be an expensive opration
    // although switching to actually rendering all needed nodes for connections might be necessary if the nodes grow in complexity
  }

  if (isNodeResourceStore(node)) {
    offset.x = 220;
    offset.y = 60;
  }

  return offset;
}

export function calculateMiddleOfNodeOffsetDynamic(id) {
  const offset = {
    x: 0,
    y: 0,
  };
  const groupId = `group${id}`;
  const nodeGroup = document.getElementById(groupId);
  // gets node group bounding box
  const { width, height } = nodeGroup.getBoundingClientRect();
  // calculates offset
  offset.x = width / 2;
  offset.y = height / 2;
  return offset;
}
function calculateCoordOfNodeDynamic(id) {
  // used for updating the connections while dragging a node
  const coord = {
    x: 0,
    y: 0,
  };
  const groupId = `group${id}`;
  const nodeGroup = document.getElementById(groupId);
  // gets the translate value of the node group
  const transform = nodeGroup.getAttribute('transform');
  const translate = transform.split('(')[1].split(')')[0].split(',');
  coord.x = Number(translate[0]);
  coord.y = Number(translate[1]);
  const offset = calculateMiddleOfNodeOffsetDynamic(id);
  coord.x += offset.x;
  coord.y += offset.y;
  return coord;
}

export function calculateCoordOfNodeStatic(id) {
  // used for updating the connections while dragging a node
  const coord = {
    x: 0,
    y: 0,
  };
  const node = roadmapEdit.get().nodes[id];
  const groupId = `group${id}`;
  const nodeGroup = document.getElementById(groupId);
  // gets the translate value of the node group
  const transform = nodeGroup.getAttribute('transform');
  const translate = transform.split('(')[1].split(')')[0].split(',');
  coord.x = Number(translate[0]);
  coord.y = Number(translate[1]);

  const { x: width, y: height } = calculateMiddleOfNodeOffsetStatic(node);
  coord.x += width / 2;
  coord.y += height / 2;
  return coord;
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

export function getNodeMiddleCoords(id: string) {
  const { editing } = roadmapState.get();
  const original = editing ? roadmapEdit.get() : roadmapStatic.get();
  const { nodes } = original;
  if (!nodes[id]) throw new Error('node not found');
  const node = nodes[id];
  const { x, y } = node;
  // const { x: width, y: height } = calculateMiddleOfNodeOffsetDynamic(id);
  const { x: width, y: height } = calculateMiddleOfNodeOffsetStatic(node);
  return {
    x: x + width / 2,
    y: y + height / 2,
  };
}
export function getNodeMiddleCoordsFlow(id: string) {
  const cache = cachedCoords.get();
  // checks if its already in cache
  // if yes takes from cache
  if (cache[id]) return cache[id];
  // if no calls the normal calculations
  const coords = getNodeMiddleCoords(id);
  // adds to cache
  cacheNodeCoord(id, coords);
  return coords;
}

export function getNodeOffsetCoords(id: string) {
  const { width, height } = document
    .querySelector(`#${id}`)
    .getBoundingClientRect();

  return {
    x: width / 2,
    y: height / 2,
  };
}
