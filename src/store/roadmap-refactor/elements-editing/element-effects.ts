import { atom } from 'nanostores';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { getTracebackNodeToRoot } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { HashMapWithKeys, HashMap } from '@type/roadmap/misc';
import {
  effectBorderBlack,
  effectBorderBlue,
  effectBorderBlueDashed,
  effectBorderRed,
  effectBorderRedRect,
  effectBorderYellow,
  effectOpacity100,
  effectOpacity30,
  effectOpacity60,
  effectOpacity60Rect,
  effectBorderBlueRect,
  effectOpacity100Rect,
  effectOpacity30Rect,
} from '@src/to-be-organized/nodeview/effects';
import { getHideProgress } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import {
  getElementG,
  getElementRect,
} from '@store/roadmap-refactor/elements-editing/elements-gs';

export type IEffectsStatuses =
  | 'mark-as-progress'
  | 'mark-as-completed'
  | 'mark-as-skipped'
  | 'mark-as-status';

export type IEffectsFocus = 'defocus-node';

export type IEffectsDragging = 'dragging-recursive';

export type IEffectsUserActions = 'on-mouse-over';

export type IEffectsPossible =
  | IEffectsStatuses
  | IEffectsDragging
  | IEffectsFocus
  | IEffectsUserActions;

export type IEffectProperties = {
  effectName: IEffectsPossible;
  effectApply: (divRef: SVGRectElement) => void; // changed here
  effectLayer: number;
};
export const dynamicEffectsMapper: HashMapWithKeys<
  IEffectsPossible,
  IEffectProperties
> = {
  'defocus-node': {
    effectName: 'defocus-node',
    effectApply: (rectRef: SVGRectElement) => {
      effectOpacity60Rect(rectRef);
    },
    effectLayer: 1,
  },
  'dragging-recursive': {
    effectName: 'dragging-recursive',
    effectApply: (rectRef: SVGRectElement) => {
      effectBorderRedRect(rectRef);
    },
    effectLayer: 5,
  },
  'on-mouse-over': {
    effectName: 'on-mouse-over',
    effectApply: (rectRef: SVGRectElement) => {
      effectBorderBlueRect(rectRef);
    },
    effectLayer: 1,
  },
  'mark-as-completed': {
    effectName: 'mark-as-completed',
    effectApply: (rectRef: SVGRectElement) => {
      if (getHideProgress()) return;
      effectOpacity30Rect(rectRef);
    },
    effectLayer: 10,
  },
  'mark-as-progress': {
    effectName: 'mark-as-progress',
    effectApply: (rectRef: SVGRectElement) => {
      if (getHideProgress()) return;
      effectOpacity100Rect(rectRef);
    },
    effectLayer: 10,
  },
  'mark-as-skipped': {
    effectName: 'mark-as-skipped',
    effectApply: (rectRef: SVGRectElement) => {
      if (getHideProgress()) return;
      effectOpacity60Rect(rectRef);
    },
    effectLayer: 10,
  },
  'mark-as-status': {
    effectName: 'mark-as-status',
    effectApply: (rectRef: SVGRectElement) => {
      if (getHideProgress()) return;
      effectOpacity100Rect(rectRef);
    },
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

export function applyElementEffects(id: string) {
  const rectElementRef = getElementRect(id);

  const originalEffects = elementEffects.get();
  const effectsArr = originalEffects[id].map(
    (effectElement) => dynamicEffectsMapper[effectElement]
  );
  const sortedEffectsArr = effectsArr.sort((a, b) => {
    return a.effectLayer - b.effectLayer;
  });
  sortedEffectsArr.forEach((effectElement) => {
    effectElement.effectApply(rectElementRef);
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

export function deleteElementEffectNoStoreParam(
  id: string,
  effect: IEffectsPossible
) {
  const originalEffects = elementEffects.get();
  if (!originalEffects[id]) return;
  originalEffects[id] = originalEffects[id].filter(
    (effectName) => effectName !== effect
  );
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
  if (!originalEffects[id]) return false;
  return originalEffects[id].includes(effect);
}

export function getElementEffects(id: string) {
  const originalEffects = elementEffects.get();
  return originalEffects[id];
}
