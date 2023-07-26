import { atom } from 'nanostores';
import {
  generateNewTab,
  generateResourceSubNodeEmpty,
} from '@src/typescript/roadmap/roadmap-edit-logic';
import { Roadmap } from '@type/roadmap/old/roadmap';
import roadmapEdit from '@store/roadmap/data/roadmap_edit';
import { deepCopy } from '@src/typescript/roadmap/utils';
import {
  isNodeInfoStore,
  isNodeResourceStore,
} from '@type/roadmap/old/typecheckers';
import {
  triggerRerenderDecorator,
  triggerTabTitleChangeSideEffectDecorator,
} from '@src/typescript/roadmap/roadmap-edit-decorators';
import { NodeInfoStore, NodeResourceStore } from '@type/roadmap/old/nodes';
import { ResourcesStoreTypes } from '@type/roadmap/old/resources';

const roadmapPlaceholder = atom({
  nodes: {},
  resources: {},
  connections: {},
  // chunks are not needed here, we only change nodes info
} as Roadmap);

export function getUnusedResourceSubNodeId() {
  const original = roadmapPlaceholder.get();
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
export const transferNodeInfoFromEditToPlaceholder = triggerRerenderDecorator(
  (id: string) => {
    const editRoamap = roadmapEdit.get();
    const original = roadmapPlaceholder.get();
    const { nodes } = editRoamap;
    const node = nodes[id];
    if (!node) {
      throw new Error('No node found for given id');
    }
    original.nodes[id] = deepCopy(node);
    roadmapPlaceholder.set({ ...original });
  }
);

export function transferResourceFromEditToPlaceholder(id: string) {
  const editRoamap = roadmapEdit.get();
  const original = roadmapPlaceholder.get();
  const { resources } = editRoamap;
  const resource = resources[id];
  if (!resource) {
    throw new Error('No resource found for given id');
  }
  original.resources[id] = deepCopy(resource);
  roadmapPlaceholder.set({ ...original });
}

export const transferNodeResourceFromPlaceholderToEdit =
  triggerRerenderDecorator((nodeId: string) => {
    const original = roadmapEdit.get();
    const placeholder = roadmapPlaceholder.get();
    const { nodes, resources } = placeholder;
    const node = deepCopy(nodes[nodeId]);
    if (!node) {
      throw new Error('No node found for given id');
    }
    if (!isNodeResourceStore(node)) {
      throw new Error('Invalid node type when adding resource subNode');
    }
    original.nodes[nodeId] = deepCopy(node);
    node.nodes.forEach((subNodeId) => {
      const subNode = resources[subNodeId];
      if (!subNode) {
        throw new Error('No resource found for given id');
      }
      original.resources[subNodeId] = subNode;
    });
    roadmapEdit.set({ ...original });
  });

export function transferNodeResourceFromEditToPlaceholder(nodeId: string) {
  const editRoadmap = roadmapEdit.get();
  const original = roadmapPlaceholder.get();
  const { nodes, resources } = editRoadmap;
  const node = deepCopy(nodes[nodeId]);
  if (!node) {
    throw new Error('No node found for given id');
  }
  if (!isNodeResourceStore(node)) {
    throw new Error('Invalid node type when adding resource subNode');
  }
  original.nodes[nodeId] = deepCopy(node);
  node.nodes.forEach((subNodeId) => {
    const subNode = resources[subNodeId];
    if (!subNode) {
      throw new Error('No resource found for given id');
    }
    original.resources[subNodeId] = deepCopy(subNode);
  });
  roadmapPlaceholder.set({ ...original });
}
export function removeNodeInfoFromPlaceholder(id: string) {
  const original = roadmapPlaceholder.get();
  const { nodes } = original;
  delete nodes[id];
  original.nodes = nodes;
  roadmapPlaceholder.set({ ...original });
}

export function generateResourceSubNodeNew(parentId: string) {
  const original = roadmapPlaceholder.get();
  const { resources } = original;
  const newId = getUnusedResourceSubNodeId();
  const tabId = generateNewTab();
  resources[newId] = generateResourceSubNodeEmpty(newId, tabId, parentId);
  original.resources = resources;
  roadmapPlaceholder.set({ ...original });
  return newId;
}

export function getResourceSubNodeByIdPlaceholder(id: string) {
  const original = roadmapPlaceholder.get();
  const { resources } = original;
  return resources[id];
}
export const addResourceSubNodeNew = triggerRerenderDecorator((id: string) => {
  const original = roadmapPlaceholder.get();
  const { nodes } = original;
  if (!nodes[id] || nodes[id].type !== 'Resource')
    throw new Error('Invalid node type when adding new resource subNode');

  const newId = generateResourceSubNodeNew(id);
  const currentNode = nodes[id];
  if (!isNodeResourceStore(currentNode)) {
    throw new Error('Invalid node type when adding new resource subNode');
  }
  currentNode.nodes.push(newId);
  original.nodes = nodes;
  roadmapPlaceholder.set({ ...original });
});

export const transferNodeInfoFromPlaceholderToEdit = triggerRerenderDecorator(
  triggerTabTitleChangeSideEffectDecorator((id: string) => {
    const editRoamap = roadmapEdit.get();
    const original = roadmapPlaceholder.get();
    const { nodes } = original;
    const node = nodes[id];
    if (!node) {
      throw new Error('No node found for given id');
    }
    editRoamap.nodes[id] = deepCopy(node);
    roadmapEdit.set({ ...editRoamap });
  })
);

export const transferResourceFromPlaceholderToEdit = triggerRerenderDecorator(
  (id: string) => {
    const editRoamap = roadmapEdit.get();
    const original = roadmapPlaceholder.get();
    const { resources } = original;
    const resource = resources[id];
    if (!resource) {
      throw new Error('No resource found for given id');
    }
    editRoamap.resources[id] = deepCopy(resource);
    roadmapEdit.set({ ...editRoamap });
  }
);

export function removeNodeResourceFromPlaceholder(nodeId: string) {
  const original = roadmapPlaceholder.get();
  const { nodes, resources } = original;
  const node = nodes[nodeId];
  if (!node) {
    throw new Error('No node found for given id');
  }
  if (!isNodeResourceStore(node)) {
    throw new Error('Invalid node type when adding resource subNode');
  }
  node.nodes.forEach((subNodeId) => {
    delete resources[subNodeId];
  });
  original.resources = resources;
  delete original.nodes[nodeId];
  roadmapPlaceholder.set({ ...original });
}

export const changeNodeInfo = <T extends keyof NodeInfoStore>(
  id: string,
  property: T,
  value: NodeInfoStore[T]
) => {
  const original = roadmapPlaceholder.get();
  const { nodes } = original;
  const node = nodes[id];
  if (!isNodeInfoStore(node)) {
    throw new Error('No node found for given id');
  }
  node[property] = value;
  nodes[id] = node;
  original.nodes = nodes;
  roadmapPlaceholder.set({ ...original });
};

export const changeNodeResource = <T extends keyof NodeResourceStore>(
  id: string,
  property: T,
  value: NodeResourceStore[T]
) => {
  const original = roadmapPlaceholder.get();
  const { nodes } = original;
  const node = nodes[id];
  if (!isNodeResourceStore(node)) {
    throw new Error('No node found for given id');
  }
  node[property] = value;
  original.nodes = nodes;
  roadmapPlaceholder.set({ ...original });
};

export const changeResourceSubNode = <T extends keyof ResourcesStoreTypes>(
  id: string,
  property: T,
  value: ResourcesStoreTypes[T]
) => {
  const original = roadmapPlaceholder.get();
  const { resources } = original;
  const resource = resources[id];
  if (!resource) {
    throw new Error('No resource found for given id');
  }
  resource[property] = value;
  resources[id] = resource;
  original.resources = resources;
  roadmapPlaceholder.set({ ...original });
};

export const getNodeByIdPlaceholder = (id: string) => {
  const original = roadmapPlaceholder.get();
  const { nodes } = original;
  const node = nodes[id];
  if (!node) {
    throw new Error('No node found for given id');
  }
  return node;
};

export const removeResourceSubNode = triggerRerenderDecorator(
  (id: string, subNodeId: string) => {
    const original = roadmapPlaceholder.get();
    const { nodes } = original;
    if (!nodes[id] || nodes[id].type !== 'Resource') {
      throw new Error('Invalid node type when removing resource subNode');
    }
    const currentNode = nodes[id];
    if (!isNodeResourceStore(currentNode)) {
      throw new Error('Invalid node type when removing resource subNode');
    }
    currentNode.nodes = currentNode.nodes.filter((node) => node !== subNodeId);
    original.nodes = nodes;
    // remove resource subNode too!
    delete original.resources[subNodeId];
    roadmapPlaceholder.set({ ...original });
  }
);
export const changeResourceSubNodeTitle = (
  subNodeId: string,
  title: string
) => {
  const original = roadmapPlaceholder.get();
  const { resources } = original;
  const resource = resources[subNodeId];
  if (!resource) {
    throw new Error('No resource found for given id');
  }
  resource.title = title;
  resources[subNodeId] = resource;
  original.resources = resources;
  roadmapPlaceholder.set({ ...original });
};

export default roadmapPlaceholder;
