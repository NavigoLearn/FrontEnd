import { TabAbout, TabInfo, TabIssue } from '@type/roadmap/old/tab-manager';
import { NodeInfoStore, NodeResourceStore } from '@type/roadmap/old/nodes';
import { ResourceSubNodeStore } from '@type/roadmap/old/resources';
import { LevelTypes } from '@type/roadmap/old/level-types';
import { calculateChunkId } from '@src/typescript/roadmap/utils';

export function generateTabAbout(
  name: string,
  author: string,
  description: string
): TabAbout {
  return {
    name,
    author,
    description,
  };
}

export function generateIssue(
  id: string,
  title: string,
  author: string
): TabIssue {
  return {
    id,
    title,
    author,
  };
}

export function generateTabInfo(
  id: string,
  title: string,
  done: boolean,
  description: string,
  links: { title: string; link: string }[],
  additionalInfo: string
): TabInfo {
  return {
    id,
    title,
    done,
    description,
    links,
    additionalInfo,
  };
}

export function generateNodeInfo(
  id: string,
  title: string,
  tabId: string,
  x: number,
  y: number,
  parent: string,
  children: string[],
  connections: string[],
  chunk: string
): NodeInfoStore {
  return {
    id,
    title,
    type: 'Info',
    tabId,
    x,
    y,
    parent,
    children,
    chunk,
    level: 'secondary',
    connections,
  };
}

export function generateStarterNode(
  tabId: string,
  x: number,
  y: number,
  parent: string,
  children: string[]
): any {
  const nodes = {};
  const id = 'rootNodeId';
  const chunk = calculateChunkId(x, y);
  const node = generateNodeInfo(
    id,
    'rootNode',
    tabId,
    x,
    y,
    parent,
    children,
    [],
    chunk
  );
  node.level = 'main';
  const chunkNodes = {};
  chunkNodes[node.chunk] = [node.id];
  nodes[node.id] = node;

  return {
    nodes,
    chunkNodes,
  };
}

export function generateNodeResource(
  id: string,
  title: string,
  x: number,
  y: number,
  nodes: string[],
  parent: string,
  connections: string[],
  chunk: string
): NodeResourceStore {
  return {
    id,
    title,
    type: 'Resource',
    nodes,
    x,
    y,
    parent,
    children: [],
    chunk,
    level: 'secondary',
    connections,
  };
}

export function generateNodeResourceEmpty(id: string): NodeResourceStore {
  return {
    id,
    title: '',
    type: 'Resource',
    nodes: [],
    x: 0,
    y: 0,
    parent: '',
    children: [],
    chunk: '',
    level: 'secondary',
    connections: [],
  };
}

export function generateResourceSubNodeEmpty(
  id: string,
  parentId: string,
  title: string,
  tabId: string
): ResourceSubNodeStore {
  return {
    parentId,
    id,
    title,
    type: 'ResourceSubNode',
    tabId,
    level: 'secondary',
  };
}

export function generateNodeInfoEmpty(id: string): NodeInfoStore {
  return {
    id,
    title: '',
    type: 'Info',
    tabId: '',
    x: 0,
    y: 0,
    parent: '',
    children: [],
    chunk: '',
    level: 'secondary',
    connections: [],
  };
}

export function generateResourceSubNode(
  id: string,
  parentId: string,
  title: string,
  tabId: string,
  level: LevelTypes
): ResourceSubNodeStore {
  return {
    parentId,
    id,
    title,
    type: 'ResourceSubNode',
    tabId,
    level,
  };
}

export function generateConnection(
  id: string,
  parentId: string,
  childId: string
) {
  return {
    id,
    parentId,
    childId,
  };
}
