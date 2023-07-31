import { v4 as uuidv4 } from 'uuid';
import {
  isNodeInfoStore,
  isNodeResourceStore,
  isNodeTypesStore,
} from '@type/roadmap/old/typecheckers';

import roadmapEdit from '@store/roadmap/data/roadmap_edit';
import {
  generateNodeInfoEmpty,
  generateNodeResourceEmpty,
  generateTabInfo,
} from '@src/typescript/roadmap/generators';
import { calculateChunkId } from '@src/typescript/roadmap/utils';
import { TabInfo, TabIssue } from '@type/roadmap/old/tab-manager';
import { NodeResourceStore } from '@type/roadmap/old/nodes';
import { ResourceSubNodeStore } from '@type/roadmap/old/resources';
import { diffTabInfoNew } from '@store/roadmap/cache/diff-tabs';
import { cacheTabInfo } from '@store/roadmap/cache/cached-tabs';
import { changeTabIssuePropFlow } from '@src/typescript/roadmap/tab-logic-flows';

/*
The get function naming convention is:
get<type><Object>
eg: getUnusedId
The change function naming convention is:
<action><Object>
eg: changeNodeResourceProp
The add/generate function naming convention is:
add<Object><Type>
generateNodeResourceEmpty
*/

export function getNodeLevel(id: string) {
  const original = roadmapEdit.get();
  const { nodes } = original;
  return nodes[id].level;
}

export function getNodeInfoTitle(id: string) {
  const original = roadmapEdit.get();
  const { nodes } = original;
  return nodes[id].title;
}

export function getNodeInfoTabId(id: string) {
  const original = roadmapEdit.get();
  const { nodes } = original;
  const node = nodes[id];
  if (isNodeInfoStore(node)) {
    return node.tabId;
  }
  throw new Error('No node found for given id');
}

export function getRoadmapEdit() {
  return roadmapEdit.get();
}

export function addNewTab(newId: string, newTab: TabInfo) {
  // adds the new DisplayManager to the diff and to the cache
  diffTabInfoNew(newId, newTab);
  cacheTabInfo(newId, newTab);
}

export const getUnusedTabId = () => {
  // generates a new unused tab-attachment id
  return uuidv4();
};

export const generateNewTab = () => {
  const newId = getUnusedTabId();
  const newTab = generateTabInfo(
    newId,
    'New Tab',
    false,
    '',
    [],
    'Add some additional info here'
  );
  addNewTab(newId, newTab);
  return newId;
};

export function addChunkNode(id: string, chunkId: string) {
  // adds a node to a chunk
  const original = roadmapEdit.get();
  const { nodes } = original;
  const node = nodes[id];
  if (!isNodeTypesStore(node)) {
    throw new Error('No node found for given id');
  }
  node.chunk = chunkId;
  nodes[id] = node;
  original.nodes = nodes;
  // adds node to the corresponding chunk
  let chunkArr = original.chunks[chunkId];
  if (!chunkArr) {
    chunkArr = [id];
  } else {
    chunkArr.push(id);
  }
  original.chunks[chunkId] = chunkArr;
  roadmapEdit.set({ ...original });
}

export function removeChunkNode(id: string) {
  // remove a node from a chunk
  const original = roadmapEdit.get();
  const { nodes } = original;
  const node = nodes[id];
  if (!isNodeTypesStore(node)) {
    throw new Error('No node found for given id');
  }
  const { chunk: chunkId } = node;
  // we remove the nodeId from the chunk
  let chunkArr = original.chunks[chunkId];
  if (!chunkArr) return; // if the chunk doesn't exist, we don't need to do anything
  chunkArr = chunkArr.filter((nodeId) => nodeId !== id);
  original.chunks[chunkId] = chunkArr;

  roadmapEdit.set({ ...original });
}

export function changeNodeResource<T extends keyof NodeResourceStore>(
  id: string,
  property: T,
  value: NodeResourceStore[T]
) {
  const original = roadmapEdit.get();
  const { nodes } = original;
  const node = nodes[id];
  if (!isNodeResourceStore(node)) {
    throw new Error('No node found for given id');
  }
  node[property] = value;
  original.nodes = nodes;
  roadmapEdit.set({ ...original });
}

