import { atom } from 'nanostores';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { getTracebackNodeToRoot } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { HashMapWithKeys, HashMap } from '@type/roadmap/misc';
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

export type IEffectsFocus = 'defocus-node';

export type IEffectsDragging = 'dragging-recursive';

export type IEffectsPossible =
  | IEffectsStatuses
  | IEffectsDragging
  | IEffectsFocus;

export type IEffectProperties = {
  effectName: IEffectsPossible;
  effectApply: (divRef: HTMLDivElement) => void;
  effectLayer: number;
};

export const dynamicEffectsMapper: HashMapWithKeys<
  IEffectsPossible,
  IEffectProperties
> = {
  'defocus-node': {
    effectName: 'defocus-node',
    effectApply: (divRef) => effectOpacity60(divRef),
    effectLayer: 1,
  },
  'dragging-recursive': {
    effectName: 'dragging-recursive',
    effectApply: effectBorderRed,
    effectLayer: 1,
  },
  'mark-as-completed': {
    effectName: 'mark-as-completed',
    effectApply: (divRef) => effectOpacity30(divRef),
    effectLayer: 10,
  },
  'mark-as-progress': {
    effectName: 'mark-as-progress',
    effectApply: (divRef) => effectOpacity100(divRef),
    effectLayer: 10,
  },
  'mark-as-skipped': {
    effectName: 'mark-as-skipped',
    effectApply: (divRef) => effectOpacity60(divRef),
    effectLayer: 10,
  },
  'mark-as-status': {
    effectName: 'mark-as-status',
    effectApply: (divRef) => effectOpacity100(divRef),
    effectLayer: 10,
  },
};
export const elementEffects = atom({} as HashMap<IEffectsPossible[]>);

export function setElementEffects(id: string, effects: IEffectsPossible[]) {
  const originalEffects = elementEffects.get();
  elementEffects.set({
    ...originalEffects,
    [id]: effects,
  });
}

export function setElementEffectsInitialEmpty(id: string) {
  const originalEffects = elementEffects.get();
  if (originalEffects[id]) {
    return;
  }
  originalEffects[id] = [];
  elementEffects.set({
    ...originalEffects,
  });
}
export function applyElementEffects(id: string, divElementRef: HTMLDivElement) {
  const originalEffects = elementEffects.get();
  const effectsArr = originalEffects[id].map(
    (effectElement) => dynamicEffectsMapper[effectElement]
  );

  const sortedEffectsArr = effectsArr.sort((a, b) => {
    return a.effectLayer - b.effectLayer;
  });

  sortedEffectsArr.forEach((effectElement) => {
    effectElement.effectApply(divElementRef);
  });
}

export function deleteElementEffect(
  originalEffects,
  id,
  effect: IEffectsPossible
) {
  if (!originalEffects[id]) return;
  originalEffects[id] = originalEffects[id].filter(
    (effectName) => effectName !== effect
  );
  elementEffects.set({
    ...originalEffects,
  });
}

export function appendElementEffect(id, effect: IEffectsPossible) {
  const originalEffects = elementEffects.get();
  if (!originalEffects[id]) originalEffects[id] = [];
  if (!originalEffects[id].includes(effect)) originalEffects[id].push(effect);
  elementEffects.set({
    ...originalEffects,
  });
}

export function deleteStatusEffectAll(id: string) {
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

export function defocusAllNodesExceptBlacklist(blackListed: string[]) {
  const originalEffects = elementEffects.get();
  const nodes = Object.keys(roadmapSelector.get().nodes);
  nodes.forEach((id) => {
    if (blackListed.includes(id)) {
      deleteElementEffect(originalEffects, id, 'defocus-node');
    } else {
      originalEffects[id].push('defocus-node');
    }
  });
}

export function setEditorOpenEffect(nodeId: string) {
  // applies opacity 60 to all nodes-page except the one with the id
  const originalEffects = elementEffects.get();
  const nodes = Object.keys(originalEffects);
  // getting the line of parent nodes-page from the node to the root
  const blackListed = getTracebackNodeToRoot(nodeId);
  // add parent nodes-page to blacklisted
  const currentNode = roadmapSelector.get().nodes[nodeId];
  currentNode.subNodeIds.forEach((id) => {
    blackListed.push(id);
  });
  blackListed.push(nodeId);

  defocusAllNodesExceptBlacklist(blackListed);

  elementEffects.set({
    ...originalEffects,
  });
}

export function setConnectionSelectedEffect(parentId: string, childId: string) {
  const originalEffects = elementEffects.get();
  const blackListed = [parentId, childId];

  defocusAllNodesExceptBlacklist(blackListed);

  elementEffects.set({
    ...originalEffects,
  });
}

export function clearAllDefocusEffects() {
  const originalEffects = elementEffects.get();
  const nodes = Object.keys(originalEffects);
  nodes.forEach((id) => {
    deleteElementEffect(originalEffects, id, 'defocus-node');
  });
}

export function setConnectionUnselectedEffect() {
  const originalEffects = elementEffects.get();
  clearAllDefocusEffects();
  elementEffects.set({
    ...originalEffects,
  });
}

export function setEditorClosedEffect() {
  const originalEffects = elementEffects.get();
  clearAllDefocusEffects();
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

export function getElementHasEffect(id: string, effect: IEffectsPossible) {
  const originalEffects = elementEffects.get();
  return originalEffects[id].includes(effect);
}

export function getElementEffects(id: string) {
  const originalEffects = elementEffects.get();
  return originalEffects[id];
}
