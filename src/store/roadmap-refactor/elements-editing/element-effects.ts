import { atom } from 'nanostores';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { getTracebackNodeToRoot } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { HashMap, HashMapWithKeys } from '@type/roadmap/stores/roadmap';
import {
  effectBorderBlack,
  effectBorderBlue,
  effectBorderRed,
  effectBorderYellow,
  effectOpacity100,
  effectOpacity30,
  effectOpacity60,
} from '@src/to-be-organized/nodeview/effects';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';

export type IEffectsStatuses =
  | 'mark-as-progress'
  | 'mark-as-completed'
  | 'mark-as-skipped'
  | 'mark-as-status';

export type IEffectsNames =
  | 'editor-defocused-node'
  | 'editor-focused-node'
  | 'dragging-recursive'
  | 'mark-as-progress'
  | 'mark-as-completed'
  | 'mark-as-skipped'
  | 'mark-as-status';

export type IEffectFunction = (divElementRef: HTMLDivElement) => void;
export const effectMapper: HashMapWithKeys<IEffectsNames, IEffectFunction> = {
  'editor-defocused-node': effectOpacity30,
  'editor-focused-node': effectOpacity100,
  'dragging-recursive': effectBorderRed,
  'mark-as-completed': (divRef) => {
    effectOpacity30(divRef);
  },
  'mark-as-progress': (divRef) => {
    effectOpacity100(divRef);
  },
  'mark-as-skipped': (divRef) => {
    effectOpacity60(divRef);
  },
  'mark-as-status': (divRef) => {
    effectOpacity100(divRef);
  },
};

export const elementEffects = atom({} as HashMap<IEffectsNames[]>);

export function setElementEffects(id: string, effects: IEffectsNames[]) {
  const originalEffects = elementEffects.get();
  elementEffects.set({
    ...originalEffects,
    [id]: effects,
  });
}

export function setElementEffectsEmpty(id: string) {
  const originalEffects = elementEffects.get();
  originalEffects[id] = [];
  elementEffects.set({
    ...originalEffects,
  });
}
export function applyElementEffects(id: string, divElementRef: HTMLDivElement) {
  const originalEffects = elementEffects.get();
  originalEffects[id].forEach((effect) => {
    effectMapper[effect](divElementRef);
  });
}

export function deleteElementEffect(
  originalEffects,
  id,
  effect: IEffectsNames
) {
  originalEffects[id] = originalEffects[id].filter(
    (effectName) => effectName !== effect
  );
  elementEffects.set({
    ...originalEffects,
  });
}

export function appendElementEffect(id, effect: IEffectsNames) {
  const originalEffects = elementEffects.get();
  if (!originalEffects[id]) originalEffects[id] = [];
  if (!originalEffects[id].includes(effect)) originalEffects[id].push(effect);
  elementEffects.set({
    ...originalEffects,
  });
}

export function appendStatusEffect(id: string, status: IEffectsStatuses) {
  const originalEffects = elementEffects.get();
  const statusEffects: IEffectsStatuses[] = [
    'mark-as-progress',
    'mark-as-completed',
    'mark-as-skipped',
    'mark-as-status',
  ];
  statusEffects.forEach((effect) => {
    deleteElementEffect(originalEffects, id, effect);
  });
  appendElementEffect(id, status);
  elementEffects.set({
    ...originalEffects,
  });
}

export function setEditorOpenEffect(nodeId: string) {
  // applies opacity 50 to all nodes-page except the one with the id
  const originalEffects = elementEffects.get();
  const nodes = Object.keys(originalEffects);
  // getting the line of parent nodes-page from the node to the root
  const blackListed = getTracebackNodeToRoot(nodeId);
  // add parent nodes-page to blacklisted
  const currentNode = roadmapSelector.get().nodes[nodeId];
  currentNode.subNodeIds.forEach((id) => {
    blackListed.push(id);
  });

  nodes.forEach((id) => {
    if (blackListed.includes(id)) {
      // blacklist means normal node
      deleteElementEffect(originalEffects, id, 'editor-defocused-node');
      originalEffects[id].push('editor-focused-node');
    } else {
      // not in blacklist means parent node
      deleteElementEffect(originalEffects, id, 'editor-focused-node');
      originalEffects[id].push('editor-defocused-node');
    }
  });

  originalEffects[nodeId] = [];
  elementEffects.set({
    ...originalEffects,
  });
}

export function setEditorClosedEffect() {
  // removes opacity 50 from all nodes-page
  const originalEffects = elementEffects.get();
  const nodes = Object.keys(originalEffects);
  nodes.forEach((id) => {
    // if node was defocused, remove defocused effect
    deleteElementEffect(originalEffects, id, 'editor-defocused-node');
  });
  elementEffects.set({
    ...originalEffects,
  });
}

export function removeAllEffects() {
  const originalEffects = elementEffects.get();
  const nodes = Object.keys(originalEffects);
  nodes.forEach((id) => {
    originalEffects[id] = [];
  });
  elementEffects.set({
    ...originalEffects,
  });
}

export function appendDraggingRecursiveEffect(nodeId: string) {
  const originalEffects = elementEffects.get();
  appendElementEffect(nodeId, 'dragging-recursive');
  elementEffects.set({
    ...originalEffects,
  });
}

export function deleteDraggingRecursiveEffect(nodeId: string) {
  const originalEffects = elementEffects.get();
  deleteElementEffect(originalEffects, nodeId, 'dragging-recursive');
  elementEffects.set({
    ...originalEffects,
  });
}

export function getElementHasEffect(id: string, effect: IEffectsNames) {
  const originalEffects = elementEffects.get();
  return originalEffects[id].includes(effect);
}
