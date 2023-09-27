import { atom } from 'nanostores';
import {
  getRoadmapSelector,
  roadmapSelector,
} from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { getTracebackNodeToRoot } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { type HashMapWithKeys, type HashMap } from '@type/roadmap/misc';
import {
  effectBorderRedNative,
  effectBorderBlueNative,
  effectOpacity100Native,
  effectOpacity30Native,
  effectOpacity60Native,
  effectOpacity60ForeignDiv,
  effectBorderRedForeignDiv,
  effectBorderBlueForeignDiv,
  effectOpacity100ForeignDiv,
  effectOpacity30ForeignDiv,
} from '@src/to-be-organized/node-rendering-stuff/effects';
import { getHideProgress } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import {
  getElementG,
  getElementRect,
  getElementDiv,
} from '@store/roadmap-refactor/elements-editing/elements-gs';
import { getRenderingEngineType } from '@components/roadmap/rendering-engines/store-rendering-engine';
import { triggerAllNodesRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';
import { removeRedundantSubnodesWithoutParentPresent } from '@store/roadmap-refactor/roadmap-data/data-self-correction.ts';

export type IEffectsStatuses =
  | 'mark-as-progress'
  | 'mark-as-completed'
  | 'mark-as-skipped'
  | 'mark-as-status';

export type IEffectsFocus = 'defocus-node' | 'highlight-node';

export type IEffectsDragging = 'dragging-recursive';

export type IEffectsUserActions = 'on-mouse-over';

export type IEffectsPossible =
  | IEffectsStatuses
  | IEffectsDragging
  | IEffectsFocus
  | IEffectsUserActions;

export type IEffectApplyNativeSvg = (
  rectRef: SVGRectElement,
  gRef: SVGGElement
) => void; // changed here

export type IEffectApplyForeignObject = (divRef: HTMLDivElement) => void; // changed here

export type IEffectPropertiesForeignObjects = {
  effectName: IEffectsPossible;
  effectApply: IEffectApplyForeignObject;
  effectLayer: number;
};

export type IEffectPropertiesNativeElements = {
  effectName: IEffectsPossible;
  effectApply: IEffectApplyNativeSvg;
  effectLayer: number;
};

export const dynamicEffectsMapperNativeSvgElements: HashMapWithKeys<
  IEffectsPossible,
  IEffectPropertiesNativeElements
> = {
  'highlight-node': {
    effectName: 'highlight-node',
    effectApply: (rectRef: SVGRectElement, gRef: SVGGElement) => {
      // effectOpacity100Native(rectRef, gRef);
    },
    effectLayer: 1,
  },
  'defocus-node': {
    effectName: 'defocus-node',
    effectApply: (rectRef: SVGRectElement, gRef: SVGGElement) => {
      effectOpacity60Native(rectRef, gRef);
    },
    effectLayer: 1,
  },
  'dragging-recursive': {
    effectName: 'dragging-recursive',
    effectApply: (rectRef: SVGRectElement, gRef: SVGGElement) => {
      effectBorderRedNative(rectRef, gRef);
    },
    effectLayer: 5,
  },
  'on-mouse-over': {
    effectName: 'on-mouse-over',
    effectApply: (rectRef: SVGRectElement, gRef: SVGGElement) => {
      effectBorderBlueNative(rectRef, gRef);
    },
    effectLayer: 1,
  },
  'mark-as-completed': {
    effectName: 'mark-as-completed',
    effectApply: (rectRef: SVGRectElement, gRef: SVGGElement) => {
      if (getHideProgress()) return;

      effectOpacity30Native(rectRef, gRef);
    },
    effectLayer: 10,
  },
  'mark-as-progress': {
    effectName: 'mark-as-progress',
    effectApply: (rectRef: SVGRectElement, gRef: SVGGElement) => {
      if (getHideProgress()) return;
      effectOpacity100Native(rectRef, gRef);
    },
    effectLayer: 10,
  },
  'mark-as-skipped': {
    effectName: 'mark-as-skipped',
    effectApply: (rectRef: SVGRectElement, gRef: SVGGElement) => {
      if (getHideProgress()) return;
      effectOpacity60Native(rectRef, gRef);
    },
    effectLayer: 10,
  },
  'mark-as-status': {
    effectName: 'mark-as-status',
    effectApply: (rectRef: SVGRectElement, gRef: SVGGElement) => {
      if (getHideProgress()) return;
      effectOpacity100Native(rectRef, gRef);
    },
    effectLayer: 10,
  },
};

export const dynamicEffectsMapperForeignObjectElements: HashMapWithKeys<
  IEffectsPossible,
  IEffectPropertiesForeignObjects
> = {
  'highlight-node': {
    effectName: 'highlight-node',
    effectApply: (divRef) => {
      effectBorderBlueForeignDiv(divRef);
    },
    effectLayer: 10,
  },
  'defocus-node': {
    effectName: 'defocus-node',
    effectApply: (divRef) => {
      effectOpacity60ForeignDiv(divRef);
    },
    effectLayer: 1,
  },
  'dragging-recursive': {
    effectName: 'dragging-recursive',
    effectApply: (divRef) => {
      effectBorderRedForeignDiv(divRef);
    },
    effectLayer: 5,
  },
  'on-mouse-over': {
    effectName: 'on-mouse-over',
    effectApply: (divRef) => {
      effectBorderBlueForeignDiv(divRef);
    },
    effectLayer: 1,
  },
  'mark-as-completed': {
    effectName: 'mark-as-completed',
    effectApply: (divRef) => {
      if (!divRef) return;
      effectOpacity30ForeignDiv(divRef);
    },
    effectLayer: 10,
  },
  'mark-as-progress': {
    effectName: 'mark-as-progress',
    effectApply: (divRef) => {
      if (!divRef) return;
      effectOpacity100ForeignDiv(divRef);
    },
    effectLayer: 10,
  },
  'mark-as-skipped': {
    effectName: 'mark-as-skipped',
    effectApply: (divRef) => {
      if (!divRef) return;
      effectOpacity60ForeignDiv(divRef);
    },
    effectLayer: 10,
  },
  'mark-as-status': {
    effectName: 'mark-as-status',
    effectApply: (divRef) => {
      if (!divRef) return;
      effectOpacity100ForeignDiv(divRef);
    },
    effectLayer: 10,
  },
};

export const storeNodeEffects = atom({} as HashMap<IEffectsPossible[]>);

export function setElementEffects(id: string, effects: IEffectsPossible[]) {
  const originalEffects = storeNodeEffects.get();
  storeNodeEffects.set({
    ...originalEffects,
    [id]: effects,
  });
}

export function setNodeEffectsInitialEmpty(id: string) {
  const originalEffects = storeNodeEffects.get();
  if (originalEffects[id]) {
    return;
  }
  originalEffects[id] = [];
  storeNodeEffects.set({
    ...originalEffects,
  });
}

function applyElementEffectsForeignObject(id: string) {
  const originalEffects = storeNodeEffects.get();
  const effectsArr = originalEffects[id].map(
    (effectElement) => dynamicEffectsMapperForeignObjectElements[effectElement]
  );
  const sortedEffectsArr = effectsArr.sort((a, b) => {
    return a.effectLayer - b.effectLayer;
  });
  const divElementRef = getElementDiv(id);

  sortedEffectsArr.forEach((effectElement) => {
    effectElement.effectApply(divElementRef);
  });
}

function applyElementEffectsNativeSvg(id: string) {
  const originalEffects = storeNodeEffects.get();
  const effectsArr = originalEffects[id].map(
    (effectElement) => dynamicEffectsMapperNativeSvgElements[effectElement]
  );
  const sortedEffectsArr = effectsArr.sort((a, b) => {
    return a.effectLayer - b.effectLayer;
  });

  const rectElementRef = getElementRect(id);
  const gElementRef = getElementG(id);

  sortedEffectsArr.forEach((effectElement) => {
    effectElement.effectApply(rectElementRef, gElementRef);
  });
}

export function applyElementEffects(id: string) {
  const engine = getRenderingEngineType();

  if (engine === 'native-elements') {
    applyElementEffectsNativeSvg(id);
  }
  if (engine === 'foreign-object') {
    applyElementEffectsForeignObject(id);
  }
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
  storeNodeEffects.set({
    ...originalEffects,
  });
}

export function appendElementEffect(id, effect: IEffectsPossible) {
  const originalEffects = storeNodeEffects.get();
  if (!originalEffects[id]) originalEffects[id] = [];
  if (!originalEffects[id].includes(effect)) originalEffects[id].push(effect);
  storeNodeEffects.set({
    ...originalEffects,
  });
}

export function deleteElementEffectNoStoreParam(
  id: string,
  effect: IEffectsPossible
) {
  const originalEffects = storeNodeEffects.get();
  if (!originalEffects[id]) return;
  originalEffects[id] = originalEffects[id].filter(
    (effectName) => effectName !== effect
  );
  storeNodeEffects.set({
    ...originalEffects,
  });
}
export function deleteStatusEffectAll(id: string) {
  const originalEffects = storeNodeEffects.get();
  const statusEffects: IEffectsStatuses[] = [
    'mark-as-progress',
    'mark-as-completed',
    'mark-as-skipped',
    'mark-as-status',
  ];
  statusEffects.forEach((effect) => {
    deleteElementEffect(originalEffects, id, effect);
  });
  storeNodeEffects.set({
    ...originalEffects,
  });
}

export function appendStatusEffect(id: string, status: IEffectsStatuses) {
  const originalEffects = storeNodeEffects.get();
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
  storeNodeEffects.set({
    ...originalEffects,
  });
}

export function defocusAllNodesExceptBlacklist(blackListed: string[]) {
  const originalEffects = storeNodeEffects.get();
  const renderedNodes = Object.keys(originalEffects);
  // nodes that have not had their first render will not have an effect array therefore giving an error

  renderedNodes.forEach((id) => {
    if (blackListed.includes(id)) {
      deleteElementEffect(originalEffects, id, 'defocus-node');
    } else {
      try {
        originalEffects[id].push('defocus-node');
      } catch (e) {
        console.warn(
          'corrupted roadmap data, the id was not rendered in effects',
          id,
          e
        );
        console.warn('self correcting data');
        removeRedundantSubnodesWithoutParentPresent([id]);
        removeRedundantSubnodesWithoutParentPresent([id]);
        // throw new Error(`Error in defocusAllNodesExceptBlacklist: ${e}`);
      }
    }
  });
}

export function defocusAllRootNodesExceptBlacklist(blackListed: string[]) {
  const originalEffects = storeNodeEffects.get();
  const nodes = getRoadmapSelector().rootNodesIds;

  nodes.forEach((id) => {
    if (blackListed.includes(id)) {
      deleteElementEffect(originalEffects, id, 'defocus-node');
    } else {
      try {
        originalEffects[id].push('defocus-node');
      } catch (e) {
        throw new Error(`Error in defocusAllNodesExceptBlacklist: ${e}`);
      }
    }
  });
}

export function setEditorOpenEffect(nodeId: string) {
  // applies opacity 60 to all nodes-page except the one with the id
  const originalEffects = storeNodeEffects.get();
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

  storeNodeEffects.set({
    ...originalEffects,
  });
}

export function setConnectionSelectedEffect(parentId: string, childId: string) {
  const originalEffects = storeNodeEffects.get();
  const blackListed = [parentId, childId];

  defocusAllNodesExceptBlacklist(blackListed);

  storeNodeEffects.set({
    ...originalEffects,
  });
}

export function clearAllDefocusEffects() {
  const originalEffects = storeNodeEffects.get();
  const nodes = Object.keys(originalEffects);
  nodes.forEach((id) => {
    deleteElementEffect(originalEffects, id, 'defocus-node');
  });
}

export function setConnectionUnselectedEffect() {
  const originalEffects = storeNodeEffects.get();
  clearAllDefocusEffects();
  storeNodeEffects.set({
    ...originalEffects,
  });
}

export function setEditorClosedEffect() {
  const originalEffects = storeNodeEffects.get();
  clearAllDefocusEffects();
  storeNodeEffects.set({
    ...originalEffects,
  });
}

export function removeAllEffects() {
  const originalEffects = storeNodeEffects.get();
  const nodes = Object.keys(originalEffects);
  nodes.forEach((id) => {
    originalEffects[id] = [];
  });
  storeNodeEffects.set({
    ...originalEffects,
  });
}

export function appendDraggingRecursiveEffect(nodeId: string) {
  const originalEffects = storeNodeEffects.get();
  appendElementEffect(nodeId, 'dragging-recursive');
  storeNodeEffects.set({
    ...originalEffects,
  });
}

export function deleteDraggingRecursiveEffect(nodeId: string) {
  const originalEffects = storeNodeEffects.get();
  deleteElementEffect(originalEffects, nodeId, 'dragging-recursive');
  storeNodeEffects.set({
    ...originalEffects,
  });
}

export function getElementHasEffect(id: string, effect: IEffectsPossible) {
  const originalEffects = storeNodeEffects.get();
  if (!originalEffects[id]) return false;
  return originalEffects[id].includes(effect);
}

export function getElementEffects(id: string) {
  const originalEffects = storeNodeEffects.get();
  return originalEffects[id];
}

export function highlightNodeEffects(id: string) {
  defocusAllRootNodesExceptBlacklist([id]);
  appendElementEffect(id, 'highlight-node');
}

export function removeHighlightNodeEffects(id: string) {
  clearAllDefocusEffects();
  deleteElementEffectNoStoreParam(id, 'highlight-node');
  triggerAllNodesRerender();
}
