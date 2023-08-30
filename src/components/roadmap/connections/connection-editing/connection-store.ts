import { atom } from 'nanostores';
import { ConnectionClass } from '@src/typescript/roadmap_ref/node/connections/core';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import {
  getParentNodeIdBasedOnConnection,
  getIdCurrentConnection,
} from './services';

export const selectedNodeIdChild = atom<string | null>(null);
export const selectedNodeIdParent = atom<string | null>(null);
export const selectedConnectionId = atom<ConnectionClass | null>(null);

export const setSelectedNodeIdChild = (nodeId: string) => {
  selectedNodeIdChild.set(nodeId);
  selectedConnectionId.set(getIdCurrentConnection(nodeId));
  triggerNodeRerender(nodeId);
};

export const clearSelectedNodeIdChild = () => {
  selectedNodeIdChild.set(null);
  selectedConnectionId.set(null);
};

export const setSelectedNodeIdParent = (nodeId: string) => {
  const parentNodeId = getParentNodeIdBasedOnConnection(nodeId);
  selectedNodeIdParent.set(parentNodeId);
  triggerNodeRerender(parentNodeId);
};

export const clearSelectedNodeIdParent = () => {
  selectedNodeIdParent.set(null);
};
