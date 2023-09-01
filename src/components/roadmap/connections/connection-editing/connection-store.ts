import { atom } from 'nanostores';
import { ConnectionClass } from '@src/typescript/roadmap_ref/node/connections/core';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { getConnectionByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { setEditingState } from '@store/roadmap-refactor/editing/editing-state';
import {
  clearAllDefocusEffects,
  setConnectionSelectedEffect,
  setConnectionUnselectedEffect,
} from '@store/roadmap-refactor/elements-editing/element-effects';
import { setDefaultDraggabilitySettings } from '@store/roadmap-refactor/elements-editing/draggable-elements';
import {
  getParentNodeIdBasedOnConnection,
  getIdCurrentConnection,
} from './services';

export const selectedNodeIdChild = atom<string | null>(null);
export const selectedNodeIdParent = atom<string | null>(null);
export const selectedConnectionId = atom<ConnectionClass | null>(null);

export const setConnectionSelected = (nodeId: string) => {
  selectedNodeIdChild.set(nodeId);
  selectedConnectionId.set(getIdCurrentConnection(nodeId));
  const parentNodeId = getParentNodeIdBasedOnConnection(nodeId);
  selectedNodeIdParent.set(parentNodeId);
  triggerNodeRerender(nodeId);
};

export const clearSelectedConnection = () => {
  const parentNodeId = selectedNodeIdParent.get();
  const childNodeId = selectedNodeIdChild.get();
  selectedNodeIdParent.set(null);
  selectedConnectionId.set(null);
  selectedNodeIdChild.set(null);
  if (!parentNodeId || !childNodeId) return;
  setConnectionUnselectedEffect();
  setDefaultDraggabilitySettings();
  triggerNodeRerender(parentNodeId);
  triggerNodeRerender(childNodeId);
};

export const setSelectedConnectionFromChildProtocol = (childId: string) => {
  selectedNodeIdChild.set(childId);
  selectedConnectionId.set(getIdCurrentConnection(childId));
  const parentNodeId = getParentNodeIdBasedOnConnection(childId);
  selectedNodeIdParent.set(parentNodeId);

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