export function changeIssue<T extends keyof TabIssue>(
  id: string,
  property: T,
  value: TabIssue[T]
) {
  changeTabIssuePropFlow(id, property, value);
}

export function getUnusedResourceSubNodeId() {
  const original = roadmapEdit.get();
  const { resources } = original;
  const ids = Object.keys(resources);
  let newId = 'resourceSubNodeId';
  let appendedNumber = 0;
  while (ids.includes(newId + appendedNumber)) {
    appendedNumber += 1;
  }
  newId += appendedNumber;
  return newId;
}

export function generateResourceSubNodeEmpty(
  id,
  tabId,
  parentId
): ResourceSubNodeStore {
  return {
    id,
    parentId,
    tabId,
    type: 'ResourceSubNode',
    title: '',
    level: getNodeLevel(parentId),
  };
}

export function generateResourceSubNodeNew(parentId: string) {
  const original = roadmapEdit.get();
  const { resources } = original;
  const newId = getUnusedResourceSubNodeId();
  const tabId = generateNewTab();
  resources[newId] = generateResourceSubNodeEmpty(newId, tabId, parentId);
  original.resources = resources;
  roadmapEdit.set({ ...original });
  return newId;
}

export function getUnusedNodeId() {
  const original = roadmapEdit.get();
  const { nodes } = original;
  const ids = Object.keys(nodes);
  const newId = uuidv4();
  return newId;
}

export function addNodeResourceEmpty(
  parentId: string,
  id: string,
  title: string,
  x: number,
  y: number
) {
  const original = roadmapEdit.get();
  const { nodes } = original;
  const newId = id;
  nodes[newId] = generateNodeResourceEmpty(newId);
  nodes[newId].title = title;
  nodes[newId].x = x;
  nodes[newId].y = y;
  nodes[newId].parent = parentId;
  nodes[parentId].children.push(newId);
  nodes[newId].chunk = calculateChunkId(x, y);

  original.nodes = nodes;
  roadmapEdit.set({ ...original });
  return newId;
}

export function addNodeInfoEmpty(
  parentId: string,
  id: string,
  title: string,
  x: number,
  y: number
) {
  const original = roadmapEdit.get();
  const { nodes } = original;
  const newId = id;
  const newNode = generateNodeInfoEmpty(newId);
  newNode.title = title;
  newNode.x = x;
  newNode.y = y;
  newNode.tabId = generateNewTab();
  newNode.parent = parentId;
  nodes[parentId].children.push(newId);
  nodes[newId] = newNode;
  const chunkId = calculateChunkId(x, y);
  addChunkNode(newId, chunkId);
  original.nodes = nodes;
  roadmapEdit.set({ ...original });
  return newId;
}
export function getUnusedConnectionId() {
  const original = roadmapEdit.get();
  const { connections } = original;
  const ids = Object.keys(connections);
  let newId = 'connectionId';
  let appendedNumber = 0;
  while (ids.includes(newId + appendedNumber)) {
    appendedNumber += 1;
  }
  newId += appendedNumber;
  return newId;
}

export function generateConnectionEmpty(id: string) {
  return {
    id,
    parentId: '',
    childId: '',
  };
}

export function addConnection(parentId: string, childId: string) {
  const original = roadmapEdit.get();
  const { connections, nodes } = original;
  const newId = getUnusedConnectionId();
  const newConnection = generateConnectionEmpty(newId);
  newConnection.parentId = parentId;
  newConnection.childId = childId;
  connections[newId] = newConnection;
  original.connections = connections;
  // adds connection to the parent and the child
  nodes[parentId].connections.push(newId);
  nodes[childId].connections.push(newId);
  original.nodes = nodes;

  roadmapEdit.set({ ...original });
}

export function getNodeByIdEdit(id: string) {
  const original = roadmapEdit.get();
  const { nodes } = original;
  return nodes[id];
}

export function setRoadmap(roadmap: Roadmap) {
  roadmapEdit.set({ ...roadmap });
}

export function getRoadmap(): Roadmap {
  return roadmapEdit.get();
}

export function getResourceSubNodeById(id: string) {
  const original = roadmapEdit.get();
  const { resources } = original;
  return resources[id];
}
