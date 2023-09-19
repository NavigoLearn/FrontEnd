import { atom } from 'nanostores';
import { ConnectionClass } from '@src/typescript/roadmap_ref/node/connections/core';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { getConnectionByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { setEditingState } from '@store/roadmap-refactor/editing/editing-state';
import {
  clearAllDefocusEffects,
  setConnectionSelectedEffect,
  setConnectionUnselectedEffect,
} from '@store/roadmap-refactor/elements-editing/store-node-effects';
import { setDefaultDraggabilitySettings } from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { getIsEditing } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import {
  getParentNodeIdBasedOnConnection,
  getIdCurrentConnection,
} from './services';

export const storeConnectionSelectedChild = atom<string | null>(null);
export const storeConnectionSelectedParent = atom<string | null>(null);
export const storeConnectionSelected = atom<ConnectionClass | null>(null);

export const setConnectionSelected = (nodeId: string) => {
  storeConnectionSelectedChild.set(nodeId);
  storeConnectionSelected.set(getIdCurrentConnection(nodeId));
  const parentNodeId = getParentNodeIdBasedOnConnection(nodeId);
  storeConnectionSelectedParent.set(parentNodeId);
  triggerNodeRerender(nodeId);
};

export const clearSelectedConnection = () => {
  const parentNodeId = storeConnectionSelectedParent.get();
  const childNodeId = storeConnectionSelectedChild.get();
  storeConnectionSelectedParent.set(null);
  storeConnectionSelected.set(null);
  storeConnectionSelectedChild.set(null);
  if (!parentNodeId || !childNodeId) return;
  setConnectionUnselectedEffect();
  setDefaultDraggabilitySettings();
  triggerNodeRerender(parentNodeId);
  triggerNodeRerender(childNodeId);
};

export const setSelectedConnectionFromChildProtocol = (childId: string) => {
  storeConnectionSelectedChild.set(childId);
  storeConnectionSelected.set(getIdCurrentConnection(childId));
  const parentNodeId = getParentNodeIdBasedOnConnection(childId);
  storeConnectionSelectedParent.set(parentNodeId);

  setConnectionSelectedEffect(parentNodeId, childId);
  triggerNodeRerender(childId);
  triggerNodeRerender(parentNodeId);
};

export const setSelectedConnectionForConnectionId = (connectionId: string) => {
  const connection = getConnectionByIdRoadmapSelector(connectionId);
  const { from, to } = connection;
  setSelectedConnectionFromChildProtocol(to);
  setEditingState('connections');
};
